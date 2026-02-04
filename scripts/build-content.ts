import path from 'node:path';
import {
	buildBlogPostsIndex,
	findAllContentFiles,
	prerenderFile
} from '../.vite/content-renderer';

async function main() {
	const contentBasePath = path.join(process.cwd(), 'src/lib/content');
	const contentFiles = findAllContentFiles(contentBasePath);

	console.info('🏗️ Prerendering content...');

	await Promise.all(
		contentFiles.map(async (contentFile) => {
			await prerenderFile(contentFile);
			const relativePath = path.relative(contentBasePath, contentFile.path);
			console.info(`✅ Prerendered ${relativePath}`);
		})
	);

	await buildBlogPostsIndex(contentBasePath, contentFiles);

	console.info('✅ Prerendering complete.');
}

main().catch((error) => {
	console.error(error);
	process.exit(1);
});
