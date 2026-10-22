<script lang="ts">
	import { BlogIndex } from '@asbedb/melan';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
</script>

<BlogIndex posts={data.posts} tags={data.tags} />
