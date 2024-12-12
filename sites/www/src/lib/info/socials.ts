import { GitHub, YouTube } from '$lib/components/icons';
import type { Component } from 'svelte';

export type Social = {
	name: string;
	link: string;
	Logo?: Component;
};

const socials: Social[] = [
	{
		name: 'GitHub',
		link: 'https://github.com/ieedan',
		Logo: GitHub
	},
	{
		name: 'YouTube',
		link: 'https://www.youtube.com/@ieedan',
		Logo: YouTube
	}
];

export { socials };
