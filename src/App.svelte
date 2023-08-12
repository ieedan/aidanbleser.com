<script lang="ts">
	import { isDarkMode, toggleDarkMode } from "./TS/darkMode";
	import typescriptSVG from "./assets/typescript.svg";
	import csharpSVG from "./assets/csharp.svg";
	import svelteSVG from "./assets/svelte.svg";
	import reactSVG from "./assets/react.svg";
	import mssqlsSVG from "./assets/mssqls.svg";
	import aidanSVG from "./assets/aidan.jpg";
	import { onMount } from "svelte";
	import { getRepoDescription, getRepoLangs, type Language } from "./TS/github";
	import hljs from "highlight.js";
	import { addToolTip } from "./TS/tooltip";
	import ToolTipContent from "./Components/ToolTipContent.svelte";
	import DistributionDisplay from "./Components/DistributionDisplay.svelte";

	let viewIndexKey = "view-index";
	let viewIndex = sessionStorage.getItem(viewIndexKey) ? JSON.parse(sessionStorage.getItem(viewIndexKey)) : 0;
	let gridViewRef: HTMLDivElement = null;
	let optionsRef: HTMLDivElement = null;
	let darkMode = false;
	let dragging = false;
	let draggableShadow: HTMLDivElement = null;
	let menuExpanded = true;
	let modeToggleRef: HTMLButtonElement = null;
	let forwardRef: HTMLButtonElement = null;
	let backRef: HTMLButtonElement = null;
	let expandRef: HTMLButtonElement = null;

	const navbarPositionKey = "navbar-position";

	class RepoStats {
		languages: Language[] = [];
		description: string = "";
	}

	let ipsStats = new RepoStats();
	let scalogStats = new RepoStats();
	let abcomStats = new RepoStats();

	const setDefaultPosition = () => {
		const storedPosition = localStorage.getItem(navbarPositionKey)
			? JSON.parse(localStorage.getItem(navbarPositionKey))
			: null;

		if (storedPosition === null) return;

		optionsRef.style.left = storedPosition.left;
		optionsRef.style.top = storedPosition.top;
		optionsRef.style.right = storedPosition.right;
		optionsRef.style.bottom = storedPosition.bottom;
	};

	// Positions the navbar can snap to
	const positions = [
		{
			name: "top-left",
			left: "0%",
			bottom: "auto",
			top: "0%",
			right: "auto",
		},
		{
			name: "top-right",
			left: "auto",
			top: "0%",
			bottom: "auto",
			right: "0%",
		},
		{
			name: "bottom-left",
			left: "0%",
			top: "auto",
			bottom: "0%",
			right: "auto",
		},
		{
			name: "bottom-right",
			left: "auto",
			top: "auto",
			bottom: "0%",
			right: "0%",
		},
	];

	interface ViewPosition {
		name: string;
		left: string;
		top: string;
	}

	// Screen positions
	const viewPositions: ViewPosition[] = [
		{
			name: "home",
			left: "0%",
			top: "0%",
		},
		{
			name: "skills",
			left: "-33.33%",
			top: "-33.333%",
		},
		{
			name: "why",
			left: "0%",
			top: "-33.333%",
		},
		{
			name: "my work",
			left: "-33.33%",
			top: "-66.666%",
		},
		{
			name: "about",
			left: "0%",
			top: "-66.666%",
		},
		{
			name: "where am i",
			left: "-66.66%",
			top: "-66.66%",
		},
	];

	const shiftBack = () => {
		viewIndex--;
		if (viewIndex < 0) viewIndex = viewPositions.length - 1;
		setPosition();
	};

	const shiftForward = () => {
		viewIndex++;
		if (viewIndex > viewPositions.length - 1) viewIndex = 0;
		setPosition();
	};

	const setPosition = () => {
		let translate = `translate(${viewPositions[viewIndex].left},${viewPositions[viewIndex].top})`;

		gridViewRef.style.transform = translate;

		sessionStorage.setItem(viewIndexKey, JSON.stringify(viewIndex));
	};

	const moving = (e) => {
		if (!dragging) return;

		draggableShadow.style.top = e.clientY + "px";
		draggableShadow.style.left = e.clientX + "px";
	};

	const startDrag = (e) => {
		e.preventDefault();
		dragging = true;
	};

	const endDrag = (e) => {
		if (!dragging) return;
		dragging = false;

		let position;

		const left = window.innerWidth / 2 > e.clientX;
		const top = window.innerHeight / 2 > e.clientY;
		if (left) {
			if (top) {
				position = positions[0];
			} else {
				position = positions[2];
			}
		} else {
			if (top) {
				position = positions[1];
			} else {
				position = positions[3];
			}
		}

		localStorage.setItem(navbarPositionKey, JSON.stringify(position));

		optionsRef.style.left = position.left;
		optionsRef.style.top = position.top;
		optionsRef.style.right = position.right;
		optionsRef.style.bottom = position.bottom;
	};

	const goToView = (index: number) => {
		viewIndex = index;
		setPosition();
	};

	const toggleMode = () => {
		toggleDarkMode();
		darkMode = isDarkMode();
	};

	const stopProp = (e) => {
		e.stopPropagation();
	};

	const toggleExpand = () => {
		menuExpanded = !menuExpanded;
	};

	onMount(async () => {
		const options = {
			modifiers: [
				{
					name: "offset",
					options: {
						offset: [0, 8],
					},
				},
			],
			placement: "top",
		};

		addToolTip(backRef, options);
		addToolTip(forwardRef, options);
		addToolTip(modeToggleRef, options);
		addToolTip(expandRef, options);

		setDefaultPosition();

		if (viewIndex > 0) {
			setPosition();
		}

		darkMode = isDarkMode();

		scalogStats.languages = await getRepoLangs("ieedan", "Scalog");
		ipsStats.languages = await getRepoLangs("ieedan", "ips");
		abcomStats.languages = await getRepoLangs("ieedan", "aidanbleser.com");
		scalogStats.description = await getRepoDescription("ieedan", "Scalog");
		ipsStats.description = await getRepoDescription("ieedan", "ips");

		hljs.highlightAll();
	});
</script>

<svelte:document
	on:pointermove={moving}
	on:pointerup={endDrag}
	on:keydown={(e) => {
		if (e.key === "ArrowRight") {
			shiftForward();
		} else if (e.key === "ArrowLeft") {
			shiftBack();
		} else if (e.ctrlKey) {
			if (e.key === "y") {
				toggleExpand();
			} else if (e.key === "m") {
				toggleMode();
			}
		}
	}}
/>
<div id="tooltip" class="tooltip" role="tooltip">
	<div class="arrow" data-popper-arrow />
</div>
<div class="draggable-shadow" data-visible={dragging} bind:this={draggableShadow} />
<div class="placement-grid" data-visible={dragging}>
	<div class="area top-left"><div class="final-pos" /></div>
	<div class="area top-right"><div class="final-pos" /></div>
	<div class="area bottom-left"><div class="final-pos" /></div>
	<div class="area bottom-right"><div class="final-pos" /></div>
</div>
<main>
	<div
		role="menubar"
		id="options"
		bind:this={optionsRef}
		aria-grabbed={dragging}
		on:pointerdown={startDrag}
		data-expanded={menuExpanded}
	>
		<button id="expand" on:pointerdown={stopProp} on:click={toggleExpand} bind:this={expandRef}>
			{#if menuExpanded}
				<i class="fa-solid fa-minus" />
			{:else}
				<i class="fa-solid fa-plus" />
			{/if}
			<ToolTipContent>
				Toggle Menu
				<div class="keys">
					<div class="key">Ctrl</div>
					<div class="key">Y</div>
				</div>
			</ToolTipContent>
		</button>
		<button id="dark-mode" class="hide" on:pointerdown={stopProp} on:click={toggleMode} bind:this={modeToggleRef}>
			{#if darkMode}
				<div><i class="fa-solid fa-sun" /></div>
			{:else}
				<i class="fa-solid fa-moon" />
			{/if}
			<ToolTipContent>
				Toggle Mode
				<div class="keys">
					<div class="key">Ctrl</div>
					<div class="key">M</div>
				</div>
			</ToolTipContent>
		</button>
		<nav class="hide">
			<button id="back" on:click={shiftBack} on:pointerdown={stopProp} bind:this={backRef}>
				<i class="fa-solid fa-chevron-left" />
				<ToolTipContent>
					Last Page
					<div class="key"><i class="fa-sharp fa-solid fa-arrow-left" /></div>
				</ToolTipContent>
			</button>
			<p id="index">{viewIndex + 1}/{viewPositions.length}</p>
			<button id="forwards" on:click={shiftForward} on:pointerdown={stopProp} bind:this={forwardRef}>
				<i class="fa-solid fa-chevron-right" />
				<ToolTipContent>
					Next Page
					<div class="key"><i class="fa-sharp fa-solid fa-arrow-right" /></div>
				</ToolTipContent>
			</button>
		</nav>
	</div>
	<div class="grid-container" bind:this={gridViewRef}>
		<div id="home" class="page">
			<div class="content-container">
				<h1>Aidan Bleser</h1>
				<p>Full Stack Developer</p>
				<div class="options">
					<button id="see-skills" class="primary" on:click={() => goToView(1)}>See my skills</button>
					<button id="see-why" class="secondary" on:click={() => goToView(2)}> Why hire me?</button>
				</div>
				<div class="socials">
					<a class="github" href="https://github.com/ieedan" target="_blank"
						><i class="fa-brands fa-github" /></a
					>
					<a class="linked-in" href="https://www.linkedin.com/in/aidan-bleser-731b01286" target="_blank"
						><i class="fa-brands fa-linkedin" /></a
					>
					<a class="nuget" href="https://www.nuget.org/profiles/iedan" target="_blank"
						><img
							src="https://upload.wikimedia.org/wikipedia/commons/2/25/NuGet_project_logo.svg"
							alt="Nuget logo"
						/></a
					>
				</div>
			</div>
		</div>
		<div id="ph-1" class="page" />
		<div id="ph-2" class="page" />
		<div id="why" class="page">
			<div class="content-container">
				<h3>Why hire me?</h3>
				<p>
					I have worked in a high pressure manufacturing environment for over 3 years. Here I learned valuable
					troubleshooting and debugging skills that allow me to identify and fix problems quickly.
				</p>
			</div>
		</div>
		<div id="skills" class="page">
			<div class="content-container">
				<h3>My skills</h3>
				<div class="skills-grid">
					<div id="csharp-skill" class="skill">
						<img src={csharpSVG} alt="Csharp logo" data-tool-tip="C#" />
						<p class="name">C#</p>
					</div>
					<div id="typescript-skill" class="skill">
						<img src={typescriptSVG} alt="Typescript logo" data-tool-tip="Typescript" />
						<p class="name">Typescript</p>
					</div>
					<div id="svelte-skill" class="skill">
						<img src={reactSVG} alt="React logo" data-tool-tip="React" />
						<p class="name">React</p>
					</div>
					<div id="svelte-skill" class="skill">
						<img src={svelteSVG} alt="Svelte logo" data-tool-tip="Svelte" />
						<p class="name">Svelte</p>
					</div>
					<div id="mssqls-skill" class="skill">
						<img src={mssqlsSVG} alt="Microsoft SQL Server logo" data-tool-tip="T-SQL" />
						<p class="name">Microsoft SQL Server</p>
					</div>
				</div>
			</div>
		</div>
		<div id="ph-3" class="page" />
		<div id="about" class="page">
			<div class="content-container">
				<img src={aidanSVG} alt="Aidan and his dog Zion" />
				<h3>About me</h3>
				<p>
					In the cooler months of the year I enjoy camping with my Fiance and Dog. I always enjoy playing
					video games my personal favorite unfortunately being Destiny.
				</p>
			</div>
		</div>
		<div id="my-work" class="page">
			<div class="content-container">
				<h3>My projects</h3>
				<ul id="projects">
					<li class="project">
						<div class="section top">
							<pre class="example" lang="bash">
								<code>



C:\WINDOWS\system32>ips 192.168.1.100



								</code>
							</pre>
						</div>
						<div class="section bottom">
							<a href="https://github.com/ieedan/ips" target="_blank">ips</a>
							<p class="description">{ipsStats?.description}</p>
							<DistributionDisplay items={ipsStats?.languages} />
							<ul class="tags">
								{#each ipsStats?.languages as language}
									<li>
										<div class={`${language.name} dot`} />
										<small class="lang-tag">{language.name}</small>
									</li>
								{/each}
							</ul>
						</div>
					</li>
					<li class="project">
						<div class="section top">
							<pre class="example" lang="csharp">
								<code>
using Scalog;
	
string connString = "yourConnectionStringHere";
		
var logger = new Logger(connString, false);
		
logger.LogInfo("Welcome to Scalog");
								</code>
							</pre>
						</div>
						<div class="section bottom">
							<a href="https://github.com/ieedan/ips" target="_blank">Scalog</a>
							<p class="description">{scalogStats?.description}</p>
							<DistributionDisplay items={scalogStats?.languages} />
							<ul class="tags">
								{#each scalogStats?.languages as language}
									<li>
										<div class={`${language.name} dot`} />
										<small class="lang-tag">{language.name}</small>
									</li>
								{/each}
							</ul>
						</div>
					</li>
				</ul>
			</div>
		</div>
		<div id="where-am-i" class="page">
			<div class="content-container">
				<h2>Where am I?</h2>
				<DistributionDisplay items={abcomStats?.languages} />
				<ul class="tags">
					{#each abcomStats?.languages as language}
						<li>
							<div class={`${language.name} dot`} />
							<small class="lang-tag">{language.name}</small>
						</li>
					{/each}
				</ul>
				<small class="description">
					This website was developed using the above technologies. See the source here
					<a href="https://github.com/ieedan/aidanbleser.com" target="_blank">
						<i class="fa-solid fa-up-right-from-square fa-xs"></i>
					</a>
					.
				</small>
			</div>
		</div>
	</div>
</main>

<style lang="scss">
	.draggable-shadow {
		pointer-events: none;
		position: absolute;
		z-index: 1000;
		opacity: 0;
		border-radius: 3px;
		height: 45px;
		width: 171px;
		background-color: var(--hover-color);
		border: 1px dashed var(--border-color);
	}

	.draggable-shadow[data-visible="true"] {
		opacity: 0.7;
	}

	.placement-grid {
		z-index: -1;
		position: absolute;
		height: 100svh;
		width: 100vw;
		background-color: transparent;
		z-index: 99;
		display: grid;
		grid-template-areas:
			"top-left top-right"
			"bottom-left bottom-right";
		display: none;

		.area {
			.final-pos {
				pointer-events: none;
				position: absolute;
				z-index: 1000;
				opacity: 1;
				margin: 5px;
				border-radius: 5px;
				height: 45px;
				width: 171px;
				background-color: transparent;
				border: 1px dashed var(--color);
			}
		}

		.area:hover {
			.final-pos {
				background-color: var(--hover-color);
				transition: 150ms all;
			}
		}

		.top-left {
			.final-pos {
				top: 0%;
			}
		}

		.top-right {
			.final-pos {
				right: 0%;
			}
		}

		.bottom-right {
			.final-pos {
				bottom: 0%;
				right: 0%;
			}
		}

		.bottom-left {
			.final-pos {
				bottom: 0%;
				left: 0%;
			}
		}
	}

	.placement-grid[data-visible="true"] {
		opacity: 0.7;
		display: grid;
	}

	main {
		overflow: hidden;
		height: 100%;

		#options {
			background-color: var(--background-color);
			opacity: 0.9;
			z-index: 9999;
			display: flex;
			padding: 5px 10px;
			right: 0%;
			justify-content: end;
			place-items: center;
			position: fixed;
			top: 0%;
			border-radius: 5px;
			box-shadow: 0px 3px 7px var(--shadow-color);
			gap: 3px;
			margin: 5px;

			#expand {
				display: none;
			}

			button {
				font-size: 16px;
				border-radius: 3px;
				background-color: transparent;
				display: flex;
				justify-content: center;
				place-items: center;
				width: 35px;
				height: 35px;
				padding: 5px;
				transition: 150ms all;
				border: none;
				color: var(--color);
			}

			button:hover {
				background-color: var(--hover-color);
				cursor: pointer;
			}

			#dark-mode {
				border: none;
				color: var(--color);
				margin-right: 5px;
			}

			nav {
				display: flex;
				justify-content: center;
				place-items: center;
				button {
					border: none;
					color: var(--color);
				}
			}

			#index {
				text-align: center;
				vertical-align: center;
				font-size: 14px;
				margin: 5px;
				color: var(--subtle-text-color);
				user-select: none;
				width: 28px;
				font-family: var(--code-font-family);
			}
		}

		#options:hover {
			cursor: move;
		}

		@media (max-width: 640px) {
			#options {
				bottom: 0%;
				right: 0%;
				top: auto;
				left: auto;

				#expand {
					display: flex;
					i {
						transition: 150ms rotate;
					}
				}
			}

			#options[data-expanded="false"] {
				#expand {
					i {
						transform: rotate(180deg);
					}
				}

				.hide {
					display: none;
				}
			}
		}

		.grid-container {
			overflow: hidden;
			position: relative;
			width: 300%;
			height: 300%;
			display: grid;
			grid-template-areas:
				"top-left top-middle top-right"
				"middle-left middle-middle middle-right"
				"bottom-left bottom-middle bottom-right";
			transition: 500ms transform;
			margin: 0px;
			padding: 0px;

			.page {
				margin: 0px;
				display: flex;
				justify-content: center;
				place-items: center;
				flex-direction: column;
				height: 100svh;
				width: 100vw;

				.content-container {
					display: flex;
					justify-content: center;
					place-items: center;
					flex-direction: column;
					padding: 30px;
					text-align: center;

					h2 {
						text-align: center;
						user-select: none;
						font-size: 75px;
						margin: 10px;
					}

					h3 {
						text-align: center;
						user-select: none;
						font-size: 50px;
						margin: 10px;
					}

					p {
						max-width: 600px;
						font-size: 20px;
					}

					h1 {
						user-select: none;
						font-size: 100px;
						margin: 0px;
						line-height: 1em;
					}

					p {
						margin: 0px;
						font-size: 40px;
						color: var(--subtle-text-color);
					}

					@media (max-width: 350px) {
						h1 {
							font-size: 75px;
						}

						p {
							font-size: 25px;
						}
					}

					@media (max-width: 640px) {
						h2 {
							font-size: 50px;
						}

						p {
							font-size: 14px;
						}
					}

					.tags {
						display: flex;
						justify-content: center;
						place-items: center;
						list-style: none;
						flex-wrap: wrap;
						padding: 0px;
						margin: 0px;
						gap: 7px;
						margin-top: 5px;

						li {
							display: flex;
							justify-content: center;
							place-items: center;
							.dot {
								width: 5px;
								height: 5px;
								border-radius: 50%;
							}

							.lang-tag {
								color: var(--color);
								padding: 3px 6px;
								border-radius: 12px;
								font-family: var(--code-font-family);
							}
						}
					}
				}

				.content-container:has(h3) {
					p {
						font-size: 25px;
					}

					@media (max-width: 350px) {
						h3 {
							font-size: 35px;
						}

						p {
							font-size: 16px;
						}
					}
				}
			}

			#home {
				grid-area: "top-left";
				.content-container {
					.options {
						width: 100%;
						display: flex;
						justify-content: center;
						place-items: center;
						gap: 10px;
						margin-top: 15px;

						button {
							height: 45px;
							border-radius: 8px;
							padding: 12px 20px;
							transition: 150ms all;
							font-weight: 600;
						}

						button:hover {
							cursor: pointer;
						}

						.primary {
							border: none;
							background: linear-gradient(
								to bottom right,
								var(--primary-color),
								var(--primary-color-light)
							);
							color: var(--primary-font-color);
						}

						.primary:hover {
							filter: brightness(110%);
						}

						.secondary {
							border: 3px solid var(--color);
							background-color: transparent;
							color: var(--color);
						}

						.secondary:hover {
							background-color: var(--color);
							color: var(--background-color);
						}
					}

					@media (max-width: 285px) {
						.options {
							flex-direction: column;
						}
					}

					.socials {
						display: flex;
						justify-content: center;
						place-items: center;
						margin-top: 20px;
						gap: 20px;

						a {
							font-size: 30px;

							img {
								width: 30px;
								height: 30px;
							}
						}

						a:has(img) {
							display: flex;
							justify-content: center;
							place-items: center;
						}

						.github {
							color: var(--color);
						}

						.linked-in {
							color: #0a66c2;
						}
					}
				}
			}

			#skills {
				grid-area: "middle-middle";
				.content-container {
					.skills-grid {
						gap: 40px;
						display: grid;
						grid-template-areas: "left middle right";
						justify-content: center;
						place-items: top;
						flex-wrap: wrap;
						max-width: 500px;

						.skill {
							display: flex;
							justify-content: center;
							place-items: center;
							gap: 5px;
							flex-direction: column;
							margin: 35px;

							img {
								width: 125px;
								height: 125px;
								margin-bottom: 5px;
							}

							#svelte-skill {
							}

							#csharp-skill {
								scale: 1.2;
							}

							#mssqls-skill {
								scale: 1.2;
							}

							#typescript-skill {
								scale: 1;
							}

							.name {
								display: none;
								font-weight: bold;
								font-size: 20px;
								font-family: var(--code-font-family);
								color: var(--color);
							}

							.description {
								display: none;
								font-size: 16px;
								max-width: 250px;
								font-family: var(--code-font-family);
							}
						}
					}

					@media (max-width: 640px) {
						.description {
							display: none;
						}

						.skills-grid {
							display: flex;
							flex-direction: column;

							.skill {
								margin: 0px;
								img {
									width: 75px;
									height: 75px;
								}
							}
						}

						@media (max-height: 750px) {
							.skills-grid {
								gap: 15px;

								.skill {
									img {
										height: 50px;
										width: 50px;
									}
								}
							}
						}
					}
				}
			}

			#why {
				grid-area: "middle-left";
				.content-container {
				}
			}

			#about {
				grid-area: "bottom-middle";
				.content-container {
					img {
						width: 250px;
						border-radius: 50%;
					}

					@media (max-width: 640px) {
						img {
							width: 150px;
						}
					}

					@media (max-width: 350px) {
						img {
							width: 100px;
						}
					}
				}
			}

			#my-work {
				grid-area: "bottom-left";
				.content-container {
					text-align: center;

					h2 {
						text-align: center;
					}

					@media (max-width: 1100px) {
						h2 {
							font-size: 50px;
						}
					}

					#projects {
						display: flex;
						justify-content: center;
						place-items: center;
						align-items: stretch;
						list-style: none;
						text-align: start;
						gap: 10px;
						flex-wrap: wrap;
						margin: 0px;
						padding: 0px;

						.project {
							display: grid;
							grid-template-areas:
								"top"
								"bottom";
							box-shadow: 0px 1px 5px var(--shadow-color);
							padding: 20px;
							border-radius: 5px;
							max-width: 523px;

							.section {
								display: flex;
								justify-content: center;
								place-items: start;
								flex-direction: column;
								height: 100%;
							}

							.top {
								pre {
									height: 100%;
									margin: 0px;

									code {
										padding-top: 0px;
										padding-bottom: 0px;

										background-color: var(--code-color);
									}
								}
							}

							@media (max-width: 535px) {
								.top {
									display: none;
								}
							}

							.bottom {
								a {
									margin: 0px;
									font-size: 24px;
									margin-bottom: 10px;
									text-decoration: none;
									color: var(--color);
									font-weight: bold;
								}

								p.description {
									font-size: 16px;
									margin: 0px;
									margin-bottom: 15px;
								}
							}
						}
					}
				}
			}

			#ph-1 {
				grid-area: "top-right";
			}

			#ph-2 {
				grid-area: "middle-right";
			}

			#where-am-i {
				grid-area: "bottom-right";
				.content-container {
					a {
						color: var(--color);
					}

					.description {
						color: var(--subtle-text-color);
						margin-top: 15px;
					}
				}
			}

			#ph-4 {
				grid-area: "top-middle";
			}
		}
	}
</style>
