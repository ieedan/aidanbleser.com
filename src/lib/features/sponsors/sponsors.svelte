<script lang="ts">
    import { getSponsors } from './sponsors.remote';
    import { cn } from '$lib/utils';
	import type { HTMLAttributes } from 'svelte/elements';
    import * as Sidebar from '$lib/components/home/sidebar';

    let { ...rest }: HTMLAttributes<HTMLDivElement> = $props();

    const sponsorsQuery = getSponsors();
</script>

<Sidebar.Section {...rest}>
	<Sidebar.SectionHeading>Sponsors</Sidebar.SectionHeading>
	<div class="grid grid-cols-6 gap-2">
		{#await sponsorsQuery}
			{#each { length: 4 } as _, i (i)}
				<div class="size-8 shrink-0 animate-pulse rounded-full bg-secondary"></div>
			{/each}
		{:then sponsors}
			{#each sponsors.sponsors as sponsor (sponsor)}
				<a href={`https://github.com/${sponsor}`} target="_blank">
					<img
						class="size-8 shrink-0 rounded-full"
						src="https://avatars.githubusercontent.com/{sponsor}"
						alt={sponsor}
					/>
				</a>
			{/each}
		{/await}
	</div>
</Sidebar.Section>
