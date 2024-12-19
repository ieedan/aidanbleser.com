import fs from 'node:fs';
import path from 'node:path';
import MarkdownIt from 'markdown-it';
import Shiki from '@shikijs/markdown-it';
import { parseFrontmatter } from './markdown';
import { Post } from '../src/lib/blog/posts/types';

const POSTS_DIRECTORY = './src/lib/blog/posts';
const CHANGE_DEBOUNCE = 50;

const watch = process.argv[2] === '--watch';

const md = MarkdownIt();

md.use(
	await Shiki({
		themes: {
			light: 'ayu-dark',
			dark: 'ayu-dark'
		}
	})
);

const run = async (
	changed: string | undefined = undefined,
	cache: Map<string, Post> = new Map()
) => {
	const posts: Map<string, Post> = cache;

	const files = fs.readdirSync(POSTS_DIRECTORY);
	for (const file of files) {
		// skip this file if it is already in the cache
		if (changed !== undefined && file !== changed && posts.has(file)) continue;

		if (!file.endsWith('.md')) continue;

		const fileContent = fs.readFileSync(path.join(POSTS_DIRECTORY, file)).toString();

		const [meta, content] = parseFrontmatter(fileContent);

		if (!meta.title) {
			console.log(
				`error: Couldn't add post because ${file} didn't include a 'title' in the front-matter. ❌`
			);
			continue;
		}

		const slug = encodeURIComponent(meta.title as string);

		const htmlContent = md.render(content);

		posts.set(file, { meta, content: htmlContent, slug });

		let action = 'Added';

		if (posts.has(file)) {
			action = 'Updated';
		}

		console.log(`info: ${action} post ${file}`);
	}

	const postsFile = fileTemplate(
		Array.from(posts.values()).sort(
			(a, b) => Date.parse(b.meta.date as string) - Date.parse(a.meta.date as string)
		)
	);

	const postsFilePath = './src/lib/blog/posts/posts.ts';

	fs.writeFileSync(postsFilePath, postsFile);

	console.log(`info: Wrote posts to ${postsFilePath} ✔️`);

	return posts;
};

const fileTemplate = (posts: Post[]) => {
	return `import type { Post } from './types'

const posts: Post[] = ${JSON.stringify(posts, null, '\t')};

export { posts };
    `;
};

run().then((cache) => {
	let timeout: NodeJS.Timeout;

	if (watch) {
		console.log('info: Watching for changes...');
		fs.watch(POSTS_DIRECTORY, {}, (e, file) => {
			if (!file?.endsWith('.md')) return;

			clearTimeout(timeout);

			timeout = setTimeout(async () => {
				console.log(`${e} to ${file}`);
				cache = await run(file, cache);
			}, CHANGE_DEBOUNCE);
		});
	}
});
