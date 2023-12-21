<script lang="ts">
	import { faCheck, faClone } from "@fortawesome/pro-light-svg-icons";
	import { FontAwesomeIcon } from "@fortawesome/svelte-fontawesome";
	import { onMount } from "svelte";
	import { getHighlighter } from "shikiji";

	let codeRef: HTMLElement;
	export let lang = "";
	let className = "";
	export let fileName: string = "";
	export { className as class };

	const THEME = "dark-plus";

	let copied = false;

	const copy = () => {
		navigator.clipboard.writeText(codeRef.innerText).then(() => {
			copied = true;
			setTimeout(() => (copied = false), 1000);
		});
	};

	onMount(async () => {
		const highlighter = await getHighlighter({
			themes: [THEME],
			langs: [lang],
		});
		// hljs.highlightElement(codeRef);
		codeRef.innerHTML = highlighter.codeToHtml(codeRef.innerText, {
			lang: lang,
			theme: THEME,
		});
	});
</script>

<div
	class="group relative max-w-full overflow-hidden rounded-md border border-gray-900 bg-gray-999 {className}">
	<div class="flex place-items-end justify-between border-b border-gray-900 px-1 py-1">
		<div>{fileName}</div>
		<button
			class="flex h-6 w-6 place-items-center justify-center
		rounded-md border border-gray-900 text-gray-400 transition-all hover:bg-gray-900"
			on:click={copy}>
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
	<pre class="px-4 py-2"
		><code class="whitespace-pre-wrap !bg-gray-999" bind:this={codeRef}><slot /></code></pre>
</div>
