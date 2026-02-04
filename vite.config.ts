import tailwindcss from '@tailwindcss/vite';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import { contentRenderer } from './.vite/content-renderer';

export default defineConfig({
	plugins: [tailwindcss(), sveltekit(), contentRenderer()]
});
