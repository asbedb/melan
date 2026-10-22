---
title: Code Blocks, Highlighting and Copy Buttons
date: 2026-10-10
updated: 2026-10-20
excerpt: A sample post full of code samples, for checking syntax highlighting in light and dark mode.
author: Jane Doe
cover: placeholder-cover-2.jpg
coveralt: Red, green and blue circles overlapping to mix into yellow, cyan, magenta and white
tags: Development, Tutorial
---

This sample post is mostly code. Hover over a block to show its copy button, and switch themes to check both highlight palettes.

## TypeScript

```ts
interface Post {
	slug: string;
	title: string;
	date?: string;
}

export function sortByDate(posts: Post[]): Post[] {
	return [...posts].sort((a, b) => (b.date ?? '').localeCompare(a.date ?? ''));
}
```

## Svelte

```svelte
<script lang="ts">
	let count = $state(0);
</script>

<button onclick={() => count++}>
	Clicked {count}
	{count === 1 ? 'time' : 'times'}
</button>
```

## Shell

```bash
pnpm install
pnpm dev --open
```

## Inline code

Short snippets such as `const answer = 42` or `pnpm build` sit inside the paragraph and get a subtle background.

![The Vite logo, a yellow lightning bolt over a purple triangle](placeholder-inline-2.jpg)

## A longer example

```js
// Debounce a function so it only runs after `wait` ms of quiet.
export function debounce(fn, wait = 200) {
	let timer;
	return (...args) => {
		clearTimeout(timer);
		timer = setTimeout(() => fn(...args), wait);
	};
}
```

That's enough code for one post.
