<script lang="ts">
	import { page } from "$app/stores";
	import { postsMap } from "$lib/blog/posts/posts";

	export let data;

	const postComponent = postsMap.get($page.params.slug);
</script>

<svelte:head>
	<title>Blog | {data.title}</title>
	<meta name="description" content={data.hook} />
</svelte:head>

<div class="flex max-w-3xl flex-col">
	<div class="flex place-items-center gap-2 py-4">
		<a href="/blog" class="text-sm font-medium hover:underline">Blogs</a>
		<span class="font-serif text-xs text-gray-600 dark:text-gray-400">/</span>
		<a
			href="/blog/{data.title}"
			class="max-w-[175px] truncate text-sm font-medium hover:underline sm:max-w-none"
			>{data.title}</a>
	</div>
	<div class="flex place-items-center justify-between gap-3">
		<small class="text-gray-600 dark:text-gray-400">{data.date.toLocaleDateString()}</small>
		<span class="text-xs text-gray-600 dark:text-gray-400">{data.readMinutes} min read</span>
	</div>
	<h1 id="#heading" class="pb-4 pt-2 text-2xl font-bold sm:text-4xl">{data.title}</h1>
	<p class="text-gray-700 dark:text-gray-300">{data.hook}</p>
	{#if postComponent}
		<svelte:component this={postComponent.component} />
	{/if}
	<section class="h-8"></section>
</div>
