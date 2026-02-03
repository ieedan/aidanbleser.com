<script lang="ts" module>
	import { tv, type VariantProps } from 'tailwind-variants';

	export const buttonVariants = tv({
		base: 'flex h-8 items-center justify-center gap-2 px-4 py-2',
		variants: {
			variant: {
				default: 'bg-primary text-primary-foreground'
			}
		}
	});

	export type ButtonVariants = VariantProps<typeof buttonVariants>;

	export type ButtonPropsWithoutHtml = {
		variant?: ButtonVariants['variant'];
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
	class={cn(buttonVariants({ variant }), className)}
>
	{@render children?.()}
</svelte:element>
