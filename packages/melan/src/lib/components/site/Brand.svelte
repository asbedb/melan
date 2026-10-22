<script lang="ts">
	import { page } from '$app/state';
	import { asset } from '$app/paths';
	import { siteConfig } from '../../config/runtime.ts';
	import TintedImage from './TintedImage.svelte';

	const brand = siteConfig.brand ?? {};
	const { icon, tint = true } = brand;

	// The home page can override the display and title; everything else uses the base settings.
	const settings = $derived(page.route.id === '/' ? { ...brand, ...brand.home } : brand);
	const title = $derived(settings.title ?? siteConfig.title);
	const display = $derived(icon ? (settings.display ?? 'icon') : 'title');
	const showText = $derived(display !== 'icon');
</script>

{#if icon && display !== 'title'}
	<!-- With the text beside it the icon is decorative; on its own it carries the site name. -->
	<TintedImage src={asset(icon)} alt={showText ? '' : title} {tint} class="h-8 sm:h-9" />
{/if}
{#if showText}
	<span class="min-w-0 truncate">{title}</span>
{/if}
