<script lang="ts">
	import { LightSwitch } from '$lib/components/ui/light-switch';
	import { Button } from '$lib/components/ui/button';
	import * as Icons from '$lib/components/icons';
	import { active } from '$lib/actions/active.svelte';
	import { cn } from '$lib/utils/utils';
	import { fade, scale } from 'svelte/transition';

	type Link = {
		title: string;
		href: string;
		activeForSubdirectories?: boolean;
	};

	const links: Link[] = [
		{
			title: 'Home',
			href: '/',
			activeForSubdirectories: false
		},
		{
			title: 'Blog',
			href: '/blog'
		}
	];
</script>

<header
	in:scale={{ duration: 300, start: 0.75 }}
	out:fade={{ duration: 150 }}
	class={cn('bg-background relative flex place-items-center justify-end rounded-md px-4 py-2')}
>
	<div class="flex place-items-center gap-4">
		<nav class="flex place-items-center gap-4 font-mono">
			{#each links as link, i (i)}
				<a
					class="text-muted-foreground hover:text-primary data-[active=true]:text-primary font-medium transition-colors"
					href={link.href}
					use:active={{ activeForSubdirectories: link.activeForSubdirectories }}
				>
					{link.title}
				</a>
			{/each}
		</nav>
		<div class="flex place-items-center gap-1">
			<Button target="_blank" href="https://x.com/ieeeedan" variant="ghost" size="icon">
				<Icons.Twitter />
			</Button>
			<Button target="_blank" href="https://github.com/ieedan" variant="ghost" size="icon">
				<Icons.GitHub />
			</Button>
			<LightSwitch variant="ghost" />
		</div>
	</div>
</header>
