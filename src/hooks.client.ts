import { dev } from '$app/environment';
import { inject } from '@vercel/analytics';
import { useDarkMode } from "$lib/TS/dark-mode";
import { injectSpeedInsights } from "@vercel/speed-insights/sveltekit";

useDarkMode();
injectSpeedInsights(); 
inject({ mode: dev ? 'development' : 'production' });

console.log(
	"Welcome to aidanbleser.com! See the source here https://github.com/ieedan/aidanbleser.com! 🚀",
);