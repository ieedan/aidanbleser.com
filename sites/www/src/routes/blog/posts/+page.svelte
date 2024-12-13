<script lang="ts">
	import { posts } from '$lib/blog/posts/posts';
</script>

<main class="min-h-svh font-serif flex place-items-start justify-center px-6 pt-20">
	<ul class="flex flex-col gap-10 max-w-xl">
		{#each posts as post, i}
			<a href="/blog/posts/{post.slug}">
				<div class="group">
					<span class="text-muted-foreground">
						{post.meta.date}
					</span>
					<h3 class="text-2xl md:text-3xl group-hover:underline">
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
