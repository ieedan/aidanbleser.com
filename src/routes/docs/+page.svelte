<script lang="ts">
	import "$lib/css/docs/doc.css";
	import svelteLogo from "$lib/assets/svelte.svg";
	import dotnetLogo from "$lib/assets/dotnet.svg";
	import { FontAwesomeIcon } from "@fortawesome/svelte-fontawesome";
	import { faChevronLeft, faChevronRight } from "@fortawesome/pro-light-svg-icons";
	import ArrowNavigation from "$lib/components/ArrowNavigation.svelte";
</script>

<div class="flex w-full flex-col place-items-start justify-start px-8">
	<div class="w-full py-8">
		<h1 class="text-4xl"> Introduction to aidanbleser.com </h1>
		<small>{new Date("12/12/2023").toLocaleDateString()}</small>
	</div>
	<p>
		aidanbleser.com is a portfolio website and API built to showcase my resume. You can interact
		with my resume using the browser or by making requests to the API.
	</p>
	<h2 class="py-4 text-2xl" id="technologies">The technologies behind aidanbleser.com</h2>
	<div class="flex w-full place-items-center justify-center gap-4 pb-6">
		<img src={svelteLogo} alt="Svelte logo" class="h-24 w-24" />
		<img src={dotnetLogo} alt=".Net logo" class="h-24 w-24" />
	</div>
	<p>
		<code>aidanbleser.com</code> is built on top of SvelteKit with TailwindCSS and TypeScript.
		The backend <code>api.aidanbleser.com</code> is built using .Net Core Minimal API.
	</p>
	<p class="pb-2 pt-4">Repositories</p>
	<ul class="flex w-full justify-start">
		<li
			><a
				href="https://github.com/ieedan/aidanbleser.com"
				class="text-blue-600 hover:underline dark:text-blue-500"
				target="_blank">aidanbleser.com</a
			></li>
	</ul>
	<h2 class="py-4 text-2xl" id="navigation">Navigating the docs</h2>
	<p
		>If you are using a keyboard use
		<span
			class="rounded-md border border-gray-100 bg-white px-1 py-1
		text-sm text-black transition-all placeholder:text-gray-500
		dark:border-gray-900 dark:bg-gray-999 dark:text-gray-300">
			<FontAwesomeIcon class="fa-sm" icon={faChevronLeft} />
		</span>
		and
		<span
			class="rounded-md border border-gray-100 bg-white px-1 py-1
		text-sm text-black transition-all placeholder:text-gray-500
		dark:border-gray-900 dark:bg-gray-999 dark:text-gray-300">
			<FontAwesomeIcon class="fa-sm" icon={faChevronRight} />
		</span>
		to navigate forwards or backwards in the documentation. On mobile the navigation bar is located on the bottom of the screen.</p>
	<ArrowNavigation
		next={{ name: "API Reference", slug: "/docs/api" }}/>
</div>

<style lang="postcss">
	p {
		@apply w-full max-w-3xl text-start;
	}

	small {
		@apply dark:text-gray-500;
	}

	code {
		@apply rounded-lg bg-gray-100 px-1 py-[2px] font-serif text-sm text-black dark:bg-gray-900 dark:text-white;
	}

	h1,
	h2,
	h3,
	h4,
	h5,
	h6 {
		@apply w-full text-start font-medium;
	}

	ul {
		list-style-type: none;
	}

	li::before {
		content: "- ";
		padding-right: 5px;
		@apply text-gray-400 dark:text-gray-600;
	}
</style>
