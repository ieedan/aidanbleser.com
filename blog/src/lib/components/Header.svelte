<script lang="ts">
	import { FontAwesomeIcon } from '@fortawesome/svelte-fontawesome';
	import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons';
	import { faMoon, faSun } from '@fortawesome/pro-regular-svg-icons';
	import { mode, setMode } from 'mode-watcher';
	import BreadCrumbs from './BreadCrumbs.svelte';
	import { page } from '$app/stores';
	import { capitalizeFirstLetter } from '$lib/ts/path-transform';

	const toggleMode = () => {
		if ($mode == 'dark') {
			setMode('light');
		} else {
			setMode('dark');
		}
	};
</script>

<header class="flex place-items-center justify-between px-6 py-6">
	<div class="hidden place-items-center justify-center md:flex">
		<BreadCrumbs transform={capitalizeFirstLetter}/>
	</div>
	<div class="md:hidden">
		{#if $page.url.pathname != '/'}
			<a href="/" class="transition-all hover:text-foreground-primary text-foreground-muted"> 
				Posts 
			</a>
		{/if}
	</div>
	<nav class="flex place-items-center gap-5 text-foreground-muted">
		<a href="https://aidanbleser.com" class="transition-all hover:text-foreground-primary">
			/
		</a>
		<a
			href="https://github.com/ieedan"
			target="_blank"
			class="transition-all hover:text-foreground-primary"
		>
			<FontAwesomeIcon icon={faGithub} size="lg" />
		</a>
		<a
			href="https://www.linkedin.com/in/aidan-bleser-731b01286"
			target="_blank"
			class="transition-all hover:text-foreground-primary"
		>
			<FontAwesomeIcon icon={faLinkedin} size="lg" />
		</a>
		<button
			on:click={toggleMode}
			class="flex place-items-center justify-center transition-all hover:text-foreground-primary"
		>
			<div data-visible={$mode == 'dark'} class="w-5 data-[visible=false]:hidden">
				<FontAwesomeIcon icon={faMoon} size="lg" />
			</div>
			<div data-visible={$mode == 'light'} class="w-5 data-[visible=false]:hidden">
				<FontAwesomeIcon icon={faSun} size="lg" />
			</div>
		</button>
	</nav>
</header>
