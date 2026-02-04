---
title: My 2024 Web Development Wrapped
description: How I grew and updated my tech stack in 2024.
date: 2024-12-19
---

Last december I recounted my journey as a developer in 2023 you can see that post [here](https://aidanbleser.com/blog/posts/My%202023%20Web%20Development%20Wrapped). Looking back on that post it's pretty incredible to see how things have changed and stayed the same.

Lets start by talking about where I started this year (the end of last years post):

**Front-End**

- Svelte(kit)
- TypeScript
- TailwindCSS

**Back-End**

- C# .Net Core

I chose Svelte because I loved it's simplicity and how easy it was to move fast, TailwindCSS because really what else are you gonna use and TypeScript because duh.

On the backend I was using C# because it has an awesome experience for building APIs and I was familiar with the language.

## UI Libraries

### geist-ui-svelte

Early this year I started a project called [geist-ui-svelte](https://geist-ui-svelte.dev). This was my best effort at a UI library with a similar style to the Vercel Geist design system. I used this for the rewrite of the CMMS I built for my company and it worked really well but then I discovered [shadcn-svelte](https://shadcn-svelte.com).

### shadcn-svelte

**shadcn-svelte** was a revelation for me, all the burden and problems caused by **geist-ui-svelte** could be solved by just having the source in my own project. Once my work project was mostly feature complete I started migrating everything to use **shadcn-svelte** instead of **geist-ui-svelte**. Since then I have started contributing to **shadcn-svelte** to help it to continue to grow.

## Trying out new languages

### Rust

Early this year I decided to really dig into **Rust** so I read the book and built a lot of my new backend and CLI projects with it. Heres just a few of the public projects:

- [esetres](https://github.com/ieedan/esetres) is a self host-able file storage server. Like S3 at home.
- [vnv](https://github.com/ieedan/vnv) an enhanced .env syntax that allows you to validate variables and build them for different environments.

After building many projects with **Rust** I have found that I really enjoy it for CLI applications and parsers but it wouldn't necessarily be my first option for projects where async is essential, that takes me to the second new language I tried.

### Go

I have already written an article about what I like about **Rust** and expect one to come eventually on **Go** as well. After seeing so much positivity around the language it only seemed right to give it a shot, so later in the year I decided to try building some projects with **Go**. While I haven't built quite as much with it as **Rust** I feel that I have a similar understanding of the language just because it is so much simpler.

Heres a few of the projects I built:

- [sl](https://github.com/ieedan/sl) a CLI built for managing Pokémon Soul Link play throughs.

I will save a lot of my thoughts on Go for when I write about it in the future but at the moment it would be my preference for any new API I build.

## My biggest project of 2024

This year with the knowledge I gained from contributing to **shadcn-svelte** and the problems I had encountered from the rest of the year in mind I created [jsrepo](https://jsrepo.dev). **jsrepo** is my solution to sharing code without having to worry about bloating my projects with npm and also owning the source.

I found myself re-using many utility functions and components that really weren't worth an npm package but fit well into a `shadcn-style` library. That inspired me to build the first fully-local iteration called **ts-blocks** a CLI that shipped with blocks that I created that allowed me to install them into my project.

However after some time using **ts-blocks** and other tools I realized that this would be more useful as a way to share code through a `shadcn-style` registry where anyone could have their own code distributed. This prompted me to do a pivot to what **jsrepo** is today.

## My Stack for 2025

Going into 2025 my tech stack looks like this:

**Front-End**

- Svelte(kit)
- TypeScript
- TailwindCSS
- shadcn-svelte

**Back-End**

- Go
- Rust (depending on the application)

On the front end things mostly stay the same since I have been so happy with this stack the last year but I will be adding shadcn-svelte because it just makes the UI so easy.

On the backend I am going swap out C# for languages that feel more light-weight and specialized.
