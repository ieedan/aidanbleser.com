<script lang="ts">
	import '../app.css';
	import '@fontsource/share-tech-mono';
	import '@fontsource-variable/inter';
	import { UmamiAnalytics } from '@lukulent/svelte-umami';
	import { ModeWatcher } from 'mode-watcher';
	import Header from '$lib/components/site/header.svelte';
	import Footer from '$lib/components/site/footer.svelte';
	import { dev } from '$app/environment';

	let { children } = $props();
</script>

<!-- only inject analytics in production -->
{#if !dev}
	<UmamiAnalytics
		srcURL="https://cloud.umami.is/script.js"
		websiteID="59863cdc-3cb8-46ed-a36b-2ea8dc8f0398"
	/>
{/if}
<ModeWatcher />
<Header />
{@render children()}
<Footer />
