import fs from 'node:fs';
import path from 'node:path';
import markdownit from 'markdown-it';
import Shikiji from 'markdown-it-shikiji';

export const getPosts = async () => {
	const postsDirectory = './src/posts';

	const files = fs.readdirSync(postsDirectory);

	const posts = files.filter((file) => file.endsWith('.md'));

	const md = markdownit();

	md.use(
		await Shikiji({
			themes: {
				light: 'dark-plus',
				dark: 'dark-plus',
			},
		})
	);

	return posts.map((post) => {
		const file = fs.readFileSync(path.resolve(postsDirectory, post)).toString();
		const meta = JSON.parse(
			fs.readFileSync(path.resolve(postsDirectory, post.replace('.md', '.json'))).toString()
		);

		return {
			name: getTitle(file),
			summary: md.render(summarize(file)),
			content: md.render(file),
			metaData: meta,
		};
	});
};

/**
 *
 * @param {string} post
 * @returns {string}
 */
const getTitle = (post) => {
	const firstLineEnd = post.indexOf('\n');

	let firstLine = post.slice(0, firstLineEnd).replace('# ', '');

	return firstLine.trim();
};

/** Returns a shortened summary of the post
 *
 * @param {string} post
 * @returns {string}
 */
const summarize = (post) => {
	const MAX_LENGTH = 200;

	let breakCount = 0;
	// this prevents the title from being in the summary
	let firstBreak = 0;

	for (let i = 0; i < post.length; i++) {
		if (post[i] == '\n') {
			if (firstBreak == 0) {
				firstBreak = i;
			}
			breakCount++;
		}

		if (breakCount >= 3 || i >= MAX_LENGTH) {
			let res = post.slice(firstBreak, i);

			if (i >= MAX_LENGTH) {
				res = res + '...';
			}

			return res;
		}
	}

	const end = MAX_LENGTH > post.length ? post.length : MAX_LENGTH;

	return post.slice(0, end);
};
