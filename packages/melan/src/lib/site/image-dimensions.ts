import sizes from 'virtual:melan/image-sizes';

/**
 * `width` and `height` of an image in `static/`, read at build time, so the page saves its space
 * before the image loads. Spread it onto the image: `<img {src} {alt} {...imageDimensions(src)} />`.
 *
 * Takes the `src` as the page uses it: a root path (`/img/photo.jpg`), one under the base path
 * (`/melan/img/photo.jpg`) or a relative one from `asset()` (`../img/photo.jpg`). URLs and images
 * that can't be read give an empty object, so the image just loads without saved space.
 */
export function imageDimensions(src: string | null | undefined): {
	width?: number;
	height?: number;
} {
	if (!src || /^([a-z][a-z\d+.-]*:|\/\/)/i.test(src)) return {};
	let segments: string[];
	try {
		segments = decodeURIComponent(src.split(/[?#]/)[0])
			.split('/')
			.filter((s) => s && s !== '.' && s !== '..');
	} catch {
		return {};
	}
	// The base path, if any, is unknown here (and relative while server rendering), so drop leading
	// folders until the rest names a file in static/. The longest match wins.
	for (let i = 0; i < segments.length; i++) {
		const size = sizes[segments.slice(i).join('/')];
		if (size) return size;
	}
	return {};
}
