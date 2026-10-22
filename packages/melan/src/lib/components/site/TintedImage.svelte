<script lang="ts">
	import type { ClassValue } from 'svelte/elements';
	import { cn } from '../../utils.ts';

	interface Props {
		src: string;
		alt: string;
		/** Paint a single-colour image in the text colour so it follows light and dark mode. */
		tint?: boolean;
		/** Sizing classes, e.g. `h-8`. Width follows the image's own shape. */
		class?: ClassValue;
	}

	let { src, alt, tint = true, class: className }: Props = $props();
</script>

{#if tint}
	<!-- The invisible image sizes the box; the image is painted in the text colour through a mask. -->
	<span
		class="block shrink-0 bg-current mask-contain mask-center mask-no-repeat"
		style:mask-image="url({src})"
	>
		<img {src} {alt} class={cn('block w-auto opacity-0', className)} />
	</span>
{:else}
	<img {src} {alt} class={cn('block w-auto shrink-0', className)} />
{/if}
