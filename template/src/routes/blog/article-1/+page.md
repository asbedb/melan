---
title: A Field Guide to Placeholder Posts
date: 2026-10-18
description: A sample post that shows headings, lists, quotes, images and tables, so you can see how the layout handles them.
author: Jane Doe
cover: placeholder-cover-1.jpg
coveralt: A lime-green Volkswagen Beetle decorated with orange dinosaur spikes, parked on a lawn
tags:
  - Design
  - Writing
---

This is filler content. It's here to show how each piece of Markdown looks once it goes through the blog layout. Replace it with a real post whenever you like.

## Why placeholder content helps

Real content is messy. Headings run long, paragraphs vary in length, and images come in all sorts of shapes. Filler that looks like a real post shows layout problems early, before they show up in front of readers.

Here are a few things worth checking:

- Line length and paragraph spacing
- How headings sit against the body text
- **Bold**, _italic_ and `inline code` inside a sentence
- Links, like [this one to the SvelteKit docs](https://svelte.dev/docs/kit)

### Ordered steps

1. Write the frontmatter.
2. Draft the body in plain Markdown.
3. Preview it locally with `pnpm dev`.
4. Publish.

## Images

Inline images use standard Markdown syntax and pick up rounded corners from the prose styles.

### Inline images

![The orange Svelte logo on a blurred pink and yellow background](placeholder-inline-1.jpg)

### Alt text

Always describe what the image shows in the square brackets. Screen readers read it out, and it shows up if the image fails to load.

## Quotes

> Design is not just what it looks like and feels like. Design is how it works.
>
> — An oft-quoted designer

## Tables

### Frontmatter fields

| Field         | Required | Notes                                 |
| ------------- | -------- | ------------------------------------- |
| `title`       | No       | Falls back to the folder name         |
| `date`        | No       | Used to sort the index, newest first  |
| `description` | No       | Shown under the title and on the card |
| `tags`        | No       | A YAML list or a comma-separated list |
| `toc`         | No       | Set to `false` to hide "On this page" |

### On small screens

Wide tables scroll sideways on small screens instead of stretching the page.

## Wrapping up

That covers the basics. The next sample post focuses on code blocks.
