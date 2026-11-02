---
'@asbedb/melan': patch
---

Feature: image sizes outside posts
Images in `static/` used by Melan's components, such as post card covers, post covers and the site icon, now get their width and height at build time, so the page saves their space instead of jumping as they load. The icon no longer starts out zero-width.

For your own components, import `imageDimensions` from `@asbedb/melan` and spread it onto the image: `<img {src} {alt} {...imageDimensions(src)} />`. It accepts root paths, paths under the base path and relative ones from `asset()`, and gives nothing for URLs or images it can't read.
