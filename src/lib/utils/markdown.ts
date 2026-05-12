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
		import('@shikijs/langs/go'),
		import('@shikijs/langs/sh'),
		import('@shikijs/langs/yaml'),
		import('@shikijs/langs/jsonc')
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

/** Absolute http(s) URLs open in a new tab; relative, hash, and other schemes stay same-tab. */
function isAbsoluteHttpUrl(href: string): boolean {
	return /^https?:\/\//i.test(href.trim());
}

const COPY_ICON_SVG =
	'<svg class="copy-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M6.9998 6V3C6.9998 2.44772 7.44752 2 7.9998 2H19.9998C20.5521 2 20.9998 2.44772 20.9998 3V17C20.9998 17.5523 20.5521 18 19.9998 18H16.9998V20.9991C16.9998 21.5519 16.5499 22 15.993 22H4.00666C3.45059 22 3 21.5554 3 20.9991L3.0026 7.00087C3.0027 6.44811 3.45264 6 4.00942 6H6.9998ZM5.00242 8L5.00019 20H14.9998V8H5.00242ZM8.9998 6H16.9998V16H18.9998V4H8.9998V6Z"/></svg>';

const CHECK_ICON_SVG =
	'<svg class="check-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M9.9997 15.1709L19.1921 5.97852L20.6063 7.39273L9.9997 17.9993L3.63574 11.6354L5.04996 10.2212L9.9997 15.1709Z"/></svg>';

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
	// http(s) links open in a new tab; relative and same-page links stay in the same tab
	markdown.renderer.rules.link_open = (tokens, idx, options, env, self) => {
		const href = tokens[idx].attrGet('href') ?? '';
		if (isAbsoluteHttpUrl(href)) {
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
	// wrap fenced code blocks with a copy button that appears on hover
	const defaultFence = markdown.renderer.rules.fence!;
	markdown.renderer.rules.fence = (tokens, idx, options, env, self) => {
		const rendered = defaultFence(tokens, idx, options, env, self);
		return `<div class="code-block">${rendered}<button class="code-block-copy" type="button" data-copy-code aria-label="Copy code" tabindex="-1">${COPY_ICON_SVG}${CHECK_ICON_SVG}<span class="sr-only">Copy code</span></button></div>\n`;
	};
	md = markdown;
	return markdown;
}
