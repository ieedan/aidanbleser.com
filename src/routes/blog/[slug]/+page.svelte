<script lang="ts">
	import { posts } from "$lib/blog/posts/posts";

    export let data;

    const post = posts[data.index];
</script>

<svelte:head>
	<title>Blog | {post.title}</title>
	<meta
		name="description"
		content={post.hook}
	/>
</svelte:head>

<div class="max-w-3xl flex flex-col">
    <div class="flex place-items-center gap-2 py-4">
        <a href="/blog" class="text-sm hover:underline font-medium">Blogs</a>
        <span class="font-serif text-xs text-gray-600 dark:text-gray-400">/</span>  
        <a href="/blog/{post.title}" class="text-sm hover:underline font-medium max-w-[175px] truncate sm:max-w-none">{post.title}</a>
    </div>
    <div class="flex place-items-center justify-between gap-3">
        <small class="text-gray-600 dark:text-gray-400 ">{post.date.toLocaleDateString()}</small>
        <span class="text-xs text-gray-600 dark:text-gray-400">{post.readMinutes} min read</span>
    </div>
    <h1 class="text-2xl font-bold pb-4 pt-2">{post.title}</h1>
    <p class="text-gray-700 dark:text-gray-300">{post.hook}</p>
    <svelte:component this={post.component}/>
    <section class="h-8"></section>
</div>
