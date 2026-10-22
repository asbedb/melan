<script lang="ts">
	import { cn } from '../../utils.ts';
	import { formatDate, formatReadingTime } from '../../blog/frontmatter.ts';

	interface Props {
		date?: string;
		updated?: string;
		author?: string;
		readingTime?: number;
		class?: string;
	}

	let { date, updated, author, readingTime, class: className }: Props = $props();

	const formattedDate = $derived(formatDate(date));
	const formattedUpdated = $derived(formatDate(updated));
	const formattedReadingTime = $derived(formatReadingTime(readingTime));
</script>

{#if author || formattedDate || formattedUpdated || formattedReadingTime}
	<p
		class={cn(
			'flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-muted-foreground [&>*:not(:last-child)]:after:ms-2 [&>*:not(:last-child)]:after:content-["·"]',
			className
		)}
	>
		{#if author}<span>{author}</span>{/if}
		{#if formattedDate}<time datetime={date}>{formattedDate}</time>{/if}
		{#if formattedUpdated}
			<span>Updated <time datetime={updated}>{formattedUpdated}</time></span>
		{/if}
		{#if formattedReadingTime}<span>{formattedReadingTime}</span>{/if}
	</p>
{/if}
