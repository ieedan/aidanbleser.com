<script lang="ts">
	import Code from "$lib/components/Code.svelte";
	import blogSVG from "./tailwindblog.svg";
	import tailwindPlugin from "$lib/assets/tailwind-plugin.png";
	import LinkHeading from "$lib/components/LinkHeading.svelte";
</script>

<img src={blogSVG} class="w-full py-8" alt="CSS crossed out arrow pointing to tailwind" />
<p class="py-2 text-gray-700 dark:text-gray-300">
	There are many arguments against Tailwind but most of them don't hold any water. Normally you
	hear stuff like... "It makes my HTML Ugly" or... "I have to learn someone elses utility
	classes". The fact is these arguments shouldn't prevent you from using Tailwind in your next
	project.
</p>
<p class="py-2 text-gray-700 dark:text-gray-300">
	Before we talk about why Tailwind is so great lets squash the arguments against Tailwind.</p
>
<p class="py-2 text-gray-700 dark:text-gray-300">
	First of all the argument that "It makes my HTML Ugly". To a non-Tailwind user looking in from
	the outside this is a fairly strong argument. However once you start using Tailwind you find
	ways to structure your classes to make your markup more presentable. On top of that there are
	other tools out there such as the
	<a
		href="https://tailwindcss.com/blog/automatic-class-sorting-with-prettier"
		target="_blank"
		class="whitespace-nowrap font-bold text-black hover:underline dark:text-white"
		>prettier-plugin-tailwindcss</a
	> which sort your Tailwind classes to make it easier to read and maintain. In many cases Tailwind
	actually ends up being less code than traditional CSS classes. Lets look at an example of some code
	for a big red button.
</p>
<strong class="whitespace-nowrap py-2 text-black dark:text-white">Before Tailwind</strong>
<Code
	>{`<!-- Big red button -->
<button class="big-red-button">
	Click Me!
</button>`}</Code
>
<section class="h-4"></section>
<Code
	>{`.big-red-button {
	background: red;
	border-radius: 9999px;
	width: 100px;
	height: 100px;
	box-shadow: 0px 3px 5px gray;
}`}</Code
>
<strong class="whitespace-nowrap py-2 text-black dark:text-white">After Tailwind</strong>
<Code
	>{`<!-- Big red button -->
<button class="bg-red-800 rounded-full w-[100px] h-[100px] shadow-md">
	Click Me!
</button>`}</Code
>
<section class="h-4"></section>
<p class="py-2 text-gray-700 dark:text-gray-300">
	The change in complexity is pretty obvious and this doesn't take into acount some of the built
	in overrides Tailwind provides such as every button automatically showing <code
		class="whitespace-nowrap rounded-md bg-gray-100 px-1 font-serif text-sm dark:bg-gray-900"
		>cursor-pointer</code
	> when hovered.
</p>
<p class="py-2 text-gray-700 dark:text-gray-300">
	Next lets talk about the second argument "I have to learn someone elses utility classes" and
	while no one should ever be afraid to learn something <strong class="text-black dark:text-white"
		>learning Tailwind just isn't hard</strong
	>. The Tailwind docs are well structured and make it extremely easy to get started. When I first
	started using Tailwind I took an hour or two to read through the docs and understand the core
	concepts. And even if you don't come out of the docs knowing every class the Tailwind plugins
	are excellent for browsing through all the classes to see what they do.
</p>
<img class="py-2" src={tailwindPlugin} alt="Tailwind plugin for VSCode" />
<p class="py-2 text-gray-700 dark:text-gray-300">
	Now that we've squashed the common arguments against Tailwind. Here are just a few of the
	arguments for using Tailwind:
</p>
<ul class="list-style-dash flex flex-col">
	<li><a href="#standardization" class="hover:underline">Style Standardization</a></li>
	<li><a href="#collocation" class="hover:underline">Style/Markup Collocation</a></li>
	<li><a href="#localization" class="hover:underline">Style Localization</a></li>
	<li><a href="#speed" class="hover:underline">Speed of development</a></li>
</ul>
<LinkHeading class="pt-4" type="h4" id="standardization">Style Standardization</LinkHeading>
<p class="py-2 text-gray-700 dark:text-gray-300">
	Style Standardization means any project that uses Tailwind can be maintained by anyone who
	already knows Tailwind. Having standards in your code improves productivity and onboarding for
	every project that use those standards.
</p>
<LinkHeading class="pt-4" type="h4" id="collocation">Style/Markup Collocation</LinkHeading>
<p class="py-2 text-gray-700 dark:text-gray-300">
	The collocation of styles in the markup make it easy to understand what is effected by a change
	and saves lots of time otherwise used searching for CSS classes.
</p>
<LinkHeading class="pt-4" type="h4" id="localization">Style Localization</LinkHeading>
<p class="py-2 text-gray-700 dark:text-gray-300">
	Tailwind takes the cascading out of cascading style sheets (CSS). You no longer need the context
	of the entire codebase to make a simple style change. This saves a huge amount of time debugging
	weird CSS issues caused by overlapping classes and cascading styles.
</p>
<LinkHeading class="pt-4" type="h4" id="speed">Speed of development</LinkHeading>
<p class="py-2 text-gray-700 dark:text-gray-300">
	Between the collocation, standardization, and simplicity Tailwind provides it means that
	development is <strong class="text-black dark:text-white">way faster</strong>. The jump in
	productivity I have seen from using Tailwind has been the largest between any other 2
	technologies I have switched between in my Web Dev journey.
</p>
<p class="py-2 text-gray-700 dark:text-gray-300">
	If you can read all this and still choose not to use Tailwind for your next project then you are
	truly <strong class="whitespace-nowrap text-black dark:text-white">IRRESPONSIBLE</strong>.
</p>
