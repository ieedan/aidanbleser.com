import type { Component } from 'svelte';
import { GithubLogo, LinkedinLogo, XLogo } from '$lib/components/logos';

type Social = {
	name: string;
	url: string;
	logo: Component<{ class: string }>;
};

export const socials: Social[] = [
	{
		name: 'X',
		url: 'https://x.com/ieeeedan',
		logo: XLogo
	},
	{
		name: 'GitHub',
		url: 'https://github.com/ieedan',
		logo: GithubLogo
	},
	{
		name: 'LinkedIn',
		url: 'https://www.linkedin.com/in/aidan-bleser-731b01286/',
		logo: LinkedinLogo
	}
];
