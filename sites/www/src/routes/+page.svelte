<script lang="ts">
	import { typewriter } from '$lib/transitions/typewriter.svelte';
	import { projects } from '$lib/info/projects';
	import { IsMounted } from 'runed';

	const isMounted = new IsMounted();
</script>

<svelte:head>
	<title>Home - aidanbleser.com</title>
	<meta name="description" content="Aidan Bleser's personal website." />
</svelte:head>

<main class="flex min-h-svh place-items-center justify-center font-serif">
	<div class="flex w-[336px] flex-col md:w-[500px]">
		{#if isMounted.current}
			<div class="flex min-h-12 place-items-end md:min-h-[72px]">
				<h1 class="text-5xl md:text-7xl" transition:typewriter={{ delay: 100, speed: 0.75 }}>
					Aidan Bleser
				</h1>
				<div class="h-2 w-6 animate-caret-blink bg-primary"></div>
			</div>
		{/if}
		<span class="text-muted-foreground">
			aka:
			<a target="_blank" href="https://github.com/ieedan" class="underline"> ieedan </a>
		</span>
		<div class="flex flex-col gap-5 pt-4">
			<p>
				I'm a passionate developer from San Antonio, TX. I build things that I find useful and I
				hope others will too.
			</p>
			<div class="flex flex-col gap-2">
				<p>Check out some of the things I have built:</p>
				<ul>
					{#each projects as project}
						<li>
							-
							<a
								target="_blank"
								href={project.link}
								class="text-nowrap text-muted-foreground transition-all hover:text-foreground"
							>
								{project.name}
							</a>
						</li>
					{/each}
				</ul>
			</div>
		</div>
	</div>
</main>
