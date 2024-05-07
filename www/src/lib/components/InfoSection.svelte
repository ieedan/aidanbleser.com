<script lang="ts">
	import type { IconDefinition } from '@fortawesome/pro-light-svg-icons';
	import { FontAwesomeIcon } from '@fortawesome/svelte-fontawesome';
	import { H, Spacer } from './typography';

	export let icon: IconDefinition;
    export let title: string;
</script>

<section>
	<div class="flex place-items-start gap-3 py-2">
		<div
			class="mt-1 flex size-7 place-items-center justify-center rounded-full
             border border-border bg-background text-foreground-muted ring-4 ring-background flex-grow-0 flex-shrink-0"
		>
			<FontAwesomeIcon {icon} size="xs" />
		</div>
		<div class="flex max-w-[650px] flex-col mt-1">
			<H type="h4">{title}</H>
			<Spacer h={10} />
			<slot />
		</div>
	</div>
</section>
