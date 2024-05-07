# Not using TailwindCSS for your next project is IRRESPONSIBLE
With the consistency and semantics Tailwind gives your codebase you would be irresponsible not to choose TailwindCSS for your next project.

There are many arguments against Tailwind but most of them don't hold any water. Normally you hear stuff like... "It makes my HTML Ugly" or... "I have to learn someone elses utility classes". The fact is these arguments shouldn't prevent you from using Tailwind in your next project.

Before we talk about why Tailwind is so great lets squash the arguments against Tailwind.

First of all the argument that "It makes my HTML Ugly". To a non-Tailwind user looking in from the outside this is a fairly strong argument. However once you start using Tailwind you find ways to structure your classes to make your markup more presentable. On top of that there are other tools out there such as the `prettier-plugin-tailwindcss` which sort your Tailwind classes to make it easier to read and maintain. In many cases Tailwind actually ends up being less code than traditional CSS classes. Lets look at an example of some code for a big red button.

**Before Tailwind**

```svelte
<!-- Big red button -->
<button class="big-red-button"> 
	Click Me!
</button>

<style>
	.big-red-button {
		background: red;
		border-radius: 9999px;
		width: 100px;
		height: 100px;
		box-shadow: 0px 3px 5px gray;
	}
</style>
```

**After Tailwind**

```svelte
<!-- Big red button -->
<button class="h-[100px] w-[100px] rounded-full bg-red-800 shadow-md"> 
	Click Me! 
</button>
```

The change in complexity is pretty obvious and this doesn't take into acount some of the built in overrides Tailwind provides such as every button automatically showing cursor-pointer when hovered.

Next lets talk about the second argument "I have to learn someone elses utility classes" and while no one should ever be afraid to learn something learning Tailwind just isn't hard. The Tailwind docs are well structured and make it extremely easy to get started. When I first started using Tailwind I took an hour or two to read through the docs and understand the core concepts. And even if you don't come out of the docs knowing every class the Tailwind plugins are excellent for browsing through all the classes to see what they do.

Tailwind plugin for VSCode
Now that we've squashed the common arguments against Tailwind. Here are just a few of the arguments for using Tailwind:

-   Style Standardization
-   Style/Markup Collocation
-   Style Localization
-   Speed of development

## Style Standardization

Style Standardization means any project that uses Tailwind can be maintained by anyone who already knows Tailwind. Having standards in your code improves productivity and onboarding for every project that use those standards.

## Style/Markup Collocation

The collocation of styles in the markup make it easy to understand what is effected by a change and saves lots of time otherwise used searching for CSS classes.

## Style Localization

Tailwind takes the cascading out of cascading style sheets (CSS). You no longer need the context of the entire codebase to make a simple style change. This saves a huge amount of time debugging weird CSS issues caused by overlapping classes and cascading styles.

## Speed of development

Between the collocation, standardization, and simplicity Tailwind provides it means that development is way faster. The jump in productivity I have seen from using Tailwind has been the largest between any other 2 technologies I have switched between in my Web Dev journey.

If you can read all this and still choose not to use Tailwind for your next project then you are truly **IRRESPONSIBLE**.
