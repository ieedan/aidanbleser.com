import adapter from '@sveltejs/adapter-vercel';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		adapter: adapter(),
		prerender: {
			// used as `url.origin` while prerendering so absolute urls (og images, etc.) are correct
			origin: 'https://aidanbleser.com'
		},
		experimental: {
			remoteFunctions: true
		},
		alias: {
			$prerendered: 'src/lib/__prerendered__'
		}
	}
};

export default config;
