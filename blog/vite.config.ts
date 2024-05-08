import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import ViteRestart from 'vite-plugin-restart';
import { getPosts } from './posts.js';

// gets posts from `./posts`
const posts = await getPosts();

export default defineConfig({
	plugins: [
		sveltekit(),
		ViteRestart({
			restart: ['src/posts/**/*.md', 'src/posts/**/*.json'],
		}),
	],
	define: {
		'process.env.POSTS': JSON.stringify(posts),
	},
});
