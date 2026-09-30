<script lang="ts">
	import { browser } from '$app/environment';
	import { getSponsors } from './sponsors.remote';
	import type { HTMLAttributes } from 'svelte/elements';
	import * as Sidebar from '$lib/components/home/sidebar';
	import { RiHeartLine } from 'remixicon-svelte';
	import { sponsorHref } from './sponsors';

	let { ...rest }: HTMLAttributes<HTMLDivElement> = $props();

	// only fetch in the browser so that pages including this can be prerendered
	const sponsorsQuery = browser ? getSponsors() : new Promise<never>(() => {});
</script>

<Sidebar.Section {...rest}>
	<Sidebar.SectionHeading>Sponsors</Sidebar.SectionHeading>
	<div class="flex flex-wrap gap-2 md:grid md:grid-cols-6">
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
	<a
		href={sponsorHref}
		class="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground hover:underline"
	>
		<RiHeartLine class="size-3 text-pink-600" />
		Become a sponsor
	</a>
</Sidebar.Section>
