import MarkdownIt from 'markdown-it';
import { createHighlighterCore, type HighlighterGeneric } from 'shiki/core';
import { fromHighlighter } from '@shikijs/markdown-it/core';
import { transformerNotationDiff, transformerNotationHighlight } from '@shikijs/transformers';
import { createOnigurumaEngine } from 'shiki/engine/oniguruma';

export async function renderMarkdown(markdown: string) {
	const md = await getMarkdownRenderer();
	return md.render(markdown);
}

let md: MarkdownIt | undefined = undefined;

const highlighter = createHighlighterCore({
	themes: [
		// import('@shikijs/themes/slack-ochin'),
		import('@shikijs/themes/slack-dark')
	],
	langs: [
		import('@shikijs/langs/ts'),
		import('@shikijs/langs/svelte'),
		import('@shikijs/langs/rust'),
		import('@shikijs/langs/sql'),
		import('@shikijs/langs/csharp'),
		import('@shikijs/langs/toml'),
		import('@shikijs/langs/go')
	],
	engine: createOnigurumaEngine(import('shiki/wasm'))
});

async function getMarkdownRenderer() {
	if (md) {
		return md;
	}

	const markdown = MarkdownIt();
	markdown.use(
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		fromHighlighter((await highlighter) as HighlighterGeneric<any, any>, {
			themes: {
				light: 'slack-dark',
				dark: 'slack-dark'
			},
			transformers: [transformerNotationDiff(), transformerNotationHighlight()]
		})
	);
	md = markdown;
	return markdown;
}
