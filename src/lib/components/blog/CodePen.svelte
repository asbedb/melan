<script lang="ts">
	import { mode } from 'mode-watcher';
	import { blogConfig } from '#lib/blog/config.ts';

	let {
		user,
		pen,
		title = 'CodePen embed',
		height = blogConfig.codepen.height,
		tabs = blogConfig.codepen.tabs
	}: {
		/** The pen owner's CodePen username, or `team/<name>` for a team's pen. */
		user: string;
		/** The pen's ID, the last part of its URL. */
		pen: string;
		/** Read out by screen readers. */
		title?: string;
		/** Height in pixels. */
		height?: number;
		/** Tabs to open on, e.g. `'result'` or `'html,result'`. */
		tabs?: string;
	} = $props();

	const src = $derived(
		`https://codepen.io/${user.split('/').map(encodeURIComponent).join('/')}/embed/${encodeURIComponent(pen)}` +
			`?default-tab=${encodeURIComponent(tabs)}&theme-id=${mode.current ?? 'light'}`
	);
</script>

<iframe
	{src}
	{title}
	{height}
	class="w-full rounded-lg border"
	loading="lazy"
	allowfullscreen
	allow="clipboard-write"
></iframe>
