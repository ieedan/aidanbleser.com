<script lang="ts">
	import { cn } from '$lib/utils';
	import type { HTMLAttributes } from 'svelte/elements';

	let { class: className, ...rest }: HTMLAttributes<HTMLDivElement> = $props();
</script>

<div class={cn('flex h-16 items-center gap-2 border-b p-3.5', className)} {...rest}>
	<img
		src="https://avatars.githubusercontent.com/ieedan"
		alt="Aidan Bleser"
		class="size-8 rounded-full"
	/>
	<div class="flex flex-col">
		<span class="text-sm font-medium">Aidan Bleser</span>
		<p class="text-xs text-muted-foreground">Frontend Engineer</p>
	</div>
</div>
