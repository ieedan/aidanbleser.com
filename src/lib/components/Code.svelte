<script lang="ts">
	import { faCheck, faClone } from "@fortawesome/pro-light-svg-icons";
	import { FontAwesomeIcon } from "@fortawesome/svelte-fontawesome";
	import hljs from "highlight.js";
	import "highlight.js/styles/github-dark.css";
	import { onMount } from "svelte";

	let codeRef: HTMLElement;
    let className = "";
	export let fileName: string = "";
    export { className as class }

	let copied = false;

	const copy = () => {
		navigator.clipboard.writeText(codeRef.innerText).then(() => {
			copied = true;
			setTimeout(() => (copied = false), 1000);
		});
	};

	onMount(() => {
		hljs.highlightElement(codeRef);
	});
</script>

<div class="relative border border-gray-900 rounded-md overflow-hidden bg-gray-999 group max-w-full {className}">
	<div class="flex place-items-end justify-between border-b border-gray-900 px-1 py-1">
		<div>{fileName}</div>
		<button class="flex place-items-center justify-center rounded-md border 
		border-gray-900 text-gray-400 hover:bg-gray-900 transition-all w-6 h-6" on:click={copy}>
			{#if copied}
				<div class="flex place-items-center justify-center">
					<FontAwesomeIcon class="fa-xs" icon={faCheck}/>
				</div>
			{:else}
				<div class="flex place-items-center justify-center">
					<FontAwesomeIcon class="fa-xs" icon={faClone}/>
				</div>
			{/if}
		</button>
	</div>
	<pre><code class="!bg-gray-999 whitespace-pre-wrap" bind:this={codeRef}><slot /></code></pre>
</div>
