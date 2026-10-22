import { blogConfig } from '#lib/blog/config.ts';
import { getPosts } from '#lib/blog/posts.ts';
import { isRouteEnabled, siteConfig } from '#lib/site/config.ts';
import type { PageLoad } from './$types';

export const load: PageLoad = () => {
	const { latestPosts } = siteConfig;
	const show = latestPosts && latestPosts.count > 0 && isRouteEnabled(blogConfig.path);
	return { latestPosts: show ? getPosts().slice(0, latestPosts.count) : [] };
};
