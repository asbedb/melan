<script lang="ts">
	import './layout.css';
	import favicon from '#lib/assets/favicon.svg';
	import type { LayoutProps } from './$types';
	import { onNavigate } from '$app/navigation';
	import { ModeWatcher } from 'mode-watcher';
	import { Footer, Navbar, PageLoader } from '#lib/components/site/index.ts';
	import { siteConfig } from '#lib/site/config.ts';
	let { children }: LayoutProps = $props();

	const { accent } = siteConfig;
	const accentStyle = accent
		? `<style>:root{--ink:${accent.light}}.dark{--ink:${accent.dark ?? accent.light}}</style>`
		: '';

	// Fade between pages with the View Transitions API. This runs once the next page has loaded,
	// so the new page fades in complete; the styles live in layout.css. Browsers without
	// the API just switch pages instantly.
	onNavigate((navigation) => {
		if (!document.startViewTransition) return;
		// Filtering the blog by tag stays on the same page, so skip the fade there.
		if (navigation.from?.url.pathname === navigation.to?.url.pathname) return;

		return new Promise((resolve) => {
			document.startViewTransition(async () => {
				resolve();
				await navigation.complete;
			});
		});
	});
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<!-- The accent comes from the site config, so it's written into the page rather than layout.css. -->
	<!-- eslint-disable-next-line svelte/no-at-html-tags -->
	{@html accentStyle}
</svelte:head>
<ModeWatcher />
<PageLoader />
<!-- Column layout keeps the footer at the bottom of the screen on short pages. -->
<div class="flex min-h-svh flex-col">
	<Navbar />
	<div class="flex-1">
		{@render children()}
	</div>
	{#if siteConfig.footer}
		<Footer {...siteConfig.footer} />
	{/if}
</div>
