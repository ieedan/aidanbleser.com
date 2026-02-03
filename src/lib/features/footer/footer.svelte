<script lang="ts">
	import { cn } from '$lib/utils';
	import { socials } from '../socials/socials';
	import Status from '../status/status.svelte';

	let { class: className }: { class: string } = $props();
</script>

<footer class={cn('border-t border-border p-4', className)}>
	<div class="flex w-full items-center justify-between">
		<div class="flex items-center gap-6">
			{#each socials as social (social.name)}
				<a href={social.url} aria-label={social.name} target="_blank">
					<social.logo class="size-4" />
				</a>
			{/each}
		</div>
		<div>
			<Status />
		</div>
	</div>
</footer>
