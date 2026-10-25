<script lang="ts">
	// The layout wrapped around every blog post, set as `layout` in vite.config.ts. It's yours to
	// rearrange: move the contents list, drop the cover, add a newsletter box. The pieces come
	// from Melan, so they keep getting fixes when you update it. Delete the `layout` option to
	// go back to Melan's built-in layout, which looks the same as this one.
	import type { Snippet } from 'svelte';
	import { page } from '$app/state';
	import '@asbedb/melan/katex.css';
	import {
		codePenEmbeds,
		copyButtons,
		getShareImage,
		getSummary,
		headingLinks,
		normalizeTags,
		PostCover,
		PostHead,
		PostHeader,
		PostNav,
		TableOfContents,
		youtubeEmbeds,
		type PostFrontmatter
	} from '@asbedb/melan';
	import { Separator } from '@asbedb/melan/ui';

	let { children, ...meta }: PostFrontmatter & { children?: Snippet } = $props();
	const tags = $derived(normalizeTags(meta.tags));
	const summary = $derived(getSummary(meta));
	const shareImage = $derived(getShareImage(meta));
	// A single heading isn't worth a table of contents.
	const headings = $derived(
		meta.toc !== false && (meta.headings?.length ?? 0) > 1 ? meta.headings! : []
	);
</script>

<PostHead
	title={meta.title}
	{summary}
	image={shareImage}
	date={meta.date}
	updated={meta.updated}
	author={meta.author}
	{tags}
	canonical={meta.canonical}
	draft={meta.draft}
/>

<article class="mx-auto w-full max-w-6xl px-4 py-10 sm:py-16">
	<PostHeader
		title={meta.title}
		{summary}
		date={meta.date}
		updated={meta.updated}
		author={meta.author}
		readingTime={meta.readingTime}
		{tags}
		draft={meta.draft}
	/>

	{#if meta.cover}
		<PostCover src={meta.cover} alt={meta.coveralt} />
	{/if}
	<Separator class="my-8 sm:my-10" />

	<div class="lg:grid lg:grid-cols-[minmax(0,1fr)_14rem] lg:gap-12">
		{#if headings.length}
			<aside class="lg:col-start-2">
				<details class="mb-8 rounded-lg border px-4 py-3 lg:hidden">
					<summary class="cursor-pointer text-sm font-medium">On this page</summary>
					<TableOfContents {headings} class="mt-3 [&>p]:hidden" />
				</details>
				<TableOfContents {headings} class="sticky top-20 hidden lg:block" />
			</aside>
		{/if}

		<div
			{@attach copyButtons}
			{@attach codePenEmbeds}
			{@attach headingLinks}
			{@attach youtubeEmbeds}
			class="blog-prose lg:col-start-1 lg:row-start-1"
		>
			{@render children?.()}
		</div>
	</div>

	<Separator class="my-10 sm:my-12" />
	<PostNav {...page.data.adjacentPosts} />
</article>
