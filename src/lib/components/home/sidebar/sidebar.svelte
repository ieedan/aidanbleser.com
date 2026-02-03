<script lang="ts">
	import type { HTMLAttributes } from 'svelte/elements';
	import { cn } from '$lib/utils';

	let { class: className, children, ...rest }: HTMLAttributes<HTMLDivElement> = $props();
</script>

<div class={cn('flex min-h-0 max-w-64 flex-1 flex-col self-stretch border-l', className)} {...rest}>
	{@render children?.()}
</div>
