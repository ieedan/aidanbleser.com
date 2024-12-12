import type { Component } from 'svelte';

export type Project = {
	name: string;
	description: string;
	link: string;
	Logo?: Component;
};

const projects: Project[] = [
	{
		name: 'jsrepo',
		description:
			'A CLI to that allows you to share code though a repository like shadcn/ui except you own the registry.',
		link: 'https://jsrepo.dev'
	},
	{
		name: 'shadcn-svelte-extras',
		description:
			'A collection of reusable components that extend and introduce components to shadcn-svelte.',
		link: 'https://www.shadcn-svelte-extras.com'
	},
	{
		name: 'ieedan/std',
		description: 'A collection of utility functions and types I use in my projects.',
		link: 'https://github.com/ieedan/std'
	},
	{
		name: 'ieedan/sl',
		description: 'A CLI to help me and my friends manage our Pokémon Soul Link play-throughs.',
		link: 'https://github.com/ieedan/sl'
	},
	{
		name: 'ieedan/esetres',
		description: 'A self hosted file storage server build in rust.',
		link: 'https://github.com/ieedan/esetres'
	}
];

export { projects };
