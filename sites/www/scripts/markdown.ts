import { Post } from '../src/lib/blog/posts/types';

export const parseFrontmatter = (content: string): [Post['meta'], string] => {
	if (!content.trim().startsWith('---')) {
		console.warn('Missing frontmatter');
	}

	const fmStart = content.indexOf('---') + 3;
	const fmEnd = content.indexOf('---', fmStart);

	const frontMatter = content.slice(fmStart, fmEnd).trim();

	const lines = frontMatter
		.split('\n')
		.map((l) => l.trim())
		.filter((l) => l !== '');

	const meta: Record<string, string> = {};

	for (const line of lines) {
		const colonIndex = line.indexOf(':');

		const key = line.slice(0, colonIndex);
		let value = line.slice(colonIndex + 1).trim();

		// ensure that the date is in the correct format
		if (key === 'date') {
			const date = new Date(value);

			value = formatDate(date);
		}

		meta[key] = value;
	}

	return [meta, content.slice(fmEnd + 3).trimStart()];
};

/** yyyy-MM-dd */
const formatDate = (date: Date) =>
	`${date.getUTCFullYear()}-${date.getUTCMonth() + 1}-${date.getUTCDate()}`;
