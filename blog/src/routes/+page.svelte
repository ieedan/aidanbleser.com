<script lang="ts">
	import { faChevronRight } from "@fortawesome/pro-regular-svg-icons";
	import { FontAwesomeIcon } from "@fortawesome/svelte-fontawesome";

	export let data;
</script>

<main class="flex flex-col place-items-center">
	<h1 class="text-6xl font-semibold py-10">Posts</h1>
	<ul class="flex flex-col">
		{#each data.posts as post}
			<li class="rounded-lg px-6 py-4 transition-all hover:bg-component-background-hover max-w-[576px]">
                <a href="/{post.name}">
                    <h3 class="font-semibold text-lg">
                        {post.name}
                    </h3>
                    <div class="prose prose-zinc dark:prose-invert">
                        {@html post.summary}
                    </div>
                    <span class="flex place-items-center gap-1 text-blue-700">Read More <FontAwesomeIcon icon={faChevronRight} size="xs"/></span>
                </a>
            </li>
		{/each}
	</ul>
</main>
