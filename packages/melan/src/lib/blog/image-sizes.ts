// Loaded by vite.config.ts (through mdsvex.ts) at build time — keep imports relative.
import { readFileSync, statSync } from 'node:fs';
import path from 'node:path';
import { imageSize } from 'image-size';

export interface ImageDimensions {
	width: number;
	height: number;
}

// Posts are compiled one at a time and often share images, so remember each file's size until
// it changes on disk.
const cache = new Map<string, { mtime: number; size: ImageDimensions | undefined }>();

/**
 * Width and height of an image in `static/`, from a root path such as `/img/photo.jpg`, so the
 * page can save its space before it loads. Undefined for URLs, missing files and anything
 * `image-size` can't read, such as an SVG without a size.
 */
export function getImageDimensions(
	src: string,
	staticDir = path.resolve('static')
): ImageDimensions | undefined {
	if (!src.startsWith('/') || src.startsWith('//')) return undefined;
	let file: string;
	let mtime: number;
	try {
		file = path.join(staticDir, decodeURIComponent(src.split(/[?#]/)[0]));
		mtime = statSync(file).mtimeMs;
	} catch {
		return undefined;
	}
	const cached = cache.get(file);
	if (cached?.mtime === mtime) return cached.size;

	let size: ImageDimensions | undefined;
	try {
		const { width, height, orientation } = imageSize(readFileSync(file));
		// EXIF orientations 5–8 are rotated a quarter turn, so the browser shows them on their side.
		size = orientation && orientation >= 5 ? { width: height, height: width } : { width, height };
	} catch {
		size = undefined;
	}
	cache.set(file, { mtime, size });
	return size;
}
