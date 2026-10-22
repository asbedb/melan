import { blogConfig } from '#lib/blog/config.ts';
import { getAdjacentPosts } from '#lib/blog/posts.ts';
import type { LayoutLoad } from './$types';

// Posts are `.md` pages, which can't have their own load function, so the
// older/newer links for BlogLayout are worked out here and read from `page.data`.
export const load: LayoutLoad = ({ route }) => {
	const rest = route.id?.slice(blogConfig.path.length).split('/') ?? [];
	// A post's route is `<blog path>/<slug>`, i.e. ['', slug] once the blog path is removed.
	const slug =
		route.id?.startsWith(`${blogConfig.path}/`) && rest.length === 2 ? rest[1] : undefined;
	return { adjacentPosts: slug ? getAdjacentPosts(slug) : undefined };
};
