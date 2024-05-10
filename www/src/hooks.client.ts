import { dev } from '$app/environment';
import { inject } from '@vercel/analytics';
import { injectSpeedInsights } from '@vercel/speed-insights/sveltekit';

injectSpeedInsights();
inject({ mode: dev ? 'development' : 'production' });

// eslint-disable-next-line no-console
console.log(
	'Welcome to aidanbleser.com! See the source here https://github.com/ieedan/aidanbleser.com/tree/main/www! 🚀'
);
