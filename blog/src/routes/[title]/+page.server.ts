import type { Post } from '$lib/ts/types.js';

export function load({ params }) {
	const posts = (process.env.POSTS ?? []) as Post[];

	return {
		post: posts.find((post) => post.name == params.title),
	};
}
