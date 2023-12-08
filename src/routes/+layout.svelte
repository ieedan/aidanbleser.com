<script lang="ts">
	import { onMount } from "svelte";
	import "../app.css";
	import "$lib/index.ts";
	import logoSVG from "$lib/assets/favicon.svg";
	import { ColorPreference, changePreference, getCurrentPreference } from "$lib/TS/dark-mode";
	import { usePreload } from "$lib";

	let colorPreference: ColorPreference;

	const choosePreference = (pref: ColorPreference) => {
		changePreference(pref);
		colorPreference = getCurrentPreference();
	};

	onMount(() => {
		usePreload();
		colorPreference = getCurrentPreference();
	});
</script>

<main class="dark:scheme-dark h-screen overflow-y-auto bg-white dark:bg-gray-999">
	<slot />
	<footer class="border-t border-gray-100 text-black dark:border-gray-900 dark:text-white">
		<div class="flex justify-between px-6 py-4">
			<div>
				<div class="flex place-items-center gap-2">
					<a href="/">
						<img src={logoSVG} alt="aidanbleser.com logo" class="h-5 w-5 rounded-md" />
					</a>
					<small class="text-gray-800 dark:text-gray-500">© 2023</small>
				</div>
			</div>
			<nav
				class="hidden justify-start gap-8 text-sm text-gray-800 dark:text-gray-500 md:flex"
			>
				<div class="col flex flex-col gap-1">
					<h6 class="text-base font-semibold text-black dark:text-white"
						>Other projects</h6
					>
					<a
						href="https://blog.aidanbleser.com"
						target="_blank"
						class="transition-all hover:text-black hover:dark:text-white"
					>
						Blog
					</a>
				</div>
				<div class="col flex flex-col gap-1">
					<h6 class="text-base font-semibold text-black dark:text-white">Socials</h6>
					<a
						href="https://github.com/ieedan"
						target="_blank"
						class="transition-all hover:text-black hover:dark:text-white"
					>
						GitHub
					</a>
				</div>
				<div class="col flex flex-col gap-1">
					<h6 class="text-base font-semibold text-black dark:text-white">Actions</h6>
					<button
						class="text-start transition-all hover:text-black hover:dark:text-white"
					>
						<i class="fa-light fa-command fa-sm"></i> K
					</button>
				</div>
			</nav>
			<div class="flex place-items-start justify-end">
				<button
					data-selected={colorPreference == ColorPreference.dark}
					on:click={() => choosePreference(ColorPreference.dark)}
					class="flex h-8 w-8 place-items-center justify-center rounded-full text-gray-600
                    transition-all hover:text-black data-[selected=true]:bg-gray-100 data-[selected=true]:text-black dark:text-gray-700
                dark:hover:text-white data-[selected=true]:dark:bg-gray-900 data-[selected=true]:dark:text-white"
				>
					<i class="fa-light fa-moon"></i>
				</button>
				<button
					data-selected={colorPreference == ColorPreference.light}
					on:click={() => choosePreference(ColorPreference.light)}
					class="flex h-8 w-8 place-items-center justify-center rounded-full text-gray-600
                    transition-all hover:text-black data-[selected=true]:bg-gray-100 data-[selected=true]:text-black dark:text-gray-700
                dark:hover:text-white data-[selected=true]:dark:bg-gray-900 data-[selected=true]:dark:text-white"
				>
					<i class="fa-light fa-sun"></i>
				</button>
				<button
					data-selected={colorPreference == ColorPreference.OS}
					on:click={() => choosePreference(ColorPreference.OS)}
					class="flex h-8 w-8 place-items-center justify-center rounded-full text-gray-600
                    transition-all hover:text-black data-[selected=true]:bg-gray-100 data-[selected=true]:text-black dark:text-gray-700
                dark:hover:text-white data-[selected=true]:dark:bg-gray-900 data-[selected=true]:dark:text-white"
				>
					<i class="fa-light fa-desktop"></i>
				</button>
			</div>
		</div>
	</footer>
</main>
