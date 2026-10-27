// Loaded by vite.config.ts (through mdsvex.ts) at build time — keep imports relative.

interface Node {
	type: string;
	url?: string;
	alt?: string;
	title?: string | null;
	value?: string;
	children?: Node[];
	/** Width and height from remarkAssetPaths, for images found in `static/`. */
	data?: { hProperties?: { width?: number; height?: number } };
}

/** Class on the placeholder a captioned image becomes; blog/caption-embeds.ts swaps in the component. */
export const CAPTIONED_IMAGE_CLASS = 'captioned-image';

const CAPTION = /^\s*caption:\s*/i;

// Braces are escaped too: mdsvex output is compiled as Svelte, where `{` starts an expression.
const escapeHtml = (s: string) =>
	s
		.replace(/&/g, '&amp;')
		.replace(/"/g, '&quot;')
		.replace(/</g, '&lt;')
		.replace(/{/g, '&#123;')
		.replace(/}/g, '&#125;');

/** The plain text of a node, ignoring formatting such as emphasis or links. */
const textOf = (node: Node): string =>
	node.type === 'text' || node.type === 'inlineCode'
		? (node.value ?? '')
		: (node.children ?? []).map(textOf).join('');

const isBlank = (node: Node) => node.type === 'text' && !node.value?.trim();

/** The image when a paragraph starts with one, plus whatever follows it in the same paragraph. */
function leadingImage(node: Node): { image: Node; rest: Node[] } | undefined {
	const kids = (node.children ?? []).filter((c, i) => i > 0 || !isBlank(c));
	const [image, ...rest] = kids;
	return image?.type === 'image' && image.url ? { image, rest } : undefined;
}

function placeholder(image: Node, caption: string): string {
	const src = escapeHtml(image.url!);
	const alt = escapeHtml(image.alt ?? '');
	const title = image.title ? ` title="${escapeHtml(image.title)}"` : '';
	const { width, height } = image.data?.hProperties ?? {};
	const size = width && height ? ` width="${width}" height="${height}"` : '';
	return (
		`<figure class="${CAPTIONED_IMAGE_CLASS}" data-caption="${escapeHtml(caption)}">` +
		`<img src="${src}" alt="${alt}"${title}${size} loading="lazy" decoding="async" />` +
		(caption ? `<figcaption>${escapeHtml(caption)}</figcaption>` : '') +
		`</figure>`
	);
}

/**
 * Remark plugin that gives an image a caption when the line straight after it reads
 * `caption: …`, either on the next line or as the next paragraph. Runs after
 * remarkAssetPaths so the image path is already resolved.
 */
export function remarkCaptions() {
	return (tree: Node) => {
		const visit = (parent: Node) => {
			const kids = parent.children;
			if (!kids) return;
			for (let i = 0; i < kids.length; i++) {
				const node = kids[i];
				if (node.type !== 'paragraph') {
					visit(node);
					continue;
				}
				const match = leadingImage(node);
				if (!match) continue;

				let caption: string | undefined;
				const after = match.rest.map(textOf).join('');
				if (after.trim()) {
					// `![…](…)` then `caption: …` on the next line: one paragraph.
					if (!CAPTION.test(after)) continue;
					caption = after.replace(CAPTION, '');
				} else {
					// The caption as its own paragraph after a blank line.
					const next = kids[i + 1];
					const text = next?.type === 'paragraph' ? textOf(next) : '';
					if (!CAPTION.test(text)) continue;
					caption = text.replace(CAPTION, '');
					kids.splice(i + 1, 1);
				}

				node.type = 'html';
				node.value = placeholder(match.image, caption.trim().replace(/\s+/g, ' '));
				delete node.children;
			}
		};
		visit(tree);
	};
}
