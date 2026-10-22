<script lang="ts">
	// The frame around every page. It's yours to rearrange: the pieces come from Melan, so they
	// keep getting fixes when you update it, but what goes where is up to you.
	import './layout.css';
	import favicon from '#lib/assets/favicon.svg';
	import {
		fadeBetweenPages,
		Footer,
		ModeWatcher,
		Navbar,
		PageLoader,
		SiteHead,
		siteConfig
	} from '@asbedb/melan';
	import type { LayoutProps } from './$types';

	let { children }: LayoutProps = $props();

	fadeBetweenPages();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>
<SiteHead />
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
