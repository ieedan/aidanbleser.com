<script lang="ts">
	import { page } from "$app/stores";
	import { faLink } from "@fortawesome/pro-light-svg-icons";
	import type { HeadingType } from "./link-heading.types";
	import { FontAwesomeIcon } from "@fortawesome/svelte-fontawesome";

	export let type: HeadingType;
	export let id: string;
    let className = "";
    export { className as class }
</script>

<a href="#{id}" class="flex place-items-center gap-2 group hover:underline {className}">
	<svelte:element
		this={type}
		class="link-heading flex place-items-center font-bold"
		{id}
		data-active={$page.url.hash == `#${id}`}>
		<slot />
	</svelte:element>
    <div class="hidden group-hover:block">
        <FontAwesomeIcon class="fa-xs" icon={faLink} />
    </div>
</a>

<style lang="postcss">
	h1.link-heading {
		@apply text-4xl;
	}

	h2.link-heading {
		@apply text-3xl;
	}

	h3.link-heading {
		@apply text-2xl;
	}

	h4.link-heading {
		@apply text-xl;
	}

	h5.link-heading {
		@apply text-lg;
	}

	h6.link-heading {
		@apply text-base;
	}
</style>
