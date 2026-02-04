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

const contentDir = path.join(process.cwd(), 'src/lib/content');

export async function prerenderFile(contentFile: { path: string; content: string }) {
	const relativePath = path.relative(contentDir, contentFile.path);
	const outputPath = path.join('src/lib/__prerendered__', `${path.parse(relativePath).name}.ts`);

	const renderedContent = await renderMarkdown(contentFile.content);

	const fileContent = `export default \`${escapeForTemplateLiteral(renderedContent)}\``;

	const outputPathFull = path.join(process.cwd(), outputPath);
	fs.mkdirSync(path.dirname(outputPathFull), { recursive: true });
	fs.writeFileSync(outputPathFull, fileContent);

	return {
		outputPath
	};
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
