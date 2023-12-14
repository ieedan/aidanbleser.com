<script lang="ts">
	import { faClone, faCheck } from "@fortawesome/pro-regular-svg-icons";
	import { FontAwesomeIcon } from "@fortawesome/svelte-fontawesome";

	let className: string = "";
	export { className as class };

	export let endpoint: string;
	export let infoArr: Information[] = [];

	$: trimmedEndpoint = trimEndpoint(endpoint);

	const trimEndpoint = (str: string) => {
		const url = new URL(str);

		return url.pathname;
	};

	let copied = false;

	type Information = {
		name: string;
		shortDetail?: string;
		longDetail?: string;
		description?: string;
	};

	const copy = () => {
		navigator.clipboard.writeText(endpoint).then(() => {
			copied = true;
			setTimeout(() => (copied = false), 1000);
		});
	};
</script>

<div
	class="rounded-lg border border-gray-100 bg-white
	text-black dark:border-gray-900 dark:bg-gray-999 dark:text-white print:border-none print:dark:bg-white print:dark:text-black {className}"
>
	<div
		class="flex place-items-center justify-between border-b border-gray-100
        px-1 py-1 font-serif dark:border-gray-900 print:dark:border-gray-100"
	>
		<small class="hidden text-gray-400 dark:text-gray-500 xs:block">
			{endpoint}
		</small>
		<small class="block text-gray-400 dark:text-gray-500 xs:hidden">
			{trimmedEndpoint}
		</small>
		<button
			on:click={copy}
			class="flex h-6 w-6 place-items-center justify-center rounded-md
            border border-gray-100 text-gray-400 transition-all
            hover:bg-gray-100 dark:border-gray-900 dark:text-gray-500 hover:dark:bg-gray-900 print:hidden"
		>
			{#if copied}
				<div class="flex place-items-center justify-center">
					<FontAwesomeIcon class="fa-xs" icon={faCheck} />
				</div>
			{:else}
				<div class="flex place-items-center justify-center">
					<FontAwesomeIcon class="fa-xs" icon={faClone} />
				</div>
			{/if}
		</button>
	</div>
	<ul class="flex max-h-[300px] flex-col gap-2 overflow-auto px-2 py-2 print:max-h-full">
		{#if infoArr.length != 0}
			{#each infoArr as info}
				<li class="flex flex-col">
					<div class="flex flex-col lg:flex-row lg:place-items-center lg:gap-2">
						<strong class="font-medium">{info.name}</strong>
						{#if info.shortDetail}
							<small class="text-gray-600 dark:text-gray-600"
								>{info.shortDetail}</small
							>
						{/if}
					</div>
					{#if info.longDetail}
						<small class="text-gray-600 dark:text-gray-600">{info.longDetail}</small>
					{/if}
					{#if info.description}
						<p class="text-sm">{info.description}</p>
					{/if}
				</li>
			{/each}
		{:else}
			{#each [0, 0, 0, 0, 0] as _}
				<li class="flex flex-col gap-1" data-key={_}>
					<div class="flex place-items-center gap-2">
						<div class="h-4 w-20 animate-pulse rounded-md bg-gray-200 dark:bg-gray-800"
						></div>
						<div class="h-4 w-10 animate-pulse rounded-md bg-gray-200 dark:bg-gray-800"
						></div>
					</div>
					<div class="h-4 w-3/4 animate-pulse rounded-md bg-gray-200 dark:bg-gray-800"
					></div>
				</li>
			{/each}
		{/if}
	</ul>
</div>
