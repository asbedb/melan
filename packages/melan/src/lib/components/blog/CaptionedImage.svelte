<script lang="ts">
	import type { HTMLImgAttributes } from 'svelte/elements';

	let {
		src,
		alt = '',
		caption,
		...rest
	}: HTMLImgAttributes & {
		src: string;
		caption?: string;
	} = $props();
</script>

<figure>
	<img {src} {alt} loading="lazy" decoding="async" {...rest} class="md-image" />
	{#if caption}
		<figcaption class="mt-2 text-center text-sm text-muted-foreground">{caption}</figcaption>
	{/if}
</figure>
