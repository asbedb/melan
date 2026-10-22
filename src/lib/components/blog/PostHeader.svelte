<script lang="ts">
	import { Badge } from '#lib/components/ui/badge/index.ts';
	import { tagHref } from '#lib/blog/frontmatter.ts';
	import PostMeta from './PostMeta.svelte';

	interface Props {
		title?: string;
		summary?: string;
		date?: string;
		updated?: string;
		author?: string;
		readingTime?: number;
		tags?: string[];
		draft?: boolean;
	}

	let { title, summary, date, updated, author, readingTime, tags = [], draft }: Props = $props();
</script>

<header class="flex flex-col gap-4">
	{#if title}
		<h1 class="scroll-m-20 text-3xl text-balance wrap-break-word text-ink sm:text-4xl lg:text-5xl">
			{title}
		</h1>
	{/if}

	{#if summary}
		<p class="text-lg text-pretty text-muted-foreground">{summary}</p>
	{/if}

	<PostMeta {date} {updated} {author} {readingTime} />
	{#if tags.length || draft}
		<ul class="flex flex-wrap gap-2">
			{#if draft}
				<li><Badge variant="destructive">Draft</Badge></li>
			{/if}
			{#each tags as tag (tag)}
				<li><Badge variant="secondary" href={tagHref(tag)}>{tag}</Badge></li>
			{/each}
		</ul>
	{/if}
</header>
