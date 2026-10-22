# create-melan

## 0.2.0

### Minor Changes

- a26bd73: Code blocks are now highlighted with [Twinkleplop](https://twinkleplop.pngwn.at) instead of Shiki.
  Highlighting still happens when the site is built, and the output uses classes and a theme
  stylesheet instead of inline styles.
  
  **To update:** remove `themes` from `blog.highlight` in `melan.config.ts` (`pnpm check` points at
  it). Colours now come from a Twinkleplop theme stylesheet; Melan uses the GitHub theme, and you can
  import another in `src/routes/layout.css`. Languages beyond the default nine need their package,
  e.g. `pnpm add -D @twinkleplop/python`. See "Code highlighting" in the configuration guide.

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
