// Loaded by vite.config.ts (through mdsvex.ts) at build time — keep imports relative.

interface Node {
	type: string;
	url?: string;
	children?: Node[];
	data?: { hProperties?: Record<string, unknown> };
}

/** Class on links to other sites, which styles/blog.css marks with an icon. */
export const EXTERNAL_LINK_CLASS = 'external-link';

/**
 * Remark plugin that marks links to other sites (`http://` and `https://` URLs) and opens
 * them in a new tab.
 */
export function remarkExternalLinks() {
	return (tree: Node) => {
		const visit = (node: Node) => {
			if (node.type === 'link' && /^(https?:)?\/\//i.test(node.url ?? '')) {
				node.data ??= {};
				node.data.hProperties = {
					...node.data.hProperties,
					class: EXTERNAL_LINK_CLASS,
					target: '_blank',
					rel: 'nofollow noopener noreferrer'
				};
			}
			node.children?.forEach(visit);
		};
		visit(tree);
	};
}
