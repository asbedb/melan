---
'@asbedb/melan': patch
---

Feature: callouts
Posts can now hold note, tip, important, warning and caution boxes. Open one with `:::note` (or another type) and close it with `:::` on a line of its own; everything between goes inside, including lists and code blocks. A title after the type, e.g. `:::tip Did you know?`, replaces the default one.
