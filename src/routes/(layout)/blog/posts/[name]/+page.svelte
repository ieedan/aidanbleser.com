<script lang="ts">
	import Sponsors from '$lib/features/sponsors/sponsors.svelte';
	import * as Sidebar from '$lib/components/home/sidebar';
	import Projects from '$lib/features/projects/projects.svelte';
	import ContactMe from '$lib/features/contact-me/contact-me.svelte';
	import Footer from '$lib/features/footer/footer.svelte';
	import { MetaTags } from 'svelte-meta-tags';
	import { RiMoreLine, RiMailLine, RiHeartLine, RiLink } from 'remixicon-svelte';
	import { socials } from '$lib/features/socials/socials';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
	import { FinalchatLogo, MarkdownLogo } from '$lib/components/logos/index.js';
	import OtherBlogPosts from '$lib/features/blog/other-blog-posts.svelte';
	import { buttonVariants } from '$lib/components/ui/button/button.svelte';
	import { Button } from '$lib/components/ui/button/index.js';
	import { RiArrowLeftLine, RiTimeLine } from 'remixicon-svelte';
	import { formatDate } from '$lib/features/blog/blog.js';
	import { page } from '$app/state';
	import Author from '$lib/features/blog/author.svelte';

	let { data } = $props();
</script>

<MetaTags title={data.post.title} description={data.post.description} />

<div class="relative flex w-full max-w-4xl flex-col border border-border md:flex-row">
	<div class="flex flex-1 flex-col border-b md:max-w-[calc(100%-16rem)] md:border-b-0">
		<div class="flex flex-1 flex-col">
			<div class="flex h-16 w-full items-center justify-between gap-4 border-b p-4">
				<Button href="/blog/posts" variant="outline" size="icon">
					<RiArrowLeftLine class="size-4" />
				</Button>
				<div class="flex flex-col items-end text-xs text-muted-foreground">
					<span>{formatDate(data.post.date)}</span>
					<span class="flex items-center gap-1"
						><RiTimeLine class="inline-block size-3" /> {data.post.readingTime}m</span
					>
				</div>
			</div>
			<header class="flex w-full items-center justify-between gap-4 border-b p-4">
				<div class="flex items-center gap-4">
					<div class="flex flex-col">
						<h1 class="text-2xl">{data.post.title}</h1>
						<span class="text-sm text-muted-foreground">{data.post.description}</span>
					</div>
				</div>
				<div class="flex items-center gap-2">
					<DropdownMenu.Root>
						<DropdownMenu.Trigger class={buttonVariants({ size: 'icon', variant: 'outline' })}>
							<RiMoreLine class="size-4" />
							<span class="sr-only">More options</span>
						</DropdownMenu.Trigger>
						<DropdownMenu.Content align="end">
							<DropdownMenu.CopyItem text={page.url.toString()}>
								{#snippet icon()}
									<RiLink class="size-4 text-foreground" />
								{/snippet}
								Copy URL
							</DropdownMenu.CopyItem>
							<DropdownMenu.CopyItem text={data.post.contentMd}>
								{#snippet icon()}
									<MarkdownLogo class="size-4 text-foreground" />
								{/snippet}
								Copy Markdown
							</DropdownMenu.CopyItem>
							<DropdownMenu.LinkItem
								href={`https://finalchat.app/chat?q=Read this blog post by Aidan Bleser: https://aidanbleser.com/blog/posts/${
									data.post.key
								}.md I want to ask questions about it.`}
							>
								<FinalchatLogo class="size-4" />
								Open in Finalchat
							</DropdownMenu.LinkItem>
							<DropdownMenu.Separator />
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
				{@html data.post.content}
			</div>
		</div>
		<Footer class="hidden md:block" />
	</div>

	<Sidebar.Root>
		<Author />
		<OtherBlogPosts postKey={data.post.key} />
		<Projects />
		<Sponsors />
		<ContactMe />
	</Sidebar.Root>

	<Footer class="block md:hidden" />
</div>
