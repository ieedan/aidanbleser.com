<script lang="ts">
	import type { HTMLAttributes } from 'svelte/elements';
	import { onMount } from 'svelte';
	import * as Sidebar from '$lib/components/home/sidebar';
	import { featuredProjects, projectHref, selectFeaturedProjects, type Project } from './projects';
	import type { WithoutChildren } from '$lib/utils';

	let { ...rest }: WithoutChildren<HTMLAttributes<HTMLDivElement>> = $props();

	// Prerendered HTML stays stable so hydration matches. The browser then picks a random set.
	let featured = $state(featuredProjects());

	onMount(() => {
		featured = selectFeaturedProjects();
	});
</script>

<Sidebar.Section {...rest}>
	<Sidebar.SectionHeading>Stuff I work on</Sidebar.SectionHeading>
	<div class="flex max-h-64 flex-col gap-2 overflow-y-auto">
		{#each featured as project (project.title)}
			{@render Project(project)}
		{/each}
	</div>
	<a href="/projects" class="text-xs text-muted-foreground hover:text-foreground hover:underline">
		View all projects
	</a>
</Sidebar.Section>

{#snippet Project(project: Project)}
	<div class="relative border border-border p-2 transition-colors hover:bg-secondary">
		<a href={projectHref(project)} target="_blank">
			<span class="flex items-center gap-2 text-sm font-medium">
				<span class="relative size-4 shrink-0">
					<img
						src={project.logo}
						alt={project.title}
						class="absolute inset-0 size-full object-contain"
					/>
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
		<p class="text-xs text-muted-foreground">{project.description}</p>
	</div>
{/snippet}
