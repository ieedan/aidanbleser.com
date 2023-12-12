<script lang="ts">
    import '$lib/css/docs/doc.css';
</script>

<div class="flex w-full flex-col place-items-center justify-center">
	<div class="pt-8 pb-4 px-8 w-full">
        <h1 class="text-4xl"> api.aidanbleser.com reference </h1>
        <small>{new Date('12/12/2023').toLocaleDateString()}</small>
    </div>
    <p class="py-1">You can interact with the aidanbleser API using <code>curl</code> or a fetch ui. To start try running:</p>
    <code>curl https://api.aidanbleser.com</code>
</div>

<style lang="postcss">
	p {
		@apply w-full max-w-3xl px-8 text-start;
	}

    small {
        @apply dark:text-gray-500
    }

	code {
		@apply rounded-lg bg-gray-100 px-1 py-[2px] font-serif text-sm text-black dark:bg-gray-900 dark:text-white;
	}

	h1,
	h2,
	h3,
	h4,
	h5,
	h6 {
		@apply w-full text-start font-medium;
	}

	a {
		@apply text-blue-600 hover:underline dark:text-blue-500;
	}

	ul {
		list-style-type: none;
	}

	li::before {
		content: "- ";
		padding-right: 5px;
		@apply text-gray-400 dark:text-gray-600;
	}
</style>