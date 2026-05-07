<script lang="ts" module>
	import { tv, type VariantProps } from 'tailwind-variants';

	export const buttonVariants = tv({
		base: 'flex items-center justify-center gap-2 transition-colors [&_svg]:shrink-0 [&_svg]:size-4',
		variants: {
			variant: {
				default: 'bg-primary text-primary-foreground hover:bg-primary/90',
				outline:
					'border border-border bg-background text-muted-foreground hover:text-foreground hover:bg-secondary'
			},
			size: {
				default: 'h-8 px-4 py-2',
				icon: 'size-8'
			}
		}
	});

	export type ButtonVariants = VariantProps<typeof buttonVariants>;

	export type ButtonPropsWithoutHtml = {
		variant?: ButtonVariants['variant'];
		size?: ButtonVariants['size'];
	};

	export type ButtonElementProps = HTMLButtonAttributes;
	export type AnchorElementProps = HTMLAnchorAttributes;
	export type ButtonProps = ButtonElementProps & AnchorElementProps & ButtonPropsWithoutHtml;
</script>

<script lang="ts">
	import type { HTMLAnchorAttributes, HTMLButtonAttributes } from 'svelte/elements';
	import { cn } from '$lib/utils';

	let {
		href,
		variant = 'default',
		size = 'default',
		disabled,
		type,
		tabindex,
		class: className,
		children,
		...rest
	}: ButtonProps = $props();
</script>

<!-- This approach to disabled links is inspired by bits-ui see: https://github.com/huntabyte/bits-ui/pull/1055 -->
<svelte:element
	this={href ? 'a' : 'button'}
	{...rest}
	type={href ? undefined : type}
	href={href && !disabled ? href : undefined}
	disabled={href ? undefined : disabled}
	aria-disabled={href ? disabled : undefined}
	role={href && disabled ? 'link' : undefined}
	tabindex={href && disabled ? -1 : tabindex}
	class={cn(buttonVariants({ variant, size }), className)}
>
	{@render children?.()}
</svelte:element>
