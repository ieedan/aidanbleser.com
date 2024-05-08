import fs from 'node:fs';
import path from 'node:path';
import markdownit from 'markdown-it';
import Shikiji from 'markdown-it-shikiji';

export const getPosts = async () => {
	const postsDirectory = './posts';

	const files = fs.readdirSync(postsDirectory);

	const posts = files.filter((file) => file.endsWith('.md'));

	const md = markdownit();

	md.use(
		await Shikiji({
			themes: {
				light: 'github-dark',
				dark: 'github-dark',
			},
		})
	);

	return posts.map((post) => {
		const file = fs.readFileSync(path.resolve(postsDirectory, post)).toString();
		return {
			name: normalizeName(post),
			summary: md.render(summarize(file)),
			content: md.render(file),
		};
	});
};

/**
 *
 * @param {string} name
 * @returns {string}
 */
const normalizeName = (name) => {
	name = name.replace('.md', '');

	const segments = name.split('-');

	let final = '';

	segments.forEach((seg) => {
		final = final + seg[0].toUpperCase() + seg.slice(1) + ' ';
	});

	return final.trim();
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
			return post.slice(firstBreak, i - 1);
		}
	}

	const end = MAX_LENGTH > post.length ? post.length : MAX_LENGTH;

	return post.slice(0, end);
};
