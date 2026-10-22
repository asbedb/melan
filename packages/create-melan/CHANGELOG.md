# create-melan

## 0.1.1

### Patch Changes

- cac40b0: The library is now published as `@asbedb/melan`, because npm doesn't allow the name `melan`. New
  blogs from `create-melan` depend on it and import from `@asbedb/melan`, `@asbedb/melan/vite` and
  so on. `create-melan@0.1.0` pointed at a package that was never published, so use this version
  or later.

## 0.1.0

### Minor Changes

- ede4f19: First release. `melan` holds the blog's components, Markdown pipeline and styles, set up from
  `melan.config.ts`; `pnpm create melan` starts a new blog from the template.
