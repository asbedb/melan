<script lang="ts">
	import ArrowRightIcon from '@lucide/svelte/icons/arrow-right';
	import { resolve } from '$app/paths';
	import { Button } from '#lib/components/ui/button/index.ts';
	import { blogConfig } from '#lib/blog/config.ts';
	import type { PostSummary } from '#lib/blog/posts.ts';
	import PostCard from './PostCard.svelte';

	let { heading, posts }: { heading: string; posts: PostSummary[] } = $props();
</script>

{#if posts.length}
	<section
		aria-labelledby="latest-posts-heading"
		class="mx-auto w-full max-w-6xl px-4 py-16 sm:py-20"
	>
		<h2 id="latest-posts-heading" class="mb-6 text-2xl sm:text-3xl">
			{heading}
		</h2>

		<ul class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
			{#each posts as post (post.slug)}
				<li class="flex"><PostCard {post} headingLevel={3} /></li>
			{/each}
		</ul>

		<div class="mt-8 flex justify-center">
			<Button href={resolve(blogConfig.path)} variant="outline">
				View all posts
				<ArrowRightIcon data-icon="inline-end" />
			</Button>
		</div>
	</section>
{/if}
