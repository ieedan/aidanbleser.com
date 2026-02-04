<script lang="ts">
	import { page } from '$app/state';
	import { Button } from '$lib/components/ui/button';
	import './layout.css';

	const statusMessages = {
		404: 'Not sure how you got here. Lets get you back home.',
		500: 'How on earth did you do that? Try a different page.'
	};
</script>

<main class="flex min-h-dvh flex-col items-center justify-center p-4">
	<h1 class="text-2xl" style="font-size: 64px;">{page.status}</h1>
	<p class="text-lg text-muted-foreground">
		{statusMessages[page.status as keyof typeof statusMessages]}
	</p>
	<Button href="/" style="margin-top: 1rem;">Go Home</Button>
</main>
