<script lang="ts">
	let { children } = $props();
</script>

<main class="flex min-h-dvh flex-col items-center justify-center p-4">
	{@render children()}
</main>
