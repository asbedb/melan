import { mount, unmount } from 'svelte';
import type { Attachment } from 'svelte/attachments';
import CaptionedImage from '../components/blog/CaptionedImage.svelte';
import { CAPTIONED_IMAGE_CLASS } from './captions.ts';

/** Attachment that replaces each captioned-image placeholder inside the node with CaptionedImage. */
export const captionEmbeds: Attachment<HTMLElement> = (node) => {
	const instances: ReturnType<typeof mount>[] = [];
	for (const placeholder of node.querySelectorAll<HTMLElement>(`.${CAPTIONED_IMAGE_CLASS}`)) {
		const img = placeholder.querySelector('img');
		if (!img || !placeholder.parentElement) continue;
		instances.push(
			mount(CaptionedImage, {
				target: placeholder.parentElement,
				anchor: placeholder,
				props: {
					src: img.getAttribute('src')!,
					alt: img.alt,
					title: img.title || undefined,
					caption: placeholder.dataset.caption || undefined
				}
			})
		);
		placeholder.remove();
	}

	return () => instances.forEach((i) => unmount(i));
};
