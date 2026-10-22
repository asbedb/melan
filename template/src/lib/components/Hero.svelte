<script lang="ts" module>
	export interface HeroAction {
		label: string;
		/** Internal path or full URL. Actions pointing at a disabled route are hidden. */
		href: string;
		variant?: 'default' | 'outline';
	}

	/** A one-line dictionary-style entry explaining the heading. */
	export interface HeroDefinition {
		/** e.g. `/mɛˈlɑn/`. */
		pronunciation?: string;
		/** e.g. `noun`. */
		partOfSpeech?: string;
		/** e.g. `ink`. */
		meaning: string;
		/** Where the word comes from. */
		origin?: {
			/** e.g. `Western Armenian`. */
			language: string;
			/** The word in its own script, e.g. `մելան`. */
			word: string;
			/** BCP 47 code for `word` (e.g. `hy`), so it gets the right font and pronunciation. */
			lang?: string;
		};
	}

	export interface HeroProps {
		/** Small badge under the heading. */
		eyebrow?: string;
		/** Defaults to the site title. */
		heading?: string;
		/** Dictionary-style entry under the heading. Leave out to hide it. */
		definition?: HeroDefinition;
		/** Paragraph under the heading. Defaults to the site description. */
		summary?: string;
		/** Defaults to a button to the blog, labelled as it is in the navbar. */
		actions?: HeroAction[];
		/** Shown as a "Built with" row of badges. */
		highlights?: string[];
	}
</script>

<script lang="ts">
	// This component is yours: it isn't part of Melan, so change it or delete it as you like. It
	// shows how your own components can read the site and blog config from `@asbedb/melan`.
	import ArrowRightIcon from '@lucide/svelte/icons/arrow-right';
	import ExternalLinkIcon from '@lucide/svelte/icons/external-link';
	import {
		blogConfig,
		getRoute,
		isExternal,
		isOtherSite,
		isRouteEnabled,
		siteConfig
	} from '@asbedb/melan';
	import { Badge, Button } from '@asbedb/melan/ui';

	let {
		eyebrow,
		heading = siteConfig.title,
		definition,
		summary = siteConfig.description,
		actions = [{ label: getRoute(blogConfig.path)?.label ?? 'Blog', href: blogConfig.path }],
		highlights = []
	}: HeroProps = $props();

	const visibleActions = $derived(
		actions.filter((a) => isExternal(a.href) || isRouteEnabled(a.href))
	);
</script>

<section class="relative isolate overflow-hidden border-b">
	<div
		aria-hidden="true"
		class="absolute inset-0 -z-10 bg-[linear-gradient(to_right,var(--border)_1px,transparent_1px),linear-gradient(to_bottom,var(--border)_1px,transparent_1px)] mask-[radial-gradient(ellipse_at_center,black_20%,transparent_70%)] bg-size-[3rem_3rem]"
	></div>

	<div class="mx-auto flex min-h-[calc(50svh-3.5rem)] max-w-6xl flex-col gap-3 px-4 py-8 sm:py-32">
		<h1 class="text-5xl text-balance wrap-break-word sm:text-7xl lg:text-8xl">
			{heading}<span class="text-ink">.</span>
		</h1>
		{#if definition}
			<p class="-mt-2 flex flex-wrap items-baseline gap-x-2 gap-y-1 text-muted-foreground sm:-mt-4">
				{#if definition.pronunciation}
					<span>{definition.pronunciation}</span>
					<span aria-hidden="true">·</span>
				{/if}
				{#if definition.partOfSpeech}
					<span class="font-heading text-lg italic">{definition.partOfSpeech}</span>
					<span aria-hidden="true">·</span>
				{/if}
				<span class="text-foreground">{definition.meaning}</span>
				{#if definition.origin}
					<span aria-hidden="true">·</span>
					<span>
						from {definition.origin.language}
						<span lang={definition.origin.lang} class="font-heading text-lg text-foreground">
							{definition.origin.word}
						</span>
					</span>
				{/if}
			</p>
		{/if}
		{#if eyebrow}
			<Badge variant="ghost" class="h-7 text-sm italic">{eyebrow}</Badge>
		{/if}
		<p class="max-w-4xl text-lg text-pretty text-muted-foreground sm:text-xl">{summary}</p>

		{#if visibleActions.length}
			<div class="flex flex-wrap gap-3">
				{#each visibleActions as action (action.href)}
					{@const external = isExternal(action.href)}
					<Button
						href={action.href}
						variant={action.variant ?? 'default'}
						size="lg"
						target={external ? '_blank' : undefined}
						rel={external ? 'noopener noreferrer' : undefined}
					>
						{action.label}
						{#if isOtherSite(action.href)}
							<ExternalLinkIcon data-icon="inline-end" />
						{:else if !external && action.variant !== 'outline'}
							<ArrowRightIcon data-icon="inline-end" />
						{/if}
					</Button>
				{/each}
			</div>
		{/if}

		{#if highlights.length}
			<div class="flex flex-col gap-3 pt-4">
				<span class="text-xs font-medium tracking-widest text-muted-foreground uppercase">
					Built with
				</span>
				<ul class="flex flex-wrap gap-2">
					{#each highlights as item (item)}
						<li><Badge variant="outline" class="border-ink">{item}</Badge></li>
					{/each}
				</ul>
			</div>
		{/if}
	</div>
</section>
