<script lang="ts" module>
	import type { Snippet } from 'svelte';
	import Button, { type ButtonProps } from '$lib/components/ui/button/button.svelte';
	import type { HTMLAttributes } from 'svelte/elements';
	import type { WithChildren, WithoutChildren } from 'bits-ui';

	export type CopyButtonPropsWithoutHTML = WithChildren<
		Pick<ButtonProps, 'size' | 'variant'> & {
			text: string;
			icon?: Snippet<[]>;
			onCopy?: (status: 'success' | 'failure' | undefined) => void;
		}
	>;

	export type CopyButtonProps = CopyButtonPropsWithoutHTML &
		WithoutChildren<HTMLAttributes<HTMLButtonElement>>;
</script>

<script lang="ts">
	import { UseClipboard } from '$lib/hooks/use-clipboard.svelte';
	import { cn } from '$lib/utils.js';
	import { RiCheckLine, RiFileCopyLine, RiCloseLine } from 'remixicon-svelte';

	let {
		text,
		icon,
		variant = 'outline',
		size = 'icon',
		onCopy,
		class: className,
		tabindex = -1,
		children,
		...rest
	}: CopyButtonProps = $props();

	// this way if the user passes text then the button will be the default size
	// svelte-ignore state_referenced_locally
	if (size === 'icon' && children) {
		size = 'default';
	}

	const clipboard = new UseClipboard();
</script>

<Button
	{variant}
	{size}
	{tabindex}
	class={cn('flex items-center gap-2', className)}
	type="button"
	name="copy"
	onclick={async () => {
		const status = await clipboard.copy(text);

		onCopy?.(status);
	}}
	{...rest as /* eslint-disable-line @typescript-eslint/no-explicit-any */ any}
>
	{#if clipboard.status === 'success'}
		<div>
			<RiCheckLine tabindex={-1} />
			<span class="sr-only">Copied</span>
		</div>
	{:else if clipboard.status === 'failure'}
		<div>
			<RiCloseLine tabindex={-1} />
			<span class="sr-only">Failed to copy</span>
		</div>
	{:else}
		<div>
			{#if icon}
				{@render icon()}
			{:else}
				<RiFileCopyLine tabindex={-1} />
			{/if}
			<span class="sr-only">Copy</span>
		</div>
	{/if}
	{@render children?.()}
</Button>
