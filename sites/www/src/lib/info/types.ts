import type { Component } from 'svelte';

export type Project = {
	name: string;
	description: string;
	link: string;
	Logo?: Component;
};
