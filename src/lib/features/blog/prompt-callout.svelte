<script lang="ts">
	import { RiSparkling2Line } from 'remixicon-svelte';
	import { CopyButton } from '$lib/components/ui/copy-button/index.js';

	let { prompt }: { prompt: string } = $props();
</script>

<div class="not-typography -mb-2">
	<CopyButton
		text={prompt}
		variant="outline"
		size="default"
		class="group inline-flex max-w-full flex-row-reverse items-center gap-2 border-border bg-background py-1 pr-2.5 pl-1.5 text-xs text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground [&_svg]:size-3.5"
	>
		<span class="flex min-w-0 items-center gap-2">
			<RiSparkling2Line />
			<span class="truncate">Copy the prompt for your AI agent.</span>
		</span>
	</CopyButton>
</div>
