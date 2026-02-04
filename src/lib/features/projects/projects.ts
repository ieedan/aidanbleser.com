import finalchatLogo from '$lib/assets/projects/finalchat.png';
import jsrepoLogo from '$lib/assets/projects/jsrepo.ico';
import shadcnSvelteExtrasLogo from '$lib/assets/projects/shadcn-svelte-extras.png';
import shadcnSvelteLogo from '$lib/assets/projects/shadcn-svelte.ico';

export const projects: Project[] = [
	{
		title: 'finalchat',
		logo: finalchatLogo,
		link: 'https://finalchat.app',
		description: "The last chat you'll ever need"
	},
	{
		title: 'jsrepo',
		logo: jsrepoLogo,
		link: 'https://jsrepo.dev',
		description: 'The modern registry toolchain'
	},
	{
		title: 'shadcn-svelte-extras',
		logo: shadcnSvelteExtrasLogo,
		link: 'https://shadcn-svelte-extras.com',
		description: 'Extra components for shadcn-svelte'
	},
	{
		title: 'shadcn-svelte',
		logo: shadcnSvelteLogo,
		link: 'https://shadcn-svelte.com',
		description: 'A Svelte port of shadcn/ui'
	}
];

export type Project = {
	title: string;
	link: string;
	description: string;
	logo: string;
};
