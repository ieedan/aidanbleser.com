---
title: My 2025 Web Development Wrapped
description: How I grew and updated my tech stack in 2025.
date: 2026-02-04
---

For the last two years I have looked back on my development journey in the past year by writing a blog post about it. You can see those posts here:

- [2023 Wrapped](https://aidanbleser.com/blog/posts/2023-wrapped)
- [2024 Wrapped](https://aidanbleser.com/blog/posts/2024-wrapped)

This year I changed the way I work completely, I wrote more code than ever before, and I built more things than ever before. Here's how I changed, what I shipped, and what I learned.

## How I changed

In 2025 I changed the way I work completely. Before this last year I was hand coding pretty much everything, only using AI to answer questions. However when building an MCP server for [jsrepo](https://jsrepo.dev) I gave Cursor a try for the first time.

At first it was just to test out the MCP and I only subscribed so that I could get improved usage limits.

When I was done with the MCP I decided to stay out my subscription. I even canceled it so that it wouldn't renew the next month. But then I started using Tab...

Tab is Cursor's AI autocomplete and it is absolutely best in class. This made me fall in love with Cursor so much that I renewed my subscription and I have been using it ever since.

Since then, the way I use AI to code as constantly evolved. At first I was really only using tab with the occasional usage of cmd+k to do quick inline edits or ask mode to get quick answers. Since then I have better learned what the models are capable of, what I can delegate, and what I have to do myself.

Now often I find myself in Agent mode guiding the AI along like the perfect coworker. Although for anything I don't understand well enough I often hand roll it before I just accept whatever solution the AI gives me.

## What I shipped

This year I built more than I ever have before. Heres a few of the things I shipped:

- [shadcn-svelte-extras](https://shadcn-svelte-extras.com)
- [jsrepo.com](https://jsrepo.com)
- [thom.chat](https://thom.chat)
- [comprably.ai](https://comprably.ai)
- [jsrepo v3](https://jsrepo.dev)
- [finalchat.app](https://finalchat.app)

### shadcn-svelte-extras

![shadcn-svelte-extras](/blog/2025-wrapped/shadcn-svelte-extras.png)

I started shadcn-svelte-extras in late 2024 to combine components I had been writing and rewriting for different projects all into one unified registry. Since then, the library has expanded to include 30+ components and utilities used by real companies for real applications.

### jsrepo.com

![jsrepo.com](/blog/2025-wrapped/jsrepo-com.png)

I shipped jsrepo.com to make publishing and tracking versions of registries trivial. It's basically npm for registries allowing you to publish to a centralized registry and even have private registries. It also allows you to monetize your registry. It's completely free to all users and currently has almost 200 users who have published 30 different registries and over 400 registry versions.

### thom.chat

![thom.chat](/blog/2025-wrapped/thom-chat.png)

[Thomas](https://github.com/TGlide) and I built Thom.chat as our entry for the T3Chat Cloneathon. We mostly cloned the look and feel of the T3Chat app but we also added a few pretty unique features:

- Rules - Basically cursor rules that you can optionally attach to your chats
- Enhance prompt button - This was completely original at the time allowing for an AI to improve your prompt before sending it
- Full text search - This wasn't a thing in T3Chat at the time so we were pretty proud of it

Overall it was pretty good for building it in just a few days but definitely has some rough edges.

### comprably.ai

![comprably.ai](/blog/2025-wrapped/comprably-ai.png)

comprably.ai is an AI chat application that allows you to paste URLs to products and scrape them so that you can compare them with the help of an AI assistant.

This started from me picking up a bunch of new hobbies and never knowing what to buy. The idea was that this would help me feel more confident about my decisions.

Unfortunately the launch flopped and I haven't put much effort into marketing it, so it's really not seeing any use.

### jsrepo v3

![jsrepo v3](/blog/2025-wrapped/jsrepo.png)

Just before I left for our vacation to Hawaii I started forming the first ideas of what jsrepo v3 could be. jsrepo v2 simply wasn't flexible enough. Automatically building could only go so far and really limited users to doing things the "jsrepo way". So I set out to accomplish a few goals:

- Allow users to manually configure registry items
- Allow users to extend jsrepo with plugins for things like languages, transformers, outputs, and providers
- Make jsrepo even faster than before
- Make jsrepo as compatible with shadcn as possible

Within a few months all of those problems were solved and I proudly shipped jsrepo v3.

### Finalchat

![finalchat](/blog/2025-wrapped/finalchat.png)

Finalchat is my dream chat app. I built this for me. I named it finalchat because it's the last chat app I'll ever need.

It's beautiful, fast, and works on mobile and desktop. I'm certainly not done with it yet but it's been working really well for me in the past few weeks I've had it.

## What I learned

### I should test my ideas faster

This year I built a ton of stuff. But I also spent a lot of time thinking about and building the wrong ideas. This year I want to test my ideas faster. I think it's important to learn what a good MVP looks like and how to stick to it and built it quickly. I sunk tons of time into ideas like comprably.ai that eventually just didn't work out.

### I should delegate more

With using AI more and more I have begun to become better at crafting prompts that create good results. I want to continue that this year. I want to delegate everything I know how to do to the AI and only solve the interesting problems myself.

### I have to do stuff to build stuff

I haven't come up with any ideas this year by just looking around my desk and trying to come up with something. I need to do stuff to find inspiration. This year I need to do stuff.
