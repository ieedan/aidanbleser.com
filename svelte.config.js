import adapter from '@sveltejs/adapter-vercel';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		adapter: adapter(),
		experimental: {
			remoteFunctions: true
		},
		alias: {
			$prerendered: 'src/lib/__prerendered__'
		}
	}
};

export default config;
