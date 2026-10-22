<script lang="ts">
	import { BlogIndex } from 'melan';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
</script>

<BlogIndex posts={data.posts} tags={data.tags} />
