// Loaded by vite.config.ts at build time — keep imports relative.
import { fileURLToPath } from 'node:url';
import { mdsvex, escapeSvelte } from 'mdsvex';
import remarkMath from 'remark-math';
import { createHighlighter } from 'shiki';
import { remarkAssetPaths } from './assets.ts';
import { remarkCodePen } from './codepen.ts';
import { blogConfig, CODE_BLOCK_CLASS, type BlogConfig } from './config.ts';
import { remarkExternalLinks } from './external-links.ts';
import { remarkHeadings } from './headings.ts';
import { remarkKatex } from './math.ts';
import { remarkReadingTime } from './reading-time.ts';

export interface BlogPreprocessOptions {
	/** Absolute path to the layout applied to every `.md` file. Defaults to the bundled BlogLayout. */
	layout?: string;
	extensions?: string[];
	highlight?: Partial<BlogConfig['highlight']>;
	assets?: Partial<BlogConfig['assets']>;
	/** The site's base path (`paths.base` in the SvelteKit options), added to image paths in posts. */
	base?: string;
}

const defaultLayout = fileURLToPath(
	new URL('../components/blog/BlogLayout.svelte', import.meta.url)
);

/** mdsvex preprocessor with Shiki highlighting, KaTeX maths and CodePen embeds, wired to the blog layout. */
export function blogPreprocess(options: BlogPreprocessOptions = {}) {
	const { themes, langs } = { ...blogConfig.highlight, ...options.highlight };
	const highlighter = createHighlighter({ themes: Object.values(themes), langs });
	const assets = { ...blogConfig.assets, ...options.assets };

	return mdsvex({
		extensions: options.extensions ?? ['.md'],
		layout: options.layout ?? defaultLayout,
		remarkPlugins: [
			remarkReadingTime,
			remarkHeadings,
			remarkMath,
			remarkKatex,
			remarkCodePen,
			remarkExternalLinks,
			[remarkAssetPaths, { ...assets, base: options.base }]
		],
		highlight: {
			highlighter: async (code, lang) => {
				const hl = await highlighter;
				const loaded = hl.getLoadedLanguages() as string[];
				const language = lang && loaded.includes(lang) ? lang : 'text';
				const html = escapeSvelte(hl.codeToHtml(code, { lang: language, themes }));
				return `{@html \`<div class="${CODE_BLOCK_CLASS} group relative">${html}</div>\`}`;
			}
		}
	});
}
