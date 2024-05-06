<script lang="ts">
	import { P, H, Spacer } from '$lib/components/typography';
	import SvelteSVG from '$lib/icons/svelte.svg';
	import TailwindSVG from '$lib/icons/tailwind.svg';
	import TypeScriptSVG from '$lib/icons/typescript.svg';
	import DotNetSVG from '$lib/icons/dotnet.svg';
	import RustPNG from '$lib/icons/rust.png';
	import MSSQLSVG from '$lib/icons/mssql.svg';
</script>

<main class="flex min-h-svh flex-col place-items-center px-6 py-6">
	<div class="w-full sm:w-[550px]">
		<H>Aidan Bleser</H>
		<Spacer h={25} />
		<P>I am a Controls Engineer learning the world of software.</P>
		<Spacer h={16} />
		<P>
			I started my journey as a maintenance technician at <P light type="span">Toyota</P> where
			I learned how to program PLCs and build HMIs. After not long I felt like I could challenge
			myself more than I was as a technician.
		</P>
		<Spacer h={16} />
		<P>
			So I chose to start looking for jobs as a controls engineer, at which point I applied
			and accepted a position as a Maintenance Supervisor (PLC) at <P light type="span"
				>Avanzar</P
			>. Here I saw the problems that could be solved with software and took the opportunity
			to start building solutions.
		</P>
		<Spacer h={16} />
		<P>
			As I continued to build solutions my work was recognized and I was promoted to Lead
			Controls Engineer to allow me to focus more on building software. My main focus was an
			collection of software called <P light type="span">Chorus</P>. I built Chorus to
			collocate Avanzar's manufacturing data as when I came to Avanzar all of our downtime,
			productivity, and inventory data was spread out across different excel sheets saved on a
			shared drive. This caused issues with multiple users trying to access the sheets at once
			and would consistently result in data loss. The goal was to get rid of the excel sheets
			and allow us to collaborate and store historical data pain free.
		</P>
		<Spacer h={16} />
		<P>
			The application has now grown from its original state as just a windows form and a
			database to a full stack web application with multiple microservices. Some of the
			technologies I am using are:
		</P>
      <Spacer h={5} />
		<ul class="flex flex-wrap place-items-center gap-2">
			<li
				class="bg-component-background inline-flex place-items-center gap-1 rounded-md px-2 py-1"
			>
				<img src={SvelteSVG} alt="Svelte Logo" width="16px" />Svelte
			</li>
			<li
				class="bg-component-background inline-flex place-items-center gap-1 rounded-md px-2 py-1"
			>
				<img src={TailwindSVG} alt="Tailwind Logo" width="16px" />Tailwind
			</li>
			<li
				class="bg-component-background inline-flex place-items-center gap-1 rounded-md px-2 py-1"
			>
				<img src={TypeScriptSVG} alt="TypeScript Logo" width="16px" />TypeScript
			</li>
			<li
				class="bg-component-background inline-flex place-items-center gap-1 rounded-md px-2 py-1"
			>
				<img src={DotNetSVG} alt=".NET Logo" width="16px" />.NET
			</li>
			<li
				class="bg-component-background inline-flex place-items-center gap-1 rounded-md px-2 py-1"
			>
				<img src={RustPNG} alt="Rust Logo" width="16px" />Rust
			</li>
			<li
				class="bg-component-background inline-flex place-items-center gap-1 rounded-md px-2 py-1"
			>
				<img src={MSSQLSVG} alt="MSSQL Logo" width="16px" />MSSQL
			</li>
		</ul>
	</div>
</main>
