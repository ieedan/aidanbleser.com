import type { Post } from "$lib/ts/types";

export function load() {
    const posts = (process.env.POSTS ?? []) as Post[];

    return {
        posts
    }
}