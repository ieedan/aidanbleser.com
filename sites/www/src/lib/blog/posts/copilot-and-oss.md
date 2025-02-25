---
title: Copilot, Plagiarism, and OSS
description: Copilot plagiarism is no longer a theory.
date: 2025-2-25
---

Yesterday I was scrolling the internet as one does and I found a project called [shadcn-svelte-enhancements](https://github.com/tzezar/shadcn-svelte-enhancements). This piqued my interest because I was currently working on my own project [shadcn-svelte-extras](https://github.com/ieedan/shadcn-svelte-extras). 

I started to check out the project to see what components it had to offer and noticed that many of the components were very similar to the ones I had built in `shadcn-svelte-extras`. 

I then decided to go a bit deeper and look at the code... 

This is when my heart sank, the code was almost identical. Why would someone choose to copy my work and claim it as their own? 

I try to keep my head and not blow up in the comments of the [reddit post](https://www.reddit.com/r/sveltejs/comments/1iuvrjm/selfpromo_introducing_tzezars_shadcnsvelte/). But I can't help but feel frustrated and upset that this could happen.

I vent my frustration to a friend who then opens an issue on the repository [#3](https://github.com/tzezar/shadcn-svelte-enhancements/issues/3) and comments on the reddit post. 

At the time of the issue being opened there were 5 components that all had code identical or near identical (only different because of renames or added comments) to mine.

For reference here is a diff of the [CopyButton](https://shadcn-svelte-extras.com) component:
```diff
<script lang="ts">
	import { Button, type ButtonProps } from '$lib/components/ui/button';
	import { UseClipboard } from '$lib/hooks/use-clipboard.svelte';
-	import { cn } from '$lib/utils/utils';
+	import { cn } from '$lib/utils';
	import { Check, Copy, X } from 'lucide-svelte';
	import type { Snippet } from 'svelte';
	import { scale } from 'svelte/transition';

	// omit href so you can't create a link
	interface Props extends Omit<ButtonProps, 'href'> {
		text: string;
		textToCopy: string;
		icon?: Snippet<[]>;
		animationDuration?: number;
		onCopy?: (status: UseClipboard['status']) => void;
	}

	let {
-		text,
+		textToCopy,
		icon,
		animationDuration = 500,
		variant = 'ghost',
		size = 'icon',
		onCopy,
		class: className,
		...restProps
	}: Props = $props();

	const clipboard = new UseClipboard();
</script>

 <Button
	{...restProps}
	{variant}
	{size}
	class={cn(className)}
	type="button"
	name="copy"
	tabindex={-1}
	onclick={async () => {
-		const status = await clipboard.copy(text);
+		const status = await clipboard.copy(textToCopy);

		onCopy?.(status);
	}}
 >
	{#if clipboard.status === 'success'}
		<div in:scale={{ duration: animationDuration, start: 0.85 }}>
			<Check />
			<span class="sr-only">Copied</span>
		</div>
	{:else if clipboard.status === 'failure'}
		<div in:scale={{ duration: animationDuration, start: 0.85 }}>
			<X />
			<span class="sr-only">Failed to copy</span>
		</div>
	{:else}
		<div in:scale={{ duration: animationDuration, start: 0.85 }}>
			{#if icon}
				{@render icon()}
			{:else}
				<Copy />
			{/if}
			<span class="sr-only">Copy</span>
		</div>
	{/if}
 </Button>
```

Most of the code looked exactly like this, almost completely identical with a few renames of variables or labels here and there. While it wasn't a lot of code the implementation was so similar that it was highly suspicious.

From here things escalated, the creator was denying all claims of plagiarism refusing to take responsibility for their actions, insisting that they had never seen my project before. 

Not believing him, I doubled down finding more examples of ways that it simply wasn't possible that they wrote these components without significant influence from my project.

At this point the creator started to try and "make things right" and made a note of the plagiarized components in the [README](https://github.com/tzezar/shadcn-svelte-enhancements/blob/d2cfe5640237a61f726cbceeeac1151a3542a745/README.md#credits). 

And this is when I asked them:

> [...] did you just have copilot autocomplete all of this for you and not realize that it was my code?

And then the response:

> [...] What possible benefit would I gain from copying someone else's project? I didn't even know your site existed. I never manually copied anything from your GitHub, but I can't prove that.

> I started using Copilot because I found out about the free trial month, and it seemed like a good deal. Being able to generate dozens of lines of code with a single comment is amazing. Maybe you're right—if your repository was public and indexed, Copilot might have pulled code from it. I honestly don’t know.

At this moment it was like watching a prophecy come true. I had seen creators [ThePrimeagen](https://www.youtube.com/ThePrimeagen) talk about the risks of Copilot and the possibility of plagiarism but this was the first time I had seen it first hand. 

Now I realized how badly I messed up. This guy had no idea that Copilot plagiarized my code. Furthermore I had gone after him over a very limited amount of [MIT](https://opensource.org/license/mit) licensed code that he had every right to use however he wanted.

In reality no one had done anything wrong except for me.

## Conclusion

I completely stepped over the line here with the accusations that were made and for that I apologize to the open source community and I promise to do better.

For me this further adds to my list of reasons not to use Copilot. It was far too easy to generate code that was essentially identical to someone elses without even knowing it. In this case it ended with a funny misunderstanding but the stakes here really couldn't have been lower.

## Afterword

Before writing this I apologized to [Tzezar](https://github.com/tzezar) and I think it's safe to say we are both on good terms. This was a learning experience for both of us and I think we will both be more careful in the future.

> [...] I learned something important—that the easy way with AI isn’t always the best way. [...]

He has since unlisted the components in question and has made note in the README that the components are inspired by my project.
