<script lang="ts">
	import { page } from "$app/stores";
	import logoSVG from "$lib/assets/favicon.svg";
	import { faTerminal } from "@fortawesome/pro-light-svg-icons";
	import { FontAwesomeIcon } from "@fortawesome/svelte-fontawesome";
	import { getContext } from "svelte";

	const showPallet = getContext<() => void>("showActions");
</script>

<svelte:head>
	<title>Blog | aidanbleser.com</title>
</svelte:head>

<div class="flex flex-col">
	<header
		class="fixed top-0 z-40 flex w-full place-items-center justify-center border-b border-gray-100 bg-white py-2 dark:border-gray-900 dark:bg-gray-999"
	>
		<div class="flex w-full max-w-7xl justify-between">
			<a href="/" class="flex place-items-center gap-2 px-4 text-lg font-medium">
				<img src={logoSVG} class="h-5 w-5 rounded-md" alt="aidanbleser.com logo" />
				aidanbleser.com
			</a>
			<div class="flex place-items-center gap-5 px-4 text-gray-600 dark:text-gray-400">
				<button
					on:click={showPallet}
					class="transition-all hover:text-black hover:dark:text-white"
				>
					<FontAwesomeIcon class="fa-xs" icon={faTerminal} />
				</button>
				<a
					href="/docs"
					data-active={$page.url.pathname.startsWith("/docs")}
					class="hidden transition-all hover:text-black hover:dark:text-white data-[active=true]:dark:text-white md:block"
				>
					Docs
				</a>
				<a
					href="/blog"
					data-active={$page.url.pathname.startsWith("/blog")}
					class="hidden transition-all hover:text-black hover:dark:text-white data-[active=true]:dark:text-white md:block"
				>
					Blog
				</a>
			</div>
		</div>
	</header>
	<div class="flex min-h-screen flex-col place-items-center px-8">
		<section class="h-[45px]"></section>
		<slot />
	</div>
</div>
