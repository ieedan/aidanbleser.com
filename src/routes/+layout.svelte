<script lang="ts">
	import { onMount } from "svelte";
	import "../app.css";
	import "$lib/index.ts";
	import { faGithub } from "@fortawesome/free-brands-svg-icons";
	import { FontAwesomeIcon } from "@fortawesome/svelte-fontawesome";
	import {
		faMoon,
		faSun,
		faDesktop,
		type IconDefinition,
	} from "@fortawesome/pro-light-svg-icons";
	import { faArrowDownToLine, faPrint } from "@fortawesome/pro-regular-svg-icons";
	import logoSVG from "$lib/assets/favicon.svg";
	import blogSVG from "$lib/assets/blog-icon.svg";
	import { ColorPreference, changePreference, getCurrentPreference } from "$lib/TS/dark-mode";
	import { usePreload } from "$lib";
	import { injectSpeedInsights } from "@vercel/speed-insights/sveltekit";
	import { get } from "$lib/TS/api";
	import findAncestor from "$lib/TS/find-ancestor";

	class Action {
		name: string;
		icon?: IconDefinition;
		img?: string;
		fn: () => void;
		selected: boolean = false;
		group: string;
		/** Space separated list with the shortcut */
		shortCut?: string;
		elementRef?: HTMLLIElement;
		constructor(
			name: string,
			fn: () => void,
			group: string,
			shortCut?: string,
			icon?: IconDefinition,
			img?: string,
		) {
			this.name = name;
			this.fn = fn;
			this.group = group;
			this.shortCut = shortCut;
			this.icon = icon;
			this.img = img;
		}
	}

	class Group {
		name: string;
		constructor(name: string) {
			this.name = name;
		}
	}

	const actions: (Action | Group)[] = [
		new Group("Information"),
		new Action(
			"Download resume JSON",
			async () => {
				const response = await get("/resume");
				const json = JSON.stringify(response.body);
				downloadJSON(json, "resume.json");
			},
			"Information",
			undefined,
			faArrowDownToLine,
		),
		new Action("Print resume", () => window.print(), "Information", "Ctrl P", faPrint),
		new Action(
			"Download skills JSON",
			async () => {
				const response = await get("/skills");
				const json = JSON.stringify(response.body);
				downloadJSON(json, "skills.json");
			},
			"Information",
			undefined,
			faArrowDownToLine,
		),
		new Action(
			"Download experience JSON",
			async () => {
				const response = await get("/experience");
				const json = JSON.stringify(response.body);
				downloadJSON(json, "experience.json");
			},
			"Information",
			undefined,
			faArrowDownToLine,
		),
		new Action(
			"Download education JSON",
			async () => {
				const response = await get("/education");
				const json = JSON.stringify(response.body);
				downloadJSON(json, "education.json");
			},
			"Information",
			undefined,
			faArrowDownToLine,
		),
		new Group("General"),
		new Action(
			"Change theme to Dark",
			() => changePreference(ColorPreference.dark),
			"General",
			undefined,
			faMoon,
		),
		new Action(
			"Change theme to Light",
			() => changePreference(ColorPreference.light),
			"General",
			undefined,
			faSun,
		),
		new Action(
			"Change theme to System",
			() => changePreference(ColorPreference.OS),
			"General",
			undefined,
			faDesktop,
		),
		new Group("Links"),
		new Action(
			"Blog",
			() => window.open("https://blog.aidanbleser.com", "_blank")?.focus(),
			"Links",
			undefined,
			undefined,
			blogSVG,
		),
		new Action(
			"Github",
			() => window.open("https://github.com/ieedan", "_blank")?.focus(),
			"Links",
			undefined,
			faGithub,
		),
	];

	$: foundActions = actions.filter((a) => {
		if (a instanceof Group) return true;
		return a.name.toLowerCase().includes(search.toLowerCase());
	});

	injectSpeedInsights();

	let colorPreference: ColorPreference;

	const choosePreference = (pref: ColorPreference) => {
		changePreference(pref);
		colorPreference = getCurrentPreference();
	};

	let palletOpen = false;
	let searchInput: HTMLInputElement;
	let listRef: HTMLUListElement;

	const openPallet = () => {
		palletOpen = true;
		document.body.classList.toggle("overflow-hidden", palletOpen);
		searchInput.focus();
	};

	const closePallet = () => {
		palletOpen = false;
		document.body.classList.toggle("overflow-hidden", palletOpen);
	};

	const downloadJSON = async (json: string, fileName: string) => {
		const blob = new Blob([json], { type: "application/json" });
		const url = URL.createObjectURL(blob);

		const a = document.createElement("a");
		a.href = url;
		a.download = fileName;
		document.body.appendChild(a);

		a.click();

		document.body.removeChild(a);

		URL.revokeObjectURL(url);
	};

	let search: string = "";

	let selectedActionIndex = 0;

	const handleEnter = () => {
		const action = foundActions[selectedActionIndex];

		if (action instanceof Group) return;

		action.fn();
	};

	const onYArrow = (arrow: string) => {
		const groupIndexes = [];

		for (let i = 0; i < foundActions.length; i++) {
			if (foundActions[i] instanceof Group) groupIndexes.push(i);
		}

		let actionsLength = foundActions.length - 1;

		let newIndex = selectedActionIndex;
		const goUp = arrow == "ArrowUp";
		if (goUp) {
			newIndex = newIndex - 1 >= 0 ? newIndex - 1 : actionsLength;
		} else {
			newIndex = newIndex + 1 <= actionsLength ? newIndex + 1 : 0;
		}
		while (-1 < groupIndexes.findIndex((a) => a == newIndex)) {
			if (goUp) {
				newIndex = newIndex - 1 >= 0 ? newIndex - 1 : actionsLength;
			} else {
				newIndex = newIndex + 1 <= actionsLength ? newIndex + 1 : 0;
			}
		}

		const tsArr = [];

		for (let i = 0; i < foundActions.length; i++) {
			const a = foundActions[i];
			if (a instanceof Action) {
				if (i == newIndex) {
					a.selected = true;
					if (a.elementRef) {
						const top = listRef.offsetHeight + listRef.scrollTop;
						const elementBottom = a.elementRef.offsetHeight + a.elementRef.offsetTop;
						if (top < elementBottom) {
							const scrollTop = elementBottom + 8 - listRef.offsetHeight;							
							listRef.scrollTop = scrollTop;
						}

						if (top - a.elementRef.offsetTop + 110 > listRef.offsetHeight) {
							const scrollTop = a.elementRef.offsetTop - (listRef.offsetHeight / 2);
							console.log('Scroll Top: ',scrollTop);
							listRef.scrollTop = scrollTop;
						}
					}
				} else {
					a.selected = false;
				}
			}

			tsArr.push(a);
		}

		foundActions = tsArr;

		selectedActionIndex = newIndex;
	};

	onMount(() => {
		usePreload();
		colorPreference = getCurrentPreference();
	});
</script>

<svelte:document
	on:keydown={(e) => {
		if (e.ctrlKey && e.key == "k") {
			e.preventDefault();
			palletOpen ? closePallet() : openPallet();
		}

		if (e.key == "Escape") {
			closePallet();
		}

		if (e.key == "ArrowUp" || (e.key == "ArrowDown" && palletOpen)) {
			e.preventDefault();
			onYArrow(e.key);
		}

		if (e.key == "Enter" && palletOpen) {
			handleEnter();
		}
	}} />

<main class="bg-white dark:bg-gray-999">
	<slot />
	<footer
		class="border-t border-gray-100 text-black dark:border-gray-900 dark:text-white print:dark:border-gray-100">
		<div class="flex justify-between px-6 py-4">
			<div>
				<div class="flex place-items-center gap-2">
					<a href="/">
						<img src={logoSVG} alt="aidanbleser.com logo" class="h-5 w-5 rounded-md" />
					</a>
					<small class="text-gray-800 dark:text-gray-500">© 2023</small>
				</div>
			</div>
			<nav
				class="hidden justify-start gap-8 text-sm text-gray-800 dark:text-gray-500 print:hidden md:flex">
				<div class="col flex flex-col gap-1">
					<h6 class="text-base font-semibold text-black dark:text-white"
						>Other projects</h6>
					<a
						href="https://blog.aidanbleser.com"
						target="_blank"
						class="transition-all hover:text-black hover:dark:text-white">
						Blog
					</a>
				</div>
				<div class="col flex flex-col gap-1">
					<h6 class="text-base font-semibold text-black dark:text-white">Socials</h6>
					<a
						href="https://github.com/ieedan"
						target="_blank"
						class="transition-all hover:text-black hover:dark:text-white">
						GitHub
					</a>
				</div>
				<div class="col flex flex-col gap-1">
					<h6 class="text-base font-semibold text-black dark:text-white">Actions</h6>
					<button
						on:click={openPallet}
						class="text-start transition-all hover:text-black hover:dark:text-white">
						<i class="fa-light fa-command fa-sm"></i> K
					</button>
				</div>
			</nav>
			<div class="flex place-items-start justify-end print:hidden">
				<button
					data-selected={colorPreference == ColorPreference.dark}
					on:click={() => choosePreference(ColorPreference.dark)}
					class="flex h-8 w-8 place-items-center justify-center rounded-full text-gray-600
                    transition-all hover:text-black data-[selected=true]:bg-gray-100 data-[selected=true]:text-black dark:text-gray-700
                dark:hover:text-white data-[selected=true]:dark:bg-gray-900 data-[selected=true]:dark:text-white">
					<i class="fa-light fa-moon"></i>
				</button>
				<button
					data-selected={colorPreference == ColorPreference.light}
					on:click={() => choosePreference(ColorPreference.light)}
					class="flex h-8 w-8 place-items-center justify-center rounded-full text-gray-600
                    transition-all hover:text-black data-[selected=true]:bg-gray-100 data-[selected=true]:text-black dark:text-gray-700
                dark:hover:text-white data-[selected=true]:dark:bg-gray-900 data-[selected=true]:dark:text-white">
					<i class="fa-light fa-sun"></i>
				</button>
				<button
					data-selected={colorPreference == ColorPreference.OS}
					on:click={() => choosePreference(ColorPreference.OS)}
					class="flex h-8 w-8 place-items-center justify-center rounded-full text-gray-600
                    transition-all hover:text-black data-[selected=true]:bg-gray-100 data-[selected=true]:text-black dark:text-gray-700
                dark:hover:text-white data-[selected=true]:dark:bg-gray-900 data-[selected=true]:dark:text-white">
					<i class="fa-light fa-desktop"></i>
				</button>
			</div>
		</div>
	</footer>
</main>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-static-element-interactions -->
<div
	class="fixed left-0 top-0 z-10 h-screen w-full bg-white transition-all data-[show=false]:pointer-events-none data-[show=false]:opacity-0
    data-[show=true]:opacity-80 dark:bg-gray-999 print:hidden"
	on:click={closePallet}
	data-show={palletOpen}>
</div>

<div
	class="transtion-all fixed bottom-0 left-1/2 z-50 max-h-[424px] w-full -translate-x-1/2
    overflow-hidden rounded-t-xl border border-gray-100 bg-white data-[show=false]:pointer-events-none
    data-[show=false]:translate-y-3 data-[show=false]:opacity-0 dark:border-gray-900
    dark:bg-gray-999 print:hidden sm:top-1/3 sm:max-w-[640px] sm:-translate-y-1/2 sm:rounded-xl"
	aria-haspopup="listbox"
	aria-disabled={!palletOpen}
	aria-hidden={!palletOpen}
	data-show={palletOpen}>
	<div class="border-b border-gray-100 dark:border-gray-900">
		<search class="flex place-items-center px-2 dark:text-white">
			<i class="fa-light fa-magnifying-glass fa-sm text-gray-500 dark:text-gray-600"></i>
			<input
				class="flex-grow bg-transparent px-2 py-2 outline-none focus:outline-none dark:placeholder:text-gray-600"
				placeholder="Search actions..."
				type="text"
				autocomplete="off"
				autocorrect="false"
				bind:value={search}
				bind:this={searchInput} />
			<button on:click={closePallet}>
				<span
					class="rounded-md border border-gray-100 bg-white px-1 py-1
				text-sm text-black transition-all placeholder:text-gray-500 hover:bg-gray-50
				dark:border-gray-900 dark:bg-gray-999 dark:text-gray-300 dark:hover:bg-gray-925">
					Esc
				</span>
			</button>
		</search>
	</div>
	<ul class="scroll-container dark:scheme-dark relative h-96 overflow-y-auto px-2 py-2" bind:this={listRef}>
		{#if foundActions.length == 0}
			<p
				class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-sm text-gray-500 dark:text-gray-600">
				No results found for "{search}".
			</p>
		{/if}
		{#each foundActions as action, index (action.name)}
			{#if action instanceof Group}
				<div
					class="py-1 data-[show=false]:hidden"
					data-show={-1 <
						foundActions.findIndex((a) => {
							if (a instanceof Group) return;
							return a.group == action.name;
						})}>
					<small class="px-3 text-gray-600 dark:text-gray-500">{action.name}</small>
				</div>
			{:else if action instanceof Action}
				<!-- svelte-ignore a11y-mouse-events-have-key-events -->
				<li
					bind:this={action.elementRef}
					class="group w-full"
					data-selected={action.selected}
					on:mouseleave={() => {
						if (action instanceof Group) return;
						action.selected = false;
					}}
					on:mouseover={() => {
						if (action instanceof Group) return;
						foundActions.forEach(a => {
							if (a instanceof Group) return;
							a.selected = false;
						});
						action.selected = true;
					}}>
					<button
						on:click={action.fn}
						class="flex w-full place-items-center gap-4 rounded-md px-3
						py-2 text-sm text-black transition-all hover:bg-gray-100 group-data-[selected=true]:bg-gray-100
					dark:text-white dark:hover:bg-gray-925 group-data-[selected=true]:dark:bg-gray-925">
						<div
							class="flex h-4 w-4 place-items-center justify-center text-gray-600 dark:text-gray-500">
							{#if action.icon}
								<FontAwesomeIcon icon={action.icon} />
							{:else}
								<img src={action.img} alt="{action.name} icon" />
							{/if}
						</div>
						<span class="flex-grow text-start" data-group={action.group}
							>{action.name}</span>
						{#if action.shortCut}
							<div>
								{#each action.shortCut.split(" ") as sc}
									<span
										class="rounded-md border border-gray-100 bg-white px-1 py-1
										text-sm text-black transition-all placeholder:text-gray-500
									dark:border-gray-900 dark:bg-gray-999 dark:text-gray-300">
										{sc}
									</span>
								{/each}
							</div>
						{/if}
					</button>
				</li>
			{/if}
		{/each}
	</ul>
	<!-- <ul
		class="scroll-container dark:scheme-dark relative h-96 overflow-y-auto px-2 py-2"
		id="action-list">
		{#if foundActions.length == 0}
			<p
				class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-sm text-gray-500 dark:text-gray-600"
				>No results found for "{search}".</p>
		{/if}
		<div
			class="py-1 data-[show=false]:hidden"
			data-show={-1 <
				foundActions.findIndex((a) => a.getAttribute("data-group") == "Information")}>
			<small class="px-3 text-gray-600 dark:text-gray-500">Information</small>
		</div>
		<li class="group w-full data-[show=false]:hidden" data-show={true}>
			<button
				on:click={async () => {
					const response = await get("/resume");
					const json = JSON.stringify(response.body);
					downloadJSON(json, "resume.json");
				}}
				class="flex w-full place-items-center gap-4 rounded-md px-3
				py-2 text-sm text-black transition-all hover:bg-gray-100 group-data-[selected=true]:bg-gray-100
				dark:text-white dark:hover:bg-gray-925 group-data-[selected=true]:dark:bg-gray-925">
				<div
					class="flex h-4 w-4 place-items-center justify-center text-gray-600 dark:text-gray-500">
					<i class="fa-regular fa-arrow-down-to-line"></i>
				</div>
				<span data-group="Information">Download resume JSON</span>
			</button>
		</li>
		<li class="group w-full data-[show=false]:hidden" data-show={true}>
			<button
				on:click={() => window.print()}
				class="flex w-full place-items-center gap-4 rounded-md px-3
				py-2 text-sm text-black transition-all hover:bg-gray-100 group-data-[selected=true]:bg-gray-100
				dark:text-white dark:hover:bg-gray-925 group-data-[selected=true]:dark:bg-gray-925">
				<div
					class="flex h-4 w-4 place-items-center justify-center text-gray-600 dark:text-gray-500">
					<i class="fa-regular fa-print"></i>
				</div>
				<span class="flex-grow text-start" data-group="Information">Print resume</span>
				<div>
					<span
						class="rounded-md border border-gray-100 bg-white px-1 py-1
					text-sm text-black transition-all placeholder:text-gray-500
					dark:border-gray-900 dark:bg-gray-999 dark:text-gray-300">
						Ctrl
					</span>
					<span
						class="rounded-md border border-gray-100 bg-white px-1 py-1
					text-sm text-black transition-all placeholder:text-gray-500
					dark:border-gray-900 dark:bg-gray-999 dark:text-gray-300">
						P
					</span>
				</div>
			</button>
		</li>
		<li class="group w-full data-[show=false]:hidden" data-show={true}>
			<button
				on:click={async () => {
					const response = await get("/skills");
					const json = JSON.stringify(response.body);
					downloadJSON(json, "skills.json");
				}}
				class="flex w-full place-items-center gap-4 rounded-md px-3
				py-2 text-sm text-black transition-all hover:bg-gray-100 group-data-[selected=true]:bg-gray-100
				dark:text-white dark:hover:bg-gray-925 group-data-[selected=true]:dark:bg-gray-925">
				<div
					class="flex h-4 w-4 place-items-center justify-center text-gray-600 dark:text-gray-500">
					<i class="fa-regular fa-arrow-down-to-line"></i>
				</div>
				<span data-group="Information">Download skills JSON</span>
			</button>
		</li>
		<li class="group w-full data-[show=false]:hidden" data-show={true}>
			<button
				on:click={async () => {
					const response = await get("/experience");
					const json = JSON.stringify(response.body);
					downloadJSON(json, "experience.json");
				}}
				class="flex w-full place-items-center gap-4 rounded-md px-3
				py-2 text-sm text-black transition-all hover:bg-gray-100 group-data-[selected=true]:bg-gray-100
				dark:text-white dark:hover:bg-gray-925 group-data-[selected=true]:dark:bg-gray-925">
				<div
					class="flex h-4 w-4 place-items-center justify-center text-gray-600 dark:text-gray-500">
					<i class="fa-regular fa-arrow-down-to-line"></i>
				</div>
				<span data-group="Information">Download experience JSON</span>
			</button>
		</li>
		<li class="group w-full data-[show=false]:hidden" data-show={true}>
			<button
				on:click={async () => {
					const response = await get("/education");
					const json = JSON.stringify(response.body);
					downloadJSON(json, "education.json");
				}}
				class="flex w-full place-items-center gap-4 rounded-md px-3
				py-2 text-sm text-black transition-all hover:bg-gray-100 group-data-[selected=true]:bg-gray-100
				dark:text-white dark:hover:bg-gray-925 group-data-[selected=true]:dark:bg-gray-925">
				<div
					class="flex h-4 w-4 place-items-center justify-center text-gray-600 dark:text-gray-500">
					<i class="fa-regular fa-arrow-down-to-line"></i>
				</div>
				<span data-group="Information">Download education JSON</span>
			</button>
		</li>
		<div
			class="py-1 data-[show=false]:hidden"
			data-show={-1 <
				foundActions.findIndex((a) => a.getAttribute("data-group") == "General")}>
			<small class="px-3 text-gray-900 dark:text-gray-500">General</small>
		</div>
		<li class="group w-full data-[show=false]:hidden" data-show={true}>
			<button
				on:click={() => choosePreference(ColorPreference.dark)}
				class="flex w-full place-items-center gap-4 rounded-md px-3
				py-2 text-sm text-black transition-all hover:bg-gray-100 group-data-[selected=true]:bg-gray-100
				dark:text-white dark:hover:bg-gray-925 group-data-[selected=true]:dark:bg-gray-925">
				<div
					class="flex h-4 w-4 place-items-center justify-center text-gray-600 dark:text-gray-500">
					<i class="fa-light fa-moon"></i>
				</div>
				<span data-group="General">Change theme to Dark</span>
			</button>
		</li>
		<li class="group w-full data-[show=false]:hidden" data-show={true}>
			<button
				on:click={() => choosePreference(ColorPreference.light)}
				class="flex w-full place-items-center gap-4 rounded-md px-3
				py-2 text-sm text-black transition-all hover:bg-gray-100 group-data-[selected=true]:bg-gray-100
				dark:text-white dark:hover:bg-gray-925 group-data-[selected=true]:dark:bg-gray-925">
				<div
					class="flex h-4 w-4 place-items-center justify-center text-gray-600 dark:text-gray-500">
					<i class="fa-light fa-sun"></i>
				</div>
				<span data-group="General">Change theme to Light</span>
			</button>
		</li>
		<li class="group w-full data-[show=false]:hidden" data-show={true}>
			<button
				on:click={() => choosePreference(ColorPreference.OS)}
				class="group flex w-full place-items-center gap-4 rounded-md px-3
				py-2 text-sm text-black transition-all hover:bg-gray-100 group-data-[selected=true]:bg-gray-100
				dark:text-white dark:hover:bg-gray-925 group-data-[selected=true]:dark:bg-gray-925">
				<div
					class="flex h-4 w-4 place-items-center justify-center text-gray-600 dark:text-gray-500">
					<i class="fa-light fa-desktop"></i>
				</div>
				<span data-group="General">Change theme to System</span>
			</button>
		</li>
		<div
			class="py-1 data-[show=false]:hidden"
			data-show={-1 < foundActions.findIndex((a) => a.getAttribute("data-group") == "Links")}>
			<small class="px-3 text-gray-900 dark:text-gray-500">Links</small>
		</div>
		<li class="group w-full data-[show=false]:hidden" data-show={true}>
			<a
				href="https://blog.aidanbleser.com/"
				target="_blank"
				class="flex w-full place-items-center gap-4 rounded-md px-3
				py-2 text-sm text-black transition-all hover:bg-gray-100 group-data-[selected=true]:bg-gray-100
				dark:text-white dark:hover:bg-gray-925 group-data-[selected=true]:dark:bg-gray-925">
				<div
					class="flex h-4 w-4 place-items-center justify-center text-gray-600 dark:text-gray-500">
					<img src={blogSVG} alt="Blog icon" />
				</div>
				<span data-group="Links">Blog</span>
			</a>
		</li>
		<li class="group w-full data-[show=false]:hidden" data-show={true}>
			<a
				href="https://github.com/ieedan"
				target="_blank"
				class="flex w-full place-items-center gap-4 rounded-md px-3
				py-2 text-sm text-black transition-all hover:bg-gray-100 group-data-[selected=true]:bg-gray-100
				dark:text-white dark:hover:bg-gray-925 group-data-[selected=true]:dark:bg-gray-925">
				<div
					class="flex h-4 w-4 place-items-center justify-center text-gray-600 dark:text-gray-500">
					<i class="fa-brands fa-github"></i>
				</div>
				<span data-group="Links">Github</span>
			</a>
		</li>
	</ul> -->
</div>
