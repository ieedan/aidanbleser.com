<script lang="ts">
	import Code from "$lib/components/Code.svelte";
	import "$lib/css/docs/doc.css";
	import ArrowNavigation from "$lib/components/ArrowNavigation.svelte";
</script>

<div class="flex w-full flex-col place-items-start justify-center px-8">
	<div class="w-full pb-4 pt-8">
		<h1 class="text-4xl"> /education </h1>
		<small>{new Date("12/12/2023").toLocaleDateString()}</small>
	</div>
	<p class="pb-3">Returns my education in the following form.</p>
	<Code
		>{`type Education = {
    name: string;
    from: string; 
    to: string; 
    degree: string;
};`}</Code
	>
	<h2 class="py-4 text-2xl" id="properties">Properties</h2>
	<Code
		>{`{
    name: "St. Philips College SA",
    from: "5-2019",
    to: "5-2021",
    degree: "Associates in Applied Science gea...",
}`}
	</Code>
	<h2 class="py-4 text-2xl" id="name">.name</h2>
	<p>The name of the college or institution.</p>
	<h2 class="py-4 text-2xl" id="from">.from</h2>
	<p>The time I started attending.</p>
	<h2 class="py-4 text-2xl" id="to">.to</h2>
	<p>When I graduated.</p>
	<h2 class="py-4 text-2xl" id="description">.degree</h2>
	<p>The degree I completed.</p>
	<ArrowNavigation
		last={{ name: "/experience", slug: "/docs/api/experience" }}
		next={{ name: "/projects", slug: "/docs/api/projects" }}
	/>
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
