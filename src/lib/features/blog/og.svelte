<svelte:options css="injected" />

<script lang="ts">
	interface Props {
		title: string;
		description: string;
		readingTime: number;
		date: string;
		avatarDataUrl: string;
	}

	let { title, description, readingTime, date, avatarDataUrl }: Props = $props();

	const bg = '#1a1a1a';
	const fg = '#ebebeb';
	const muted = '#9b9b9b';
	const border = '#4a4a4a';
	const accent = '#3566DF';
</script>

<div
	style="display:flex; width:100%; height:100%; background:{bg}; padding:48px; font-family:'Inter';"
>
	<div
		style="display:flex; flex-direction:column; width:100%; height:100%; border:1px solid {border}; padding:56px; position:relative;"
	>
		<div style="display:flex; flex-direction:row; gap:32px; align-items:flex-start;">
			<img
				src={avatarDataUrl}
				width="96"
				height="96"
				style="width:96px; height:96px; border-radius:9999px; border:1px solid {border};"
				alt=""
			/>
			<div style="display:flex; flex-direction:column; flex:1;">
				<div
					style="color:{fg}; font-size:60px; font-weight:700; line-height:1.1; letter-spacing:-0.025em;"
				>
					{title}
				</div>
				<div
					style="color:{muted}; font-size:28px; margin-top:24px; line-height:1.4; font-weight:400;"
				>
					{description}
				</div>
			</div>
		</div>

		<div style="display:flex; flex:1; min-height:64px;"></div>

		<div
			style="display:flex; flex-direction:row; align-items:center; justify-content:space-between;"
		>
			<div style="display:flex; flex-direction:column; color:{fg}; font-size:24px;">
				<span style="font-weight:600;">Aidan Bleser</span>
				<span style="color:{muted}; font-size:20px; margin-top:6px; font-weight:400;"
					>Frontend Engineer</span
				>
			</div>
			<div
				style="display:flex; flex-direction:row; align-items:center; gap:24px; color:{muted}; font-size:22px;"
			>
				<div style="display:flex; flex-direction:row; align-items:center; gap:8px;">
					<svg
						width="22"
						height="22"
						viewBox="0 0 24 24"
						fill="currentColor"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							d="M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22ZM12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20ZM13 12H17V14H11V7H13V12Z"
						/>
					</svg>
					<span>{readingTime}m</span>
				</div>
				<span style="color:{border};">·</span>
				<span>{date}</span>
				<div
					style="display:flex; width:36px; height:36px; background:{accent}; align-items:center; justify-content:center; margin-left:8px;"
				>
					<svg
						width="24"
						height="24"
						viewBox="0 0 27 27"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							d="M4 13.9497L8.94974 9"
							stroke="#EEEEEE"
							stroke-width="2.5"
							stroke-linecap="round"
						/>
						<path
							d="M4.00001 13.9498L8.94976 18.8995"
							stroke="#EEEEEE"
							stroke-width="2.5"
							stroke-linecap="round"
						/>
						<path
							d="M22.7559 13.9498L17.8061 18.8995"
							stroke="#EEEEEE"
							stroke-width="2.5"
							stroke-linecap="round"
						/>
						<path
							d="M22.7559 13.9498L17.8061 9.00001"
							stroke="#EEEEEE"
							stroke-width="2.5"
							stroke-linecap="round"
						/>
						<path
							d="M15.3674 9.47005L11.3885 18.6685"
							stroke="#EEEEEE"
							stroke-width="2.5"
							stroke-linecap="round"
						/>
					</svg>
				</div>
			</div>
		</div>
	</div>
</div>
