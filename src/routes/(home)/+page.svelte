<script lang="ts">
	import Sponsors from '$lib/features/sponsors/sponsors.svelte';
	import * as Sidebar from '$lib/components/home/sidebar';
	import Projects from '$lib/features/projects/projects.svelte';
	import ContactMe from '$lib/features/contact-me/contact-me.svelte';
	import Footer from '$lib/features/footer/footer.svelte';
</script>

<div class="relative flex w-full max-w-4xl flex-col border border-border sm:flex-row">
	<div class="flex flex-1 flex-col border-b sm:border-b-0">
		<div class="flex flex-1 flex-col">
			<div class="flex w-full items-center gap-4 border-b p-4">
				<img
					src="https://avatars.githubusercontent.com/ieedan"
					alt="Aidan Bleser"
					class="size-12 shrink-0 rounded-full"
				/>
				<div class="flex flex-col">
					<h1 class="text-2xl">Aidan Bleser</h1>
					<span class="text-sm text-muted-foreground">Frontend Engineer</span>
				</div>
			</div>
			<div class="flex flex-col gap-4 p-4">
				<p>
					I'm a software engineer from San Antonio, Texas. I learned to code to automate my KPIs as
					a maintenance supervisor and I ended up building (and rebuilding, and rebuilding again)
					the CMMS (Computerized Maintenance Management System) now used by Avanzar Interior
					Technologies.
				</p>
				<p>
					I started contributing to open source in 2024 and since have become a maintainer of
					several popular projects such as, shadcn-svelte, jsrepo, and shadcn-svelte-extras.
				</p>
				<p>
					If I'm not slaving (or rather watching Cursor slave) behind my desk I'm probably cycling,
					skiing, hiking, or just spending time with my beautiful wife.
				</p>
			</div>
		</div>
		<Footer class="hidden sm:block" />
	</div>

	<Sidebar.Root>
		<Projects />
		<Sponsors />
		<ContactMe />
	</Sidebar.Root>

	<Footer class="block sm:hidden" />
</div>
