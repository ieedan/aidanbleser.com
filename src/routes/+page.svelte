<script lang="ts">
	import InformationContainer from "$lib/components/InformationContainer.svelte";
	import { FontAwesomeIcon } from "@fortawesome/svelte-fontawesome";
	import type { Resume } from "./+page.server";
	import { faTerminal } from "@fortawesome/pro-light-svg-icons";
	import { getContext } from "svelte";

	const showActions = getContext<() => void>("showActions");

	export let data: Resume;
</script>

<div class="flex min-h-screen flex-col place-items-center">
	<section class="h-16 print:hidden"></section>
	<div
		class="flex flex-col place-items-start justify-start py-6 text-black print:py-0 dark:text-white"
	>
		<h1
			class="select-none text-center text-7xl font-semibold print:text-start print:text-xl print:dark:text-black"
			>Aidan Bleser</h1
		>
		<div class="flex w-full place-items-center justify-center gap-5 py-5 print:hidden">
			<button
				on:click={showActions}
				class="flex w-28 place-items-center justify-center gap-2 rounded-3xl bg-black
			px-3 py-2 text-white transition-all hover:bg-gray-900 dark:bg-white dark:text-black hover:dark:bg-gray-100"
			>
				<FontAwesomeIcon class="fa-sm" icon={faTerminal} />
				Actions
			</button>
			<a
				href="/blog"
				class="flex w-28 place-items-center justify-center gap-1 rounded-3xl border border-gray-100 py-2 text-center
				text-black transition-all hover:bg-gray-100 dark:border-gray-900 dark:text-white hover:dark:bg-gray-900"
			>
				Blog
			</a>
		</div>
	</div>
	<section class="h-16 print:hidden"></section>
	<div
		class="flex w-full max-w-7xl grid-cols-2 grid-rows-8 flex-col gap-4 px-6 print:gap-0 print:px-2 md:grid"
	>
		<div
			class="col-span-1 col-start-2 row-span-1 row-start-1 flex place-items-center justify-center py-5"
		>
			<h4
				class="select-none text-center text-4xl font-semibold
                text-black print:text-xl xs:text-5xl print:xs:text-xl dark:text-white print:dark:text-black"
				>Skills</h4
			>
		</div>
		<InformationContainer
			class="col-span-1 col-start-1 row-span-2 row-start-1"
			endpoint={`${import.meta.env.VITE_API_URL}skills`}
			infoArr={data.skills.map((a) => {
				return {
					name: a.name,
					shortDetail: `${a.yearsExperience.toFixed(2)} years`,
				};
			})}
		/>
		<div
			class="col-span-1 col-start-1 row-span-1 row-start-3 flex place-items-center justify-center py-5"
		>
			<h4
				class="select-none text-center text-4xl font-semibold
                text-black print:text-xl xs:text-5xl print:xs:text-xl dark:text-white print:dark:text-black"
				>Experience</h4
			>
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
			})}
		/>
		<div
			class="col-span-1 col-start-2 row-span-1 row-start-4 flex place-items-center justify-center py-5"
		>
			<h4
				class="select-none text-center text-4xl font-semibold
                text-black print:text-xl xs:text-5xl print:xs:text-xl dark:text-white print:dark:text-black"
				>Education</h4
			>
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
			})}
		/>
		<div
			class="col-span-1 col-start-1 row-span-2 row-start-6 flex place-items-center justify-center py-5"
		>
			<h4
				class="select-none text-center text-4xl font-semibold
			text-black print:text-xl xs:text-5xl print:xs:text-xl dark:text-white print:dark:text-black"
				>Projects</h4
			>
		</div>
		<InformationContainer
			class="col-span-1 col-start-2 row-span-2 row-start-6"
			endpoint={`${import.meta.env.VITE_API_URL}projects`}
			infoArr={data.projects.map((a) => {
				return {
					name: a.name,
					shortDetail: `${a.from} - ${a.to}`,
					description: a.description,
				};
			})}
		/>
	</div>
	<section class="h-16"></section>
</div>
