<script lang="ts">
	export let src: string;
	export let name: string;
	export let href: string | undefined = undefined;
</script>

{#if href}
	<a
		{href}
		class="inline-flex select-none place-items-center gap-1 rounded-md 
		bg-component-background px-2 py-1 transition-all hover:bg-component-background-active"
		target="_blank"
	>
		<img {src} alt="{name} Logo" width="16px" />
		{name}
	</a>
{:else}
	<span
		class="inline-flex select-none place-items-center gap-1 rounded-md bg-component-background px-2 py-1"
	>
		<img {src} alt="{name} Logo" width="16px" />
		{name}
	</span>
{/if}
