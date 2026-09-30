<script lang="ts">
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
	import { RiHeartLine } from 'remixicon-svelte';
	import { sponsorHref } from './sponsors';
</script>

<DropdownMenu.LinkItem href={sponsorHref}>
	<RiHeartLine class="size-4 text-pink-600" />
	Sponsor me
</DropdownMenu.LinkItem>
