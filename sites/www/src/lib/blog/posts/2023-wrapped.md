---
title: My 2023 Web Development Wrapped
description: How I grew and updated my tech stack in 2023.
date: 2023-12-21
---

2023 has been a huge year in my web development journey. Continue reading to see how far I have come and the technologies I will be using in 2024.

2023 was my second year doing web development after starting in the fall of 2022. I came into 2023 using vanilla JavaScript, HTML, and CSS for the front-end and C# rest API for the backend of my web applications. I had built a portfolio website and a large project at work using this stack and was doing okay but felt a few pain-points which I will list below.

- No standards
- No bundle versioning
- Slower MPA
- JavaScript
- CSS

## No standards

Being new to web development and building freely with vanilla JS simply gave me too much power over abstraction. I would create my own patterns (or anti-patterns) that would make my code hard to refactor and maintain. I would like a better standard for abstracting components and re-using code.

## No bundle versioning

When I would deploy my code every user would need to do a hard refresh to get the new code as the file names were all the same and therefore cached on the browser. This caused lots of issues with users being on the incorrect version of the software. I would like some way of automatically getting the new code to users.

## Slower MPA

With the current MPA setup load times page to page felt really slow declining user experience. I would like a way of navigating the application without reloading the layout and other logic every time.

## JavaScript

Cause JavaScript. But seriously with JavaScript you get lots of runtime errors and issues and the editor experience isn't great. I would like a way to prevent runtime errors and get better intellisense.

## CSS

I felt like I knew CSS decently well for my time using it but there were lots of issues with the cascading part of it and maintaining multiple style sheets was becoming cumbersome. I would like a better way of scoping styles and a way to more easily identify my classes.

With these pain-points in mind I started to explore technologies that could fix these things for me.

## Trying out React

I had heard of React from the initial web development course I took in 2022 and I had used the React-Email project to help create some emails for my project at work. It felt like a natural choice especially because of its popularity and adoption.

So I decided to try it out by building some applications at work. The first application I built was a simple plant monitoring screen that displayed datapoints from an API to indicate the line status. It had navigation so you could see different parts of the plant as well as a header and sidebar layout. I found it much more pleasant to build with as it was easy to abstract components and share layouts between screens. I did find some pain around initially learning React mostly around the hooks (useEffect more specifically) but most of it wasn't too bad as the application was quite small.

## Discovering Vite

After creating my first real React project using the dreaded create-react-app I was looking to create an admin panel for my larger web app at work. During this time I learned about Vite. Vite is the best way to init any project in my opinion. It takes a lot of the pain out of using any technology that requires a build step (TypeScript, SASS, Tailwind, etc.). Not to mention it also has bundle versioning. Using Vite + React I migrated the original application and built a new admin panel for my work project.

## Discovering Svelte

After using React for a while I was getting the hang of it but was curious to try other things. Svelte was interesting to me as it was Fireship's web framework of choice and it seemed to have a lot of love from its users. So I decided to try it out, I built a basic to-do app in both React and Svelte and I was blown away by the differences in speed of development, and overall complexity.

In Svelte everything is really intuitive and just works. I don't have to worry about learning all 273 hooks to make sure my component behaves as expected. But it also solved other issues for me at the time such as scoped styles. It felt like an easy choice to use Svelte for my projects moving forward.

## Discovering TailwindCSS

I continued to use Svelte and I had actually chosen to use SASS for most of my time using Vite. And Svelte allowed me to move fast enough with my logic and layouts that I noticed that it was the CSS that was slowing me down now. I felt like I spent all of my time styling things and they didn't even look good.

I initially thought to use styled components so I explored bootstrap and after I realized it's the devil (quite quickly). I decided to look into TailwindCSS. Much of the reason I hadn't tried Tailwind yet was simply for all the crap it got for the way it makes your HTML look. But if I was trying styled components then I thought it was worth a shot.

I took some time to read through the Tailwind docs and understand the reasons behind it's creation and some of the powerful features it provides. It took some time to get the class names and basic patterns in my head but once I had it I felt released from the shackles of CSS. I felt like I had struck a perfect balance between writing the logic for the app and styling it.

## My Stack for 2024

Going into 2024 my tech stack looks like this:

**Front-End**

- Svelte
- TypeScript
- TailwindCSS

**Back-End**

- C# .NET Core

For now this is the stack that I can move the fastest with and it will help me build even bigger things in 2024.
