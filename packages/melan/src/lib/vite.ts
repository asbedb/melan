// The `@asbedb/melan/vite` entry, loaded by vite.config.ts at build time — keep imports relative.
import path from 'node:path';
import type { PreprocessorGroup } from 'svelte/compiler';
import type { Plugin } from 'vite';
import { blogPreprocess } from './blog/mdsvex.ts';
import { resolveConfig, type MelanConfig } from './config/index.ts';

const CONFIG_ID = 'virtual:melan/config';
const POSTS_ID = 'virtual:melan/posts';

/**
 * Vite plugin that hands `melan.config.ts` to Melan's components, as `virtual:melan/config`,
 * and collects the posts in the blog folder, as `virtual:melan/posts`. Vite restarts the dev
 * server when the config file changes, so edits show up straight away.
 */
export function melan(config: MelanConfig): Plugin {
	const resolved = resolveConfig(config);
	// Only posts directly inside the blog folder: `<blog path>/<slug>/+page.md`.
	const posts = `/src/routes${resolved.blog.path}/*/+page.md`;

	return {
		name: 'melan',
		// The components import the virtual modules above, so they must go through Vite's
		// pipeline rather than being pre-bundled or left to Node during SSR.
		config: () => ({
			optimizeDeps: { exclude: ['@asbedb/melan'] },
			ssr: { noExternal: ['@asbedb/melan'] }
		}),
		resolveId(id) {
			if (id === CONFIG_ID || id === POSTS_ID) return `\0${id}`;
		},
		load(id) {
			if (id === `\0${CONFIG_ID}`) return `export default ${JSON.stringify(resolved)};`;
			if (id === `\0${POSTS_ID}`) {
				return `export default import.meta.glob(${JSON.stringify(posts)}, { eager: true, import: 'metadata' });`;
			}
		}
	};
}

export interface MelanPreprocessOptions {
	/** The site's base path (`paths.base` in the SvelteKit options), added to image paths in posts. */
	base?: string;
	/**
	 * The layout wrapped around every post, relative to the project root, e.g.
	 * `src/lib/components/PostLayout.svelte`. Defaults to Melan's built-in post layout.
	 */
	layout?: string;
}

/**
 * Svelte preprocessor that turns `.md` files into pages, with Twinkleplop highlighting, KaTeX maths,
 * CodePen embeds and the post layout. Add `.md` to the SvelteKit `extensions` alongside it.
 */
export function melanPreprocess(
	config: MelanConfig,
	options: MelanPreprocessOptions = {}
): PreprocessorGroup {
	return blogPreprocess(resolveConfig(config).blog, {
		base: options.base,
		layout: options.layout && path.resolve(options.layout)
	});
}

export type { MelanConfig } from './config/index.ts';
