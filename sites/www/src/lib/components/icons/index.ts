import type { HTMLAttributes } from 'svelte/elements';
import GitHub from './github.svelte';
import Svelte from './svelte.svelte';
import YouTube from './youtube.svelte';

export interface Props extends HTMLAttributes<SVGElement> {
	class?: string;
	width?: number;
	height?: number;
}

export { GitHub, Svelte, YouTube };
