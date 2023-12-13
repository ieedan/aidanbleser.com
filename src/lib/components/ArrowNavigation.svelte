<script lang="ts">
	import { onMount } from "svelte";
	import { FontAwesomeIcon } from "@fortawesome/svelte-fontawesome";
	import { faChevronLeft, faChevronRight } from "@fortawesome/pro-light-svg-icons";
	import { goto } from "$app/navigation";

	type ShortRoute = {
		name: string;
		slug: string;
	};

	export let last: ShortRoute | undefined = undefined;
	export let next: ShortRoute | undefined = undefined;

	const handleDocumentKeydown = (e: KeyboardEvent) => {
		if (e.key == "ArrowRight" && next) {
			goto(next?.slug);
		} else if (e.key == "ArrowLeft" && last) {
			goto(last?.slug);
		}
	};

	onMount(() => {
		document.addEventListener("keydown", handleDocumentKeydown);

		return () => {
			document.removeEventListener("keydown", handleDocumentKeydown);
		};
	});
</script>

<div class="flex w-full place-items-center justify-between py-8">
	{#if last}
		<div class="flex flex-col place-items-start justify-start">
			<small class="px-5 text-xs text-gray-600 dark:text-gray-400">Last</small>
			<a href={last.slug} class="flex place-items-center gap-2 hover:underline">
				<FontAwesomeIcon class="text-gray-600 dark:text-gray-400" icon={faChevronLeft} />
				{last?.name}
			</a>
		</div>
	{:else}
		<div></div>
	{/if}
	{#if next}
		<div class="flex flex-col place-items-end justify-end">
			<small class="px-5 text-xs text-gray-600 dark:text-gray-400">Next</small>
			<a href={next.slug} class="flex place-items-center gap-2 hover:underline">
				{next.name}<FontAwesomeIcon
					class="text-gray-600 dark:text-gray-400"
					icon={faChevronRight} />
			</a>
		</div>
	{:else}
		<div></div>
	{/if}
</div>
