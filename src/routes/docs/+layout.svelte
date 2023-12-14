<script lang="ts">
	import logoSVG from "$lib/assets/favicon.svg";
	import NavRoute from "$lib/components/NavRoute.svelte";
	import type { Route } from "$lib/TS/routes.types";
	import { FontAwesomeIcon } from "@fortawesome/svelte-fontawesome";
	import { page } from "$app/stores";
	import {
		faArrowTurnDownRight,
		faChevronUp,
		faTerminal,
	} from "@fortawesome/pro-light-svg-icons";
	import { getContext } from "svelte";

	let navigationExpanded = false;

	let navigationRef: HTMLElement;

	const showPallet = getContext<() => void>("showActions");

	const routes: Route[] = [
		{
			name: "Introduction",
			slug: "/docs",
			hidden: true,
		},
		{
			name: "API Reference",
			slug: "/docs/api",
			expanded: true,
			routes: [
				{
					name: "/resume",
					slug: "/docs/api/resume",
				},
				{
					name: "/skills",
					slug: "/docs/api/skills",
					routes: [
						{
							name: "name",
							slug: "/docs/api/skills#name",
						},
						{
							name: "yearsExperience",
							slug: "/docs/api/skills#yearsExperience",
						},
					],
				},
				{
					name: "/experience",
					slug: "/docs/api/experience",
					routes: [
						{
							name: "name",
							slug: "/docs/api/experience#name",
						},
						{
							name: "location",
							slug: "/docs/api/experience#location",
						},
						{
							name: "from",
							slug: "/docs/api/experience#from",
						},
						{
							name: "to",
							slug: "/docs/api/experience#to",
						},
						{
							name: "description",
							slug: "/docs/api/experience#description",
						},
					],
				},
				{
					name: "/education",
					slug: "/docs/api/education",
					routes: [
						{
							name: "name",
							slug: "/docs/api/education#name",
						},
						{
							name: "from",
							slug: "/docs/api/education#from",
						},
						{
							name: "to",
							slug: "/docs/api/education#to",
						},
						{
							name: "degree",
							slug: "/docs/api/education#degree",
						},
					],
				},
				{
					name: "/projects",
					slug: "/docs/api/projects",
					routes: [
						{
							name: "name",
							slug: "/docs/api/projects#name",
						},
						{
							name: "location",
							slug: "/docs/api/projects#location",
						},
						{
							name: "from",
							slug: "/docs/api/projects#from",
						},
						{
							name: "to",
							slug: "/docs/api/projects#to",
						},
						{
							name: "description",
							slug: "/docs/api/projects#description",
						},
						{
							name: "repoURL",
							slug: "/docs/api/projects#repoURL",
						},
					],
				},
			],
		},
	];

	$: currentDoc = getCurrentDoc(routes, $page.url.href.replace($page.url.origin, ""));

	const getCurrentDoc = (rs: Route[], path: string): Route | undefined => {
		for (let i = 0; i < rs.length; i++) {
			const r = rs[i];

			if (r.slug == path) return r;

			if (!r.routes) continue;

			const doc = getCurrentDoc(r.routes, path);

			if (doc) return doc;
		}
	};

	const handleDocClick = (e: Event) => {
		if (!e.target) return;

		if (!navigationRef.contains(e.target as Node)) {
			navigationExpanded = false;
		}
	};

	const toggleNavigationExpanded = () => (navigationExpanded = !navigationExpanded);
</script>

<svelte:document
	on:keydown={(e) => {
		if (e.key == "Escape") {
			navigationExpanded = false;
		}
	}}
	on:click={handleDocClick}
/>

<svelte:head>
	<title>Docs | aidanbleser.com</title>
</svelte:head>

<div class="flex flex-col">
	<header
		class="fixed top-0 z-40 flex w-full place-items-center justify-center border-b border-gray-100 bg-white py-2 dark:border-gray-900 dark:bg-gray-999"
	>
		<div class="flex w-full max-w-7xl justify-between">
			<a href="/" class="flex place-items-center gap-2 px-4 text-lg font-medium">
				<img src={logoSVG} class="h-5 w-5 rounded-md" alt="aidanbleser.com logo" />
				aidanbleser.com
			</a>
			<div class="flex place-items-center gap-5 px-4 text-gray-600 dark:text-gray-400">
				<button
					on:click={showPallet}
					class="transition-all hover:text-black hover:dark:text-white"
				>
					<FontAwesomeIcon class="fa-xs" icon={faTerminal} />
				</button>
				<a
					href="/docs"
					data-active={$page.url.pathname.startsWith("/docs")}
					class="hidden transition-all hover:text-black hover:dark:text-white data-[active=true]:dark:text-white md:block"
				>
					Docs
				</a>
				<a
					href="/blog"
					data-active={$page.url.pathname.startsWith("/blog")}
					class="hidden transition-all hover:text-black hover:dark:text-white data-[active=true]:dark:text-white md:block"
				>
					Blog
				</a>
			</div>
		</div>
	</header>
	<div class="flex min-h-screen justify-center">
		<div class="flex w-full max-w-7xl">
			<nav
				bind:this={navigationRef}
				class="fixed bottom-0 z-40 flex max-h-screen w-full flex-col place-items-end overflow-y-auto
				border-t border-gray-100 bg-white px-4
                py-3 dark:border-gray-900 dark:bg-gray-999 md:top-[45px] md:w-[300px] md:border-0 md:bg-transparent md:dark:bg-transparent"
			>
				<div
					class="w-full flex-col data-[show=false]:hidden md:data-[show=false]:flex"
					data-show={navigationExpanded}
				>
					{#each routes as route}
						<NavRoute {...route} />
					{/each}
				</div>
				<section
					class="h-5 data-[show=false]:hidden md:hidden"
					data-show={navigationExpanded}
				></section>
				<button
					class="flex w-full place-items-center justify-between rounded-md border border-gray-100
                px-2 py-1 dark:border-gray-900 md:hidden"
					on:click={toggleNavigationExpanded}
				>
					<div class="flex place-items-center gap-2">
						<FontAwesomeIcon class="fa-xs text-blue-500" icon={faArrowTurnDownRight} />
						{currentDoc?.name}
					</div>
					<div
						class="transition-all data-[show=false]:rotate-180"
						data-show={navigationExpanded}
						><FontAwesomeIcon class="fa-xs text-blue-500" icon={faChevronUp} /></div
					>
				</button>
			</nav>
			<div class="slot-width relative w-full max-w-3xl md:left-[300px]">
				<section class="h-[45px]"></section>
				<slot />
			</div>
		</div>
	</div>
</div>

<style lang="postcss">
	@media (min-width: 768px) {
		.slot-width {
			width: calc(100% - 300px);
		}
	}
</style>
