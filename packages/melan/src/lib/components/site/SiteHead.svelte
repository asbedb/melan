<script lang="ts">
	import { siteConfig } from '../../config/runtime.ts';

	const { accent } = siteConfig;
	const accentStyle = accent
		? `<style>:root{--ink:${accent.light}}.dark{--ink:${accent.dark ?? accent.light}}</style>`
		: '';
</script>

<svelte:head>
	<!-- The accent comes from the site config, so it's written into the page rather than a stylesheet. -->
	<!-- eslint-disable-next-line svelte/no-at-html-tags -->
	{@html accentStyle}
</svelte:head>
