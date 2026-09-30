<script lang="ts">
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
	import { RiMailLine } from 'remixicon-svelte';
	import { contactMeHref } from './contact-me';
</script>

<DropdownMenu.Item
	onSelect={() => {
		window.location.href = contactMeHref;
	}}
>
	<RiMailLine class="size-4" />
	Contact Me
</DropdownMenu.Item>
