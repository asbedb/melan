import { getPosts, getTags } from 'melan';
import type { PageLoad } from './$types';

export const load: PageLoad = () => {
	const posts = getPosts();
	return { posts, tags: getTags(posts) };
};
