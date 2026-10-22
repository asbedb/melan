// Loaded by vite.config.ts (through mdsvex.ts) at build time — keep imports relative.
import { EXTERNAL_LINK_CLASS } from './external-links.ts';

interface Node {
	type: string;
	url?: string;
	value?: string;
	children?: Node[];
}

/** Class on the placeholder a CodePen link becomes; blog/codepen-embeds.ts swaps in the pen. */
export const CODEPEN_CLASS = 'codepen-embed';

/**
 * Matches pen URLs, `codepen.io/<user>/pen/<id>` or `codepen.io/team/<team>/pen/<id>`, and their
 * `embed`, `full` and `details` views.
 */
const PEN_URL =
	/^https?:\/\/codepen\.io\/((?:team\/)?[\w-]+)\/(?:pen|embed|full|details)\/(\w+)\/?(?:[?#].*)?$/i;

const escapeAttr = (s: string) =>
	s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');

/** The pen URL when a paragraph holds nothing but a CodePen link (or bare CodePen URL). */
function penUrl(node: Node): string | undefined {
	const kids = (node.children ?? []).filter((c) => !(c.type === 'text' && !c.value?.trim()));
	if (kids.length !== 1) return;
	const [kid] = kids;
	const url = kid.type === 'link' ? kid.url : kid.type === 'text' ? kid.value?.trim() : undefined;
	return url && PEN_URL.test(url) ? url : undefined;
}

/**
 * Remark plugin that turns a CodePen link on a line of its own into an embedded pen. The
 * placeholder is a plain link to the pen, so it still works without JavaScript; the embed itself
 * is mounted in the browser so it can follow light and dark mode.
 */
export function remarkCodePen() {
	return (tree: Node) => {
		const visit = (node: Node) => {
			if (node.type === 'paragraph') {
				const url = penUrl(node);
				if (!url) return;
				const [, user, id] = url.match(PEN_URL)!;
				const href = `https://codepen.io/${user}/pen/${id}`;
				node.type = 'html';
				node.value =
					`<div class="${CODEPEN_CLASS}" data-user="${escapeAttr(user)}" data-pen="${escapeAttr(id)}">` +
					`<a href="${href}" class="${EXTERNAL_LINK_CLASS}" target="_blank" rel="nofollow noopener noreferrer">` +
					`See the pen on CodePen</a></div>`;
				delete node.children;
				return;
			}
			node.children?.forEach(visit);
		};
		visit(tree);
	};
}
