import { posts } from '$lib/blog/posts/posts.js';
import { fail } from '@sveltejs/kit';

export const load = ({ params }) => {
	const post = posts.find((p) => decodeURIComponent(p.slug) === decodeURIComponent(params.name));

	if (!post) return fail(404);

	return {
		name: decodeURIComponent(params.name)
	};
};
