// Public API of Melan. Build-time pieces live in `@asbedb/melan/vite` and `@asbedb/melan/config`.
export * from './components/blog/index.ts';
export * from './components/theme/index.ts';
export * from './components/site/index.ts';
export { ModeWatcher } from 'mode-watcher';
export { fadeBetweenPages } from './site/page-transitions.ts';
export {
	formatDate,
	formatReadingTime,
	getShareImage,
	getSummary,
	normalizeTags,
	tagHref
} from './blog/frontmatter.ts';
export { copyButtons } from './blog/copy-buttons.ts';
export { codePenEmbeds } from './blog/codepen-embeds.ts';
export { youtubeEmbeds } from './blog/youtube-embeds.ts';
export { headingLinks, scrollToHeading } from './blog/heading-links.ts';
export {
	getAdjacentPosts,
	getPosts,
	getPostSlug,
	getTags,
	type AdjacentPosts,
	type PostSummary
} from './blog/posts.ts';
export type { PostFrontmatter, PostHeading } from './blog/types.ts';
export {
	blogConfig,
	getRoute,
	isActive,
	isExternal,
	isOtherSite,
	isRouteEnabled,
	navRoutes,
	siteConfig
} from './config/runtime.ts';
export type {
	AccentConfig,
	BlogConfig,
	BrandConfig,
	BrandDisplay,
	FooterConfig,
	FooterLink,
	LatestPostsConfig,
	ResolvedConfig,
	SiteConfig,
	SiteRoute
} from './config/index.ts';
