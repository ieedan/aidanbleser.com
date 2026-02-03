<script lang="ts">
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
	import { RiMoreLine, RiMailLine, RiHeartLine } from 'remixicon-svelte';
	import { socials } from '../socials/socials';
</script>

<DropdownMenu.Root>
	<DropdownMenu.Trigger class="flex size-8 items-center justify-center border border-border">
		<RiMoreLine class="size-4" />
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
				window.location.href = "mailto:aidanbleser35@gmail.com?subject=Let's work together!";
			}}
		>
			<RiMailLine class="size-4" />
			Contact Me
		</DropdownMenu.Item>
		<DropdownMenu.Separator />
		<DropdownMenu.Item
			onSelect={() => {
				window.location.href = 'https://github.com/sponsors/ieedan';
			}}
		>
			<RiHeartLine class="size-4 text-pink-600" />
			Sponsor me
		</DropdownMenu.Item>
	</DropdownMenu.Content>
</DropdownMenu.Root>
