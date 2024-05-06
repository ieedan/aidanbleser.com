<script lang="ts">
	export let src: string;
	export let name: string;
	export let href: string | undefined = undefined;
</script>

{#if href}
	<a {href} class="bg-component-background inline-flex place-items-center gap-1 rounded-md px-2 py-1" target="_blank">
		<img {src} alt="{name} Logo" width="16px" />
		{name}
	</a>
{:else}
	<span class="bg-component-background inline-flex place-items-center gap-1 rounded-md px-2 py-1">
		<img {src} alt="{name} Logo" width="16px" />
		{name}
	</span>
{/if}
