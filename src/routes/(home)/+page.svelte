<script lang="ts">
	import Sponsors from '$lib/features/sponsors/sponsors.svelte';
	import * as Sidebar from '$lib/components/home/sidebar';
	import Projects from '$lib/features/projects/projects.svelte';
	import { socials } from '$lib/features/socials/socials';
	import Status from '$lib/features/status/status.svelte';
</script>

<div class="relative flex w-full max-w-5xl border border-border">
	<div class="flex flex-1 flex-col">
		<div class="flex-1 p-4">
			<h1 class="text-2xl">Aidan Bleser</h1>
			<p class="text-sm text-muted-foreground">Frontend Engineer</p>
		</div>
		<footer class="border-t border-border p-4">
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
	</div>

	<Sidebar.Root>
		<Projects />
		<Sponsors />
	</Sidebar.Root>
</div>
