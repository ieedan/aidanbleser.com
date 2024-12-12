<script lang="ts">
	import '../app.css';
	import '@fontsource/share-tech-mono';
	import '@fontsource-variable/inter';
	import { ModeWatcher } from 'mode-watcher';
	import Header from '$lib/components/site/header.svelte';
	import Footer from '$lib/components/site/footer.svelte';

	let { children } = $props();
</script>

<ModeWatcher />
<Header />
{@render children()}
<Footer />
