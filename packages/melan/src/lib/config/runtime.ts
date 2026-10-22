// The site's config as the components see it. `virtual:melan/config` is written by the Vite
// plugin in vite.ts from the user's melan.config.ts, with every default already filled in.
import config from 'virtual:melan/config';
import type { BlogConfig, ResolvedConfig, SiteRoute } from './index.ts';

export const siteConfig: ResolvedConfig['site'] = config.site;
export const blogConfig: BlogConfig = config.blog;

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
