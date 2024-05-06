<script lang="ts">
	import { tv, type VariantProps } from 'tailwind-variants';

	const style = tv({
		base: 'text-foreground-secondary',
		variants: {
			bold: {
				true: 'font-semibold',
			},
			italic: {
				true: 'italic',
			},
			light: {
				true: 'text-foreground-primary',
			},
		},
	});

	type Props = VariantProps<typeof style>;

	export let b = false;
	export let i = false;
	export let light = false;
	export let type: "p" | "span" = "p";
</script>

<svelte:element this={type} class={style({ bold: b, italic: i, light })}>
	<slot />
</svelte:element>
