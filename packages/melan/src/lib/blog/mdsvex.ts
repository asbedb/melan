// Loaded by vite.config.ts at build time — keep imports relative.
import { fileURLToPath } from 'node:url';
import { mdsvex, escapeSvelte } from 'mdsvex';
import remarkMath from 'remark-math';
import type { PreprocessorGroup } from 'svelte/compiler';
import { remarkAssetPaths } from './assets.ts';
import { remarkCallouts } from './callouts.ts';
import { remarkCaptions } from './captions.ts';
import { remarkCodePen } from './codepen.ts';
import type { BlogConfig } from '../config/index.ts';
import { CODE_BLOCK_CLASS } from './code-block.ts';
import { remarkExternalLinks } from './external-links.ts';
import { remarkHeadings } from './headings.ts';
import { remarkYouTube } from './youtube.ts';
import { highlightCode, loadHighlighters } from './highlight.ts';
import { remarkKatex } from './math.ts';
import { remarkReadingTime } from './reading-time.ts';

export interface BlogPreprocessOptions {
	/** Absolute path to the layout applied to every `.md` file. Defaults to the bundled BlogLayout. */
	layout?: string;
	extensions?: string[];
	/** The site's base path (`paths.base` in the SvelteKit options), added to image paths in posts. */
	base?: string;
}

const defaultLayout = fileURLToPath(
	new URL('../components/blog/BlogLayout.svelte', import.meta.url)
);

/** mdsvex preprocessor with Twinkleplop highlighting, KaTeX maths and CodePen embeds, wired to the blog layout. */
export function blogPreprocess(
	blog: BlogConfig,
	options: BlogPreprocessOptions = {}
): PreprocessorGroup {
	const highlighters = loadHighlighters(blog.highlight.langs);

	return mdsvex({
		extensions: options.extensions ?? ['.md'],
		layout: options.layout ?? defaultLayout,
		remarkPlugins: [
			remarkReadingTime,
			remarkHeadings,
			remarkMath,
			remarkKatex,
			remarkCodePen,
			remarkYouTube,
			remarkExternalLinks,
			[remarkAssetPaths, { ...blog.assets, base: options.base }],
			// After remarkAssetPaths: the image becomes raw HTML, which that plugin can't see.
			remarkCaptions,
			// Last, so embeds and captioned images inside a callout are already in place.
			remarkCallouts
		],
		highlight: {
			highlighter: async (code, lang) => {
				const html = escapeSvelte(highlightCode(await highlighters, code, lang));
				return `{@html \`<div class="${CODE_BLOCK_CLASS} group relative">${html}</div>\`}`;
			}
		}
	});
}
