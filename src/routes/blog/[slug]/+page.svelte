<script lang="ts">
	import { posts } from "$lib/blog/posts/posts";
	import LinkHeading from "$lib/components/LinkHeading.svelte";

	export let data;

	const post = posts[data.index];
</script>

<svelte:head>
	<title>Blog | {post.title}</title>
	<meta name="description" content={post.hook} />
</svelte:head>

<div class="flex max-w-3xl flex-col">
	<div class="flex place-items-center gap-2 py-4">
		<a href="/blog" class="text-sm font-medium hover:underline">Blogs</a>
		<span class="font-serif text-xs text-gray-600 dark:text-gray-400">/</span>
		<a
			href="/blog/{post.title}"
			class="max-w-[175px] truncate text-sm font-medium hover:underline sm:max-w-none"
			>{post.title}</a
		>
	</div>
	<div class="flex place-items-center justify-between gap-3">
		<small class="text-gray-600 dark:text-gray-400">{post.date.toLocaleDateString()}</small>
		<span class="text-xs text-gray-600 dark:text-gray-400">{post.readMinutes} min read</span>
	</div>
	<h1 id="#heading" class="pb-4 pt-2 font-bold text-2xl sm:text-4xl">{post.title}</h1>
	<p class="text-gray-700 dark:text-gray-300">{post.hook}</p>
	<svelte:component this={post.component} />
	<section class="h-8"></section>
</div>
