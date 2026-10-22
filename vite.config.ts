import adapter from '@sveltejs/adapter-auto';
import { sveltekit } from '@sveltejs/kit/vite';
import tailwindcss from '@tailwindcss/vite';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import { defineConfig } from 'vite';
import { blogPreprocess } from './src/lib/blog/mdsvex.ts';

// Where the site is served from: empty at a domain's root, or a sub-path such as '/melan' for
// username.github.io/melan. Set BASE_PATH when building, or replace it with the path itself.
const base = (process.env.BASE_PATH ?? '') as '' | `/${string}`;

export default defineConfig({
	plugins: [
		tailwindcss(),
		sveltekit({
			// Detects Vercel, Netlify, Cloudflare and other supported hosts at build time. For anywhere
			// else, swap in a specific adapter: see "Build and deploy" in docs/getting-started.md.
			adapter: adapter(),
			paths: { base },
			extensions: ['.svelte', '.md'],
			preprocess: [vitePreprocess(), blogPreprocess({ base })]
		})
	]
});
