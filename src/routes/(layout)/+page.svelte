<script lang="ts">
	import Sponsors from '$lib/features/sponsors/sponsors.svelte';
	import * as Sidebar from '$lib/components/home/sidebar';
	import Projects from '$lib/features/projects/projects.svelte';
	import ContactMe from '$lib/features/contact-me/contact-me.svelte';
	import Footer from '$lib/features/footer/footer.svelte';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
	import summary from '$prerendered/summary';
	import { RiMoreLine, RiMailLine, RiHeartLine } from 'remixicon-svelte';
	import { MetaTags } from 'svelte-meta-tags';
	import { socials } from '$lib/features/socials/socials';
	import { buttonVariants } from '$lib/components/ui/button/button.svelte';
	import OtherBlogPosts from '$lib/features/blog/other-blog-posts.svelte';
</script>

<MetaTags
	title="Aidan Bleser - Frontend Engineer"
	description="Aidan Bleser's (ieedan) personal website and tech blog."
/>

<div class="relative flex w-full max-w-4xl flex-col border border-border md:flex-row">
	<div class="flex flex-1 flex-col border-b md:border-b-0">
		<div class="flex flex-1 flex-col">
			<header class="flex w-full items-center justify-between gap-4 border-b p-4">
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
					<DropdownMenu.Root>
						<DropdownMenu.Trigger class={buttonVariants({ size: 'icon', variant: 'outline' })}>
							<RiMoreLine class="size-4" />
							<span class="sr-only">More options</span>
						</DropdownMenu.Trigger>
						<DropdownMenu.Content align="end">
							{#each socials as social (social.name)}
								<DropdownMenu.CopyItem text={social.url}>
									{#snippet icon()}
										<social.logo class="size-4 text-foreground" />
									{/snippet}
									Copy {social.name} Profile
								</DropdownMenu.CopyItem>
							{/each}
							<DropdownMenu.Separator />
							<DropdownMenu.Item
								onSelect={() => {
									window.location.href =
										"mailto:aidanbleser35@gmail.com?subject=Let's work together!";
								}}
							>
								<RiMailLine class="size-4" />
								Contact Me
							</DropdownMenu.Item>
							<DropdownMenu.Separator />
							<DropdownMenu.LinkItem href="https://github.com/sponsors/ieedan">
								<RiHeartLine class="size-4 text-pink-600" />
								Sponsor me
							</DropdownMenu.LinkItem>
						</DropdownMenu.Content>
					</DropdownMenu.Root>
				</div>
			</header>
			<div class="typography p-4">
				{@html summary.content}
			</div>
		</div>
		<Footer class="hidden md:block" />
	</div>

	<Sidebar.Root>
		<OtherBlogPosts title="Recent Blog Posts" />
		<Projects />
		<Sponsors />
		<ContactMe />
	</Sidebar.Root>

	<Footer class="block md:hidden" />
</div>
