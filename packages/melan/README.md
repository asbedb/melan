# melan

The engine behind [Melan](https://github.com/asbedb/melan), a Markdown blog for SvelteKit: the components, the Markdown pipeline (Shiki highlighting, KaTeX maths, CodePen embeds, heading links and reading time) and the base styles, all set up from one `melan.config.ts`.

## Start a new blog

The easiest way to use this package is through the template, which sets everything below up for you:

```sh
pnpm create melan my-blog
```

See the [getting started guide](https://github.com/asbedb/melan/blob/main/docs/getting-started.md).

## What's in the package

| Import             | What it gives you                                                                               |
| ------------------ | ----------------------------------------------------------------------------------------------- |
| `melan`            | Components (`Navbar`, `Footer`, `PostHeader`, `TableOfContents`…), the config, and post helpers |
| `melan/ui`         | The shadcn-svelte `Badge`, `Button` and `Separator`, and `cn`                                   |
| `melan/config`     | `defineConfig` and the config types, for `melan.config.ts`                                      |
| `melan/vite`       | `melan()`, the Vite plugin, and `melanPreprocess()`, the Markdown preprocessor                  |
| `melan/hooks`      | `reroute`, which turns routes switched off in the config into 404s                              |
| `melan/styles.css` | Fonts, theme colours and post styles, for after `@import 'tailwindcss'`                         |
| `melan/katex.css`  | KaTeX's styles, for a custom post layout                                                        |

## Updating

```sh
pnpm update melan
```

Your posts, pages, config and layouts live in your own project, so updates never overwrite them. Breaking changes only come with a major version, and the [changelog](https://github.com/asbedb/melan/blob/main/packages/melan/CHANGELOG.md) says what to change.

## Licence

[GPL-3.0-or-later](https://github.com/asbedb/melan/blob/main/LICENSE)
