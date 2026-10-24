<script lang="ts">
	import { page } from '$app/state';
	import { asset } from '$app/paths';
	import { blogConfig, LatestPosts, siteConfig } from '@asbedb/melan';
	import Hero from '#lib/components/Hero.svelte';
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

<!-- The hero is an example component in src/lib/components: edit it, or delete it from here. -->
<Hero
	eyebrow="pnpm create melan my-blog"
	definition={{
		pronunciation: '/mɛˈlɑn/',
		partOfSpeech: 'noun',
		meaning: 'ink',
		origin: { language: 'Western Armenian', word: 'մելան', lang: 'hy' }
	}}
	summary="A reusable blog template for SvelteKit. Write posts in Markdown, get syntax highlighting out of the box, and build on accessible shadcn-svelte components with light and dark mode."
	actions={[
		{ label: 'Example Posts', href: blogConfig.path },
		{ label: 'GitHub', href: 'https://github.com/asbedb/melan', variant: 'outline' }
	]}
	highlights={['SvelteKit', 'Twinkleplop', 'shadcn-svelte', 'mdsvex', 'Tailwind CSS']}
/>

{#if siteConfig.latestPosts}
	<LatestPosts heading={siteConfig.latestPosts.heading} posts={data.latestPosts} />
{/if}
