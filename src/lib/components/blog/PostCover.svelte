<script lang="ts">
	let { src, alt = '' }: { src: string; alt?: string } = $props();
</script>

<figure class="mt-8 overflow-hidden rounded-xl border sm:mt-10">
	<img {src} {alt} class="aspect-video w-full object-cover" />
</figure>
