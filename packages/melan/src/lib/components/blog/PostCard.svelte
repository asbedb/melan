<script lang="ts">
	import { resolvePath } from '../../paths.ts';
	import { Badge } from '../ui/badge/index.ts';
	import type { PostSummary } from '../../blog/posts.ts';
	import PostMeta from './PostMeta.svelte';
	import Tag from './Tag.svelte';

	interface Props {
		post: PostSummary;
		/** Heading level for the title, so it nests under the surrounding section heading. */
		headingLevel?: 2 | 3 | 4;
	}

	let { post, headingLevel = 2 }: Props = $props();
</script>

<article
	class="group relative flex w-full flex-col overflow-hidden rounded-xl border bg-card text-card-foreground transition-colors hover:bg-muted/40"
>
	{#if post.cover}
		<img
			src={post.cover}
			alt={post.coveralt ?? ''}
			loading="lazy"
			class="aspect-2/1 w-full border-b bg-muted object-cover"
		/>
	{/if}

	<div class="flex flex-1 flex-col gap-2 p-5">
		<!-- Without a cover, the text centres in whatever height the grid row gives the card. -->
		<div class={['flex flex-col gap-2', !post.cover && 'flex-1 justify-center']}>
			<svelte:element
				this={`h${headingLevel}`}
				class="line-clamp-2 text-lg font-semibold tracking-tight text-balance text-ink"
			>
				<!-- The stretched link makes the whole card clickable; tag badges sit above it. -->
				<a href={resolvePath(post.href)} class="after:absolute after:inset-0">{post.title}</a>
			</svelte:element>

			{#if post.summary}
				<p class="line-clamp-2 text-sm text-pretty text-muted-foreground">{post.summary}</p>
			{/if}
		</div>

		<PostMeta class="mt-auto pt-2" date={post.date} readingTime={post.readingTime} />

		{#if post.tags.length || post.draft}
			<ul class="relative z-10 flex flex-wrap gap-2 pt-1">
				{#if post.draft}
					<li><Badge variant="destructive">Draft</Badge></li>
				{/if}
				{#each post.tags as tag (tag)}
					<li><Tag {tag} /></li>
				{/each}
			</ul>
		{/if}
	</div>
</article>
