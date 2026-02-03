<script lang="ts">
    import type { HTMLAttributes } from 'svelte/elements';
    import { cn } from '$lib/utils';

    let { class: className, children, ...rest }: HTMLAttributes<HTMLSpanElement> = $props();
</script>

<span class={cn("text-xs tracking-wide text-muted-foreground uppercase", className)} {...rest}>
    {@render children?.()}
</span>