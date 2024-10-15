import { injectSpeedInsights } from '@vercel/speed-insights/sveltekit';
import { dev } from '$app/environment';
import { inject } from '@vercel/analytics';

inject({ mode: dev ? 'development' : 'production' });
injectSpeedInsights();

// eslint-disable-next-line no-console
console.log(
	'Welcome to aidanbleser.com! See the source here https://github.com/ieedan/aidanbleser.com/tree/main/www! 🚀'
);
