---
'@asbedb/melan': patch
---

Feature: tag styling
Adds `blog.tags` to the config. `tags.variant` picks how tags look on post cards and post headers (`'secondary'`, `'outline'`, `'default'`, `'ghost'` or `'link'`), and `tags.hash` shows them as `#tag`. The defaults keep the current look. Tags are drawn by a new `Tag` component, also exported for custom layouts.
