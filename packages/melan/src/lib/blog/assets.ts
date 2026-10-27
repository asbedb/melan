// Loaded by vite.config.ts (through mdsvex.ts) at build time — keep imports relative.
import type { BlogConfig } from '../config/index.ts';
import { getImageDimensions } from './image-sizes.ts';

interface Node {
	type: string;
	url?: string;
	children?: Node[];
	data?: { hProperties?: Record<string, unknown> };
}

/** Frontmatter fields that hold a cover-style image. */
const COVER_FIELDS = ['cover', 'ogimage'];

/** Prefixes `src` with `dir` when it's a bare filename; paths, URLs and anchors are left alone. */
export function withAssetDir(src: string, dir: string): string {
	if (/^([a-z][a-z\d+.-]*:|\/|\.|#)/i.test(src)) return src;
	return `${dir.replace(/\/+$/, '')}/${src}`;
}

/**
 * Prefixes a root path (`/img/…`) with the site's base path, so images still load when the site
 * is served from a sub-path such as `/melan`. URLs, relative paths and paths already under the
 * base are left alone.
 */
export function withBase(src: string, base: string): string {
	if (!base || !src.startsWith('/') || src.startsWith('//')) return src;
	if (src === base || src.startsWith(`${base}/`)) return src;
	return `${base}${src}`;
}

/**
 * Remark plugin that looks up bare image filenames in the configured folders:
 * `cover`/`ogimage` in `assets.covers`, and images in the post body in `assets.images`.
 * Root paths then get the site's base path, if there is one. Images in the post body found in
 * `static/` get their width and height, so the page saves their space instead of jumping when
 * they load, and load lazily.
 */
export function remarkAssetPaths({
	base = '',
	...assets
}: BlogConfig['assets'] & { base?: string }) {
	return (tree: Node, file: { data: { fm?: Record<string, unknown> } }) => {
		const fm = file.data.fm;
		for (const field of COVER_FIELDS) {
			if (fm && typeof fm[field] === 'string') {
				fm[field] = withBase(withAssetDir(fm[field], assets.covers), base);
			}
		}

		const visit = (node: Node) => {
			if (node.type === 'image' && node.url) {
				const src = withAssetDir(node.url, assets.images);
				// Sized before the base path goes on, while the path still matches the file in static/.
				const size = getImageDimensions(src);
				node.url = withBase(src, base);
				node.data = {
					...node.data,
					hProperties: {
						...node.data?.hProperties,
						...size,
						loading: 'lazy',
						decoding: 'async'
					}
				};
			}
			node.children?.forEach(visit);
		};
		visit(tree);
	};
}
