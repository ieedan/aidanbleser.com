<script lang="ts">
	import '../app.css';
	import '@fontsource/geist-sans';
	import '@fontsource/geist-mono';
	import '$lib/theme.css';
	import { ModeWatcher } from 'mode-watcher';
	import Header from '$lib/components/Header.svelte';
</script>

<ModeWatcher />

<Header />
<slot />
