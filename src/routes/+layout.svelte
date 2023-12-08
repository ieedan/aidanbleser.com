<script lang="ts">
	import { onMount } from 'svelte';
	import '../app.css';
	import '$lib/index.ts';
	import logoSVG from '$lib/assets/favicon.svg';
	import { ColorPreference, changePreference, getCurrentPreference } from '$lib/TS/dark-mode';
	import { usePreload } from '$lib';

    let colorPreference: ColorPreference;

    const choosePreference = (pref: ColorPreference) => {
        changePreference(pref);
        colorPreference = getCurrentPreference();
    };

    onMount(() => {
        usePreload();
        colorPreference = getCurrentPreference();
    })
</script>

<main class="bg-white dark:bg-gray-999 h-screen overflow-y-auto dark:scheme-dark">
	<slot />
	<footer class="text-black dark:text-white border-t border-gray-100 dark:border-gray-900">
		<div class="flex justify-between py-4 px-6">
			<div>
				<div class="flex place-items-center gap-2">
					<a href="/">
						<img src={logoSVG} alt="aidanbleser.com logo" class="w-5 h-5 rounded-md" />
					</a>
					<small class="text-gray-800 dark:text-gray-500">© 2023</small>
				</div>
			</div>
			<nav class="justify-start gap-8 text-gray-800 dark:text-gray-500 text-sm hidden md:flex">
				<div class="flex flex-col col gap-1">
					<h6 class="text-black text-base font-semibold dark:text-white">Other projects</h6>
					<a
						href="https://blog.aidanbleser.com"
						target="_blank"
						class="hover:text-black hover:dark:text-white transition-all"
					>
						Blog
					</a>
				</div>
				<div class="flex flex-col col gap-1">
					<h6 class="text-black text-base font-semibold dark:text-white">Socials</h6>
					<a
						href="https://github.com/ieedan"
						target="_blank"
						class="hover:text-black hover:dark:text-white transition-all"
					>
						GitHub
					</a>
				</div>
				<div class="flex flex-col col gap-1">
					<h6 class="text-black text-base font-semibold dark:text-white">Actions</h6>
					<button
						class="hover:text-black text-start hover:dark:text-white transition-all"
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
