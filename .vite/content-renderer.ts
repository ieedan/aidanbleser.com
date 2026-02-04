import type { Plugin } from 'vite';
import fs from 'node:fs';
import path from 'node:path';
import { renderMarkdown } from '../src/lib/utils/markdown';

export function contentRenderer(): Plugin {
	return {
		name: 'content renderer',
		async buildStart() {
			const contentBasePath = path.join(process.cwd(), 'src/lib/content');
			const contentFiles = findAllContentFiles(contentBasePath);

			this.info('🏗️ Prerendering content...');

			await Promise.all(
				contentFiles.map(async (contentFile) => {
					await prerenderFile(contentFile);
					const relativePath = path.relative(contentBasePath, contentFile.path);
					this.info(`✅ Prerendered ${relativePath}`);
				})
			);

			await buildBlogPostsIndex(contentBasePath, contentFiles);

			this.info('✅ Prerendering complete.');
		},
		hotUpdate: {
			handler: async (options) => {
				await Promise.all(
					options.modules.map(async (mod) => {
						const contentBasePath = path.join(process.cwd(), 'src/lib/content');
						if (mod.file?.startsWith(contentBasePath)) {
							const content = fs.readFileSync(mod.file, 'utf-8');

							await prerenderFile({ path: mod.file, content });
							await buildBlogPostsIndex(contentBasePath);
						}
					})
				);
			}
		}
	} satisfies Plugin;
}

function escapeForTemplateLiteral(content: string): string {
	// Escape backslashes first (must be done before other escapes)
	// Then escape backticks
	// Finally escape template literal interpolation sequences
	return content.replace(/\\/g, '\\\\').replace(/`/g, '\\`').replace(/\${/g, '\\${');
}

/**
 * Calculate reading time in minutes based on word count
 * Uses average reading speed of 200 words per minute
 */
function calculateReadingTime(markdown: string): number {
	// Remove frontmatter (content between --- markers)
	const contentWithoutFrontmatter = markdown.replace(/^---[\s\S]*?---\n/, '');

	// Remove markdown syntax and count words
	// Remove code blocks, links, images, headers, etc. to get plain text
	const plainText = contentWithoutFrontmatter
		.replace(/```[\s\S]*?```/g, '') // Remove code blocks
		.replace(/`[^`]+`/g, '') // Remove inline code
		.replace(/\[([^\]]+)\]\([^\)]+\)/g, '$1') // Convert links to just text
		.replace(/!\[([^\]]*)\]\([^\)]+\)/g, '') // Remove images
		.replace(/[#*\-_`~>]/g, '') // Remove markdown formatting characters
		.replace(/\n+/g, ' ') // Replace newlines with spaces
		.trim();

	// Count words (split by whitespace and filter empty strings)
	const wordCount = plainText.split(/\s+/).filter((word) => word.length > 0).length;

	// Calculate reading time (200 words per minute)
	const readingTime = Math.max(1, Math.round(wordCount / 200));

	return readingTime;
}

const contentDir = path.join(process.cwd(), 'src/lib/content');

export async function prerenderFile(contentFile: { path: string; content: string }) {
	const relativePath = path.relative(contentDir, contentFile.path);
	const parsedRelativePath = path.parse(relativePath);
	const outputPath = path.join(
		'src/lib/__prerendered__',
		parsedRelativePath.dir,
		`${parsedRelativePath.name}.ts`
	);

	const [frontmatter, content] = parseFrontmatter(contentFile.content);

	const renderedContent = await renderMarkdown(content);
	const readingTime = calculateReadingTime(contentFile.content);

	const fileContent = `export default {
	meta: ${JSON.stringify(frontmatter)},
	content: \`${escapeForTemplateLiteral(renderedContent)}\`,
	contentMd: \`${escapeForTemplateLiteral(contentFile.content)}\`,
	readingTime: ${readingTime}
}
`;

	const outputPathFull = path.join(process.cwd(), outputPath);
	fs.mkdirSync(path.dirname(outputPathFull), { recursive: true });
	fs.writeFileSync(outputPathFull, fileContent);

	return {
		outputPath
	};
}

export async function buildBlogPostsIndex(
	contentBasePath: string,
	contentFiles: { path: string; content: string }[] = findAllContentFiles(contentBasePath)
) {
	const blogPosts = contentFiles
		.map((file) => ({
			...file,
			relativePath: path.relative(contentBasePath, file.path)
		}))
		.filter((file) => normalizePath(file.relativePath).startsWith('blog/posts/'));

	const postsIndex: Record<string, Record<string, string>> = {};

	for (const file of blogPosts) {
		const slug = path.parse(file.relativePath).name;
		const [frontmatter] = parseFrontmatter(file.content);
		const readingTime = calculateReadingTime(file.content);

		postsIndex[slug] = {
			...frontmatter,
			readingTime: readingTime.toString()
		};
	}

	const outputPath = path.join(process.cwd(), 'src/lib/__prerendered__/blog/posts/index.ts');
	fs.mkdirSync(path.dirname(outputPath), { recursive: true });
	fs.writeFileSync(
		outputPath,
		`const postsIndex = ${JSON.stringify(postsIndex, null, 2)} as const;\n\nexport default postsIndex;\n`
	);
}

function normalizePath(filePath: string) {
	return filePath.split(path.sep).join('/');
}

export function findAllContentFiles(dir: string): { path: string; content: string }[] {
	const files = fs.readdirSync(dir);
	const contentFiles: { path: string; content: string }[] = [];
	for (const file of files) {
		if (fs.statSync(path.join(dir, file)).isDirectory()) {
			contentFiles.push(...findAllContentFiles(path.join(dir, file)));
		} else if (file.endsWith('.md')) {
			const content = fs.readFileSync(path.join(dir, file), 'utf-8');
			contentFiles.push({ path: path.join(dir, file), content });
		}
	}
	return contentFiles;
}

export function parseFrontmatter(content: string): [Record<string, string>, string] {
	if (!content.trim().startsWith('---')) {
		return [{}, content];
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
}

/** yyyy-MM-dd */
const formatDate = (date: Date) =>
	`${date.getUTCFullYear()}-${date.getUTCMonth() + 1}-${date.getUTCDate()}`;
