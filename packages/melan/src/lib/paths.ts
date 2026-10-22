import { resolve } from '$app/paths';

/**
 * `resolve` for paths that come from the site's config. In the site, `RouteId` lists its routes;
 * Melan itself has none, so here `resolve` would accept nothing without this cast.
 */
export const resolvePath = resolve as (path: string) => string;
