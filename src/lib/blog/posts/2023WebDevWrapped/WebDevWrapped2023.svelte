<script lang="ts">
	import LinkHeading from "$lib/components/LinkHeading.svelte";
	import blogSVG from "./2023-web-dev-wrapped.svg";
</script>

<img
	src={blogSVG}
	class="w-full py-8"
	alt="2023 Web dev wrapped next to react svelte and tailwind logos" />
<p class="py-2 text-gray-700 dark:text-gray-300">
	2023 was my second year doing web development after starting in the fall of 2022. I came into
	2023 using vanilla JavaScript, HTML, and CSS for the front-end and C# rest API for the backend
	of my web applications. I had built a portfolio website and a large project at work using this
	stack and was doing okay but felt a few pain-points which I will list below.
</p>
<ul class="list-style-dash flex flex-col">
	<li><a href="#no-standards" class="hover:underline">No standards</a></li>
	<li><a href="#no-bundle-versioning" class="hover:underline">No bundle versioning</a></li>
	<li><a href="#slower-mpa" class="hover:underline">Slower MPA</a></li>
	<li><a href="#javascript" class="hover:underline">JavaScript</a></li>
	<li><a href="#css" class="hover:underline">CSS</a></li>
</ul>
<LinkHeading class="pt-2" id="no-standards" type="h4">No standards</LinkHeading>
<p class="py-2 text-gray-700 dark:text-gray-300">
	Being new to web development and building freely with vanilla JS simply gave me too much power
	over abstraction. I would create my own patterns (or anti-patterns) that would make my code hard
	to refactor and maintain. I would like a better standard for abstracting components and re-using
	code.
</p>
<LinkHeading id="no-bundle-versioning" type="h4">No bundle versioning</LinkHeading>
<p class="py-2 text-gray-700 dark:text-gray-300">
	When I would deploy my code every user would need to do a hard refresh to get the new code as
	the file names were all the same and therefore cached on the browser. This caused lots of issues
	with users being on the incorrect version of the software. I would like some way of
	automatically getting the new code to users.
</p>
<LinkHeading id="slower-mpa" type="h4">Slower MPA</LinkHeading>
<p class="py-2 text-gray-700 dark:text-gray-300">
	With the current MPA setup load times page to page felt really slow declining user experience. I
	would like a way of navigating the application without reloading the layout and other logic
	every time.
</p>
<LinkHeading id="javascript" type="h4">JavaScript</LinkHeading>
<p class="py-2 text-gray-700 dark:text-gray-300">
	Cause JavaScript. But seriously with JavaScript you get lots of runtime errors and issues and
	the editor experience isn't great. I would like a way to prevent runtime errors and get better
	intellisense.
</p>
<LinkHeading id="css" type="h4">CSS</LinkHeading>
<p class="py-2 text-gray-700 dark:text-gray-300">
	I felt like I knew CSS decently well for my time using it but there were lots of issues with the
	cascading part of it and maintaining multiple style sheets was becoming cumbersome. I would like
	a better way of scoping styles and a way to more easily identify my classes.
</p>
<p class="py-2 text-gray-700 dark:text-gray-300">
	With these pain-points in mind I started to explore technologies that could fix these things for
	me.
</p>
<LinkHeading class="pt-2" id="react" type="h3">Trying out React</LinkHeading>
<p class="py-2 text-gray-700 dark:text-gray-300">
	I had heard of React from the initial web development course I took in 2022 and I had used the
	React-Email project to help create some emails for my project at work. It felt like a natural
	choice especially because of its popularity and adoption.
</p>
<p class="py-2 text-gray-700 dark:text-gray-300">
	So I decided to try it out by building some applications at work. The first application I built
	was a simple plant monitoring screen that displayed datapoints from an API to indicate the line
	status. It had navigation so you could see different parts of the plant as well as a header and
	sidebar layout. I found it much more pleasant to build with as it was easy to abstract
	components and share layouts between screens. I did find some pain around initially learning
	React mostly around the hooks (useEffect more specifically) but most of it wasn't too bad as the
	application was quite small.
</p>
<LinkHeading class="pt-2" id="vite" type="h3">Discovering Vite</LinkHeading>
<p class="py-2 text-gray-700 dark:text-gray-300">
	After creating my first real React project using the dreaded <strong
		class="whitespace-nowrap text-black dark:text-white">create-react-app</strong>
	I was looking to create an admin panel for my larger web app at work. During this time I learned
	about Vite. Vite is the best way to init any project in my opinion. It takes a lot of the pain out
	of using any technology that requires a build step (TypeScript, SASS, Tailwind, etc.). Not to mention
	it also has
	<a href="#no-bundle-versioning" class="text-black hover:underline dark:text-white"
		>bundle versioning</a
	>. Using Vite + React I migrated the original application and built a new admin panel for my
	work project.
</p>
<LinkHeading class="pt-2" id="svelte" type="h3">Discovering Svelte</LinkHeading>
<p class="py-2 text-gray-700 dark:text-gray-300">
	After using React for a while I was getting the hang of it but was curious to try other things.
	Svelte was interesting to me as it was <a
		href="https://www.youtube.com/channel/UCsBjURrPoezykLs9EqgamOA"
		target="_blank"
		class="text-black hover:underline dark:text-white">Fireship</a
	>'s web framework of choice and it seemed to have a lot of love from its users. So I decided to
	try it out, I built a basic to-do app in both React and Svelte and I was blown away by the
	differences in speed of development, and overall complexity.
</p>
<p class="py-2 text-gray-700 dark:text-gray-300">
	In Svelte everything is really intuitive and just works. I don't have to worry about learning
	all 273 hooks to make sure my component behaves as expected. But it also solved other issues for
	me at the time such as scoped styles. It felt like an easy choice to use Svelte for my projects
	moving forward.
</p>
<LinkHeading class="pt-2" id="tailwindcss" type="h3">Discovering TailwindCSS</LinkHeading>
<p class="py-2 text-gray-700 dark:text-gray-300">
	I continued to use Svelte and I had actually chosen to use SASS for most of my time using Vite.
	And Svelte allowed me to move fast enough with my logic and layouts that I noticed that it was
	the CSS that was slowing me down now. I felt like I spent all of my time styling things and they
	didn't even look good.
</p>
<p class="py-2 text-gray-700 dark:text-gray-300">
	I initially thought to use styled components so I explored bootstrap and after I realized it's
	the devil (quite quickly). I decided to look into TailwindCSS. Much of the reason I hadn't tried
	Tailwind yet was simply for all the crap it got for the way it makes your HTML look. But if I
	was trying styled components then I thought it was worth a shot.
</p>
<p class="py-2 text-gray-700 dark:text-gray-300">
	I took some time to read through the Tailwind docs and understand the reasons behind it's
	creation and some of the powerful features it provides. It took some time to get the class names
	and basic patterns in my head but once I had it I felt released from the shackles of CSS. I felt
	like I had struck a perfect balance between writing the logic for the app and styling it.
</p>
<LinkHeading class="pt-2" id="2024-stack" type="h2">My Stack for 2024</LinkHeading>
<p class="py-2 text-gray-700 dark:text-gray-300">
	Going into 2024 my tech stack looks like this:
</p>
<LinkHeading type="h5" id="front-end">Front-End</LinkHeading>
<ul class="list-style-dash flex flex-col">
	<li>Svelte</li>
	<li>TypeScript</li>
	<li>TailwindCSS</li>
</ul>
<LinkHeading type="h5" id="back-end">Back-End</LinkHeading>
<ul class="list-style-dash flex flex-col">
	<li>C# .NET Core</li>
</ul>
<p class="py-2 text-gray-700 dark:text-gray-300">
	For now this is the stack that I can move the fastest with and it will help me build even bigger
	things in 2024.
</p>
