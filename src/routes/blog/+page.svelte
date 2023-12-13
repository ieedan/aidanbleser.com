<script lang="ts">
	import { faChevronRight } from "@fortawesome/pro-regular-svg-icons";
	import { FontAwesomeIcon } from "@fortawesome/svelte-fontawesome";

	export let data;
</script>

<section class="h-16"></section>
<h1 class="text-4xl font-bold">Blog posts</h1>
<section class="h-16"></section>
<ol class="flex flex-col gap-2 sm:gap-0">
	{#each data.summaries as post}
		<li class="relative flex place-items-start gap-4 px-6 sm:h-44 sm:px-0 md:h-40">
			<small class="hidden w-20 py-4 text-center text-gray-600 dark:text-gray-500 md:block"
				>{post.date.toLocaleDateString()}</small>
			<div class="hidden h-full w-[1px] bg-gray-100 dark:bg-gray-900 sm:block"></div>
			<span
				class="absolute -left-[5px] top-3 hidden h-3
            w-3 rounded-full border-2 border-gray-200 bg-white dark:border-gray-500 dark:bg-gray-999 sm:block md:left-[91px] md:top-[19px]"
			></span>
			<a
				href="/blog/{post.title}"
				class="flex w-full max-w-xl flex-col rounded-lg px-4 py-2 transition-all hover:bg-gray-50 hover:dark:bg-gray-925">
				<small class="text-gray-600 dark:text-gray-500 md:hidden"
					>{post.date.toLocaleDateString()}</small>
				<h6 class="py-1 font-semibold">{post.title}</h6>
				<p class="text-gray-700 dark:text-gray-300">{post.hook}</p>
				<span
					class="flex place-items-center gap-1 py-3 text-sm text-blue-500 dark:text-blue-400">
					Read More
					<FontAwesomeIcon class="fa-2xs" icon={faChevronRight} />
				</span>
			</a>
		</li>
	{/each}
</ol>
