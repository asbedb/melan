import type { Attachment } from 'svelte/attachments';
import { replaceState } from '$app/navigation';
import { page } from '$app/state';
import { HEADING_ANCHOR_CLASS } from './headings.ts';

/**
 * Scrolls to the heading with `id` — smoothly, unless the reader prefers reduced motion — and
 * puts `#id` in the address bar so the link can be copied and shared.
 */
export function scrollToHeading(event: MouseEvent, id: string) {
	const el = document.getElementById(id);
	if (!el) return;
	event.preventDefault();
	const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
	el.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth' });
	// Only the hash changes, on the current page, so there's no route to resolve().
	// eslint-disable-next-line svelte/no-navigation-without-resolve
	replaceState(`#${id}`, page.state);
}

/** Attachment that smooth-scrolls to a heading when its `#` link inside the node is clicked. */
export const headingLinks: Attachment<HTMLElement> = (node) => {
	const onClick = (event: MouseEvent) => {
		// Leave modified clicks (open in new tab, etc.) to the browser.
		if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) {
			return;
		}
		const link = (event.target as Element).closest<HTMLAnchorElement>(`a.${HEADING_ANCHOR_CLASS}`);
		if (link) scrollToHeading(event, decodeURIComponent(link.hash.slice(1)));
	};
	node.addEventListener('click', onClick);
	return () => node.removeEventListener('click', onClick);
};
