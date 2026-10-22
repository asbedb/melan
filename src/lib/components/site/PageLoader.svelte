<script lang="ts">
	import { navigating } from '$app/state';

	interface Props {
		/** How long a navigation has to take (ms) before the bar shows, so quick ones don't flash it. */
		delay?: number;
	}

	let { delay = 150 }: Props = $props();

	let visible = $state(false);

	$effect(() => {
		if (!navigating.to) {
			visible = false;
			return;
		}
		const timer = setTimeout(() => (visible = true), delay);
		return () => clearTimeout(timer);
	});
</script>

{#if visible}
	<div
		role="progressbar"
		aria-label="Loading page"
		class="page-loader fixed inset-x-0 top-0 z-60 h-0.5 overflow-hidden bg-primary/15"
	>
		<div class="h-full w-1/3 rounded-full bg-primary"></div>
	</div>
{/if}

<style>
	/* Not in the view transition snapshot, so the bar doesn't fade with the page. */
	.page-loader {
		view-transition-name: page-loader;
	}

	.page-loader > div {
		animation: page-loader 1s ease-in-out infinite;
	}

	@keyframes page-loader {
		from {
			transform: translateX(-100%);
		}
		to {
			transform: translateX(300%);
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.page-loader > div {
			width: 100%;
			animation: page-loader-pulse 1.5s ease-in-out infinite;
		}

		@keyframes page-loader-pulse {
			50% {
				opacity: 0.4;
			}
		}
	}
</style>
