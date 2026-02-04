<script lang="ts">
	import Sponsors from '$lib/features/sponsors/sponsors.svelte';
	import * as Sidebar from '$lib/components/home/sidebar';
	import Projects from '$lib/features/projects/projects.svelte';
	import ContactMe from '$lib/features/contact-me/contact-me.svelte';
	import Footer from '$lib/features/footer/footer.svelte';
	import DropdownMenu from '$lib/features/dropdown-menu/dropdown-menu.svelte';
	import summary from '$prerendered/summary';
</script>

<div class="relative flex w-full max-w-4xl flex-col border border-border sm:flex-row">
	<div class="flex flex-1 flex-col border-b sm:border-b-0">
		<div class="flex flex-1 flex-col">
			<div class="flex w-full items-center justify-between gap-4 border-b p-4">
				<div class="flex items-center gap-4">
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
				<div>
					<DropdownMenu />
				</div>
			</div>
			<div class="typography p-4">
				{@html summary}
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
