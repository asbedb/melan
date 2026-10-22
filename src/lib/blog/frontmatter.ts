import { resolve } from '$app/paths';
import { blogConfig } from './config.ts';
import type { PostFrontmatter } from './types.ts';

export function normalizeTags(tags: PostFrontmatter['tags']): string[] {
	if (Array.isArray(tags)) return tags;
	if (!tags) return [];
	return tags
		.split(',')
		.map((t) => t.trim())
		.filter(Boolean);
}

export function getSummary({ description, excerpt }: PostFrontmatter): string | undefined {
	return description ?? excerpt;
}

export function getShareImage({ ogimage, cover }: PostFrontmatter): string | undefined {
	return ogimage ?? cover;
}

/** Formats a frontmatter date for display; returns the input unchanged if it can't be parsed. */
export function formatDate(date: string | undefined, locale = blogConfig.locale): string | null {
	if (!date) return null;
	const d = new Date(date);
	if (Number.isNaN(d.getTime())) return date;
	// timeZone UTC stops "2026-10-20" from shifting a day in some timezones
	return d.toLocaleDateString(locale, {
		day: 'numeric',
		month: 'long',
		year: 'numeric',
		timeZone: 'UTC'
	});
}

export function formatReadingTime(minutes: number | undefined): string | null {
	return minutes ? `${minutes} min read` : null;
}

/** Link to the blog index filtered to `tag`. */
export function tagHref(tag: string): string {
	return `${resolve(blogConfig.path)}?tag=${encodeURIComponent(tag)}`;
}
