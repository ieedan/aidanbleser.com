<script lang="ts">
	import * as Sidebar from '$lib/components/home/sidebar';
	import type { HTMLAttributes } from 'svelte/elements';
	import { RiMailLine } from 'remixicon-svelte';
	import { Button } from '$lib/components/ui/button';

	let { children, ...rest }: HTMLAttributes<HTMLDivElement> = $props();
</script>

<Sidebar.Section {...rest}>
	<Sidebar.SectionHeading>Let's connect</Sidebar.SectionHeading>
	<div class="flex flex-col gap-2">
		<p class="text-sm">Want to work with me? Great, reach out below!</p>
		<Button href="mailto:aidanbleser35@gmail.com?subject=Let's work together!">
			<RiMailLine class="size-4" />
			Contact Me
		</Button>
	</div>
</Sidebar.Section>
