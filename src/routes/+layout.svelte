<script lang="ts">
	import { onMount, setContext } from "svelte";
	import "../app.css";
	import { faGithub, faLinkedin, faXTwitter } from "@fortawesome/free-brands-svg-icons";
	import { FontAwesomeIcon } from "@fortawesome/svelte-fontawesome";
	import {
		faMoon,
		faSun,
		faDesktop,
		type IconDefinition,
		faMagnifyingGlass,
		faCommand,
		faBooks,
		faHouse,
	} from "@fortawesome/pro-light-svg-icons";
	import { faArrowDownToLine, faPrint } from "@fortawesome/pro-regular-svg-icons";
	import logoSVG from "$lib/assets/favicon.svg";
	import blogSVG from "$lib/assets/blog-icon.svg";
	import { ColorPreference, changePreference, getCurrentPreference } from "$lib/TS/dark-mode";
	import { get } from "$lib/TS/api";
	import { goto } from "$app/navigation";
	import { isMobile } from "$lib/TS/is-mobile";

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
		iconClass?: string;
		closeOnCommand: boolean;
		constructor(
			name: string,
			fn: () => void,
			group: string,
			shortCut?: string,
			icon?: IconDefinition,
			img?: string,
			iconClass?: string,
			closeOnCommand: boolean = false,
		) {
			this.name = name;
			this.fn = fn;
			this.group = group;
			this.shortCut = shortCut;
			this.icon = icon;
			this.img = img;
			this.iconClass = iconClass;
			this.closeOnCommand = closeOnCommand;
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
		new Action("Print", () => window.print(), "Information", "Ctrl P", faPrint),
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
		new Action(
			"Download projects JSON",
			async () => {
				const response = await get("/projects");
				const json = JSON.stringify(response.body);
				downloadJSON(json, "projects.json");
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
			"Home",
			() => goto("/"),
			"Links",
			undefined,
			faHouse,
			undefined,
			undefined,
			true,
		),
		new Action(
			"Documentation",
			() => goto("/docs"),
			"Links",
			undefined,
			faBooks,
			undefined,
			undefined,
			true,
		),
		new Action(
			"Blog",
			() => goto("blog"),
			"Links",
			undefined,
			undefined,
			blogSVG,
			undefined,
			true,
		),
		new Action(
			"Github",
			() => window.open("https://github.com/ieedan", "_blank")?.focus(),
			"Links",
			undefined,
			faGithub,
			undefined,
			"text-black dark:text-white",
		),
		new Action(
			"LinkedIn",
			() =>
				window
					.open("https://www.linkedin.com/in/aidan-bleser-731b01286", "_blank")
					?.focus(),
			"Links",
			undefined,
			faLinkedin,
			undefined,
			"text-liBlue",
		),
		new Action(
			"X / Twitter",
			() => window.open("https://twitter.com/theaidanbleser", "_blank")?.focus(),
			"Links",
			undefined,
			faXTwitter,
			undefined,
			"text-black dark:text-white",
		),
	];

	$: foundActions = actions.filter((a) => {
		if (a instanceof Group) return true;
		return a.name.toLowerCase().includes(search.toLowerCase());
	});

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
		if (!isMobile()) searchInput.focus();
	};

	setContext("showActions", openPallet);

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
		if (action.closeOnCommand) closePallet();
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
							const scrollTop = a.elementRef.offsetTop - listRef.offsetHeight / 2;
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
		colorPreference = getCurrentPreference();
	});
</script>

<svelte:head>
	<title>aidanbleser.com</title>
</svelte:head>

<svelte:document
	on:keydown={(e) => {
		if (e.ctrlKey && e.key == "k") {
			e.preventDefault();
			palletOpen ? closePallet() : openPallet();
		}

		if (e.key == "Escape") {
			closePallet();
		}

		if ((e.key == "ArrowUp" || e.key == "ArrowDown") && palletOpen) {
			e.preventDefault();
			onYArrow(e.key);
		}

		if (e.key == "Enter" && palletOpen) {
			handleEnter();
		}
	}}
/>

<main class="bg-white dark:bg-gray-999 print:dark:bg-white">
	<slot />
	<footer
		class="flex justify-center border-t border-gray-100
		text-black dark:border-gray-900 dark:text-white print:dark:border-gray-100"
	>
		<div class="flex min-h-[120px] w-full max-w-7xl justify-between px-6 py-4">
			<div class="flex h-8 place-items-center justify-start">
				<div class="flex place-items-center gap-2">
					<a href="/">
						<img src={logoSVG} alt="aidanbleser.com logo" class="h-5 w-5 rounded-md" />
					</a>
					<small class="text-gray-800 dark:text-gray-500">© 2023</small>
				</div>
			</div>
			<nav
				class="hidden justify-start gap-8 text-sm text-gray-800 print:hidden md:flex dark:text-gray-500"
			>
				<div class="col flex flex-col gap-1">
					<h6 class="text-base font-semibold text-black dark:text-white"
						>Other Links</h6
					>
					<a href="/blog" class="transition-all hover:text-black hover:dark:text-white">
						Blog
					</a>
					<a href="/docs" class="transition-all hover:text-black hover:dark:text-white">
						Docs
					</a>
				</div>
				<div class="col flex flex-col gap-1">
					<h6 class="text-base font-semibold text-black dark:text-white">Socials</h6>
					<a
						href="https://github.com/ieedan"
						target="_blank"
						class="transition-all hover:text-black hover:dark:text-white"
					>
						GitHub
					</a>
					<a
						href="https://www.linkedin.com/in/aidan-bleser-731b01286"
						target="_blank"
						class="transition-all hover:text-black hover:dark:text-white"
					>
						LinkedIn
					</a>
					<a
						href="https://twitter.com/theaidanbleser"
						target="_blank"
						class="transition-all hover:text-black hover:dark:text-white"
					>
						X / Twitter
					</a>
				</div>
				<div class="col flex flex-col gap-1">
					<h6 class="text-base font-semibold text-black dark:text-white">Actions</h6>
					<button
						on:click={openPallet}
						class="text-start transition-all hover:text-black hover:dark:text-white"
					>
						<FontAwesomeIcon class="fa-sm" icon={faCommand} /> K
					</button>
				</div>
			</nav>
			<div class="flex place-items-start justify-end print:hidden">
				<button
					data-selected={colorPreference == ColorPreference.dark}
					on:click={() => choosePreference(ColorPreference.dark)}
					class="flex h-8 w-8 place-items-center justify-center rounded-full text-gray-600
                    transition-all hover:text-black data-[selected=true]:bg-gray-100 data-[selected=true]:text-black dark:text-gray-700
                dark:hover:text-white data-[selected=true]:dark:bg-gray-900 data-[selected=true]:dark:text-white"
				>
					<FontAwesomeIcon icon={faMoon} />
				</button>
				<button
					data-selected={colorPreference == ColorPreference.light}
					on:click={() => choosePreference(ColorPreference.light)}
					class="flex h-8 w-8 place-items-center justify-center rounded-full text-gray-600
                    transition-all hover:text-black data-[selected=true]:bg-gray-100 data-[selected=true]:text-black dark:text-gray-700
                dark:hover:text-white data-[selected=true]:dark:bg-gray-900 data-[selected=true]:dark:text-white"
				>
					<FontAwesomeIcon icon={faSun} />
				</button>
				<button
					data-selected={colorPreference == ColorPreference.OS}
					on:click={() => choosePreference(ColorPreference.OS)}
					class="flex h-8 w-8 place-items-center justify-center rounded-full text-gray-600
                    transition-all hover:text-black data-[selected=true]:bg-gray-100 data-[selected=true]:text-black dark:text-gray-700
                dark:hover:text-white data-[selected=true]:dark:bg-gray-900 data-[selected=true]:dark:text-white"
				>
					<FontAwesomeIcon icon={faDesktop} />
				</button>
			</div>
		</div>
	</footer>
</main>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-static-element-interactions -->
<div
	class="fixed left-0 top-0 z-[49] h-screen w-full bg-white transition-all data-[show=false]:pointer-events-none data-[show=false]:opacity-0
    data-[show=true]:opacity-80 print:hidden dark:bg-gray-999"
	on:click={closePallet}
	data-show={palletOpen}
>
</div>

<div
	class="transtion-all fixed bottom-0 left-1/2 z-50 max-h-[424px] w-full -translate-x-1/2
    overflow-hidden rounded-t-xl border border-gray-100 bg-white data-[show=false]:pointer-events-none
    data-[show=false]:translate-y-3 data-[show=false]:opacity-0 print:hidden
    sm:top-1/3 sm:max-w-[640px] sm:-translate-y-1/2 sm:rounded-xl dark:border-gray-900 dark:bg-gray-999"
	aria-haspopup="listbox"
	aria-disabled={!palletOpen}
	aria-hidden={!palletOpen}
	data-show={palletOpen}
>
	<div class="border-b border-gray-100 dark:border-gray-900">
		<search class="flex place-items-center px-2 text-gray-500 dark:text-gray-600">
			<FontAwesomeIcon class="fa-sm" icon={faMagnifyingGlass} />
			<input
				class="flex-grow bg-transparent px-2 py-2 outline-none focus:outline-none dark:text-white dark:placeholder:text-gray-600"
				placeholder="Search actions..."
				type="text"
				autocomplete="off"
				autocorrect="false"
				bind:value={search}
				bind:this={searchInput}
			/>
			<button on:click={closePallet}>
				<span
					class="rounded-md border border-gray-100 bg-white px-1 py-1
				text-sm text-black transition-all placeholder:text-gray-500 hover:bg-gray-50
				dark:border-gray-900 dark:bg-gray-999 dark:text-gray-300 dark:hover:bg-gray-925"
				>
					Esc
				</span>
			</button>
		</search>
	</div>
	<ul
		class="scroll-container dark:scheme-dark relative h-96 overflow-y-auto px-2 py-2"
		bind:this={listRef}
	>
		{#if foundActions.length == 0}
			<p
				class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-sm text-gray-500 dark:text-gray-600"
			>
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
						})}
				>
					<small class="px-3 text-gray-600 dark:text-gray-500">{action.name}</small>
				</div>
			{:else if action instanceof Action}
				<!-- svelte-ignore a11y-mouse-events-have-key-events -->
				<li
					bind:this={action.elementRef}
					class="group w-full"
					data-selected={action.selected}
					on:mousemove={() => {
						if (action instanceof Group) return;
						foundActions.forEach((a) => {
							if (a instanceof Group) return;
							a.selected = false;
						});
						action.selected = true;
						selectedActionIndex = index;
					}}
				>
					<button
						on:click={() => {
							if (action instanceof Group) return;
							action.fn();
							if (action.closeOnCommand) closePallet();
						}}
						class="flex w-full place-items-center gap-4 rounded-md px-3
						py-2 text-sm text-black transition-all group-data-[selected=true]:bg-gray-100
					dark:text-white group-data-[selected=true]:dark:bg-gray-925"
					>
						<div
							class="flex h-4 w-4 place-items-center justify-center {action.iconClass ??
								'text-gray-600 dark:text-gray-500'}"
						>
							{#if action.icon}
								<FontAwesomeIcon icon={action.icon} />
							{:else}
								<img src={action.img} alt="{action.name} icon" />
							{/if}
						</div>
						<span class="flex-grow text-start" data-group={action.group}
							>{action.name}</span
						>
						{#if action.shortCut}
							<div>
								{#each action.shortCut.split(" ") as sc}
									<span
										class="rounded-md border border-gray-100 bg-white px-1 py-1
										text-sm text-black transition-all placeholder:text-gray-500
									dark:border-gray-900 dark:bg-gray-999 dark:text-gray-300"
									>
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
</div>
