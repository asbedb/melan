// Loaded by vite.config.ts (through mdsvex.ts) at build time — keep imports relative.

const WORDS_PER_MINUTE = 230;

interface Node {
	type: string;
	value?: string;
	children?: Node[];
}

function countWords(node: Node): number {
	if (node.type === 'yaml') return 0;
	if (typeof node.value === 'string' && node.type !== 'html') {
		return node.value.split(/\s+/).filter(Boolean).length;
	}
	return (node.children ?? []).reduce((sum, child) => sum + countWords(child), 0);
}

/** Remark plugin that adds `readingTime` (in minutes) to the frontmatter unless it's already set. */
export function remarkReadingTime() {
	return (tree: Node, file: { data: { fm?: Record<string, unknown> } }) => {
		const fm = (file.data.fm ??= {});
		if (fm.readingTime != null) return;
		fm.readingTime = Math.max(1, Math.round(countWords(tree) / WORDS_PER_MINUTE));
	};
}
