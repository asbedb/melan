# Melan

A reusable blog template for SvelteKit. You write posts in Markdown and get Shiki syntax highlighting, a table of contents, and links to the previous and next posts. It's built on accessible shadcn-svelte components, with light and dark mode.

## Features

- **Markdown posts.** Add a `+page.md` file under `src/routes/blog` and it's published. Frontmatter sets the title, date, cover, tags and more.
- **Syntax highlighting.** Shiki highlights code blocks for both light and dark mode, and each block has a copy button.
- **Maths.** Write TeX between `$` or `$$` and KaTeX renders it when the site is built, with no JavaScript needed to read it.
- **CodePen embeds.** Paste a pen's link on a line of its own and it becomes an embed that follows light and dark mode.
- **"On this page" contents.** A sticky sidebar lists the post's headings and highlights the section you're reading. On phones it folds into a menu.
- **Previous / next links.** These appear at the bottom of every post.
- **Blog index.** Posts are listed newest first, and readers can filter them by tag. Reading time is worked out automatically.
- **Shareable headings.** Every heading in a post has a `#` link that scrolls smoothly to it and puts the section's address in the address bar.
- **Clear external links.** Links to other websites open in a new tab and get a small icon.
- **Config, not code.** The site title, pages and navbar, navbar icon, accent colour, footer, blog URL, image folders and code highlighting all live in `melan.config.ts`. See [Configuration](docs/configuration.md).
- **Updates without merges.** The components and Markdown pipeline come from the `melan` package, so `pnpm update melan` brings fixes and features while your posts, pages and layouts stay yours.
- **Optional footer.** A copyright line, links and a "Powered by Melan" credit, all set from the config.
- **SEO basics.** Each post gets a page title, description, Open Graph tags and a canonical URL. Drafts are marked `noindex`.
- **Navbar icon.** Show an icon, the icon and title, or just the title, with a different choice for the homepage if you like. The icon follows light and dark mode.
- **Accent colour.** One config option colours post titles, link underlines, quote borders and the contents bar.
- **Theming.** Playfair Display headings and Source Serif 4 body text. Colours, fonts and the corner radius are CSS variables in the shadcn-svelte style, and a ready-to-edit custom theme block lets you replace the light and dark colours entirely.

## Quick start

You need [Node.js](https://nodejs.org). The docs use [pnpm](https://pnpm.io), but npm, yarn and bun work too.

```sh
pnpm create melan my-blog
cd my-blog
pnpm install
pnpm dev
```

Then open <http://localhost:5173> and edit `melan.config.ts`.

To deploy, push your project to GitHub and import it on Vercel, Netlify or Cloudflare Pages with `pnpm build` as the build command. There's nothing else to configure. For other hosts, see [Build and deploy](docs/getting-started.md#6-build-and-deploy).

## Documentation

| Guide                                       | What it covers                                                 |
| ------------------------------------------- | -------------------------------------------------------------- |
| [Getting started](docs/getting-started.md)  | Installing, running, the first things to change, and deploying |
| [Configuration](docs/configuration.md)      | How to edit the config, and every option in it                 |
| [Writing posts](docs/writing-posts.md)      | Frontmatter, headings, images, code blocks and drafts          |
| [Customising the look](docs/customising.md) | Pages, colours, fonts, text size and components                |

## Where things live in your blog

```
melan.config.ts               ← site title, pages, navbar, accent, footer, blog URL, images, code
vite.config.ts                ← the post layout and base path
src/
├── lib/components/
│   ├── Hero.svelte           ← the homepage hero: yours to edit or delete
│   └── PostLayout.svelte     ← the layout around every post
├── routes/
│   ├── +layout.svelte        ← navbar, page and footer: rearrange as you like
│   ├── +page.svelte          ← homepage
│   ├── about/+page.svelte    ← an example custom page
│   ├── blog/                 ← the blog index and one folder per post
│   └── layout.css            ← your colours, fonts and other overrides
static/                       ← images and other files served as-is
├── icon.svg                  ← the navbar icon
└── img/covers/               ← cover images
```

Everything else (the navbar, footer, post cards, contents list, Markdown pipeline and base styles) comes from the [`melan`](packages/melan) package.

## Scripts

| Command        | What it does                                       |
| -------------- | -------------------------------------------------- |
| `pnpm dev`     | Start the dev server (drafts are visible)          |
| `pnpm build`   | Build for production                               |
| `pnpm preview` | Serve the production build locally                 |
| `pnpm check`   | Type-check the project, including the route config |
| `pnpm lint`    | Check formatting and lint                          |
| `pnpm format`  | Format every file with Prettier                    |

## This repository

| Folder                                           | What it is                                                        |
| ------------------------------------------------ | ----------------------------------------------------------------- |
| [`packages/melan`](packages/melan)               | The `melan` npm package: components, Markdown pipeline and styles |
| [`packages/create-melan`](packages/create-melan) | `pnpm create melan`, which copies the template into a new folder  |
| [`template`](template)                           | The starter blog, and the demo site Melan is developed against    |
| [`docs`](docs)                                   | The guides linked above                                           |

## Built with

[SvelteKit](https://svelte.dev/docs/kit) · [mdsvex](https://mdsvex.pngwn.io) · [Shiki](https://shiki.style) · [KaTeX](https://katex.org) · [shadcn-svelte](https://shadcn-svelte.com) · [Tailwind CSS](https://tailwindcss.com)

## Contributing

Contributions are welcome. See [CONTRIBUTING.md](CONTRIBUTING.md) for setup, conventions and the checks to run before opening a pull request.

## Licence

Melan is free software, licensed under the [GNU General Public License v3.0 or later](LICENSE).
