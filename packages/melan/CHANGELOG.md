# melan

## 0.2.2

### Patch Changes

- 2a65647: Feature: tag styling
  Adds `blog.tags` to the config. `tags.variant` picks how tags look on post cards and post headers (`'secondary'`, `'outline'`, `'default'`, `'ghost'` or `'link'`), and `tags.hash` shows them as `#tag`. The defaults keep the current look. Tags are drawn by a new `Tag` component, also exported for custom layouts.
- d878805: Feature: callouts
  Posts can now hold note, tip, important, warning and caution boxes. Open one with `:::note` (or another type) and close it with `:::` on a line of its own; everything between goes inside, including lists and code blocks. A title after the type, e.g. `:::tip Did you know?`, replaces the default one.
- a518920: Feature: initial page loader
  Adds an optional `InitialLoader` component that covers the page on the first visit until it has finished loading, then fades out. It shows the site icon (`brand.icon`) with a shimmer, or the same minimal bar as `PageLoader` when no icon is set. It never stays up longer than its `timeout` prop (6000 ms by default) and is skipped for visitors without JavaScript. The template layout includes it; delete `<InitialLoader />` to turn it off.
- c05143d: Fix: images no longer pop in
  Images in posts that live in `static/` now get their width and height at build time, so the page saves their space instead of jumping as they load. Images still loading shimmer in that space and fade in once they arrive, and post images load lazily. Covers show a muted fill until they load.
  
  If you've customised `src/lib/components/PostLayout.svelte`, import `imageSkeletons` from `@asbedb/melan` and add `{@attach imageSkeletons}` after `{@attach captionEmbeds}` to get the shimmer.

## 0.2.1

### Patch Changes

- 850cc7f: Feature: YouTube Embeds
  This change introduces YouTube embeds similar to the CodePen functionality. A user can now leave a YouTube link on a single line in a markdown file and it will embed it into the post. The width and height of embeds can be edited from the melan config file.

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
