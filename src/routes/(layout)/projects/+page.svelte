<script lang="ts">
	import Sponsors from '$lib/features/sponsors/sponsors.svelte';
	import * as Sidebar from '$lib/components/home/sidebar';
	import ContactMe from '$lib/features/contact-me/contact-me.svelte';
	import Footer from '$lib/features/footer/footer.svelte';
	import { RiArrowLeftLine } from 'remixicon-svelte';
	import { deepMerge, MetaTags } from 'svelte-meta-tags';
	import MoreMenu from '$lib/features/more-menu/more-menu.svelte';
	import { Button } from '$lib/components/ui/button';
	import Author from '$lib/features/blog/author.svelte';
	import OtherBlogPosts from '$lib/features/blog/other-blog-posts.svelte';
	import { allProjects, projectHref, type Project } from '$lib/features/projects/projects';

	let { data } = $props();

	const projects = allProjects();

	const metaTags = $derived(
		deepMerge(data.baseMetaTags, {
			title: "Aidan Bleser's Projects",
			description: 'Projects built by Aidan Bleser (ieedan).'
		})
	);
</script>

<MetaTags {...metaTags} />

<div class="relative flex w-full max-w-4xl flex-col border border-border md:flex-row">
	<div class="flex flex-1 flex-col border-b md:max-w-[calc(100%-16rem)] md:border-b-0">
		<div class="flex flex-1 flex-col">
			<header class="flex h-16 w-full items-center justify-between gap-4 border-b p-4">
				<Button href="/" variant="outline" size="icon">
					<RiArrowLeftLine class="size-4" />
					<span class="sr-only">Back</span>
				</Button>
				<div>
					<MoreMenu />
				</div>
			</header>
			<div class="flex flex-col gap-2 p-4">
				{#each projects as project (project.title)}
					{@render ProjectCard(project)}
				{/each}
			</div>
		</div>
		<Footer class="hidden md:block" />
	</div>

	<Sidebar.Root>
		<Author />
		<OtherBlogPosts title="Recent Blog Posts" />
		<Sponsors />
		<ContactMe />
	</Sidebar.Root>

	<Footer class="block md:hidden" />
</div>

{#snippet ProjectCard(project: Project)}
	<div class="relative border border-border p-2 transition-colors hover:bg-secondary">
		<a href={projectHref(project)} target="_blank">
			<span class="flex items-center gap-2 text-lg font-medium">
				<span class="relative size-5 shrink-0">
					<img src={project.logo} alt="" class="absolute inset-0 size-full object-contain" />
				</span>
				{project.title}
				{#if project.isNew}
					<span
						class="shrink-0 border border-blue-400/50 px-1 py-px text-[10px] leading-tight font-medium text-blue-400"
					>
						New
					</span>
				{/if}
			</span>
			<span class="absolute inset-0"></span>
		</a>
		<p class="line-clamp-2 text-sm text-muted-foreground">{project.description}</p>
	</div>
{/snippet}
