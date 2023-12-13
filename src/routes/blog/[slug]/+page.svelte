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

<section class="h-8"></section>
<small class="text-gray-700 dark:text-gray-400 w-full">{post.date.toLocaleDateString()}</small>
<h1 class="text-2xl font-bold py-4">{post.title}</h1>
<p class="text-gray-700 dark:text-gray-300">{post.hook}</p>
<svelte:component this={post.component}/>
