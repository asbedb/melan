// `.md` files are compiled to Svelte components by melanPreprocess (vite.config.ts).
declare module '*.md' {
	import type { Component } from 'svelte';

	const component: Component;
	export default component;
}
