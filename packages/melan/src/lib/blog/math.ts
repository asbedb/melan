// Loaded by vite.config.ts (through mdsvex.ts) at build time — keep imports relative.
import katex from 'katex';
import { escapeSvelte } from 'mdsvex';

interface Node {
	type: string;
	value?: string;
	children?: Node[];
	position?: { start: { line: number; column: number } };
}

/** Class wrapped around display (`$$ … $$`) equations; styles/blog.css lets wide ones scroll. */
export const MATH_BLOCK_CLASS = 'math-block';

/**
 * Remark plugin that renders the `math` and `inlineMath` nodes from remark-math with KaTeX at
 * build time. The HTML goes in as `{@html}`, like highlighted code, so the braces in TeX aren't
 * read as Svelte expressions, and no KaTeX script is sent to the browser — only its CSS.
 */
export function remarkKatex() {
	return (tree: Node, file: { filename?: string }) => {
		const visit = (node: Node) => {
			if (node.type === 'math' || node.type === 'inlineMath') {
				const displayMode = node.type === 'math';
				let html: string;
				try {
					html = katex.renderToString(node.value ?? '', { displayMode, throwOnError: true });
				} catch (error) {
					const at = node.position ? `:${node.position.start.line}` : '';
					console.warn(`[melan] KaTeX couldn't render ${file.filename ?? 'a post'}${at}: ${error}`);
					// Show the error in place, in red, rather than failing the whole build.
					html = katex.renderToString(node.value ?? '', { displayMode, throwOnError: false });
				}
				if (displayMode) html = `<div class="${MATH_BLOCK_CLASS}">${html}</div>`;
				node.type = 'html';
				node.value = `{@html \`${escapeSvelte(html)}\`}`;
				delete node.children;
				return;
			}
			node.children?.forEach(visit);
		};
		visit(tree);
	};
}
