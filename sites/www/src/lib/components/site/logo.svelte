<script lang="ts">
	import type { Props } from '$lib/components/icons';
	import { cn } from '$lib/utils/utils';

	let { class: className, ...rest }: Props = $props();
</script>

<svg
	class={cn('size-7', className)}
	viewBox="0 0 27 27"
	fill="none"
	xmlns="http://www.w3.org/2000/svg"
	{...rest}
>
	<rect x="1" y="1" width="25" height="25" rx="2" fill="#3566DF" />
	<path d="M4 13.9497L8.94974 9" stroke="#EEEEEE" stroke-width="2" stroke-linecap="round" />
	<path
		d="M4.00001 13.9498L8.94976 18.8995"
		stroke="#EEEEEE"
		stroke-width="2"
		stroke-linecap="round"
	/>
	<path
		d="M22.7559 13.9498L17.8061 18.8995"
		stroke="#EEEEEE"
		stroke-width="2"
		stroke-linecap="round"
	/>
	<path
		d="M22.7559 13.9498L17.8061 9.00001"
		stroke="#EEEEEE"
		stroke-width="2"
		stroke-linecap="round"
	/>
	<path
		d="M15.3674 9.47005L11.3885 18.6685"
		stroke="#EEEEEE"
		stroke-width="2"
		stroke-linecap="round"
	/>
</svg>
