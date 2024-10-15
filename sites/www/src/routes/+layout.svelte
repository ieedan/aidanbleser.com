<script lang="ts">
	import { ModeWatcher } from 'mode-watcher';
	import '@fontsource/geist-mono';
	import '@fontsource/geist-sans';
	import '../app.css';
	import LightSwitch from '$lib/components/ui/light-switch/light-switch.svelte';
</script>

<ModeWatcher />
<slot />
