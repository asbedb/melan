---
'@asbedb/melan': minor
'create-melan': minor
---

Code blocks are now highlighted with [Twinkleplop](https://twinkleplop.pngwn.at) instead of Shiki.
Highlighting still happens when the site is built, and the output uses classes and a theme
stylesheet instead of inline styles.

**To update:** remove `themes` from `blog.highlight` in `melan.config.ts` (`pnpm check` points at
it). Colours now come from a Twinkleplop theme stylesheet; Melan uses the GitHub theme, and you can
import another in `src/routes/layout.css`. Languages beyond the default nine need their package,
e.g. `pnpm add -D @twinkleplop/python`. See "Code highlighting" in the configuration guide.
