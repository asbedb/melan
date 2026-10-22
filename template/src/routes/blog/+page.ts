import { getPosts, getTags } from '@asbedb/melan';
import type { PageLoad } from './$types';

export const load: PageLoad = () => {
	const posts = getPosts();
	return { posts, tags: getTags(posts) };
};
