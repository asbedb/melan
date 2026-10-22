import { mount, unmount } from 'svelte';
import type { Attachment } from 'svelte/attachments';
import CodeCopyButton from '../components/blog/CodeCopyButton.svelte';
import { CODE_BLOCK_CLASS } from './code-block.ts';

/** Attachment that adds a copy button to every highlighted code block inside the node. */
export const copyButtons: Attachment<HTMLElement> = (node) => {
	const instances: ReturnType<typeof mount>[] = [];
	for (const block of node.querySelectorAll<HTMLElement>(`.${CODE_BLOCK_CLASS}`)) {
		const pre = block.querySelector('pre');
		if (!pre) continue;
		const target = document.createElement('div');
		target.className =
			'absolute top-2 right-2 transition-opacity md:opacity-0 md:group-hover:opacity-100 md:focus-within:opacity-100';
		block.appendChild(target);
		instances.push(
			mount(CodeCopyButton, {
				target,
				props: { getCode: () => pre.querySelector('code')?.innerText ?? pre.innerText }
			})
		);
	}

	return () => instances.forEach((i) => unmount(i));
};
