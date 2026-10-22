import { dev } from '$app/env';
import type { RouteId } from '$app/types';
import { blogConfig } from '../config/runtime.ts';
import modules from 'virtual:melan/posts';
import { getSummary, normalizeTags } from './frontmatter.ts';

/** A post as listed on the blog index. */
export interface PostSummary {
	slug: string;
	href: RouteId;
	title: string;
	summary?: string;
	date?: string;
	updated?: string;
	author?: string;
	cover?: string;
	coveralt?: string;
	tags: string[];
	readingTime?: number;
	draft: boolean;
}

const postsDir = `/src/routes${blogConfig.path}/`;

/** The post's folder name, or undefined when `path` isn't a post directly inside the blog folder. */
function slugOf(path: string): string | undefined {
	if (!path.startsWith(postsDir)) return;
	const rest = path.slice(postsDir.length).split('/');
	return rest.length === 2 ? rest[0] : undefined;
}

function toTime(date: string | undefined): number {
	const t = date ? new Date(date).getTime() : NaN;
	return Number.isNaN(t) ? 0 : t;
}

/** Every post in the blog folder, newest first. Drafts are only included in dev. */
export function getPosts(): PostSummary[] {
	return Object.entries(modules)
		.flatMap(([path, meta = {}]) => {
			const slug = slugOf(path);
			if (!slug) return [];
			return {
				slug,
				// Built from a real folder under the blog route, so this is always a valid route ID.
				href: `${blogConfig.path}/${slug}` as RouteId,
				title: meta.title ?? slug,
				summary: getSummary(meta),
				date: meta.date,
				updated: meta.updated,
				author: meta.author,
				cover: meta.cover,
				coveralt: meta.coveralt,
				tags: normalizeTags(meta.tags),
				readingTime: meta.readingTime,
				draft: meta.draft === true
			};
		})
		.filter((post) => dev || !post.draft)
		.sort((a, b) => toTime(b.date) - toTime(a.date));
}

/** The posts either side of `slug` by date, for the links at the bottom of a post. */
export interface AdjacentPosts {
	newer?: PostSummary;
	older?: PostSummary;
}

/** The post's folder name when `routeId` is a post directly inside the blog folder. */
export function getPostSlug(routeId: string | null): string | undefined {
	const blogPath: string = blogConfig.path;
	if (!routeId?.startsWith(`${blogPath}/`)) return;
	const rest = routeId.slice(blogPath.length + 1).split('/');
	return rest.length === 1 ? rest[0] : undefined;
}

export function getAdjacentPosts(slug: string, posts = getPosts()): AdjacentPosts {
	const i = posts.findIndex((p) => p.slug === slug);
	if (i === -1) return {};
	return { newer: posts[i - 1], older: posts[i + 1] };
}

/** Unique tags across `posts`, sorted alphabetically. */
export function getTags(posts: PostSummary[]): string[] {
	return [...new Set(posts.flatMap((p) => p.tags))].sort((a, b) => a.localeCompare(b));
}
