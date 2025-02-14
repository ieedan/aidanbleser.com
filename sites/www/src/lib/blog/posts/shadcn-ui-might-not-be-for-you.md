---
title: shadcn/ui might not be for you
description: Why I use shadcn/ui and why you maybe shouldn't.
date: 2025-2-14
---

I am an avid user and contributor to [shadcn-svelte](https://shadcn-svelte.com) and a firm believer in the core reasoning behind it and over my time both using and contributing I have learned a lot about the library as well as it's users. 

## Why I use shadcn/ui
I discovered `shadcn-svelte` while building a ui library called [geist-ui-svelte](https://github.com/ieedan/geist-ui-svelte). Building `geist-ui-svelte` I learned a lot about building components but also about why traditional ui libraries kinda suck. I found myself constantly back and forth between whatever I was actually building and this damned ui library. A lot of this can be attributed to my own inexperience in building a ui library but also the limitations that any traditional ui library imposes on you. 

Traditional ui libraries force you into their API their styles and their way of doing things and the only way to change that is to publish a new version. Even being the sole maintainer of the UI library I was using was extremely frustrating because I was constantly blocked by myself.

Because of this `shadcn-svelte` was a huge upgrade for me. Owning all the code in **MY** project gave me the flexibility I needed to move fast.

## Why you maybe shouldn't
With the popularity of `shadcn/ui` it has quickly became the default for anyone wanting to build a web application with a nice UI. Everyone quickly forgets the reasons it is actually great. `shadcn` has done an incredible job at making the components look beautiful but in doing so has distracted everyone from it's real purpose. 

`shadcn/ui` is about owning the code in your own project and if you aren't prepared for that responsibility then you should simply use something else.

One of the most common things I see is `can you build this`. No **YOU** build it, thats the point. If you are incapable or unwilling to build components for your application `shadcn/ui` is **NOT** for you.