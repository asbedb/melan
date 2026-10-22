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
- **Config, not code.** The site title, pages and navbar, navbar icon, accent colour, homepage hero and footer live in `src/lib/site/config.ts`. The blog's URL and folder, the image folders and code highlighting live in `src/lib/blog/config.ts`. See [Configuration](docs/configuration.md).
- **Optional footer.** A copyright line, links and a "Powered by Melan" credit, all set from the config.
- **SEO basics.** Each post gets a page title, description, Open Graph tags and a canonical URL. Drafts are marked `noindex`.
- **Navbar icon.** Show an icon, the icon and title, or just the title, with a different choice for the homepage if you like. The icon follows light and dark mode.
- **Accent colour.** One config option colours post titles, link underlines, quote borders and the contents bar.
- **Theming.** Playfair Display headings and Source Serif 4 body text. Colours, fonts and the corner radius are CSS variables in the shadcn-svelte style, and a ready-to-edit custom theme block lets you replace the light and dark colours entirely.

## Quick start

You need [Node.js](https://nodejs.org) and [pnpm](https://pnpm.io).

```sh
pnpm install
pnpm dev
```

Then open <http://localhost:5173>.

To deploy, push your copy to GitHub and import it on Vercel, Netlify or Cloudflare Pages with `pnpm build` as the build command. There's nothing else to configure. For other hosts, see [Build and deploy](docs/getting-started.md#6-build-and-deploy).

## Documentation

| Guide                                       | What it covers                                                 |
| ------------------------------------------- | -------------------------------------------------------------- |
| [Getting started](docs/getting-started.md)  | Installing, running, the first things to change, and deploying |
| [Configuration](docs/configuration.md)      | How to edit the config, and every option in it                 |
| [Writing posts](docs/writing-posts.md)      | Frontmatter, headings, images, code blocks and drafts          |
| [Customising the look](docs/customising.md) | Pages, colours, fonts, text size and components                |

## Where things live

```
src/
├── lib/
│   ├── site/config.ts        ← site title, pages, navbar icon, accent, hero and footer
│   ├── blog/config.ts        ← blog URL, image folders, date locale and code highlighting
│   ├── blog/types.ts         ← every frontmatter field a post accepts
│   ├── styles/blog.css       ← how post content is styled
│   └── components/           ← blog, site, theme and shadcn-svelte ui components
├── routes/
│   ├── +page.svelte          ← homepage
│   ├── about/+page.svelte    ← an example custom page
│   ├── blog/                 ← the blog index and one folder per post
│   └── layout.css            ← theme colours (and your custom theme), fonts and radius
static/                       ← images and other files served as-is
├── icon.svg                  ← the navbar icon (set in site/config.ts)
└── img/covers/               ← cover images (folders set in blog/config.ts)
```

## Scripts

| Command        | What it does                                       |
| -------------- | -------------------------------------------------- |
| `pnpm dev`     | Start the dev server (drafts are visible)          |
| `pnpm build`   | Build for production                               |
| `pnpm preview` | Serve the production build locally                 |
| `pnpm check`   | Type-check the project, including the route config |
| `pnpm lint`    | Check formatting and lint                          |
| `pnpm format`  | Format every file with Prettier                    |

## Built with

[SvelteKit](https://svelte.dev/docs/kit) · [mdsvex](https://mdsvex.pngwn.io) · [Shiki](https://shiki.style) · [KaTeX](https://katex.org) · [shadcn-svelte](https://shadcn-svelte.com) · [Tailwind CSS](https://tailwindcss.com)

## Contributing

Contributions are welcome. See [CONTRIBUTING.md](CONTRIBUTING.md) for setup, conventions and the checks to run before opening a pull request.

## Licence

Melan is free software, licensed under the [GNU General Public License v3.0 or later](LICENSE).
