import { mount, unmount } from 'svelte';
import type { Attachment } from 'svelte/attachments';
import YouTube from '../components/blog/YouTube.svelte';
import { YOUTUBE_CLASS } from './youtube.ts';

/** Attachment that replaces each YouTube placeholder inside the node with the embedded video. */
export const youtubeEmbeds: Attachment<HTMLElement> = (node) => {
	const instances: ReturnType<typeof mount>[] = [];
	for (const target of node.querySelectorAll<HTMLElement>(`.${YOUTUBE_CLASS}`)) {
		const id = target.dataset.id;
		if (!id) continue;
		target.replaceChildren();
		instances.push(mount(YouTube, { target, props: { url: id } }));
	}

	return () => instances.forEach((i) => unmount(i));
};
