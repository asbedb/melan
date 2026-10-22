<script lang="ts">
	import { Button } from '../ui/button/index.ts';
	import CopyIcon from '@lucide/svelte/icons/copy';
	import CheckIcon from '@lucide/svelte/icons/check';

	let { getCode }: { getCode: () => string } = $props();

	let copied = $state(false);
	let timeout: ReturnType<typeof setTimeout> | undefined;

	async function copy() {
		try {
			await navigator.clipboard.writeText(getCode());
			copied = true;
			clearTimeout(timeout);
			timeout = setTimeout(() => (copied = false), 2000);
		} catch (err) {
			console.error('Copy failed', err);
		}
	}
</script>

<Button
	variant="ghost"
	size="icon"
	class="size-8 border bg-background/80 text-muted-foreground backdrop-blur hover:text-foreground"
	aria-label={copied ? 'Copied' : 'Copy code'}
	onclick={copy}
>
	{#if copied}
		<CheckIcon class="size-4" />
	{:else}
		<CopyIcon class="size-4" />
	{/if}
</Button>
