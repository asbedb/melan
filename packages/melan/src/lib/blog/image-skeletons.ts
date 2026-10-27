import type { Attachment } from 'svelte/attachments';

/**
 * Attachment that marks the images inside the node that are still loading, so they shimmer in
 * the space saved for them (styles in styles/blog.css), then fade in once they arrive. Images
 * already loaded are left alone. Attach it after captionEmbeds, which swaps in new images.
 */
export const imageSkeletons: Attachment<HTMLElement> = (node) => {
	const cleanups: (() => void)[] = [];
	for (const img of node.querySelectorAll('img')) {
		if (img.complete) continue;
		img.dataset.loading = '';
		const done = () => {
			delete img.dataset.loading;
			img.dataset.loaded = '';
		};
		img.addEventListener('load', done, { once: true });
		// A broken image shouldn't shimmer forever; the browser shows its alt text instead.
		img.addEventListener('error', done, { once: true });
		cleanups.push(() => {
			img.removeEventListener('load', done);
			img.removeEventListener('error', done);
		});
	}

	return () => cleanups.forEach((cleanup) => cleanup());
};
