// Modules written by the Vite plugin in vite.ts.

declare module 'virtual:melan/config' {
	const config: import('./config/index.ts').ResolvedConfig;
	export default config;
}

declare module 'virtual:melan/image-sizes' {
	/** Width and height of each image in `static/`, keyed by its path there (`img/photo.jpg`). */
	const sizes: Record<string, import('./blog/image-sizes.ts').ImageDimensions>;
	export default sizes;
}

declare module 'virtual:melan/posts' {
	/** Frontmatter of each post directly inside the blog folder, keyed by file path. */
	const posts: Record<string, import('./blog/types.ts').PostFrontmatter>;
	export default posts;
}
