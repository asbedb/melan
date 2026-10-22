import { getPosts, getTags } from '#lib/blog/posts.ts';
import type { PageLoad } from './$types';

export const load: PageLoad = () => {
	const posts = getPosts();
	return { posts, tags: getTags(posts) };
};
