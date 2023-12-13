<script lang="ts">
	import InformationContainer from "$lib/components/InformationContainer.svelte";
	import { FontAwesomeIcon } from "@fortawesome/svelte-fontawesome";
	import type { Resume } from "./+page.server";
	import { faArrowUpRight } from "@fortawesome/pro-light-svg-icons";

	export let data: Resume;
</script>

<div class="flex min-h-screen flex-col place-items-center">
	<section class="h-16 print:hidden"></section>
	<div
		class="flex flex-col place-items-start justify-start py-6 text-black dark:text-white print:py-2">
		<h1
			class="select-none text-center text-7xl font-semibold print:text-start print:text-2xl print:dark:text-black"
			>Aidan Bleser</h1>
		<a
			href="/docs"
			class="flex w-full place-items-center justify-center gap-1 py-2 text-center font-serif text-gray-800 hover:underline dark:text-gray-200">
			Check out the docs here<FontAwesomeIcon
				class="text-blue-600 dark:text-blue-500"
				icon={faArrowUpRight} />
		</a>
	</div>
	<section class="h-16 print:hidden"></section>
	<div
		class="flex w-full max-w-7xl grid-cols-2 grid-rows-4 flex-col gap-4 px-6 print:gap-0 print:px-2 md:grid">
		<div
			class="col-span-1 col-start-2 row-span-1 row-start-1 flex place-items-center justify-center py-5">
			<h4
				class="select-none text-center text-4xl font-semibold
                text-black dark:text-white print:text-xl print:dark:text-black xs:text-5xl print:xs:text-xl"
				>Skills</h4>
		</div>
		<InformationContainer
			class="col-span-1 col-start-1 row-span-2 row-start-1"
			endpoint={`${import.meta.env.VITE_API_URL}skills`}
			infoArr={data.skills.map((a) => {
				return {
					name: a.name,
					shortDetail: `${a.yearsExperience.toFixed(2)} years`,
				};
			})} />
		<div
			class="col-span-1 col-start-1 row-span-1 row-start-3 flex place-items-center justify-center py-5">
			<h4
				class="select-none text-center text-4xl font-semibold
                text-black dark:text-white print:text-xl print:dark:text-black xs:text-5xl print:xs:text-xl"
				>Experience</h4>
		</div>
		<InformationContainer
			class="col-span-1 col-start-2 row-span-2 row-start-2"
			endpoint={`${import.meta.env.VITE_API_URL}experience`}
			infoArr={data.experience.map((a) => {
				return {
					name: a.name,
					shortDetail: `${a.from} - ${a.to}`,
					longDetail: `${a.location}`,
					description: a.description,
				};
			})} />
		<div
			class="col-span-1 col-start-2 row-span-1 row-start-4 flex place-items-center justify-center py-5">
			<h4
				class="select-none text-center text-4xl font-semibold
                text-black dark:text-white print:text-xl print:dark:text-black xs:text-5xl print:xs:text-xl"
				>Education</h4>
		</div>
		<InformationContainer
			class="col-span-1 col-start-1 row-span-2 row-start-4"
			endpoint={`${import.meta.env.VITE_API_URL}education`}
			infoArr={data.education.map((a) => {
				return {
					name: a.name,
					shortDetail: `${a.from} - ${a.to}`,
					description: a.degree,
				};
			})} />
	</div>
	<section class="h-16"></section>
</div>
