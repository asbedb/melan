<script lang="ts">
	import { Hero } from '#lib/components/site/index.ts';
	import { LatestPosts } from '#lib/components/blog/index.ts';
	import { page } from '$app/state';
	import { asset } from '$app/paths';
	import { siteConfig } from '#lib/site/config.ts';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
</script>

<svelte:head>
	<title>{siteConfig.title}</title>
	<meta name="description" content={siteConfig.description} />
	<meta property="og:title" content={siteConfig.title} />
	<meta property="og:site_name" content={siteConfig.title} />
	<meta property="og:description" content={siteConfig.description} />
	<meta property="og:type" content="website" />
	{#if siteConfig.homeImage}
		<meta
			property="og:image"
			content={new URL(asset(siteConfig.homeImage), page.url.origin).href}
		/>
		<meta name="twitter:card" content="summary_large_image" />
	{/if}
</svelte:head>

<Hero {...siteConfig.hero} />

{#if siteConfig.latestPosts}
	<LatestPosts heading={siteConfig.latestPosts.heading} posts={data.latestPosts} />
{/if}
