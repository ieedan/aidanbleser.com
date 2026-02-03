<script lang="ts">
	import Sponsors from '$lib/features/sponsors/sponsors.svelte';
    import * as Sidebar from '$lib/components/home/sidebar';
	import Projects from '$lib/features/projects/projects.svelte';
</script>

<div class="relative flex w-full max-w-5xl border border-border">
	<div class="flex-1 p-4">
		<h1 class="text-2xl">Aidan Bleser</h1>
		<p class="text-sm text-muted-foreground">Frontend Engineer</p>
	</div>

	<Sidebar.Root>
		<Projects />
		<Sponsors />
	</Sidebar.Root>
</div>
