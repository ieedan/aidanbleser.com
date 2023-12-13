<script lang="ts">
	import Code from "$lib/components/Code.svelte";
	import "$lib/css/docs/doc.css";
	import ArrowNavigation from "$lib/components/ArrowNavigation.svelte";
</script>

<div class="flex w-full flex-col place-items-start justify-center px-8">
	<div class="w-full pb-4 pt-8">
		<h1 class="text-4xl"> /projects </h1>
		<small>{new Date("12/12/2023").toLocaleDateString()}</small>
	</div>
	<p class="pb-3">Returns my projects in the following form.</p>
	<Code
		>{`type Project = {
    name: string;
    location: string;
    from: string; 
    to: string; 
    description: string;
    repoURL?: string;
};`}</Code>
	<h2 class="py-4 text-2xl" id="properties">Properties</h2>
	<Code
		>{`{
    name: "ips CLI",
    location: "Avanzar Interior Technologies",
    from: "5-2023",
    to: "5-2023",
    description: "Developed a rust CLI to automat...",
    repoURL: "https://github.com/ieedan/ips",
}`}
	</Code>
	<h2 class="py-4 text-2xl" id="name">.name</h2>
	<p>The name of the project.</p>
    <h2 class="py-4 text-2xl" id="from">.location</h2>
	<p>The company I did this project at or personal if it was a personal project.</p>
	<h2 class="py-4 text-2xl" id="from">.from</h2>
	<p>The time I started the project.</p>
	<h2 class="py-4 text-2xl" id="to">.to</h2>
	<p>The time I completed the project or last worked on it.</p>
	<h2 class="py-4 text-2xl" id="description">.description</h2>
	<p>The description of the project.</p>
    <h2 class="py-4 text-2xl" id="description">.repoURL</h2>
	<p>The url of the repo (if the repo is public).</p>
	<ArrowNavigation
		last={{ name: "/education", slug: "/docs/api/education" }}/>
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
