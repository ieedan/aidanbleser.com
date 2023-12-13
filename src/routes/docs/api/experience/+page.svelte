<script lang="ts">
	import Code from "$lib/components/Code.svelte";
	import "$lib/css/docs/doc.css";
	import { faChevronRight, faChevronLeft } from "@fortawesome/pro-light-svg-icons";
	import { FontAwesomeIcon } from "@fortawesome/svelte-fontawesome";
	import ArrowNavigation from "$lib/components/ArrowNavigation.svelte";
</script>

<div class="flex w-full flex-col place-items-start justify-center px-8">
	<div class="w-full pb-4 pt-8">
		<h1 class="text-4xl"> /experience </h1>
		<small>{new Date("12/12/2023").toLocaleDateString()}</small>
	</div>
	<p class="pb-3">Returns my experience in the following form.</p>
	<Code>{`type Experience = {
    name: string;
    location: string;
    from: string; 
    to: string; 
    description: string;
};`}</Code>
    <h2 class="py-4 text-2xl" id="properties">Properties</h2>
	<Code>{`{
    name: "Maintenance Technician",
    location: "Toyota Motor Manfacturing Texas",
    from: "5-2019",
    to: "2-2022",
    description: "Learned to troubles..."
}`}
	</Code>
	<h2 class="py-4 text-2xl" id="name">.name</h2>
	<p>My title at the company.</p>
	<h2 class="py-4 text-2xl" id="location">.location</h2>
	<p>The company and location of the position.</p>
    <h2 class="py-4 text-2xl" id="from">.from</h2>
	<p>When I started at the company.</p>
    <h2 class="py-4 text-2xl" id="to">.to</h2>
	<p>When I last worked at the company. Normally a date unless it is where I currently work in which case it will return <code>"current"</code>.</p>
	<h2 class="py-4 text-2xl" id="description">.description</h2>
	<p>A brief description of what I did at the company in my time there.</p>
	<ArrowNavigation
		last={{ name: "/skills", slug: "/docs/api/skills" }}
		next={{ name: "/education", slug: "/docs/api/education" }} />
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
