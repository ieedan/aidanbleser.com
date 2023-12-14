<script lang="ts">
	import Code from "$lib/components/Code.svelte";
	import namingThingsSVG from "./namingthingsblog.svg";
</script>

<img
	class="w-full py-8"
	src={namingThingsSVG}
	alt="Incorrect names of thing crossed out with the correct name at the bottom"
/>
<p class="py-2 text-gray-700 dark:text-gray-300">
	Knowing how to name things in programming is very important both for the people who follow after
	you but also yourself when you step away from a project for a while. It's important to have
	standards around how you name things.
</p>
<h4 class="pt-4 text-xl font-bold">Casing Conventions</h4>
<Code
	>{`/* Immutable Constant */
const MOTOR_SPEED = 75;

/* Class */
class Motor = {
	running: boolean;
	speed: number;
	constructor(speed: number) {
		this.speed = speed;
	}

	start() {
		this.running = true;
	}
}

/* Variable */
const motor = new Motor();
`}
</Code>
