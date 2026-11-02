<script lang="ts">
	import { imageDimensions } from '../../site/image-dimensions.ts';

	let { src, alt = '' }: { src: string; alt?: string } = $props();
</script>

<figure class="mt-8 overflow-hidden rounded-xl border sm:mt-10">
	<!-- The fixed shape saves its space; the muted fill shows until the image arrives. -->
	<img {src} {alt} {...imageDimensions(src)} class="aspect-video w-full bg-muted object-cover" />
</figure>
