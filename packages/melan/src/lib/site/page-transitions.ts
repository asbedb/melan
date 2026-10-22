import { onNavigate } from '$app/navigation';

/**
 * Fades between pages with the View Transitions API. Call it while a layout component is being
 * set up. The fade runs once the next page has loaded, so the new page fades in complete; the
 * styles live in styles/melan.css. Browsers without the API just switch pages instantly.
 */
export function fadeBetweenPages() {
	onNavigate((navigation) => {
		if (!document.startViewTransition) return;
		// Filtering the blog by tag stays on the same page, so skip the fade there.
		if (navigation.from?.url.pathname === navigation.to?.url.pathname) return;

		return new Promise((resolve) => {
			document.startViewTransition(async () => {
				resolve();
				await navigation.complete;
			});
		});
	});
}
