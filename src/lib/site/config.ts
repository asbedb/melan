import type { AssetPath, RouteId } from '$app/types';
import { blogConfig } from '../blog/config.ts';

/**
 * A page (or section of pages) on the site. Every page is managed from `siteConfig.routes`:
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

export interface HeroAction {
	label: string;
	/** Internal path or full URL. Actions pointing at a disabled route are hidden. */
	href: string;
	variant?: 'default' | 'outline';
}

/** A one-line dictionary-style entry explaining the heading. */
export interface HeroDefinition {
	/** e.g. `/mɛˈlɑn/`. */
	pronunciation?: string;
	/** e.g. `noun`. */
	partOfSpeech?: string;
	/** e.g. `ink`. */
	meaning: string;
	/** Where the word comes from. */
	origin?: {
		/** e.g. `Western Armenian`. */
		language: string;
		/** The word in its own script, e.g. `մելան`. */
		word: string;
		/** BCP 47 code for `word` (e.g. `hy`), so it gets the right font and pronunciation. */
		lang?: string;
	};
}

export interface HeroConfig {
	/** Small badge under the heading. */
	eyebrow?: string;
	heading: string;
	/** Dictionary-style entry under the heading. Leave out to hide it. */
	definition?: HeroDefinition;
	/** Paragraph under the heading. */
	summary: string;
	actions?: HeroAction[];
	/** Shown as a "Built with" row of badges. */
	highlights?: string[];
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
	routes: SiteRoute[];
	/** Leave out to use the text colour. */
	accent?: AccentConfig;
	/** Logo and/or title on the left of the navbar. */
	brand?: BrandConfig;
	hero: HeroConfig;
	/** Grid of recent posts under the hero. Leave out to hide it. */
	latestPosts?: LatestPostsConfig;
	/** Footer at the bottom of every page. Leave out to hide it. */
	footer?: FooterConfig;
}

export const siteConfig: SiteConfig = {
	title: 'Melan',
	description:
		'Melan is a reusable Svelte blog template with Shiki syntax highlighting and shadcn-svelte components.',
	homeImage: `img/home-share.png`,
	routes: [
		{ href: '/', label: 'Home', nav: false },
		{ href: '/about', label: 'About' },
		{ href: blogConfig.path, label: 'Blog' }
	],
	accent: {
		light: 'oklch(0.3994 0.156 210.49)',
		dark: 'oklch(0.5024 0.3472 217.91)'
	},
	brand: {
		display: 'title',
		icon: 'icon.svg',
		home: { display: 'icon' }
	},
	hero: {
		eyebrow: 'Svelte blog template',
		heading: 'Melan',
		definition: {
			pronunciation: '/mɛˈlɑn/',
			partOfSpeech: 'noun',
			meaning: 'ink',
			origin: { language: 'Western Armenian', word: 'մելան', lang: 'hy' }
		},
		summary:
			'A reusable blog template for SvelteKit. Write posts in Markdown, get Shiki syntax highlighting out of the box, and build on accessible shadcn-svelte components with light and dark mode.',
		actions: [
			{ label: 'Read the blog', href: blogConfig.path },
			{ label: 'SvelteKit docs', href: 'https://svelte.dev/docs/kit', variant: 'outline' }
		],
		highlights: ['SvelteKit', 'Shiki', 'shadcn-svelte', 'mdsvex', 'Tailwind CSS']
	},
	latestPosts: { heading: 'Latest Posts', count: 6 },
	footer: {
		text: '© {year} {title}',
		links: [],
		poweredBy: true
	}
};

export const navRoutes = siteConfig.routes.filter((r) => r.enabled !== false && r.nav !== false);

function matches(pathname: string, href: string): boolean {
	if (href === '/') return pathname === '/';
	return pathname === href || pathname.startsWith(`${href}/`);
}

/** The configured route covering `pathname`, if any. */
export function getRoute(pathname: string): SiteRoute | undefined {
	return siteConfig.routes.find((r) => matches(pathname, r.href));
}

/** True when `pathname` is the route `href` or nested under it. */
export const isActive = matches;

/** True for full URLs (`https://…`, `mailto:…`), which open outside the site. */
export function isExternal(href: string): boolean {
	return /^[a-z][a-z\d+.-]*:/i.test(href);
}

/** True for links to other websites (`https://…`), which get an external-link icon. */
export function isOtherSite(href: string): boolean {
	return /^(https?:)?\/\//i.test(href);
}

/** False when `pathname` falls under a route that has been disabled in the config. */
export function isRouteEnabled(pathname: string): boolean {
	return !siteConfig.routes.some((r) => r.enabled === false && matches(pathname, r.href));
}
