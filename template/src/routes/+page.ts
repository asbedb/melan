import { blogConfig, getPosts, isRouteEnabled, siteConfig } from '@asbedb/melan';
import type { PageLoad } from './$types';

export const load: PageLoad = () => {
	const { latestPosts } = siteConfig;
	const show = latestPosts && latestPosts.count > 0 && isRouteEnabled(blogConfig.path);
	return { latestPosts: show ? getPosts().slice(0, latestPosts.count) : [] };
};
