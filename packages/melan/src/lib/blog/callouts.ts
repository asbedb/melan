// Loaded by vite.config.ts (through mdsvex.ts) at build time — keep imports relative.

interface Node {
	type: string;
	value?: string;
	children?: Node[];
	data?: { hName?: string; hProperties?: Record<string, unknown> };
}

/** Callout types and the title each shows when the opening line doesn't give one. */
export const CALLOUT_TYPES = {
	note: 'Note',
	tip: 'Tip',
	important: 'Important',
	warning: 'Warning',
	caution: 'Caution'
} as const;

type CalloutType = keyof typeof CALLOUT_TYPES;

/** `:::note` or `:::note Custom title` as the first line of a paragraph. */
const OPEN = /^:::(\w+)(?:[ \t]+(.*?))?[ \t]*(?:\n|$)/;
/** `:::` as the last line of whatever closes the callout. */
const CLOSE = /(?:^|\n):::[ \t]*$/;

const isType = (name: string): name is CalloutType => Object.hasOwn(CALLOUT_TYPES, name);

/** The text node that ends `node`, following last children down, e.g. into a list's last item. */
function lastText(node: Node): Node | undefined {
	let current: Node | undefined = node;
	while (current?.children?.length) current = current.children.at(-1);
	return current?.type === 'text' ? current : undefined;
}

/** True for a paragraph with nothing left in it once the `:::` lines are taken out. */
const isEmpty = (node: Node) =>
	node.type === 'paragraph' &&
	(node.children ?? []).every((c) => c.type === 'text' && !c.value?.trim());

/** Where the `:::` lines can sit, so what can end up empty once they're taken out. */
const EMPTIABLE = new Set(['list', 'listItem']);

/** Drop the paragraphs, list items and lists left empty by taking out the `:::` lines. */
function dropEmpty(nodes: Node[]): Node[] {
	return nodes.filter((node) => {
		if (!EMPTIABLE.has(node.type)) return !isEmpty(node);
		node.children = dropEmpty(node.children ?? []);
		return node.children.length > 0;
	});
}

function callout(type: CalloutType, title: string, children: Node[]): Node {
	return {
		type: 'callout',
		data: {
			hName: 'div',
			hProperties: { className: ['callout', `callout-${type}`], role: 'note' }
		},
		children: [
			{
				type: 'paragraph',
				data: { hProperties: { className: ['callout-title'] } },
				children: [{ type: 'text', value: title }]
			},
			...children
		]
	};
}

/**
 * Remark plugin for callout boxes. A paragraph starting with `:::note` (or `tip`, `important`,
 * `warning`, `caution`) opens one and a line reading `:::` closes it; everything between,
 * including lists and code blocks, goes inside. A title after the type replaces the default,
 * e.g. `:::tip Did you know?`. Unknown types and callouts that are never closed stay as text.
 */
export function remarkCallouts() {
	return (tree: Node) => {
		const visit = (parent: Node) => {
			const kids = parent.children;
			if (!kids) return;
			for (let i = 0; i < kids.length; i++) {
				const node = kids[i];
				const first = node.type === 'paragraph' ? node.children?.[0] : undefined;
				const open = first?.type === 'text' ? OPEN.exec(first.value ?? '') : null;
				const type = open?.[1].toLowerCase();
				if (!open || !type || !isType(type)) {
					visit(node);
					continue;
				}

				// Look for the closing line before changing anything, so an unclosed one is left alone.
				const closes = (candidate: Node) => {
					const text = lastText(candidate);
					if (!text?.value) return false;
					// In the opening paragraph, only what follows the opening line counts.
					return CLOSE.test(text === first ? `\n${text.value.slice(open[0].length)}` : text.value);
				};
				const end = kids.findIndex((candidate, j) => j >= i && closes(candidate));
				if (end < 0) continue;

				first!.value = first!.value!.slice(open[0].length);
				const close = lastText(kids[end])!;
				close.value = close.value!.replace(CLOSE, '');

				const title = open[2]?.trim() || CALLOUT_TYPES[type];
				const content = dropEmpty(kids.slice(i, end + 1));
				kids.splice(i, end - i + 1, callout(type, title, content));
				// Callouts can hold blockquotes and lists that hold callouts of their own.
				content.forEach(visit);
			}
		};
		visit(tree);
	};
}
