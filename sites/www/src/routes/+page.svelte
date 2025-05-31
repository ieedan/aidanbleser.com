<script lang="ts">
	import { typewriter } from '$lib/transitions/typewriter.svelte';
	import { projects } from '$lib/info/projects';
	import { IsMounted } from 'runed';
	import { openSource } from '$lib/info/open-source';

	const isMounted = new IsMounted();
</script>

<svelte:head>
	<title>Home - aidanbleser.com</title>
	<meta name="description" content="Aidan Bleser's personal website." />
</svelte:head>

<main class="flex min-h-svh place-items-center justify-center pb-10 font-mono">
	<div class="flex w-[375px] flex-col md:w-[550px]">
		{#if isMounted.current}
			<div class="flex min-h-12 place-items-end md:min-h-[72px]">
				<h1 class="text-5xl md:text-7xl" transition:typewriter={{ delay: 100, speed: 0.75 }}>
					Aidan Bleser
				</h1>
				<div class="animate-caret-blink bg-primary h-2 w-6"></div>
			</div>
		{/if}
		<span class="text-muted-foreground">
			aka:
			<a target="_blank" href="https://github.com/ieedan" class="underline"> ieedan </a>
		</span>
		<div class="flex flex-col gap-5 pt-4">
			<p>
				I'm a software developer from San Antonio, TX. I build things that I find useful and I hope
				others will too.
			</p>
			<div class="flex flex-col gap-2">
				<p>A few of the things I have built:</p>
				<ul>
					{#each projects as project, i (i)}
						<li>
							-
							<a
								target="_blank"
								href={project.link}
								class="text-muted-foreground hover:text-foreground text-nowrap transition-all"
							>
								{project.name}
							</a>
						</li>
					{/each}
				</ul>
			</div>
			<div class="flex flex-col gap-2">
				<p>A few of the things I contribute to:</p>
				<ul>
					{#each openSource as project, i (i)}
						<li>
							-
							<a
								target="_blank"
								href={project.link}
								class="text-muted-foreground hover:text-foreground text-nowrap transition-all"
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
