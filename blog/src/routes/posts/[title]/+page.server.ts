import type { Post } from '$lib/ts/types.js';
import { redirect } from '@sveltejs/kit';

export function load({ params }) {
	const posts = (process.env.POSTS ?? []) as Post[];

    const post = posts.find((p) => p.name == params.title);

    if (!post) throw redirect(307, "/");

	return {
		post,
	};
}
