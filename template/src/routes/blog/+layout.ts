import { getAdjacentPosts, getPostSlug } from '@asbedb/melan';
import type { LayoutLoad } from './$types';

// Posts are `.md` pages, which can't have their own load function, so the
// older/newer links for the post layout are worked out here and read from `page.data`.
export const load: LayoutLoad = ({ route }) => {
	const slug = getPostSlug(route.id);
	return { adjacentPosts: slug ? getAdjacentPosts(slug) : undefined };
};
