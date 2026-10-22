// The `@asbedb/melan/config` entry. Loaded by vite.config.ts at build time, so keep imports relative and
// type-only: no Svelte components and no `$app` runtime modules.
import type { AssetPath, RouteId } from '$app/types';

/**
 * A page (or section of pages) on the site. Every page is managed from `site.routes`:
 * the order there is the navbar order. Pages left out of the list still work but aren't in the navbar.
 */
export interface SiteRoute {
	/**
	 * Path prefix, e.g. `/blog`. Covers the route and everything nested under it, except `/`,
	 * which only covers the home page. Must be a real route.
	 */
	href: RouteId;
	label: string;
	/** When false the route 404s and is hidden everywhere. Defaults to true. */
	enabled?: boolean;
	/** When false the route still works but isn't linked from the navbar. Defaults to true. */
	nav?: boolean;
}

export interface LatestPostsConfig {
	heading: string;
	/** How many of the newest posts to show. */
	count: number;
}

export interface FooterLink {
	label: string;
	/** Internal path or full URL. Links pointing at a disabled route are hidden. */
	href: string;
}

export interface FooterConfig {
	/** Line of text, e.g. a copyright notice. `{year}` and `{title}` are filled in. */
	text?: string;
	/** Links shown in the footer. */
	links?: FooterLink[];
	/** Shows a small "Powered by Melan" credit. Defaults to true — thanks for leaving it on! */
	poweredBy?: boolean;
}

export type BrandDisplay = 'icon' | 'icon-title' | 'title';

export interface BrandConfig {
	/**
	 * What the navbar shows on the left: just the icon, the icon followed by the title, or just
	 * the title. Defaults to `'icon'`. Falls back to `'title'` when no icon is set.
	 */
	display?: BrandDisplay;
	/**
	 * File in `static/`, e.g. `icon.svg` for `static/icon.svg`. Single-colour icons are drawn in
	 * the text colour, so they follow light and dark mode.
	 */
	icon?: AssetPath;
	/** Set to false for a multi-colour icon that should keep its own colours. Defaults to true. */
	tint?: boolean;
	/** Text shown in the navbar. Defaults to the site `title`. */
	title?: string;
	/**
	 * Overrides for the home page, e.g. `{ display: 'title' }` to show the title there and the
	 * icon everywhere else. Anything left out uses the settings above.
	 */
	home?: {
		display?: BrandDisplay;
		title?: string;
	};
}

/**
 * Colour for small details: post titles, link underlines, blockquote borders and the table of
 * contents bar. Any CSS colour, e.g. `#2563eb` or `oklch(0.5 0.17 264)`.
 */
export interface AccentConfig {
	light: string;
	/** Used in dark mode. Defaults to `light`; a lighter shade usually reads better. */
	dark?: string;
}

export interface SiteConfig {
	title: string;
	/** Default meta description, used on pages that don't set their own. */
	description: string;
	/**
	 * Home page share image, file in `static/`, e.g. `img/share.png` for `static/img/share.png`.
	 * 1200×630 suits most sites. Leave out for no image.
	 */
	homeImage?: AssetPath;
	/** Defaults to a hidden Home route and a Blog route at `blog.path`. */
	routes?: SiteRoute[];
	/** Leave out to use the text colour. */
	accent?: AccentConfig;
	/** Logo and/or title on the left of the navbar. */
	brand?: BrandConfig;
	/** Grid of recent posts, for pages that show one. Leave out to hide it. */
	latestPosts?: LatestPostsConfig;
	/** Footer at the bottom of every page. Leave out to hide it. */
	footer?: FooterConfig;
}

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
		/**
		 * Languages to highlight; anything else is shown as plain text. Each one is a Twinkleplop
		 * package, e.g. `'python'` for `@twinkleplop/python`. Melan includes the defaults; install
		 * any others with `pnpm add -D @twinkleplop/<name>`. Colours come from a Twinkleplop theme
		 * stylesheet: see "Code highlighting" in the configuration guide.
		 */
		langs: string[];
	};
	/** Pens embedded from a CodePen link on a line of its own. */
	codepen: {
		/** Height of the embed in pixels. */
		height: number;
		/** Tabs the embed opens on, e.g. `'result'` or `'html,result'`. */
		tabs: string;
	};
}

/** What goes in `melan.config.ts`. Anything left out of `blog` uses Melan's defaults. */
export interface MelanConfig {
	site: SiteConfig;
	blog?: {
		[K in keyof BlogConfig]?: BlogConfig[K] extends object ? Partial<BlogConfig[K]> : BlogConfig[K];
	};
}

/** The config with every default filled in, as the components see it. */
export interface ResolvedConfig {
	site: SiteConfig & { routes: SiteRoute[] };
	blog: BlogConfig;
}

/** Gives `melan.config.ts` its types and autocompletion. Returns the config unchanged. */
export function defineConfig(config: MelanConfig): MelanConfig {
	return config;
}

export const defaultBlogConfig: BlogConfig = {
	locale: 'en-AU',
	path: '/blog' as RouteId,
	assets: {
		covers: '/img/covers',
		images: '/img'
	},
	highlight: {
		langs: ['ts', 'js', 'svelte', 'html', 'css', 'json', 'bash', 'md', 'yaml']
	},
	codepen: {
		height: 400,
		tabs: 'result'
	}
};

/** Fills in the defaults for anything left out of `config`. */
export function resolveConfig(config: MelanConfig): ResolvedConfig {
	const blog = config.blog ?? {};
	const path = blog.path ?? defaultBlogConfig.path;
	return {
		site: {
			...config.site,
			routes: config.site.routes ?? [
				{ href: '/' as RouteId, label: 'Home', nav: false },
				{ href: path, label: 'Blog' }
			]
		},
		blog: {
			locale: blog.locale ?? defaultBlogConfig.locale,
			path,
			assets: { ...defaultBlogConfig.assets, ...blog.assets },
			highlight: { ...defaultBlogConfig.highlight, ...blog.highlight },
			codepen: { ...defaultBlogConfig.codepen, ...blog.codepen }
		}
	};
}
