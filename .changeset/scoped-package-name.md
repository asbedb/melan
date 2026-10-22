---
'@asbedb/melan': patch
'create-melan': patch
---

The library is now published as `@asbedb/melan`, because npm doesn't allow the name `melan`. New
blogs from `create-melan` depend on it and import from `@asbedb/melan`, `@asbedb/melan/vite` and
so on. `create-melan@0.1.0` pointed at a package that was never published, so use this version
or later.
