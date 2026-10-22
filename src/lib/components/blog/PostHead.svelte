<script lang="ts">
	import { page } from '$app/state';
	import { siteConfig } from '#lib/site/config.ts';

	interface Props {
		title?: string;
		summary?: string;
		image?: string;
		date?: string;
		updated?: string;
		author?: string;
		tags?: string[];
		canonical?: string;
		draft?: boolean;
	}

	let {
		title,
		summary,
		image,
		date,
		updated,
		author,
		tags = [],
		canonical,
		draft
	}: Props = $props();
	const absolute = (href: string) => new URL(href, page.url.origin).href;
	const url = $derived(absolute(page.url.pathname));
</script>

<svelte:head>
	<title>{title ? `${title} · ${siteConfig.title}` : siteConfig.title}</title>
	{#if title}
		<meta property="og:title" content={title} />
	{/if}
	<meta property="og:site_name" content={siteConfig.title} />
	<meta property="og:url" content={canonical ?? url} />
	{#if summary}
		<meta name="description" content={summary} />
		<meta property="og:description" content={summary} />
	{/if}
	{#if image}
		<meta property="og:image" content={absolute(image)} />
		<meta name="twitter:card" content="summary_large_image" />
	{/if}
	<meta property="og:type" content="article" />
	{#if date}
		<meta property="article:published_time" content={date} />
	{/if}
	{#if updated}
		<meta property="article:modified_time" content={updated} />
	{/if}
	{#if author}
		<meta name="author" content={author} />
		<meta property="article:author" content={author} />
	{/if}
	{#each tags as tag (tag)}
		<meta property="article:tag" content={tag} />
	{/each}
	{#if canonical}
		<link rel="canonical" href={canonical} />
	{/if}
	{#if draft}
		<meta name="robots" content="noindex" />
	{/if}
</svelte:head>
