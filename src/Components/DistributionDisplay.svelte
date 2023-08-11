<script lang="ts">
	import type { Language } from "../TS/github";

	interface Item extends Language {
		percent?: number;
	}

	export let items: Item[] = [];

    $: {
        calculatePercents(items);
    }

	const calculatePercents = (items) => {
		let totalLines = 0;
		for (let i = 0; i < items.length; i++) {
			totalLines += items[i].lines;
		}

		for (let i = 0; i < items.length; i++) {
			items[i].percent = (items[i].lines / totalLines) * 100;
		}
	};
</script>

<div class="distribution-display">
	{#each items as item}
		<div class={`${item.name} bar`} style={`width: ${item.percent}%`} />
	{/each}
</div>

<style lang="scss">
	.distribution-display {
		display: flex;
		justify-content: start;
		place-items: center;
		gap: 2px;
		width: 100%;

		.bar {
			border-radius: 2px;
            height: 8px;
		}
	}
</style>
