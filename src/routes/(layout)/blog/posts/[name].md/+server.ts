import { getBlogPost } from '$lib/features/blog/blog.js';
import { error, redirect, text } from '@sveltejs/kit';

export async function GET({ params }) {
	const post = await getBlogPost(params.name);
	if (!post) return error(404, 'Post not found');

	// found by title (the old way I was doing it)
	if (post.key !== params.name) throw redirect(302, `/blog/posts/${post.key}`);

	return text(post.contentMd);
}
