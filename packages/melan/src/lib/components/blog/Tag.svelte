<script lang="ts">
	import type { HTMLAnchorAttributes } from 'svelte/elements';
	import { Badge, type BadgeVariant } from '../ui/badge/index.ts';
	import { tagHref } from '../../blog/frontmatter.ts';
	import { blogConfig } from '../../config/runtime.ts';

	interface Props extends HTMLAnchorAttributes {
		tag: string;
		/** Overrides `blog.tags.variant`, e.g. to mark the selected tag in a filter. */
		variant?: BadgeVariant;
	}

	let { tag, variant = blogConfig.tags.variant, ...restProps }: Props = $props();
</script>

<!-- A tag badge linking to the blog index filtered to it, styled by `blog.tags` in the config. -->
<Badge {variant} href={tagHref(tag)} class="gap-0" {...restProps}>
	<!-- The # is hidden from screen readers, which would read "number sign". Kept on one line
	     with the tag so no space renders between them. -->
	{#if blogConfig.tags.hash}<span aria-hidden="true">#</span>{/if}{tag}
</Badge>
