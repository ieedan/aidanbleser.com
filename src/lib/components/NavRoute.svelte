<script lang="ts">
	import type { Route } from "$lib/TS/routes.types";
	import { faChevronDown, faWindowAlt } from "@fortawesome/pro-regular-svg-icons";
	import { FontAwesomeIcon } from "@fortawesome/svelte-fontawesome";
	import { page } from "$app/stores";

	export let name: string;
	export let slug: string;
	export let routes: Route[] | undefined = undefined;
	export let expanded = false;
	export let nested = false;

	$: active = routes ? $page.url.pathname.startsWith(slug) : $page.url.href.replace($page.url.origin, '') == slug;

	const toggleExpanded = () => (expanded = !expanded);
</script>

<div class="flex w-full flex-col data-[nested=true]:pl-4" data-nested={nested}>
	<div class="group flex place-items-center justify-between">
		<a
			href={slug}
			data-active={active}
			class="w-full rounded-md px-2 py-2 text-gray-600 data-[active=true]:dark:text-white
    		transition-all group-hover:text-black dark:text-gray-400 group-hover:dark:text-white">
			{name}
		</a>
		{#if routes}
			<button on:click={toggleExpanded}>
				<div
					class="hover:text-black data-[show=false]:-rotate-90 transition-all
				dark:text-gray-400 hover:dark:text-white data-[show=true]:dark:text-white"
					data-show={expanded}>
					<FontAwesomeIcon class="fa-xs" icon={faChevronDown} />
				</div>
			</button>
		{/if}
	</div>
	<div
		class="border-l border-gray-100 data-[show=false]:hidden dark:border-gray-900"
		data-show={expanded}>
		{#if routes}
			{#each routes as subRoute}
				<svelte:self {...{...subRoute, nested: true}} />
			{/each}
		{/if}
	</div>
</div>
