<script lang="ts">
	import type { Snippet } from 'svelte';
	import DropdownMenuItem from './dropdown-menu-item.svelte';
	import { UseClipboard } from '$lib/hooks/use-clipboard.svelte';
	import { RiCheckLine } from 'remixicon-svelte';

	type Props = {
		text: string;
		icon: Snippet;
		children: Snippet;
	};

	let { text, icon, children }: Props = $props();

	const clipboard = new UseClipboard();
</script>

<DropdownMenuItem
	onSelect={(e) => {
		e.preventDefault();
		clipboard.copy(text);
	}}
>
	{#if clipboard.copied}
		<RiCheckLine class="size-4" />
	{:else}
		{@render icon()}
	{/if}
	{@render children()}
</DropdownMenuItem>
