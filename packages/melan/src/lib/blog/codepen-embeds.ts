import { mount, unmount } from 'svelte';
import type { Attachment } from 'svelte/attachments';
import CodePen from '../components/blog/CodePen.svelte';
import { CODEPEN_CLASS } from './codepen.ts';

/** Attachment that replaces each CodePen placeholder inside the node with the embedded pen. */
export const codePenEmbeds: Attachment<HTMLElement> = (node) => {
	const instances: ReturnType<typeof mount>[] = [];
	for (const target of node.querySelectorAll<HTMLElement>(`.${CODEPEN_CLASS}`)) {
		const { user, pen } = target.dataset;
		if (!user || !pen) continue;
		target.replaceChildren();
		instances.push(mount(CodePen, { target, props: { user, pen } }));
	}

	return () => instances.forEach((i) => unmount(i));
};
