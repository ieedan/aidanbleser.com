<script lang="ts">
	import Sponsors from '$lib/features/sponsors/sponsors.svelte';
	import * as Sidebar from '$lib/components/home/sidebar';
	import Projects from '$lib/features/projects/projects.svelte';
	import ContactMe from '$lib/features/contact-me/contact-me.svelte';
	import Footer from '$lib/features/footer/footer.svelte';
	import summary from '$prerendered/summary';
	import { deepMerge, MetaTags } from 'svelte-meta-tags';
	import MoreMenu from '$lib/features/more-menu/more-menu.svelte';
	import OtherBlogPosts from '$lib/features/blog/other-blog-posts.svelte';

	let { data } = $props();

	const metaTags = $derived(
		deepMerge(data.baseMetaTags, {
			title: 'Aidan Bleser - Frontend Engineer',
			description: "Aidan Bleser's (ieedan) personal website and tech blog."
		})
	);
</script>

<MetaTags {...metaTags} />

<div class="relative flex w-full max-w-4xl flex-col border border-border md:flex-row">
	<div class="flex flex-1 flex-col border-b md:border-b-0">
		<div class="flex flex-1 flex-col">
			<header class="flex w-full items-center justify-between gap-4 border-b p-4">
				<div class="flex items-center gap-4">
					<img
						src="https://avatars.githubusercontent.com/ieedan"
						alt="Aidan Bleser"
						class="size-12 shrink-0 rounded-full"
					/>
					<div class="flex flex-col">
						<h1 class="text-2xl">Aidan Bleser</h1>
						<span class="text-sm text-muted-foreground">Frontend Engineer</span>
					</div>
				</div>
				<div>
					<MoreMenu />
				</div>
			</header>
			<div class="typography p-4">
				{@html summary.content}
			</div>
		</div>
		<Footer class="hidden md:block" />
	</div>

	<Sidebar.Root>
		<OtherBlogPosts title="Recent Blog Posts" />
		<Projects />
		<Sponsors />
		<ContactMe />
	</Sidebar.Root>

	<Footer class="block md:hidden" />
</div>
