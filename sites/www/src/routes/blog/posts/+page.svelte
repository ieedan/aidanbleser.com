<script lang="ts">
	import { posts } from '$lib/blog/posts/posts';
</script>

<svelte:head>
	<title>Blog - aidanbleser.com</title>
	<meta name="description" content="Blog posts by Aidan Bleser" />
</svelte:head>

<main class="flex min-h-svh place-items-start justify-center px-6 pb-10 pt-20 font-serif">
	<ul class="flex max-w-xl flex-col gap-10">
		{#each posts as post}
			<a href="/blog/posts/{post.slug}">
				<div class="group">
					<span class="text-muted-foreground">
						{post.meta.date}
					</span>
					<h3 class="text-2xl group-hover:underline md:text-3xl">
						{post.meta.title}
					</h3>
					<p class="text-base md:text-lg">
						{post.meta.description}
					</p>
				</div>
			</a>
		{/each}
	</ul>
</main>
