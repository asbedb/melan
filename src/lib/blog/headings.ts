// Loaded by vite.config.ts (through mdsvex.ts) at build time — keep imports relative.
import type { PostHeading } from './types.ts';

/** Heading depths listed in the table of contents. */
const TOC_DEPTHS = [2, 3];

interface Node {
	type: string;
	depth?: number;
	value?: string;
	url?: string;
	title?: string | null;
	children?: Node[];
	data?: { hProperties?: Record<string, unknown> };
}

/** Class on the `#` link after each heading, styled in styles/blog.css. */
export const HEADING_ANCHOR_CLASS = 'heading-anchor';

function toText(node: Node): string {
	if (node.type === 'text' || node.type === 'inlineCode') return node.value ?? '';
	return (node.children ?? []).map(toText).join('');
}

function slugify(text: string): string {
	return (
		text
			.toLowerCase()
			.normalize('NFKD')
			.replace(/[̀-ͯ]/g, '')
			.replace(/[^\w\s-]/g, '')
			.trim()
			.replace(/[\s_]+/g, '-')
			.replace(/-+/g, '-') || 'section'
	);
}

/**
 * Remark plugin that gives every heading an `id` to link to, adds a `#` link after it so readers
 * can put the section's address in the address bar and share it, and adds the h2/h3 headings
 * to the frontmatter as `headings` for the table of contents.
 */
export function remarkHeadings() {
	return (tree: Node, file: { data: { fm?: Record<string, unknown> } }) => {
		const headings: PostHeading[] = [];
		const used = new Map<string, number>();

		const visit = (node: Node) => {
			if (node.type === 'heading') {
				const text = toText(node).trim();
				const base = slugify(text);
				const count = used.get(base) ?? 0;
				used.set(base, count + 1);
				const id = count ? `${base}-${count}` : base;

				node.data ??= {};
				node.data.hProperties = { ...node.data.hProperties, id };
				node.children = [
					...(node.children ?? []),
					{
						type: 'link',
						url: `#${id}`,
						title: null,
						children: [{ type: 'text', value: '#' }],
						data: {
							hProperties: { class: HEADING_ANCHOR_CLASS, 'aria-label': 'Link to this section' }
						}
					}
				];
				if (TOC_DEPTHS.includes(node.depth!)) headings.push({ depth: node.depth!, text, id });
				return;
			}
			node.children?.forEach(visit);
		};
		visit(tree);

		(file.data.fm ??= {}).headings = headings;
	};
}
