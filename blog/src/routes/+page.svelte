<script lang="ts">
    export let data;
</script>

{#each data.posts as post}
    <a href="/{post.name}">{post.name}</a>
{/each}