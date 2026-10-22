<script lang="ts">
	import { resolvePath } from '../../paths.ts';
	import ArrowLeftIcon from '@lucide/svelte/icons/arrow-left';
	import ArrowRightIcon from '@lucide/svelte/icons/arrow-right';
	import type { AdjacentPosts } from '../../blog/posts.ts';

	let { newer, older }: AdjacentPosts = $props();
</script>

<!-- Next (newer) comes first so it's read first, matching the newest-first blog index. -->
{#if newer || older}
	<nav aria-label="More posts" class="grid gap-4 sm:grid-cols-2">
		{#if newer}
			<a
				href={resolvePath(newer.href)}
				rel="next"
				class="group flex flex-col gap-1 rounded-xl border p-5 transition-colors hover:bg-muted/40"
			>
				<span class="flex items-center gap-1.5 text-sm text-muted-foreground">
					<ArrowLeftIcon class="size-4 transition-transform group-hover:-translate-x-0.5" />
					Next post
				</span>
				<span class="font-semibold tracking-tight text-balance">{newer.title}</span>
			</a>
		{/if}
		{#if older}
			<a
				href={resolvePath(older.href)}
				rel="prev"
				class="group flex flex-col items-end gap-1 rounded-xl border p-5 text-right transition-colors hover:bg-muted/40 sm:col-start-2"
			>
				<span class="flex items-center gap-1.5 text-sm text-muted-foreground">
					Previous post
					<ArrowRightIcon class="size-4 transition-transform group-hover:translate-x-0.5" />
				</span>
				<span class="font-semibold tracking-tight text-balance">{older.title}</span>
			</a>
		{/if}
	</nav>
{/if}
