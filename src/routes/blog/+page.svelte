<script lang="ts">
	import { building } from '$app/env';
	import { page } from '$app/state';
	import { resolve } from '$app/paths';
	import { Badge } from '#lib/components/ui/badge/index.ts';
	import { PostCard } from '#lib/components/blog/index.ts';
	import { tagHref } from '#lib/blog/frontmatter.ts';
	import { blogConfig } from '#lib/blog/config.ts';
	import { getRoute, siteConfig } from '#lib/site/config.ts';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();

	const title = getRoute(blogConfig.path)?.label ?? 'Blog';

	// Pages built ahead of time (prerendered) can't read the query string, so the filter applies
	// once the page loads in the browser; otherwise the server filters it straight away.
	const activeTag = $derived(building ? null : page.url.searchParams.get('tag'));
	const posts = $derived(
		activeTag ? data.posts.filter((p) => p.tags.includes(activeTag)) : data.posts
	);
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
			{data.posts.length}
			{data.posts.length === 1 ? 'post' : 'posts'}
		</p>
	</header>

	{#if data.tags.length}
		<nav aria-label="Filter by tag" class="mt-8">
			<ul class="flex flex-wrap gap-2">
				<li>
					<Badge variant={activeTag ? 'outline' : 'default'} href={resolve(blogConfig.path)}
						>All</Badge
					>
				</li>
				{#each data.tags as tag (tag)}
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
