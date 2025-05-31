<script lang="ts">
	import { LightSwitch } from '$lib/components/ui/light-switch';
	import { Button } from '$lib/components/ui/button';
	import { GitHub } from '$lib/components/icons';
	import { projects } from '$lib/info/projects';
	import { socials } from '$lib/info/socials';
</script>

<footer class="flex place-items-center justify-center border-t px-4 py-6">
	<div class="flex w-full max-w-2xl flex-col gap-2">
		<div class="grid grid-cols-2 gap-4 md:grid-cols-3">
			<div class="col-start-1 flex flex-col gap-1 font-mono">
				<span class="text-foreground">Projects</span>
				<ul class="flex flex-col gap-1">
					{#each projects as project, i (i)}
						<li>
							<a
								target="_blank"
								href={project.link}
								class="text-muted-foreground hover:text-foreground flex place-items-center gap-2 text-nowrap transition-all"
							>
								{#if project.Logo}
									<project.Logo class="inline size-4" />
								{/if}
								{project.name}
							</a>
						</li>
					{/each}
				</ul>
			</div>
			<div class="col-start-2 flex flex-col gap-1 font-mono">
				<span class="text-foreground">Socials</span>
				<ul class="flex flex-col gap-1">
					{#each socials as social, i (i)}
						<li>
							<a
								target="_blank"
								href={social.link}
								class="text-muted-foreground hover:text-foreground flex place-items-center gap-2 text-nowrap transition-all"
							>
								{#if social.Logo}
									<social.Logo class="inline size-4" />
								{/if}
								{social.name}
							</a>
						</li>
					{/each}
				</ul>
			</div>
		</div>
		<div class="flex place-items-center justify-end gap-1">
			<Button target="_blank" href="https://github.com/ieedan" variant="ghost" size="icon">
				<GitHub />
			</Button>
			<LightSwitch variant="ghost" />
		</div>
	</div>
</footer>
