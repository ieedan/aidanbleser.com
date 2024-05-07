<script lang="ts">
	import '../app.css';
	import '@fontsource/geist-sans';
	import '@fontsource/geist-mono';
	import '$lib/theme.css';
	import { ModeWatcher } from 'mode-watcher';
	import Header from '$lib/components/Header.svelte';
</script>

<svelte:head>
	<title>blog.aidanbleser.com | Posts</title>
	<meta
		name="description"
		content="Aidan Bleser's blog website. Where he talks about tech and his terrible opinions."
	/>
</svelte:head>

<ModeWatcher />

<Header />
<slot />
