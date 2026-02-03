<script lang="ts">
	import { onMount } from 'svelte';
	import * as HoverCard from '$lib/components/ui/hover-card';

	/** At-desk hours in America/Chicago. Fractional = half-hour (e.g. 5.5 = 5:30). Green when in [start, end). */
	const DESK_HOURS = { start: 5.5, end: 15.5 };
	/** Sleeping hours in America/Chicago. Can span midnight (e.g. 22 = 10 PM, 6 = 6 AM). Muted when in range. */
	const SLEEPING_HOURS = { start: 22, end: 5 };

	function inTimeRange(t: number, start: number, end: number): boolean {
		if (start <= end) return t >= start && t < end;
		return t >= start || t < end;
	}

	function formatFractionalHour(h: number): string {
		const hours = Math.floor(h) % 24;
		const minutes = Math.round((h - Math.floor(h)) * 60) % 60;
		const hour12 = hours % 12 || 12;
		const minStr = minutes > 0 ? `:${minutes.toString().padStart(2, '0')}` : '';
		return `${hour12}${minStr} ${hours >= 12 ? 'PM' : 'AM'}`;
	}

	const scheduleLabels = {
		desk: `At desk: ${formatFractionalHour(DESK_HOURS.start)} - ${formatFractionalHour(DESK_HOURS.end)}`,
		sleeping: `Sleeping: ${formatFractionalHour(SLEEPING_HOURS.start)} - ${formatFractionalHour(SLEEPING_HOURS.end)}`,
		away: `Away: ${formatFractionalHour(SLEEPING_HOURS.end)} - ${formatFractionalHour(DESK_HOURS.start)}, ${formatFractionalHour(DESK_HOURS.end)} - ${formatFractionalHour(SLEEPING_HOURS.start)}`
	};

	const chicagoFormatter = new Intl.DateTimeFormat('en-US', {
		timeZone: 'America/Chicago',
		timeStyle: 'medium'
	});

	const hourFormatter = new Intl.DateTimeFormat('en-US', {
		timeZone: 'America/Chicago',
		hour: 'numeric',
		hour12: false
	});

	const minuteFormatter = new Intl.DateTimeFormat('en-US', {
		timeZone: 'America/Chicago',
		minute: 'numeric'
	});

	let currentDate = $derived(new Date());
	const time = $derived(chicagoFormatter.format(currentDate));
	const chicagoHour = $derived(parseInt(hourFormatter.format(currentDate), 10));
	const chicagoMinute = $derived(parseInt(minuteFormatter.format(currentDate), 10));
	const chicagoTimeFractionalHours = $derived(chicagoHour + chicagoMinute / 60);
	const isAtDesk = $derived(
		inTimeRange(chicagoTimeFractionalHours, DESK_HOURS.start, DESK_HOURS.end)
	);
	const isSleeping = $derived(
		inTimeRange(chicagoTimeFractionalHours, SLEEPING_HOURS.start, SLEEPING_HOURS.end)
	);
	const status = $derived<'desk' | 'away' | 'sleeping'>(
		isAtDesk ? 'desk' : isSleeping ? 'sleeping' : 'away'
	);

	const statusDescriptions = {
		desk: 'At desk',
		away: 'Away',
		sleeping: 'Sleeping'
	};

	onMount(() => {
		const id = setInterval(() => {
			currentDate = new Date();
		}, 1000);
		return () => clearInterval(id);
	});
</script>

<HoverCard.Root openDelay={100} closeDelay={50}>
	<HoverCard.Trigger>
		<span
			data-status={status}
			class="group flex items-center gap-2 font-mono text-sm data-[status=away]:text-amber-500 data-[status=desk]:text-green-500 data-[status=sleeping]:text-muted-foreground"
		>
			<span
				class="size-2 shrink-0 rounded-full group-data-[status=away]:bg-amber-500 group-data-[status=desk]:bg-green-500 group-data-[status=sleeping]:bg-muted-foreground"
				aria-hidden="true"
			></span>
			{time}
		</span>
	</HoverCard.Trigger>
	<HoverCard.Content class="w-fit p-2">
		<div class="flex flex-col gap-1">
			<span
				data-status={status}
				class="data-[status=away]:text-amber-500 data-[status=desk]:text-green-500 data-[status=sleeping]:text-muted-foreground"
			>
				{statusDescriptions[status]}
			</span>
			<span class="text-xs text-muted-foreground"> America/Chicago </span>
			<ul class="list-inside text-xs text-muted-foreground">
				<li>{scheduleLabels.desk}</li>
				<li>{scheduleLabels.away}</li>
				<li>{scheduleLabels.sleeping}</li>
			</ul>
		</div>
	</HoverCard.Content>
</HoverCard.Root>
