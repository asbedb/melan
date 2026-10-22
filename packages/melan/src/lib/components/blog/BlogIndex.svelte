<script lang="ts">
	import { building } from '$app/env';
	import { page } from '$app/state';
	import { resolvePath } from '../../paths.ts';
	import { Badge } from '../ui/badge/index.ts';
	import { tagHref } from '../../blog/frontmatter.ts';
	import type { PostSummary } from '../../blog/posts.ts';
	import { blogConfig, getRoute, siteConfig } from '../../config/runtime.ts';
	import PostCard from './PostCard.svelte';

	interface Props {
		posts: PostSummary[];
		/** Tags to filter by, usually `getTags(posts)`. */
		tags: string[];
	}

	let { posts: allPosts, tags }: Props = $props();

	const title = getRoute(blogConfig.path)?.label ?? 'Blog';

	// Pages built ahead of time (prerendered) can't read the query string, so the filter applies
	// once the page loads in the browser; otherwise the server filters it straight away.
	const activeTag = $derived(building ? null : page.url.searchParams.get('tag'));
	const posts = $derived(activeTag ? allPosts.filter((p) => p.tags.includes(activeTag)) : allPosts);
</script>

<svelte:head>
	<title>{title} · {siteConfig.title}</title>
</svelte:head>

<main class="mx-auto w-full max-w-6xl px-4 py-10 sm:py-16">
	<header class="flex flex-col gap-3">
		<h1 class="scroll-m-20 text-3xl sm:text-4xl lg:text-5xl">
			{title}
		</h1>
		<p class="text-lg text-muted-foreground">
			{allPosts.length}
			{allPosts.length === 1 ? 'post' : 'posts'}
		</p>
	</header>

	{#if tags.length}
		<nav aria-label="Filter by tag" class="mt-8">
			<ul class="flex flex-wrap gap-2">
				<li>
					<Badge variant={activeTag ? 'outline' : 'default'} href={resolvePath(blogConfig.path)}
						>All</Badge
					>
				</li>
				{#each tags as tag (tag)}
					<li>
						<Badge
							variant={tag === activeTag ? 'default' : 'outline'}
							href={tagHref(tag)}
							aria-current={tag === activeTag ? 'page' : undefined}
						>
							{tag}
						</Badge>
					</li>
				{/each}
			</ul>
		</nav>
	{/if}

	{#if posts.length}
		<ul class="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
			{#each posts as post (post.slug)}
				<li class="flex"><PostCard {post} /></li>
			{/each}
		</ul>
	{:else}
		<p class="mt-12 text-center text-muted-foreground">
			{activeTag ? `No posts tagged “${activeTag}”.` : 'No posts yet.'}
		</p>
	{/if}
</main>
