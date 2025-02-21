---
title: Migrating from Arc to Zen in 5 minutes
description: Arc is dead, it's time to make the switch to a browser that gives a sh*t about it's users.
date: 2025-2-21
---

![final product](/blog/later-arc/final-ss.png)

## Why I left Arc

I, like many, was introduced to Arc browser by Theo (@t3dotgg). I saw the utility in the workflows it enabled and have become extremely attached to them. I loved the screen space the sidebar gives you, the hotkeys, the ways that I could manage my tabs.

But for everything that I liked about Arc browser there are things that simply make it unusable.

I use Arc on Windows (_sorry_). And Arc on Windows is (simply put), a disaster. Here's just a few of the issues I face every day on Arc for Windows:

- When I have multiple tabs with dev tools open they become entangled and clicking to inspect elements on one page navigates me to the other page.
- For whatever reason after browsing for a while the cursor will not change when hovering elements when it should. It will remain stuck on the default cursor whether I am over a textbox, button, or whatever else. This can be super annoying when trying to identify how things are supposed to interact on a webpage.

_I reported both of these issues months ago and never heard a response._

Arc is by any definition of the word, _dead_.

## Migrating to Zen

Zen is an incredible browser with one major black eye (_FireFox_), but if you can get over that, it has every feature in Arc and more.

## The sidebar

Heres the sidebar structure we are all familiar with in Arc but labeled with the terms that Zen uses to describe each section.

![sidebar.png](/blog/later-arc/sidebar.png)

Pinned tabs are created simply by dragging an existing tab above the `New Tab` button.

Essentials can be created by right clicking on a tab and then selecting `Add to essentials` from the menu.

### Toggling the sidebar

The Zen sidebar has a few different states so it's worth mentioning in it's own section. I personally don't care about any of the intermediate states so I just want the sidebar to be open or closed.

To accomplish this you need to do a few things...

First, you will want to go under `Look and Feel > Theme Settings > Show in compact view` and select `Hide Tab bar`. This will hide the sidebar while leaving the top bar intact.

Next go to `Keyboard Shortcuts` under `Compact Mode` all you need to care about here is `Toggle Compact Mode`. This is like your `Ctrl + S` in Arc.

If you find that the sidebar still shows after pressing this hotkey then the `Floating Sidebar` may be enabled. In this case simply disable it by pressing the hotkey designated for it and you should no longer see the sidebar when in compact mode.

## The top bar

The only real problem I have with the top bar is the width of the url bar. It takes up nearly the entire top bar just by itself.

This is easy enough to fix. Right click either the top bar or sidebar and select `Customize Toolbar`.

From here you get a ton of options for customizing the ui on your own. Find the `Flexible space` widget, and just drag a few to the left and right of the url bar until you feel good about the way it looks.

![topbar spacing](/blog/later-arc/topbar-spacing.png)

## Zen Mods (optional)

Zen mods are ways of customizing the Zen browser UI.

Right now I only use one [Super Url Bar](https://zen-browser.app/mods/d93e67f8-e5e1-401e-9b82-f9d5bab231e6/). This allows for some helpful customizations like being able to remove the icons from the url bar.

## Conclusion

While I will missing Chromium I won't miss Arc. While Arc had many features that were useful Zen has everything and more.

Hopefully you found this helpful for getting Arc out of your life.
