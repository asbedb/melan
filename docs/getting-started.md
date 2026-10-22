# Getting started

This guide takes you from nothing to a site that's running and has your own name on it.

## 1. Create your blog

You need [Node.js](https://nodejs.org) (a current LTS release). These guides use [pnpm](https://pnpm.io), but npm, yarn and bun work too.

```sh
pnpm create melan my-blog
cd my-blog
pnpm install
```

`my-blog` is the folder to create. You get a small SvelteKit project: your config, your posts and pages, and the `@asbedb/melan` package, which holds the components and the Markdown pipeline.

## 2. Run the dev server

```sh
pnpm dev
```

Open <http://localhost:5173>. The page reloads as you save files. In dev mode, posts marked as drafts are shown with a red "Draft" badge.

## 3. Make it yours

Most of the site is set from one file: **`melan.config.ts`**. Open it and change these first:

```ts
export default defineConfig({
	site: {
		title: 'My Blog', // browser tab, share cards
		description: 'Notes on things I build.', // default search/share description
		routes: [
			{ href: '/', label: 'Home', nav: false },
			{ href: '/about', label: 'About' },
			{ href: '/blog', label: 'Blog' }
		],
		accent: { light: '#2563eb', dark: '#60a5fa' }, // titles, link underlines and other details
		brand: { display: 'icon-title', icon: 'icon.svg' }, // left side of the navbar
		latestPosts: { heading: 'Latest Posts', count: 6 },
		footer: { text: '© {year} {title}', poweredBy: true }
	},
	blog: {
		locale: 'en-AU' // how dates are written
	}
});
```

Save the file and the site updates. Your editor lists the options as you type and explains each one on hover, and anything optional can be deleted to switch it off. [Configuration](configuration.md) explains every option.

Then:

- **Add your icon.** Replace `static/icon.svg` with your own single-colour icon. It's drawn in the text colour, so it works in light and dark mode. To show your name instead, set `brand: { display: 'title' }`. See [`brand`](configuration.md#brand-the-navbar-icon-and-title).
- **Rewrite the homepage hero.** Its text is in `src/routes/+page.svelte`, and the component itself is `src/lib/components/Hero.svelte`. The dictionary line explains the name "Melan"; change `definition` or delete it. See [The homepage hero](configuration.md#the-homepage-hero).
- **Set the date format.** Change `blog.locale`, e.g. `'en-US'` or `'de-DE'`.
- **Choose your blog URL and image folders (optional).** The blog lives at `/blog`, covers in `static/img/covers/` and post images in `static/img/`. All three can be changed in `blog`. See [Renaming the blog](configuration.md#renaming-the-blog) and [Image folders](configuration.md#image-folders).
- **Edit the About page.** It's in `src/routes/about/+page.svelte`. You can also switch it off: see [Pages and the navbar](configuration.md#pages-and-the-navbar).
- **Replace the sample posts.** They're the folders in `src/routes/blog/`.

## 4. Write your first post

Create a folder under `src/routes/blog/`. The folder name becomes the URL:

```
src/routes/blog/hello-world/+page.md   →   /blog/hello-world
```

```md
---
title: Hello, world
date: 2026-10-22
description: The first post on my new blog.
tags:
  - Notes
---

This is my first post.

## A heading

Headings show up in the "On this page" contents.
```

The post appears on the blog index and in the homepage's latest posts straight away. See [Writing posts](writing-posts.md) for every frontmatter field, plus images, code blocks and drafts.

For images, put covers in `static/img/covers/` and other images in `static/img/`, then refer to them by filename: `cover: hello.jpg` in the frontmatter, `![Alt text](diagram.png)` in the post.

## 5. Check your work

```sh
pnpm check   # type errors, including routes in the config that don't exist
pnpm lint    # formatting and lint
```

## 6. Build and deploy

```sh
pnpm build
pnpm preview   # try the production build locally
```

Melan uses [`@sveltejs/adapter-auto`](https://svelte.dev/docs/kit/adapter-auto), which works out where it's being built and sets the site up for that host. On these hosts there's nothing to configure:

- [Vercel](https://vercel.com)
- [Netlify](https://www.netlify.com)
- [Cloudflare Pages](https://pages.cloudflare.com)
- [Azure Static Web Apps](https://azure.microsoft.com/products/app-service/static)
- AWS via [SST](https://sst.dev)
- [Google Cloud Run](https://cloud.google.com/run)

Push your project to GitHub (or GitLab, or Bitbucket), import the repository on your host, and use these settings if it asks:

| Setting         | Value                                                                                                       |
| --------------- | ----------------------------------------------------------------------------------------------------------- |
| Build command   | `pnpm build`                                                                                                |
| Node.js version | A current LTS release, e.g. `24`. Most hosts take a `NODE_VERSION` environment variable or a `.nvmrc` file. |

The host detects pnpm from `pnpm-lock.yaml`, and the adapter tells it where the built files are, so you don't need to set an output folder.

> Running `pnpm build` on your own computer prints a warning that no supported environment was detected. That's expected: the build still works for `pnpm preview`, and the adapter does its job when the host builds the site.

### Using a specific adapter

On each build, adapter-auto installs the adapter for the host it detects. Once you've settled on a host, you can install that adapter yourself instead. Builds get a little faster, and you can pass the host's own options. You also need a specific adapter for hosts adapter-auto doesn't detect:

| Host                                                           | Adapter                        |
| -------------------------------------------------------------- | ------------------------------ |
| Vercel                                                         | `@sveltejs/adapter-vercel`     |
| Netlify                                                        | `@sveltejs/adapter-netlify`    |
| Cloudflare                                                     | `@sveltejs/adapter-cloudflare` |
| Your own server, Docker, or any host that runs Node.js         | `@sveltejs/adapter-node`       |
| Static hosting with no server (GitHub Pages, S3, any web host) | `@sveltejs/adapter-static`     |

To switch, install the adapter (Netlify as the example):

```sh
pnpm add -D @sveltejs/adapter-netlify
pnpm remove @sveltejs/adapter-auto
```

Then change the import at the top of `vite.config.ts`. The `adapter: adapter()` line stays as it is:

```ts
import adapter from '@sveltejs/adapter-netlify';
```

See the [SvelteKit adapter docs](https://svelte.dev/docs/kit/adapters) for each adapter's options.

> **Static hosting** also needs every page built ahead of time. Add a `src/routes/+layout.ts` file containing `export const prerender = true;`, and pass `adapter({ fallback: '404.html' })` so unknown addresses get the site's 404 page. For GitHub Pages, also add an empty `static/.nojekyll` file, and set `BASE_PATH` (below) if the site lives under a sub-path.

### Serving from a sub-path

If the site lives under a path rather than at the root of a domain, e.g. `username.github.io/my-blog`, build with that path as `BASE_PATH`:

```sh
BASE_PATH=/my-blog pnpm build
```

Links, the navbar icon, and images in posts (covers and inline images) all get the path added. Leave `BASE_PATH` unset for a site at the root of its domain. On Windows PowerShell, use `$env:BASE_PATH = '/my-blog'; pnpm build`.

## Next steps

- [Configuration](configuration.md): every config option
- [Writing posts](writing-posts.md): frontmatter, contents, images and code
- [Customising the look](customising.md): pages, colours, fonts, layouts and components

## Updating Melan

The components, Markdown pipeline and styles come from the `@asbedb/melan` package, so fixes and new features arrive with an update:

```sh
pnpm update @asbedb/melan
```

Your posts, pages, config and layouts are your own files, so an update never overwrites them. Check [the changelog](https://github.com/asbedb/melan/blob/main/packages/melan/CHANGELOG.md) before a major version (e.g. 1.x to 2.x): it lists anything you need to change, and `pnpm check` points at config options that have moved.
