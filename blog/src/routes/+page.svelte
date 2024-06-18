<script lang="ts">
	import { faChevronRight } from '@fortawesome/pro-regular-svg-icons';
	import { FontAwesomeIcon } from '@fortawesome/svelte-fontawesome';

	export let data;

	$: posts = data.posts.sort((a, b) => Date.parse(b.metaData.date) - Date.parse(a.metaData.date));
</script>

<svelte:head>
	<title>blog.aidanbleser.com | Posts</title>
	<meta
		name="description"
		content="Aidan Bleser's blog website. Where he talks about tech and his terrible opinions."
	/>
</svelte:head>

<main class="flex flex-col place-items-center px-4">
	<div class="py-6 flex place-items-center justify-center flex-col gap-2">
		<img
			src="https://github.com/ieedan/static/blob/main/assets/images/aidan-small.jpg?raw=true"
			alt="Aidan Bleser"
			width="75"
			class="rounded-full"
		/>
		<p class="prose prose-zinc dark:prose-invert">I write dumb opinions about tech and post them here.</p>
	</div>
	<ul class="relative flex flex-col md:px-4">
		<div
			class="absolute left-0 z-[1] hidden h-full w-[2px] bg-component-background md:block"
		></div>
		{#each posts as post}
			<li
				class="relative max-w-[576px] rounded-lg px-6 py-4 transition-all hover:bg-component-background-hover"
			>
				<div
					class="absolute left-[-25px] z-[2] mt-1 hidden size-5 flex-shrink-0 flex-grow-0 rounded-full border
					border-border bg-background ring-4 ring-background md:block"
				>
					<span
						class="absolute -left-2 -top-[1px] hidden -translate-x-full text-nowrap text-sm text-foreground-muted lg:block"
					>
						{post.metaData.date}
					</span>
				</div>
				<a href="/posts/{encodeURIComponent(post.name)}">
					<small class="text-foreground-muted lg:hidden">
						{post.metaData.date}
					</small>
					<div class="relative w-fit">
						<h3 class="text-lg font-semibold">
							{post.name}
						</h3>
					</div>
					<div class="prose prose-zinc dark:prose-invert">
						{@html post.summary}
					</div>
					<span class="flex place-items-center gap-1 text-sm text-blue-700">
						Read More <FontAwesomeIcon icon={faChevronRight} size="xs" />
					</span>
				</a>
			</li>
		{/each}
	</ul>
</main>
