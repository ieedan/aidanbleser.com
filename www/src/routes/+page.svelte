<script lang="ts">
	import { P, H, Spacer, Badge } from '$lib/components/typography';
	import SvelteSVG from '$lib/icons/svelte.svg';
	import TailwindSVG from '$lib/icons/tailwind.svg';
	import TypeScriptSVG from '$lib/icons/typescript.svg';
	import DotNetSVG from '$lib/icons/dotnet.svg';
	import RustPNG from '$lib/icons/rust.png';
	import MSSQLSVG from '$lib/icons/mssql.svg';
	import GeistUISvelteSVG from '$lib/icons/geist-ui-svelte.svg';
	import vnvPNG from '$lib/icons/vnv.png';
	import GoSVG from '$lib/icons/go.svg';
	import RAPNG from '$lib/icons/ra.png';
	import {
		faMountains,
		faGraduationCap,
		faBriefcase,
		faInfo,
		faCodeCompare,
		faMicrochip,
		faMagnifyingGlass,
	} from '@fortawesome/pro-light-svg-icons';
	import InfoSection from '$lib/components/InfoSection.svelte';
</script>

<main class="flex flex-col place-items-center px-6">
	<div class="relative">
		<H>Aidan Bleser</H>
		<Spacer h={25} />
		<!-- Line -->
		<div
			style="height: calc(100% - 65px);"
			class="absolute left-[12px] z-[1] w-[2px] bg-component-background"
		></div>
		<div class="relative z-[2]">
			<InfoSection icon={faBriefcase} title="Working at">
				<P>Avanzar Interior Technologies, Texas</P>
			</InfoSection>
			<InfoSection icon={faMagnifyingGlass} title="As the">
				<P>Lead Controls Engineer</P>
			</InfoSection>
			<InfoSection icon={faMicrochip} title="With">
				<div class="flex flex-wrap place-items-center gap-2">
					<Badge src={SvelteSVG} name="Svelte" />
					<Badge src={TailwindSVG} name="Tailwind" />
					<Badge src={TypeScriptSVG} name="TypeScript" />
					<Badge src={DotNetSVG} name=".NET" />
					<Badge src={RustPNG} name="Rust" />
					<Badge src={GoSVG} name="Go" logoWidth="32px"/>
					<Badge src={RAPNG} name="Rockwell Automation" />
				</div>
			</InfoSection>
			<InfoSection icon={faCodeCompare} title="While also maintaining">
				<div class="flex flex-wrap place-items-center gap-2">
					<Badge
						src={GeistUISvelteSVG}
						name="geist-ui-svelte"
						href="https://geist-ui-svelte.dev"
					/>
					<Badge src={vnvPNG} name="vnv" href="https://github.com/ieedan/vnv" />
					<Badge src={RustPNG} name="esetres" href="https://github.com/ieedan/esetres" />
					<Badge
						src={TypeScriptSVG}
						name="ts-blocks"
						href="https://github.com/ieedan/ts-blocks"
					/>
				</div>
			</InfoSection>
			<InfoSection icon={faInfo} title="About Me">
				<P>
					I started my software development journey out of laziness. I had to do KPIs
					every day to report on equipment downtime as a maintenance supervisor. This
					inspired me to find a way to automate it and led me to create an internal CMMS
					called Chorus.
				</P>
				<Spacer h={15} />
				<P>
					Since I created Chorus in 2022 it has seen 3 complete rewrites across both
					desktop and web applications finally landing where it is now. It has required me
					to create services for automated downtime and productivity tracking, file
					storage, and many other things we needed along the way.
				</P>
			</InfoSection>
			<InfoSection icon={faGraduationCap} title="Education">
				<P>Associates in Applied Science from St. Philips College San Antonio, TX</P>
			</InfoSection>
			<InfoSection icon={faMountains} title="When I'm not at work">
				<P>
					I enjoy doing just about anything in the mountains hiking, camping, climbing,
					skiing.
				</P>
			</InfoSection>
		</div>
	</div>
</main>
