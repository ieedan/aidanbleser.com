<script lang="ts">
	import Code from "$lib/components/Code.svelte";
	import "$lib/css/docs/doc.css";
	import { faChevronRight, faChevronLeft } from "@fortawesome/pro-light-svg-icons";
	import { FontAwesomeIcon } from "@fortawesome/svelte-fontawesome";
</script>

<div class="flex w-full flex-col place-items-start justify-center px-8">
	<div class="w-full pb-4 pt-8">
		<h1 class="text-4xl"> /skills </h1>
		<small>{new Date("12/12/2023").toLocaleDateString()}</small>
	</div>
	<p class="pb-3">Returns my skills in the following form.</p>
	<Code
		>{`type Skill = {
    name: string;
    yearsExperience: number;
};`}</Code>
    <h2 class="py-4 text-2xl" id="properties">Properties</h2>
	<Code>{`{ 
    name: "TypeScript", 
    yearsExperience: 1.1987795142874587 
}`}
	</Code>
	<h2 class="py-4 text-2xl" id="name">.name</h2>
	<p>The name of the skill.</p>
	<h2 class="py-4 text-2xl" id="yearsExperience">.yearsExperience</h2>
	<p
		>The years of experience with that skill. This updates per each request. Each skill updates
		based on its given <code>start date</code>.</p>
	<div class="flex w-full place-items-center justify-between py-8">
		<div class="flex flex-col place-items-start justify-start">
			<small class="px-5 text-xs text-gray-600 dark:text-gray-400">Last</small>
			<a href="/docs/api/resume" class="flex place-items-center gap-2 hover:underline">
				<FontAwesomeIcon class="text-gray-600 dark:text-gray-400" icon={faChevronLeft} />
				/resume
			</a>
		</div>
		<div class="flex flex-col place-items-end justify-end">
			<small class="px-5 text-xs text-gray-600 dark:text-gray-400">Next</small>
			<a href="/docs/api/experience" class="flex place-items-center gap-2 hover:underline">
				/experience <FontAwesomeIcon
					class="text-gray-600 dark:text-gray-400"
					icon={faChevronRight} />
			</a>
		</div>
	</div>
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
