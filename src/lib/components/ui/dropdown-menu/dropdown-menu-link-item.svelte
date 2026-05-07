<script lang="ts">
	import type { Snippet } from 'svelte';
	import DropdownMenuItem from './dropdown-menu-item.svelte';
	import { goto } from '$app/navigation';
	import { RiExternalLinkLine } from 'remixicon-svelte';

	type Props = {
		href: string;
		children: Snippet;
		/** Full document load instead of SPA navigation (needed for `+server`-only routes like raw `.md`). */
		reload?: boolean;
	};

	let { href, children, reload = false }: Props = $props();
</script>

<DropdownMenuItem
	class="flex items-center justify-between gap-4"
	onSelect={() => {
		if (href.startsWith('http')) {
			window.open(href, '_blank');
		} else if (reload) {
			window.location.assign(href);
		} else {
			goto(href);
		}
	}}
>
	<div class="flex items-center gap-2">
		{@render children()}
	</div>
	<RiExternalLinkLine class="size-4 text-muted-foreground" />
</DropdownMenuItem>
