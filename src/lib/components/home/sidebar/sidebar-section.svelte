<script lang="ts">
    import { cn } from '$lib/utils';
	import type { HTMLAttributes } from 'svelte/elements';

    let { class: className, children, ...rest }: HTMLAttributes<HTMLDivElement> = $props();
</script>

<div class={cn("flex flex-col gap-2 p-4 not-last:border-b border-border", className)} {...rest}>
	{@render children?.()}
</div>
