<script lang="ts">
	import { RiMoreLine } from 'remixicon-svelte';
	import { buttonVariants } from '$lib/components/ui/button/button.svelte';
	import Trigger from './dropdown-menu-trigger.svelte';
</script>

<Trigger class={buttonVariants({ size: 'icon', variant: 'outline' })}>
	<RiMoreLine class="size-4" />
	<span class="sr-only">More options</span>
</Trigger>
