import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import { getPosts } from "./posts.js"

// gets posts from `./posts`
const posts = getPosts();

export default defineConfig({
	plugins: [sveltekit()],
	define: {
		"process.env.POSTS": JSON.stringify(posts)
	}
});
