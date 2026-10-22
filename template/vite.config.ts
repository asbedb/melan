import adapter from '@sveltejs/adapter-auto';
import { sveltekit } from '@sveltejs/kit/vite';
import tailwindcss from '@tailwindcss/vite';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import { melan, melanPreprocess } from 'melan/vite';
import { defineConfig } from 'vite';
import config from './melan.config.ts';

// Where the site is served from: empty at a domain's root, or a sub-path such as '/melan' for
// username.github.io/melan. Set BASE_PATH when building, or replace it with the path itself.
const base = (process.env.BASE_PATH ?? '') as '' | `/${string}`;

export default defineConfig({
	plugins: [
		tailwindcss(),
		melan(config),
		sveltekit({
			// Detects Vercel, Netlify, Cloudflare and other supported hosts at build time. For anywhere
			// else, swap in a specific adapter, as described in Melan's getting started guide:
			// https://github.com/asbedb/melan/blob/main/docs/getting-started.md#using-a-specific-adapter
			adapter: adapter(),
			paths: { base },
			extensions: ['.svelte', '.md'],
			preprocess: [
				vitePreprocess(),
				melanPreprocess(config, {
					base,
					// The layout wrapped around every post. Delete this line to use Melan's built-in one.
					layout: 'src/lib/components/PostLayout.svelte'
				})
			]
		})
	]
});
