---
'@asbedb/melan': patch
---

Feature: initial page loader
Adds an optional `InitialLoader` component that covers the page on the first visit until it has finished loading, then fades out. It shows the site icon (`brand.icon`) with a shimmer, or the same minimal bar as `PageLoader` when no icon is set. It never stays up longer than its `timeout` prop (6000 ms by default) and is skipped for visitors without JavaScript. The template layout includes it; delete `<InitialLoader />` to turn it off.
