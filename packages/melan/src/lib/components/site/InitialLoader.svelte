<script lang="ts">
	import { onMount } from 'svelte';
	import { fade } from 'svelte/transition';
	import { asset } from '$app/paths';
	import { siteConfig } from '../../config/runtime.ts';
	import TintedImage from './TintedImage.svelte';

	interface Props {
		/** Longest the loader stays up (ms), even if images or fonts are still loading. */
		timeout?: number;
	}

	let { timeout = 6000 }: Props = $props();

	// Shows the site icon with a shimmer; sites without an icon get a loading bar instead.
	const { icon, tint = true } = siteConfig.brand ?? {};
	const src = icon && asset(icon);

	// Server-rendered as visible, so it covers the page before any JavaScript runs. Client-side
	// navigation never remounts the root layout, so it only ever shows on the first load.
	let visible = $state(true);

	onMount(() => {
		const hide = () => (visible = false);
		if (document.readyState === 'complete') {
			hide();
			return;
		}
		window.addEventListener('load', hide, { once: true });
		const timer = setTimeout(hide, timeout);
		return () => {
			window.removeEventListener('load', hide);
			clearTimeout(timer);
		};
	});
</script>

<svelte:head>
	<!-- Without JavaScript nothing would hide it, so don't show it at all. Svelte drops the
	     contents of a written <noscript>, hence {@html}. -->
	<!-- eslint-disable-next-line svelte/no-at-html-tags -->
	{@html '<noscript><style>.initial-loader { display: none; }</style></noscript>'}
</svelte:head>

{#if visible}
	<div
		role="progressbar"
		aria-label="Loading page"
		class="initial-loader fixed inset-0 z-70 grid place-items-center bg-background"
		style:--initial-loader-timeout="{timeout}ms"
		out:fade={{ duration: 200 }}
	>
		{#if src}
			<!-- The progressbar label already says what this is, so the icon is decorative. -->
			<div class="initial-loader-icon relative">
				<TintedImage {src} alt="" {tint} class="h-16" />
				<!-- A highlight swept across the icon, cut to its shape by the same mask. -->
				<span
					class="initial-loader-shimmer absolute inset-0 mask-contain mask-center mask-no-repeat"
					style:mask-image="url({src})"
				></span>
			</div>
		{:else}
			<div class="h-0.5 w-24 overflow-hidden rounded-full bg-primary/15">
				<div class="initial-loader-bar h-full w-1/3 rounded-full bg-primary"></div>
			</div>
		{/if}
	</div>
{/if}

<style>
	/* Hides itself after the timeout even if the app never starts, so a failed script can't
	   leave the page covered. */
	.initial-loader {
		animation: initial-loader-timeout 0s var(--initial-loader-timeout) forwards;
	}

	/* The background colour as the highlight reads as a gleam on the icon in either mode. */
	.initial-loader-shimmer {
		background: linear-gradient(
				100deg,
				transparent 35%,
				color-mix(in oklab, var(--background) 70%, transparent) 50%,
				transparent 65%
			)
			0 0 / 300% 100%;
		animation: initial-loader-shimmer 1.4s ease-in-out infinite;
	}

	.initial-loader-bar {
		animation: initial-loader-bar 1s ease-in-out infinite;
	}

	@keyframes initial-loader-timeout {
		to {
			visibility: hidden;
		}
	}

	@keyframes initial-loader-shimmer {
		from {
			background-position: 100% 0;
		}
		to {
			background-position: 0 0;
		}
	}

	@keyframes initial-loader-bar {
		from {
			transform: translateX(-100%);
		}
		to {
			transform: translateX(300%);
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.initial-loader-shimmer {
			display: none;
		}

		.initial-loader-bar {
			width: 100%;
		}

		.initial-loader-icon,
		.initial-loader-bar {
			animation: initial-loader-pulse 1.5s ease-in-out infinite;
		}

		@keyframes initial-loader-pulse {
			50% {
				opacity: 0.4;
			}
		}
	}
</style>
