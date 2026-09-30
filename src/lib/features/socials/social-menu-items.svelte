<script lang="ts">
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
	import { socials } from './socials';
</script>

{#each socials as social (social.name)}
	<DropdownMenu.CopyItem text={social.url}>
		{#snippet icon()}
			<social.logo class="size-4 text-foreground" />
		{/snippet}
		Copy {social.name} Profile
	</DropdownMenu.CopyItem>
{/each}
