// Loaded by vite.config.ts (through mdsvex.ts) at build time — keep imports relative.
import { createRequire } from 'node:module';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

/** Turns code into highlighted HTML: a `<pre class="twinkleplop">` with a `<code>` inside. */
type Highlight = (code: string) => string;

/** Names people write after ``` that aren't a Twinkleplop package name themselves. */
const ALIASES: Record<string, string> = {
	ts: 'typescript',
	js: 'javascript',
	mjs: 'javascript',
	cjs: 'javascript',
	md: 'markdown',
	sh: 'bash',
	shell: 'bash',
	zsh: 'bash',
	yml: 'yaml',
	htm: 'html',
	py: 'python',
	rs: 'rust'
};

const packageName = (lang: string) => `@twinkleplop/${ALIASES[lang] ?? lang}`;

/**
 * Imports a language package. Melan ships the default languages itself; any others are looked
 * up in the site's own dependencies, so `pnpm add -D @twinkleplop/python` is all it takes.
 */
async function importLanguage(name: string): Promise<{ language: () => Highlight } | undefined> {
	try {
		return await import(name);
	} catch {
		try {
			const require = createRequire(path.join(process.cwd(), 'package.json'));
			return await import(pathToFileURL(require.resolve(name)).href);
		} catch {
			return undefined;
		}
	}
}

/** Loads a highlighter for each language in `langs`, keyed by every name it can be written as. */
export async function loadHighlighters(langs: string[]): Promise<Map<string, Highlight>> {
	const highlighters = new Map<string, Highlight>();
	await Promise.all(
		langs.map(async (lang) => {
			const name = packageName(lang);
			const pkg = await importLanguage(name);
			if (!pkg) {
				console.warn(
					`[melan] Can't highlight "${lang}": install ${name} to add it, or remove it from blog.highlight.langs.`
				);
				return;
			}
			const highlight = pkg.language();
			const canonical = ALIASES[lang] ?? lang;
			highlighters.set(lang, highlight);
			highlighters.set(canonical, highlight);
			for (const [alias, target] of Object.entries(ALIASES)) {
				if (target === canonical) highlighters.set(alias, highlight);
			}
		})
	);
	return highlighters;
}

const escapeHtml = (code: string) =>
	code.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

/** Highlights `code` as `lang`, or shows it as plain text when that language isn't loaded. */
export function highlightCode(
	highlighters: Map<string, Highlight>,
	code: string,
	lang: string | null | undefined
): string {
	const highlight = lang ? highlighters.get(lang.toLowerCase()) : undefined;
	return highlight
		? highlight(code)
		: `<pre class="twinkleplop"><code>${escapeHtml(code)}</code></pre>`;
}
