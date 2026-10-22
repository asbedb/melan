# My blog

Built with [Melan](https://github.com/asbedb/melan), a Markdown blog for SvelteKit.

```sh
pnpm install
pnpm dev
```

Then open <http://localhost:5173>.

- **Settings:** `melan.config.ts`
- **Posts:** one folder per post in `src/routes/blog/`, each with a `+page.md`
- **Homepage:** `src/routes/+page.svelte`, with the hero in `src/lib/components/Hero.svelte`
- **Colours and fonts:** `src/routes/layout.css`

## Scripts

| Command        | What it does                                       |
| -------------- | -------------------------------------------------- |
| `pnpm dev`     | Start the dev server (drafts are visible)          |
| `pnpm build`   | Build for production                               |
| `pnpm preview` | Serve the production build locally                 |
| `pnpm check`   | Type-check the project, including the route config |
| `pnpm lint`    | Check formatting and lint                          |
| `pnpm format`  | Format every file with Prettier                    |

To get Melan's latest fixes and features, run `pnpm update @asbedb/melan`.

## Guides

- [Getting started](https://github.com/asbedb/melan/blob/main/docs/getting-started.md)
- [Configuration](https://github.com/asbedb/melan/blob/main/docs/configuration.md)
- [Writing posts](https://github.com/asbedb/melan/blob/main/docs/writing-posts.md)
- [Customising the look](https://github.com/asbedb/melan/blob/main/docs/customising.md)
