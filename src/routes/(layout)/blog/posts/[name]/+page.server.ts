import { getBlogPost, getBlogPostKeys } from '$lib/features/blog/blog.js';
import { error, redirect } from '@sveltejs/kit';

// prerender every known post, but still fall back to the server for unknown names
// so that the old title based urls can redirect
export const prerender = 'auto';

export function entries() {
	return getBlogPostKeys().map((name) => ({ name }));
}

export async function load({ params }) {
	const post = await getBlogPost(params.name);
	if (!post) return error(404, 'Post not found');

	// found by title (the old way I was doing it)
	if (post.key !== params.name) throw redirect(302, `/blog/posts/${post.key}`);

	return {
		post
	};
}
