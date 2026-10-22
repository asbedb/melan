// Modules written by the Vite plugin in vite.ts.

declare module 'virtual:melan/config' {
	const config: import('./config/index.ts').ResolvedConfig;
	export default config;
}

declare module 'virtual:melan/posts' {
	/** Frontmatter of each post directly inside the blog folder, keyed by file path. */
	const posts: Record<string, import('./blog/types.ts').PostFrontmatter>;
	export default posts;
}
