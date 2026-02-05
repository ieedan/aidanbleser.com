<script lang="ts">
	import Sponsors from '$lib/features/sponsors/sponsors.svelte';
	import * as Sidebar from '$lib/components/home/sidebar';
	import Projects from '$lib/features/projects/projects.svelte';
	import ContactMe from '$lib/features/contact-me/contact-me.svelte';
	import Footer from '$lib/features/footer/footer.svelte';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
	import {
		RiMoreLine,
		RiMailLine,
		RiHeartLine,
		RiTimeLine,
		RiArrowLeftLine
	} from 'remixicon-svelte';
	import { deepMerge, MetaTags } from 'svelte-meta-tags';
	import { socials } from '$lib/features/socials/socials';
	import { buttonVariants } from '$lib/components/ui/button/button.svelte';
	import { getMostRecentBlogPosts, formatDate } from '$lib/features/blog/blog';
	import { Button } from '$lib/components/ui/button';
	import Author from '$lib/features/blog/author.svelte';

	let { data } = $props();

	const posts = $derived(getMostRecentBlogPosts());

	const metaTags = $derived(
		deepMerge(data.baseMetaTags, {
			title: "Aidan Bleser's Blog",
			description: "Aidan Bleser's (ieedan) tech blog."
		})
	);
</script>

<MetaTags {...metaTags} />

<div class="relative flex w-full max-w-4xl flex-col border border-border md:flex-row">
	<div class="flex flex-1 flex-col border-b md:max-w-[calc(100%-16rem)] md:border-b-0">
		<div class="flex flex-1 flex-col">
			<header class="flex h-16 w-full items-center justify-between gap-4 border-b p-4">
				<Button href="/" variant="outline" size="icon">
					<RiArrowLeftLine class="size-4" />
				</Button>
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
			<div class="flex flex-col gap-2 p-4">
				{#each posts as post (post.key)}
					<div class="relative border border-border p-2 transition-colors hover:bg-secondary">
						<a href="/blog/posts/{post.key}">
							<span class="flex items-center gap-2 text-lg font-medium">
								{post.title}
							</span>
							<span class="absolute inset-0"></span>
						</a>
						<p class="line-clamp-2 text-sm text-muted-foreground">{post.description}</p>
						<div class="mt-1 flex items-center gap-2">
							<span class="text-xs text-muted-foreground">
								{formatDate(post.date)}
							</span>
							<span class="flex items-center gap-1 text-xs text-muted-foreground">
								<RiTimeLine class="inline-block size-3" />
								{post.readingTime}m
								{#if post.isNew}
									<span
										class="ml-0.5 size-1.5 shrink-0 rounded-full bg-blue-500"
										title="New (within 30 days)"
										aria-hidden="true"
									></span>
								{/if}
							</span>
						</div>
					</div>
				{/each}
			</div>
		</div>
		<Footer class="hidden md:block" />
	</div>

	<Sidebar.Root>
		<Author />
		<Projects />
		<Sponsors />
		<ContactMe />
	</Sidebar.Root>

	<Footer class="block md:hidden" />
</div>
