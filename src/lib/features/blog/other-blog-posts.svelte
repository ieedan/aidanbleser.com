<script lang="ts">
	import type { HTMLAttributes } from 'svelte/elements';
	import * as Sidebar from '$lib/components/home/sidebar';
	import { getMostRecentBlogPosts } from './blog';
	import type { WithoutChildren } from '$lib/utils';

	let {
		postKey,
		title = 'Other Blog Posts',
		...rest
	}: WithoutChildren<HTMLAttributes<HTMLDivElement>> & {
		postKey?: string;
		title?: string;
	} = $props();

	const posts = $derived(getMostRecentBlogPosts({ count: 3, excludeKey: postKey }));
</script>

<Sidebar.Section {...rest}>
	<Sidebar.SectionHeading>{title}</Sidebar.SectionHeading>
	<div class="flex flex-col gap-2 overflow-y-auto">
		{#each posts as post (post.key)}
			{@render Post(post)}
		{/each}
	</div>
	<a href="/blog/posts" class="text-xs text-muted-foreground hover:text-foreground hover:underline">
		View all blog posts
	</a>
</Sidebar.Section>

{#snippet Post({
	key,
	title,
	description,
	date
}: {
	title: string;
	description: string;
	date: string;
	key: string;
})}
	<div class="relative border border-border p-2 transition-colors hover:bg-secondary">
		<a href="/blog/posts/{key}">
			<h3 class="flex items-center gap-2 text-sm font-medium">
				{title}
			</h3>
			<span class="absolute inset-0"></span>
		</a>
		<p class="line-clamp-2 text-xs text-muted-foreground">{description}</p>
		<span class="text-xs text-muted-foreground">
			{new Date(date).toLocaleDateString('en-US', {
				year: 'numeric',
				month: 'short',
				day: 'numeric'
			})}
		</span>
	</div>
{/snippet}
