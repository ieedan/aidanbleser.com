<script lang="ts">
    export let data;
</script>

<svelte:head>
    <title>Posts | {data.post.name}</title>
</svelte:head>

<main class="flex flex-col place-items-center px-4">
    <div class="prose prose-zinc dark:prose-invert py-4 prose-code:whitespace-pre-wrap">
        {@html data.post.content}
    </div>
</main>
