<script lang="ts">
	import type { HTMLAttributes } from 'svelte/elements';
	import * as Sidebar from '$lib/components/home/sidebar';
	import { type Project, projects } from './projects';
	import type { WithoutChildren } from '$lib/utils';

	let { ...rest }: WithoutChildren<HTMLAttributes<HTMLDivElement>> = $props();
</script>

<Sidebar.Section {...rest}>
	<Sidebar.SectionHeading>Stuff I work on</Sidebar.SectionHeading>
	<div class="flex max-h-64 flex-col gap-2 overflow-y-auto">
		{#each projects as project (project.title)}
			{@render Project(project)}
		{/each}
	</div>
</Sidebar.Section>

{#snippet Project({ title, link, description, logo }: Project)}
	<div class="relative border border-border p-2 transition-colors hover:bg-secondary">
		<a href={link} target="_blank">
			<span class="flex items-center gap-2 text-sm font-medium">
				<img src={logo} alt={title} class="size-4" />
				{title}
			</span>
			<span class="absolute inset-0"></span>
		</a>
		<p class="text-xs text-muted-foreground">{description}</p>
	</div>
{/snippet}
