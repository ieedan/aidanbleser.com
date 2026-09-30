<script lang="ts">
	import type { Snippet } from 'svelte';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
	import SocialMenuItems from '$lib/features/socials/social-menu-items.svelte';
	import ContactMeMenuItem from '$lib/features/contact-me/contact-me-menu-item.svelte';
	import SponsorMenuItem from '$lib/features/sponsors/sponsor-menu-item.svelte';

	let { children }: { children?: Snippet } = $props();
</script>

<DropdownMenu.Root>
	<DropdownMenu.MoreTrigger />
	<DropdownMenu.Content align="end">
		{#if children}
			{@render children()}
			<DropdownMenu.Separator />
		{/if}
		<SocialMenuItems />
		<DropdownMenu.Separator />
		<ContactMeMenuItem />
		<DropdownMenu.Separator />
		<SponsorMenuItem />
	</DropdownMenu.Content>
</DropdownMenu.Root>
