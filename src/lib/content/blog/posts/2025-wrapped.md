---
title: My 2025 Web Development Wrapped
description: How I grew and updated my tech stack in 2025.
date: 2026-02-04
---

For the last two years I have looked back on my development journey in the past year by writing a blog post about it. This year I was late, but in the spirit of tradition I will be writing about it anyway.

## What I shipped

This year I shipped a ton of stuff.

- [shadcn-svelte-extras](https://shadcn-svelte-extras.com)
- [jsrepo.com](https://jsrepo.com)
- [thom.chat](https://thom.chat)
- [comprably.ai](https://comprably.ai)
- [jsrepo v3](https://jsrepo.dev)
- [finalchat.app](https://finalchat.app)

### shadcn-svelte-extras

![shadcn-svelte-extras](/blog/2025-wrapped/shadcn-svelte-extras.png)

I started shadcn-svelte-extras in late 2024 to start to combine components I had been writing and rewriting for different projects all into one unified registry. Since then the library has expanded to include 30+ components and utilities used by real companies for real applications.

### jsrepo.com

![jsrepo.com](/blog/2025-wrapped/jsrepo-com.png)

I shipped jsrepo.com to make publishing and tracking versions of registries trivial. It's basically npm for registries allowing you to publish to a centralized registry and even have private registries. It also allows you to monetize your registry.

### thom.chat

![thom.chat](/blog/2025-wrapped/thom-chat.png)

[Thomas](https://github.com/TGlide) and I built Thom.chat as our entry for the T3Chat Cloneathon. We mostly cloned the look and feel of the T3Chat app but we also added a few pretty unique features:

- Rules - Basically cursor rules that you can optionally attach to your chats
- Enhance prompt button - This was completely original at the time allowing for an AI to improve your prompt before sending it
- Full text search - This wasn't a thing in T3Chat at the time so we were pretty proud of it

Overall it was pretty good for building in a few days. But I was itching to build something even better...

### comprably.ai

![comprably.ai](/blog/2025-wrapped/comprably-ai.png)

comprably.ai is an AI chat application that allows you to paste URLs to products and scrape them so that you can compare them with the help of an AI assistant. This started from me picking up a bunch of new hobbies and never knowing what to buy. The idea was that this would help me feel more confident about my decisions.

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

While working on everything else I never went back to thom.chat but I always felt an itch to build the chat app I really wanted. I needed something that worked well on mobile and desktop and that was blazing fast and beautiful. 

So I privately built and recently open-sourced my solution Finalchat.

## Tech stack

Looking back to 2025 I ended the year with the following tech stack:

**Front-End**

- Svelte (Kit)
- TypeScript
- TailwindCSS
- shadcn-svelte

**Back-End**

- Go
- Rust (depending on the application)

In 2025 I still used everything I had before but I added a few new things to my stack as well.

### Convex

By far the biggest change to my stack in 2025 was adding Convex.

This last summer I competed in the T3Chat Cloneathon where [Thomas](https://github.com/TGlide) and I built [thom.chat](https://thom.chat). When picking the stack we decided to try out [Convex](https://convex.dev) since it's what Theo was using for T3Chat.

Little did I know I would fall so in love that now I can't see myself using anything else. It actually feels dumb to choose another database now.

Convex is so fast and solves so many problems that I think I would have to be betting against my product to use anything else.

I could go really in depth on everything I love about Convex but I think I will save that for another post.

### Full stack TypeScript

In 2024 I wasn't yet fully convinced that full stack TypeScript was for me but in 2025 it was the only way I shipped apps. Especially now in the age of AI shipping your entire stack in the same language has insane benefits. And now that I am using Convex there isn't any other way I'd prefer to ship my apps.
