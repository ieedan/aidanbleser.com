<script lang="ts">
	import * as Breadcrumb from '$lib/components/ui/breadcrumb';

	let { data } = $props();
</script>

<svelte:head>
	<title>{data.post?.meta.title} - aidanbleser.com</title>
	<meta name="description" content={data.post?.meta.description} />
</svelte:head>

<main class="flex min-h-svh place-items-start justify-center">
	{#if data.post}
		<div class="flex flex-col gap-4">
			<Breadcrumb.Root>
				<Breadcrumb.List>
					<Breadcrumb.Item>
						<Breadcrumb.Link href="/blog/posts">Posts</Breadcrumb.Link>
					</Breadcrumb.Item>
					<Breadcrumb.Separator />
					<Breadcrumb.Item>
						<Breadcrumb.Page>{data.post.meta.title}</Breadcrumb.Page>
					</Breadcrumb.Item>
				</Breadcrumb.List>
			</Breadcrumb.Root>
			<div class="prose prose-zinc dark:prose-invert font-serif">
				<span class="text-sm">
					{data.post.meta.date}
				</span>
				<h1>
					{data.post.meta.title}
				</h1> 
				{@html data.post.content}
			</div>
		</div>
	{/if}
</main>
