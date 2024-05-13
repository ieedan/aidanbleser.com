<script lang="ts">
	export let data;

	$: post = data.post;
</script>

<svelte:head>
	<title>Posts | {post.name}</title>
	<meta
		name="description"
		content="{post.summary}"
	/>
</svelte:head>

<main class="flex flex-col place-items-center px-4">
	<div class="flex w-full max-w-[65ch] place-items-center justify-between">
		<small class="text-foreground-secondary">
			{post.metaData.date}
		</small>
		<span class="text-xs text-foreground-secondary">{post.metaData.timeToRead} min read</span>
	</div>
	<div class="prose prose-zinc py-4 dark:prose-invert prose-code:whitespace-pre-wrap">
		{@html post.content}
	</div>
</main>
