<script lang="ts">
	import { FontAwesomeIcon } from '@fortawesome/svelte-fontawesome';
	import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons';
	import { faMoon, faSun } from '@fortawesome/pro-regular-svg-icons';
	import { mode, setMode } from 'mode-watcher';

	const toggleMode = () => {
		if ($mode == 'dark') {
			setMode('light');
		} else {
			setMode('dark');
		}
	};
</script>

<header class="flex place-items-center justify-between px-6 py-6">
	<div></div>
	<nav class="flex place-items-center gap-5 text-foreground-muted">
		<a href="https://blog.aidanbleser.com" class="transition-all hover:text-foreground-primary">
			Blog
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
			<div data-visible={$mode == 'dark'} class="data-[visible=false]:hidden w-5">
				<FontAwesomeIcon icon={faMoon} size="lg" />
			</div>
			<div data-visible={$mode == 'light'} class="data-[visible=false]:hidden w-5">
				<FontAwesomeIcon icon={faSun} size="lg" />
			</div>
		</button>
	</nav>
</header>
