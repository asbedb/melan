// Shared by the mdsvex preprocessor (vite.config.ts) and the blog components,
// so keep imports in this file relative — no `#lib` or `$lib` aliases.
import type { RouteId } from '$app/types';

/** Class wrapped around every highlighted code block; the copy buttons look for it. */
export const CODE_BLOCK_CLASS = 'code-block';

export interface BlogConfig {
	/** Locale used to format post dates. */
	locale: string;
	/**
	 * Where the blog lives. This is also its folder under `src/routes`, so rename both together;
	 * `pnpm check` flags a path with no matching folder.
	 */
	path: RouteId;
	/**
	 * Folders under `static/` that bare image filenames in posts are looked up in.
	 * Paths starting with `/` and full URLs are always used as written.
	 */
	assets: {
		/** For the `cover` and `ogimage` frontmatter fields. */
		covers: string;
		/** For images inside the post body. */
		images: string;
	};
	highlight: {
		/** Shiki theme names for light and dark mode. */
		themes: { light: string; dark: string };
		/** Languages to highlight; anything else is shown as plain text. */
		langs: string[];
	};
}

export const blogConfig: BlogConfig = {
	locale: 'en-AU',
	path: '/blog',
	assets: {
		covers: '/img/covers',
		images: '/img'
	},
	highlight: {
		themes: { light: 'github-light', dark: 'github-dark' },
		langs: ['ts', 'js', 'svelte', 'html', 'css', 'json', 'bash', 'md', 'yaml']
	}
};
