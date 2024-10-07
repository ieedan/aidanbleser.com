<script lang="ts">
	export let src: string;
	export let name: string;
	export let href: string | undefined = undefined;
	export let logoWidth = '16px';
</script>

{#if href}
	<a
		{href}
		class="inline-flex h-9 select-none place-items-center gap-2 rounded-md
		bg-component-background px-2 py-1 transition-all hover:bg-component-background-active"
		target="_blank"
	>
		<img {src} alt="{name} Logo" width={logoWidth} />
		{name}
	</a>
{:else}
	<span
		class="inline-flex h-9 select-none place-items-center gap-2 rounded-md 
		bg-component-background px-2 py-1"
	>
		<img {src} alt="{name} Logo" width={logoWidth} />
		{name}
	</span>
{/if}
