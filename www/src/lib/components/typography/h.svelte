<script lang="ts">
	import { tv, type VariantProps } from "tailwind-variants";

    const style = tv({
        base: "font-semibold",
        variants: {
            type: {
                "h1": "text-4xl",
                "h2": "text-3xl",
                "h3": "text-2xl",
                "h4": "text-xl",
                "h5": "text-large",
            }
        }
    })

    type Props = VariantProps<typeof style>;

    export let type: Props["type"] = "h1";
</script>

<svelte:element this={type} class={style({ type })}>
    <slot/>
</svelte:element>