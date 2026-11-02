// The `@asbedb/melan/vite` entry, loaded by vite.config.ts at build time — keep imports relative.
import path from 'node:path';
import type { PreprocessorGroup } from 'svelte/compiler';
import type { Plugin } from 'vite';
import { collectImageDimensions, IMAGE_EXTENSIONS } from './blog/image-sizes.ts';
import { blogPreprocess } from './blog/mdsvex.ts';
import { resolveConfig, type MelanConfig } from './config/index.ts';

const CONFIG_ID = 'virtual:melan/config';
const POSTS_ID = 'virtual:melan/posts';
const IMAGE_SIZES_ID = 'virtual:melan/image-sizes';
const VIRTUAL_IDS = [CONFIG_ID, POSTS_ID, IMAGE_SIZES_ID];

/**
 * Vite plugin that hands `melan.config.ts` to Melan's components, as `virtual:melan/config`,
 * collects the posts in the blog folder, as `virtual:melan/posts`, and reads the width and height
 * of the images in `static/`, as `virtual:melan/image-sizes`. Vite restarts the dev server when
 * the config file changes, so edits show up straight away.
 */
export function melan(config: MelanConfig): Plugin {
	const resolved = resolveConfig(config);
	// Only posts directly inside the blog folder: `<blog path>/<slug>/+page.md`.
	const posts = `/src/routes${resolved.blog.path}/*/+page.md`;
	let staticDir = path.resolve('static');

	return {
		name: 'melan',
		// The components import the virtual modules above, so they must go through Vite's
		// pipeline rather than being pre-bundled or left to Node during SSR.
		config: () => ({
			optimizeDeps: { exclude: ['@asbedb/melan'] },
			ssr: { noExternal: ['@asbedb/melan'] }
		}),
		configResolved({ root }) {
			staticDir = path.resolve(root, 'static');
		},
		// Images added, changed or removed in static/ while the dev server runs get new sizes.
		configureServer(server) {
			const onChange = (file: string) => {
				if (!IMAGE_EXTENSIONS.test(file)) return;
				if (!path.resolve(file).startsWith(staticDir + path.sep)) return;
				for (const environment of Object.values(server.environments)) {
					const mod = environment.moduleGraph.getModuleById(`\0${IMAGE_SIZES_ID}`);
					if (mod) environment.moduleGraph.invalidateModule(mod);
				}
				server.ws.send({ type: 'full-reload' });
			};
			server.watcher.on('add', onChange).on('change', onChange).on('unlink', onChange);
		},
		resolveId(id) {
			if (VIRTUAL_IDS.includes(id)) return `\0${id}`;
		},
		load(id) {
			if (id === `\0${CONFIG_ID}`) return `export default ${JSON.stringify(resolved)};`;
			if (id === `\0${POSTS_ID}`) {
				return `export default import.meta.glob(${JSON.stringify(posts)}, { eager: true, import: 'metadata' });`;
			}
			if (id === `\0${IMAGE_SIZES_ID}`) {
				return `export default ${JSON.stringify(collectImageDimensions(staticDir))};`;
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
