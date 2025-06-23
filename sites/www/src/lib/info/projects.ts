import type { Project } from './types';

const projects: Project[] = [
	{
		name: 'jsrepo',
		description:
			'A CLI to that allows you to share code though a repository like shadcn/ui except you own the registry.',
		link: 'https://jsrepo.dev'
	},
	{
		name: 'jsrepo.com',
		description:
			'npm for component registries. The most maintainable way to distribute your shadcn-style registries.',
		link: 'https://jsrepo.com'
	},
	{
		name: 'shadcn-svelte-extras',
		description:
			'A collection of reusable components that extend and introduce components to shadcn-svelte.',
		link: 'https://www.shadcn-svelte-extras.com'
	},
	{
		name: 'thom.chat',
		description: 'Our submission for the T3Chat Cloneathon a blazingly fast AI chat app.',
		link: 'https://thom.chat'
	}
];

export { projects };
