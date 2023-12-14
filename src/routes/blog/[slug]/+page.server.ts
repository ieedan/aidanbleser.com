import { posts } from "$lib/blog/posts/posts";

export function load({ params }) {
	return {
		index: posts.findIndex((a) => a.title == params.slug),
	};
}
