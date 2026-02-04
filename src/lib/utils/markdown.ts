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

function slugify(text: string): string {
	return (
		text
			.toLowerCase()
			.replace(/\s+/g, '-')
			.replace(/[^\w-]/g, '')
			.replace(/-+/g, '-')
			.replace(/^-|-$/g, '') || 'section'
	);
}

async function getMarkdownRenderer() {
	if (md) {
		return md;
	}

	const markdown = MarkdownIt({
		html: true
	});
	// add id to headings for TOC anchor links
	const defaultHeadingOpen =
		markdown.renderer.rules.heading_open ||
		function (tokens, idx, options, _env, self) {
			return self.renderToken(tokens, idx, options);
		};
	markdown.renderer.rules.heading_open = (tokens, idx, options, env, self) => {
		const inline = tokens[idx + 1];
		const content = inline?.type === 'inline' ? inline.content : '';
		const id = slugify(content);
		const aIndex = tokens[idx].attrIndex('id');
		if (aIndex < 0) {
			tokens[idx].attrPush(['id', id]);
		} else {
			tokens[idx].attrs![aIndex][1] = id;
		}
		return defaultHeadingOpen(tokens, idx, options, env, self);
	};
	const defaultRender =
		markdown.renderer.rules.link_open ||
		function (tokens, idx, options, _env, self) {
			return self.renderToken(tokens, idx, options);
		};
	// convert all links to open in a new tab
	markdown.renderer.rules.link_open = (tokens, idx, options, env, self) => {
		const aIndex = tokens[idx].attrIndex('target');
		if (aIndex < 0) {
			tokens[idx].attrPush(['target', '_blank']);
		} else {
			tokens[idx].attrs![aIndex][1] = '_blank';
		}
		const relIndex = tokens[idx].attrIndex('rel');
		if (relIndex < 0) {
			tokens[idx].attrPush(['rel', 'noopener']);
		}
		return defaultRender(tokens, idx, options, env, self);
	};
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
