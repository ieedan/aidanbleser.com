<script lang="ts">
    import type { HTMLAttributes } from 'svelte/elements';
    import * as Sidebar from '$lib/components/home/sidebar';

    let { class: className, children, ...rest }: HTMLAttributes<HTMLDivElement> = $props();
</script>

<Sidebar.Section {...rest}>
    <Sidebar.SectionHeading>Projects</Sidebar.SectionHeading>
    
</Sidebar.Section>