/*
	jsrepo 1.38.0
	Installed from github/ieedan/shadcn-svelte-extras
	2-19-2025
*/

import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}
