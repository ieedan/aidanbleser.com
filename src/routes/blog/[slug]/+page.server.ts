import { posts } from "$lib/blog/posts/posts";

export function load({ params }) {
	const index = posts.findIndex((a) => a.title == params.slug);
	return {
		index: index,
		title: posts[index].title 
	};
}
