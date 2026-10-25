<script lang="ts">
	import { getYouTubeId } from '../../blog/youtube.ts';
	import { blogConfig } from '../../config/runtime.ts';

	let {
		url,
		start,
		height = blogConfig.youtube.height,
		width = blogConfig.youtube.width
	}: {
		url: string; // full YouTube link or just the video ID
		start?: number; // optional start time in seconds
		height?: number;
		width?: number;
	} = $props();

	const id = $derived(getYouTubeId(url));

	const src = $derived(
		id
			? `https://www.youtube.com/embed/${encodeURIComponent(id)}` + (start ? `?start=${start}` : '')
			: null
	);
</script>

{#if src}
	<iframe
		{width}
		{height}
		{src}
		title="YouTube video player"
		frameborder="0"
		allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
		referrerpolicy="strict-origin-when-cross-origin"
		allowfullscreen
	>
	</iframe>
{/if}
