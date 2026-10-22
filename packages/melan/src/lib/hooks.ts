// The `@asbedb/melan/hooks` entry, for src/hooks.ts.
import type { Reroute } from '@sveltejs/kit/hooks';
import { isRouteEnabled } from './config/runtime.ts';

/**
 * Disabled routes are rerouted to a path with no matching route, so they 404 through the normal
 * error page (with the root layout and navbar intact).
 */
export const reroute: Reroute = ({ url }) => {
	if (!isRouteEnabled(url.pathname)) return '/__disabled__';
};
