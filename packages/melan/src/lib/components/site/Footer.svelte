<script lang="ts">
	import ExternalLinkIcon from '@lucide/svelte/icons/external-link';
	import { resolvePath } from '../../paths.ts';
	import { cn } from '../../utils.ts';
	import type { FooterConfig } from '../../config/index.ts';
	import { isExternal, isOtherSite, isRouteEnabled, siteConfig } from '../../config/runtime.ts';

	/** Where the "Powered by Melan" credit links to. */
	const MELAN_URL = 'https://github.com/asbedb/melan';

	interface Props extends FooterConfig {
		class?: string;
	}

	let { text, links = [], poweredBy = true, class: className }: Props = $props();

	const year = new Date().getFullYear();
	const filledText = $derived(
		text?.replaceAll('{year}', String(year)).replaceAll('{title}', siteConfig.title)
	);
	const visibleLinks = $derived(links.filter((l) => isExternal(l.href) || isRouteEnabled(l.href)));
</script>

<footer class={cn('border-t', className)}>
	<div
		class="mx-auto flex w-full max-w-6xl flex-col gap-4 px-4 py-8 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between"
	>
		{#if filledText}
			<p>{filledText}</p>
		{/if}

		{#if visibleLinks.length}
			<nav aria-label="Footer">
				<ul class="flex flex-wrap gap-x-5 gap-y-2">
					{#each visibleLinks as link (link.href)}
						{@const external = isExternal(link.href)}
						<li>
							<!-- Internal hrefs come from the config as plain strings, so they're resolved here. -->
							<a
								href={external ? link.href : resolvePath(link.href)}
								target={external ? '_blank' : undefined}
								rel={external ? 'noopener noreferrer' : undefined}
								class="decoration-ink underline-offset-4 transition-colors hover:text-foreground hover:underline"
							>
								{link.label}
								{#if isOtherSite(link.href)}
									<ExternalLinkIcon class="inline size-3 align-baseline" aria-hidden="true" />
								{/if}
							</a>
						</li>
					{/each}
				</ul>
			</nav>
		{/if}

		{#if poweredBy}
			<p class="sm:ms-auto">
				Powered by
				<a
					href={MELAN_URL}
					target="_blank"
					rel="noopener noreferrer"
					class="font-medium text-foreground decoration-ink underline-offset-4 hover:underline"
				>
					Melan<ExternalLinkIcon class="ms-0.5 inline size-3 align-baseline" aria-hidden="true" />
				</a>
			</p>
		{/if}
	</div>
</footer>
