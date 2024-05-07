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
<MetaTags
	title="blog.aidanbleser.com | Posts"
	description="Aidan Bleser's blog website. Where he talks about tech and his terrible opinions."
/>

<ModeWatcher />

<Header />
<slot />
