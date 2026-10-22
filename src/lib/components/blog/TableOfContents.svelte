<script lang="ts">
	import { onMount } from 'svelte';
	import { scrollToHeading } from '#lib/blog/heading-links.ts';
	import { cn } from '#lib/utils.ts';
	import type { PostHeading } from '#lib/blog/types.ts';

	interface Props {
		headings: PostHeading[];
		class?: string;
	}

	let { headings, class: className }: Props = $props();

	/** How far below the top of the viewport a heading counts as "current" — clears the sticky navbar. */
	const OFFSET = 96;

	let activeId = $state<string>();

	function update() {
		const atBottom = window.innerHeight + window.scrollY >= document.body.scrollHeight - 2;
		if (atBottom) {
			activeId = headings.at(-1)?.id;
			return;
		}
		let current: string | undefined;
		for (const { id } of headings) {
			const el = document.getElementById(id);
			if (el && el.getBoundingClientRect().top <= OFFSET) current = id;
		}
		activeId = current;
	}

	let frame = 0;
	function onScroll() {
		cancelAnimationFrame(frame);
		frame = requestAnimationFrame(update);
	}

	onMount(() => {
		update();
		return () => cancelAnimationFrame(frame);
	});
</script>

<svelte:window onscroll={onScroll} onresize={onScroll} />

<nav aria-label="On this page" class={cn('text-sm', className)}>
	<p class="mb-3 font-medium">On this page</p>
	<ul class="flex flex-col gap-2 border-l">
		{#each headings as heading (heading.id)}
			<li>
				<a
					href="#{heading.id}"
					onclick={(e) => scrollToHeading(e, heading.id)}
					aria-current={heading.id === activeId ? 'location' : undefined}
					class={cn(
						'-ml-px block border-l border-transparent text-muted-foreground transition-colors hover:text-foreground',
						heading.depth > 2 ? 'pl-7' : 'pl-4',
						heading.id === activeId && 'border-ink font-medium text-foreground'
					)}
				>
					{heading.text}
				</a>
			</li>
		{/each}
	</ul>
</nav>
