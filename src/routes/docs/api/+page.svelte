<script lang="ts">
	import ArrowNavigation from "$lib/components/ArrowNavigation.svelte";
	import Code from "$lib/components/Code.svelte";
	import "$lib/css/docs/doc.css";
	import { faChevronLeft, faChevronRight } from "@fortawesome/pro-light-svg-icons";
	import { FontAwesomeIcon } from "@fortawesome/svelte-fontawesome";
</script>

<div class="flex w-full flex-col place-items-start justify-center px-8">
	<div class="w-full pb-4 pt-8">
		<h1 class="text-4xl"> api.aidanbleser.com reference </h1>
		<small>{new Date("12/12/2023").toLocaleDateString()}</small>
	</div>
	<p class="pb-3"
		>You can interact with the aidanbleser API like any other api. You can start by calling it
		from your terminal:</p>
	<Code>curl https://api.aidanbleser.com/resume</Code>
	<ArrowNavigation
		last={{ name: "Introduction", slug: "/docs" }}
		next={{ name: "/resume", slug: "/docs/api/resume" }}/>
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
