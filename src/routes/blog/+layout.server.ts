import { posts } from "$lib/blog/posts/posts";

export function load() {
    return {
        summaries: posts.map(a => {
            return {
                title: a.title,
                date: a.date,
                hook: a.hook
            }
        })
    };
}