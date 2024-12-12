import type { TransitionConfig } from 'svelte/transition';

export type Options = {
	speed: number;
	delay: number;
};

export const typewriter = (node: HTMLElement, { speed = 1, delay = 0 }: Partial<Options>) => {
	const valid = node.childNodes.length === 1 && node.childNodes[0].nodeType === Node.TEXT_NODE;

	if (!valid) {
		throw new Error(`This transition only works on elements with a single text node child`);
	}

	const text = node.textContent ?? '';
	const duration = text.length / (speed * 0.01);

	return {
		delay,
		duration,
		tick: (t) => {
			const i = Math.trunc(text.length * t);
			node.textContent = text.slice(0, i);
		}
	} satisfies TransitionConfig;
};
