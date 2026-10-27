---
'@asbedb/melan': patch
---

Fix: images no longer pop in
Images in posts that live in `static/` now get their width and height at build time, so the page saves their space instead of jumping as they load. Images still loading shimmer in that space and fade in once they arrive, and post images load lazily. Covers show a muted fill until they load.

If you've customised `src/lib/components/PostLayout.svelte`, import `imageSkeletons` from `@asbedb/melan` and add `{@attach imageSkeletons}` after `{@attach captionEmbeds}` to get the shimmer.
