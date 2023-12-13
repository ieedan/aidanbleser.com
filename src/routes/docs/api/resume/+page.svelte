<script lang="ts">
	import Code from "$lib/components/Code.svelte";
	import "$lib/css/docs/doc.css";
	import { faChevronRight, faChevronLeft } from "@fortawesome/pro-light-svg-icons";
	import { FontAwesomeIcon } from "@fortawesome/svelte-fontawesome";
	import ArrowNavigation from "$lib/components/ArrowNavigation.svelte";
</script>

<div class="flex w-full flex-col place-items-start justify-center px-8">
	<div class="w-full pb-4 pt-8">
		<h1 class="text-4xl"> /resume </h1>
		<small>{new Date("12/12/2023").toLocaleDateString()}</small>
	</div>
	<p class="pb-3">Returns my resume in the following form.</p>
	<Code
		>{`type Resume = {
    skills: Skill[];
    experience: Experience[];
    education: Education[];
	projects: Project[];
};`}</Code>
	<h2 class="py-4 text-2xl" id="properties">Properties</h2>
	<ul class="flex flex-col w-full justify-start">
		<li>
			<a
				href="/docs/api/skills"
				class="text-blue-600 hover:underline dark:text-blue-500">
				Skill[]</a>
		</li>
		<li>
			<a
				href="/docs/api/experience"
				class="text-blue-600 hover:underline dark:text-blue-500">
				Experience[]</a>
		</li>
		<li>
			<a
				href="/docs/api/education"
				class="text-blue-600 hover:underline dark:text-blue-500">
				Education[]</a>
		</li>
		<li>
			<a
				href="/docs/api/projects"
				class="text-blue-600 hover:underline dark:text-blue-500">
				Project[]</a>
		</li>
	</ul>
	<ArrowNavigation
		last={{ name: "API Reference", slug: "/docs/api" }}
		next={{ name: "/skills", slug: "/docs/api/skills" }} />
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
