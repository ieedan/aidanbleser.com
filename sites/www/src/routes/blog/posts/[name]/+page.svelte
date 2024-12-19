<script lang="ts">
	import { posts } from '$lib/blog/posts/posts.js';
	import * as Breadcrumb from '$lib/components/ui/breadcrumb';

	let { data } = $props();

	// we do this client side for better HMR (it is still ssr)
	const post = posts.find((p) => decodeURIComponent(p.slug) === data.name);
</script>

<svelte:head>
	<title>{post?.meta.title} - aidanbleser.com</title>
	<meta name="description" content={post?.meta.description} />
</svelte:head>

<main class="flex min-h-svh place-items-start justify-center pb-10">
	{#if post}
		<div class="flex flex-col gap-4">
			<Breadcrumb.Root>
				<Breadcrumb.List>
					<Breadcrumb.Item>
						<Breadcrumb.Link href="/blog/posts">Posts</Breadcrumb.Link>
					</Breadcrumb.Item>
					<Breadcrumb.Separator />
					<Breadcrumb.Item>
						<Breadcrumb.Page>{post.meta.title}</Breadcrumb.Page>
					</Breadcrumb.Item>
				</Breadcrumb.List>
			</Breadcrumb.Root>
			<div class="prose prose-zinc font-mono dark:prose-invert">
				<span class="text-sm">
					{post.meta.date}
				</span>
				<h1>
					{post.meta.title}
				</h1>
				{@html post.content}
			</div>
		</div>
	{/if}
</main>
