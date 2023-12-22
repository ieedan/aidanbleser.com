import { postsMap } from "$lib/blog/posts/posts.js";
import { error } from "@sveltejs/kit";

export function load({ params }) {
	const post = postsMap.get(params.slug);
	if (!post) throw error(404, `Couldn't find the post ${params.slug}`);
	return {
		title: post.title,
		hook: post.hook,
		date: post.date,
		readMinutes: post.readMinutes,
	};
}
