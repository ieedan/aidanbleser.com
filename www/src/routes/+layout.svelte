<script lang="ts">
	import '../app.css';
    import '@fontsource/geist-sans';
    import '@fontsource/geist-mono';
	import '$lib/theme.css';
	import { ModeWatcher } from 'mode-watcher';
	import { MetaTags } from 'svelte-meta-tags';
	import Header from '$lib/components/Header.svelte';
</script>

<!-- https://github.com/oekazuma/svelte-meta-tags -->
<MetaTags title="aidanbleser.com" description="Aidan Bleser's portfolio website." />

<ModeWatcher />

<Header/>
<slot />
