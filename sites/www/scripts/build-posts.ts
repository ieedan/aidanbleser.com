import fs from 'node:fs';
import path from 'node:path';
import MarkdownIt from 'markdown-it'
import Shiki from '@shikijs/markdown-it'
import { parseFrontmatter } from './markdown';
import { Post } from '../src/lib/blog/posts/types';

const POSTS_DIRECTORY = './src/lib/blog/posts';
const AVERAGE_WPM = 225;
const CHANGE_DEBOUNCE = 500;

const watch = process.argv[2] === '--watch';

const md = MarkdownIt();

md.use(await Shiki({
  themes: {
    light: 'ayu-dark',
    dark: 'ayu-dark',
  }
}))

const run = async () => {
	const posts: Post[] = [];

	const files = fs.readdirSync(POSTS_DIRECTORY);
	for (const file of files) {
		if (!file.endsWith('.md')) continue;

		const fileContent = fs.readFileSync(path.join(POSTS_DIRECTORY, file)).toString();

		const [meta, content] = parseFrontmatter(fileContent);

		const readTime = calculateReadTime(content);

		meta.readTime = readTime;

		if (!meta.title) {
			console.log(
				`error: Couldn't add post because ${file} didn't include a 'title' in the front-matter. ❌`
			);
			process.exit(1);
		}

		const slug = encodeURIComponent(meta.title as string);

		const htmlContent = md.render(content);

		posts.push({ meta, content: htmlContent, slug });

		console.log(`info: Added post ${file}`);
	}

	const postsFile = fileTemplate(posts);

	const postsFilePath = './src/lib/blog/posts/posts.ts';

	fs.writeFileSync(postsFilePath, postsFile);

	console.log(`info: Wrote posts to ${postsFilePath} ✔️`);
};

const fileTemplate = (posts: Post[]) => {
	return `import type { Post } from './types'

const posts: Post[] = ${JSON.stringify(posts, null, '\t')};

export { posts };
    `;
};

const calculateReadTime = (content: string): number => {
	const words = content.split(' ');

	const minutes = Math.ceil(words.length / AVERAGE_WPM);

	return minutes;
};

run().then(() => {
	let timeout: NodeJS.Timeout;

	if (watch) {
		console.log('info: Watching for changes...');
		fs.watch(POSTS_DIRECTORY, {}, (e, file) => {
			if (!file?.endsWith('.md')) return;

			clearTimeout(timeout);

			timeout = setTimeout(() => {
				console.log(`${e} to ${file}`);
				run();
			}, CHANGE_DEBOUNCE);
		});
	}
});
