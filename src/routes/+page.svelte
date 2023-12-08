<script lang="ts">
	import InformationContainer from "$lib/components/InformationContainer.svelte";

	type Resume = {
		skills: Skill[];
		experience: Experience[];
		education: Education[];
	};

	type Skill = {
		name: string;
		yearsExperience: number;
	};

	type Experience = {
		name: string;
		location: string;
		from: string; 
		to: string; 
		description: string;
	};

	type Education = {
		name: string;
		from: string; 
		to: string; 
		degree: string;
	};

    export let data;
</script>

<div class="flex min-h-screen flex-col place-items-center">
	<section class="h-16"></section>
	<div class=" py-6 text-black dark:text-white">
		<h1 class="select-none text-center text-7xl font-semibold">Aidan Bleser</h1>
	</div>
	<section class="h-16"></section>
	<div class="flex w-full grid-cols-2 grid-rows-4 flex-col gap-4 px-6 md:grid">
		<div
			class="col-span-1 col-start-2 row-span-1 row-start-1 flex place-items-center justify-center py-5">
			<h4
				class="select-none text-center text-4xl font-semibold text-black dark:text-white xs:text-5xl"
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
				class="select-none text-center text-4xl font-semibold text-black dark:text-white xs:text-5xl"
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
				class="select-none text-center text-4xl font-semibold text-black dark:text-white xs:text-5xl"
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
