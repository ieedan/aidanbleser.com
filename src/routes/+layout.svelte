<script lang="ts">
	import { dev } from '$app/environment';
	import './layout.css';
	import { UmamiAnalytics } from '@lukulent/svelte-umami';

	let { children } = $props();
</script>

{#if !dev}
	<UmamiAnalytics
		srcURL="https://cloud.umami.is/script.js"
		websiteID="c55d9da5-af8d-413c-8a6f-3db75f5d9bd0"
	/>
{/if}

{@render children()}
