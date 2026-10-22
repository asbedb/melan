# Configuration

You can change most of your site without touching any components. There are three places to look:

| File              | Controls                                                                                                |
| ----------------- | ------------------------------------------------------------------------------------------------------- |
| `melan.config.ts` | Site title, pages and navbar, navbar icon, accent colour, latest posts, footer, and the blog's settings |
| `vite.config.ts`  | The post layout and the site's base path                                                                |
| Your own files    | The homepage and its hero, the About page and the site layout: ordinary Svelte files in `src/`          |

Fonts and theme colours are set in CSS rather than config. See [Customising the look](customising.md).

## How editing the config works

1. **Open `melan.config.ts` and change a value.** Save, and the dev server restarts and the page updates.
2. **Let your editor help.** The config is TypeScript, so typing inside an object lists the options it accepts, and hovering an option shows what it does.
3. **Switch optional sections off by deleting them.** `homeImage`, `routes`, `accent`, `brand`, `latestPosts`, `footer` and everything in `blog` can be removed. That part of the site then disappears or falls back to a sensible default.
4. **Run `pnpm check`** when you're done. It catches mistakes such as a typo in an option name, a navbar entry pointing at a page that doesn't exist, or an icon file that isn't in `static/`.

Here's the shape of the whole config, as a map of what's where:

```ts
import { defineConfig } from 'melan/config';

export default defineConfig({
	site: {
		title: 'Melan', // browser tabs, share cards, and the navbar when it shows text
		description: 'A reusable Svelte blog template…', // the homepage's meta description
		homeImage: 'img/share.png', // optional: the homepage's share image, from static/
		routes: [
			// the navbar pages, in order
			{ href: '/', label: 'Home', nav: false },
			{ href: '/about', label: 'About' },
			{ href: '/blog', label: 'Blog' }
		],
		accent: { light: 'oklch(0.3994 0.156 210.49)', dark: 'oklch(0.5024 0.3472 217.91)' },
		brand: { display: 'icon', icon: 'icon.svg' }, // the left side of the navbar
		latestPosts: { heading: 'Latest Posts', count: 6 },
		footer: { text: '© {year} {title}', links: [], poweredBy: true }
	},
	blog: {
		locale: 'en-AU', // how dates are written
		path: '/blog' // the blog's URL and folder
		// …and image folders, code highlighting and CodePen embeds
	}
});
```

Each part is explained below.

> **Where's the hero?** The big intro on the homepage isn't part of the config: it's your own component, in `src/lib/components/Hero.svelte`. See [The homepage hero](#the-homepage-hero).

---

## Site: `site`

### `title`, `description` and `homeImage`

```ts
title: 'Melan',
description: 'A reusable Svelte blog template…',
homeImage: 'img/share.png',
```

- **`title`** appears in every browser tab (`Post title · Melan`) and is used as `og:site_name`. It's also the navbar text when [`brand`](#brand-the-navbar-icon-and-title) is set to show text.
- **`description`** is the meta description for the homepage. Posts use their own `description`.
- **`homeImage`** is the homepage's share image (`og:image`), the picture shown when the link is posted on social media or in chat apps. It's a file in `static/`, so `img/share.png` means `static/img/share.png`; 1200×630 suits most sites. Leave it out for no image. Posts use their own `ogimage` or `cover`.

### Pages and the navbar

`routes` lists the site's pages. Here you can rename a page in the navbar, change the navbar order, hide a page from the navbar, or switch a page off entirely.

```ts
routes: [
	{ href: '/', label: 'Home', nav: false },
	{ href: '/about', label: 'About' },
	{ href: '/blog', label: 'Blog' }
],
```

| Option    | Default  | What it does                                                                                                                 |
| --------- | -------- | ---------------------------------------------------------------------------------------------------------------------------- |
| `href`    | required | The page's path. Covers that page **and everything under it**, so `/blog` includes every post. `/` only covers the homepage. |
| `label`   | required | Link text in the navbar. The About page and the blog index also use it as their heading.                                     |
| `enabled` | `true`   | `false` makes the page (and everything under it) return a 404 and hides every link to it.                                    |
| `nav`     | `true`   | `false` keeps the page working but leaves it out of the navbar.                                                              |

The **order of the list is the navbar order**. Leave `routes` out entirely and you get a hidden Home entry and a Blog entry at [`blog.path`](#blog-blog).

#### Common recipes

**Hide a page from the navbar but keep it reachable:**

```ts
{ href: '/about', label: 'About', nav: false }
```

**Switch a page off entirely:**

```ts
{ href: '/about', label: 'About', enabled: false }
```

**Switch the whole blog off.** The index and every post return a 404. The homepage's latest posts, and any hero button pointing at the blog, disappear too.

```ts
{ href: '/blog', label: 'Blog', enabled: false }
```

**Put Blog before About:** move its line above About's in the list.

**Add a new page:** create `src/routes/<name>/+page.svelte` (copying `src/routes/about` is the quickest way), then add it to the list:

```ts
{ href: '/projects', label: 'Projects' }
```

`href` is checked against your real routes. If you mistype it, or delete a page that's still in the config, `pnpm check` and your editor flag it.

> Pages left out of `routes` still work. They just aren't in the navbar and can't be switched off from the config.

### `brand`: the navbar icon and title

What sits on the left of the navbar, linking to the homepage.

```ts
brand: {
	display: 'icon',
	icon: 'icon.svg'
},
```

| Option    | Default      | What it does                                                                                                      |
| --------- | ------------ | ----------------------------------------------------------------------------------------------------------------- |
| `display` | `'icon'`     | `'icon'` for the icon alone, `'icon-title'` for the icon followed by the title, or `'title'` for the title alone. |
| `icon`    |              | A file in `static/`, written without the leading slash: `'icon.svg'` is `static/icon.svg`.                        |
| `tint`    | `true`       | Draws the icon in the text colour, so it switches with light and dark mode. Set `false` for a multi-colour logo.  |
| `title`   | site `title` | The navbar text, if you want it to differ from the site title.                                                    |
| `home`    |              | Overrides for the homepage only, e.g. `{ display: 'icon-title' }`. Anything left out uses the settings above.     |

`icon` is checked against the files in `static/`, so a typo shows up in your editor and in `pnpm check`. Without an icon, the navbar shows the title.

With `tint` on, use a **single-colour** icon (SVG or PNG): only its shape is used, and it's painted in the text colour. When the icon is shown on its own, screen readers announce it by the title.

**Show the title on the homepage and the icon everywhere else:**

```ts
brand: {
	display: 'icon',
	icon: 'icon.svg',
	home: { display: 'title' }
},
```

**Text only, with a different name from the site title:**

```ts
brand: { display: 'title', title: 'Jane’s notes' },
```

Delete `brand` entirely and the navbar shows the site title.

### `accent`: the accent colour

One colour for small details across the site:

- post titles, and the titles on post cards
- link underlines in posts and in the navbar
- the left border on quotes in posts
- the bar beside the current heading in "On this page"
- `#` heading links and footer links when hovered

```ts
accent: {
	light: 'oklch(0.3994 0.156 210.49)',
	dark: 'oklch(0.5024 0.3472 217.91)'
},
```

| Option  | Default  | What it does                                                                                       |
| ------- | -------- | -------------------------------------------------------------------------------------------------- |
| `light` | required | The colour in light mode. Any CSS colour works: `'#2563eb'`, `'rgb(37 99 235)'`, `'oklch(…)'`.     |
| `dark`  | `light`  | The colour in dark mode. A lighter shade than `light` usually reads better on the dark background. |

Delete `accent` and these details use the normal text colour.

> In your own components, the accent is available as the Tailwind colour `ink`: `text-ink`, `border-ink`, `decoration-ink` and so on. It's called `ink` because shadcn-svelte already uses `accent` for hover backgrounds.

### The homepage hero

The large intro at the top of the homepage is an example component that comes with your site, in **`src/lib/components/Hero.svelte`**. It isn't part of the `melan` package, so updating Melan never changes it, and you can edit it, replace it or delete it. The homepage, `src/routes/+page.svelte`, passes it its content:

```svelte
<Hero
	eyebrow="Svelte blog template"
	definition={{
		pronunciation: '/mɛˈlɑn/',
		partOfSpeech: 'noun',
		meaning: 'ink',
		origin: { language: 'Western Armenian', word: 'մելան', lang: 'hy' }
	}}
	summary="A reusable blog template for SvelteKit…"
	actions={[
		{ label: 'Read the blog', href: blogConfig.path },
		{ label: 'SvelteKit docs', href: 'https://svelte.dev/docs/kit', variant: 'outline' }
	]}
	highlights={['SvelteKit', 'Shiki', 'shadcn-svelte', 'mdsvex', 'Tailwind CSS']}
/>
```

| Prop         | Default              | What it does                                                     |
| ------------ | -------------------- | ---------------------------------------------------------------- |
| `heading`    | `site.title`         | The big heading.                                                 |
| `summary`    | `site.description`   | The paragraph under it.                                          |
| `definition` |                      | A one-line, dictionary-style entry under the heading. See below. |
| `eyebrow`    |                      | A small badge under the heading.                                 |
| `actions`    | A button to the blog | Buttons. `href` can be a path or a full URL.                     |
| `highlights` |                      | A "Built with" row of badges. Leave it out to hide the row.      |

The defaults come from your config. The hero imports `siteConfig` and `blogConfig` from `melan`, with every default already filled in, and any of your own components can do the same:

```svelte
<script lang="ts">
	import { blogConfig, getRoute, siteConfig } from 'melan';
</script>

<p>{siteConfig.title} posts live at {blogConfig.path}, under "{getRoute(blogConfig.path)?.label}".</p>
```

Each action takes `variant: 'default'` (filled, with an arrow on internal links) or `variant: 'outline'`. Buttons that link to another website open in a new tab and show a small external-link icon. An action that points at a page switched off in `routes` is hidden automatically.

#### `definition`

Explains the heading the way a dictionary would. In the example it reads:

> /mɛˈlɑn/ · _noun_ · ink · from Western Armenian **մելան**

| Option            | Required | What it does                                                                                                                                                        |
| ----------------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `meaning`         | yes      | What the word means.                                                                                                                                                |
| `pronunciation`   | no       | How to say it, e.g. `'/mɛˈlɑn/'` or `'meh·LAHN'`.                                                                                                                   |
| `partOfSpeech`    | no       | e.g. `'noun'`, shown in italics.                                                                                                                                    |
| `origin.language` | no       | The language the word comes from.                                                                                                                                   |
| `origin.word`     | no       | The word in its own script.                                                                                                                                         |
| `origin.lang`     | no       | The [language code](https://www.w3.org/International/questions/qa-choosing-language-tags) for `origin.word`, e.g. `'hy'` for Armenian. Helps screen readers say it. |

Leave out an optional part and its separator dot goes with it. Leave out `definition` to remove the line.

### `latestPosts`

A grid of the newest posts on the homepage, with a "View all posts" button.

```ts
latestPosts: { heading: 'Latest Posts', count: 6 },
```

- **`heading`**: the section title.
- **`count`**: how many posts to show. `0` hides the section.

Delete the whole `latestPosts` line to remove the section. It's also hidden when the blog is switched off.

### `footer`

The footer at the bottom of every page. It stays at the bottom of the screen even on short pages.

```ts
footer: {
	text: '© {year} {title}',
	links: [],
	poweredBy: true
},
```

| Option      | Default | What it does                                                                                             |
| ----------- | ------- | -------------------------------------------------------------------------------------------------------- |
| `text`      |         | A line of text, e.g. a copyright notice. `{year}` becomes the current year and `{title}` the site title. |
| `links`     | `[]`    | Links shown in the footer, each with a `label` and an `href`.                                            |
| `poweredBy` | `true`  | Shows a small "Powered by Melan" credit. Set to `false` to remove it.                                    |

`href` works like it does for the [hero](#the-homepage-hero)'s actions: it can be a path or a full URL. Full URLs (`https://…`, `mailto:…`) open in a new tab, links to other websites get a small external-link icon, and links to a page switched off in `routes` are hidden.

```ts
footer: {
	text: '© {year} Jane Doe. All rights reserved.',
	links: [
		{ label: 'About', href: '/about' },
		{ label: 'GitHub', href: 'https://github.com/janedoe' },
		{ label: 'Email', href: 'mailto:jane@example.com' }
	],
	poweredBy: true
},
```

Delete the whole `footer` block to remove the footer entirely.

> Keeping the "Powered by Melan" credit is optional, but it's a nice way to support the project. Thank you!

---

## Blog: `blog`

Everything here is optional; these are the defaults.

```ts
blog: {
	locale: 'en-AU',
	path: '/blog',
	assets: {
		covers: '/img/covers',
		images: '/img'
	},
	highlight: {
		themes: { light: 'github-light', dark: 'github-dark' },
		langs: ['ts', 'js', 'svelte', 'html', 'css', 'json', 'bash', 'md', 'yaml']
	},
	codepen: {
		height: 400,
		tabs: 'result'
	}
}
```

| Option             | Default         | What it does                                                                                                           |
| ------------------ | --------------- | ---------------------------------------------------------------------------------------------------------------------- |
| `locale`           | `'en-AU'`       | How dates are written, e.g. `'en-AU'` gives "22 October 2026", `'en-US'` gives "October 22, 2026".                     |
| `path`             | `'/blog'`       | The blog's URL **and** its folder under `src/routes`. See [Renaming the blog](#renaming-the-blog).                     |
| `assets.covers`    | `'/img/covers'` | Folder under `static/` for cover images. See [Image folders](#image-folders).                                          |
| `assets.images`    | `'/img'`        | Folder under `static/` for images inside posts.                                                                        |
| `highlight.themes` |                 | The Shiki themes for light and dark mode. Any [bundled Shiki theme](https://shiki.style/themes) name works.            |
| `highlight.langs`  |                 | Languages to highlight. Other languages are shown as plain text. See [Shiki languages](https://shiki.style/languages). |
| `codepen.height`   | `400`           | Height in pixels of [embedded pens](writing-posts.md#codepen-embeds).                                                  |
| `codepen.tabs`     | `'result'`      | Tabs a pen opens on, e.g. `'result'`, or `'html,result'` to show the HTML beside the result.                           |

### Renaming the blog

The blog's URL comes from its folder in `src/routes`, so moving the blog means renaming the folder **and** updating `path` to match. For example, to serve posts from `/writing`:

1. Rename `src/routes/blog` to `src/routes/writing`.
2. Set `path: '/writing'` in `blog` in `melan.config.ts`.
3. Update the blog's entry in `site.routes` to match. The blog index uses its `label` as its heading:

   ```ts
   { href: '/writing', label: 'Writing' }
   ```

Every link then follows the new path: the navbar, blog index, post cards, tag filters, previous/next links, the homepage's latest posts, and the hero button.

The blog can live deeper too, e.g. `src/routes/notes/blog` with `path: '/notes/blog'`.

> If the folder doesn't match `path` or the `routes` entry, `pnpm check` and your editor report a type error, so a missed step can't reach production unnoticed. Stop the dev server before renaming the folder; Windows won't rename a folder that's in use.

### Image folders

Images live in `static/`, which is served from the site root, so `static/img/covers/hello.jpg` is at `/img/covers/hello.jpg`. Rather than typing the full path in every post, give a **bare filename** and it's looked up in the configured folder:

| You write                                  | With the defaults it becomes  |
| ------------------------------------------ | ----------------------------- |
| `cover: hello.jpg`                         | `/img/covers/hello.jpg`       |
| `ogimage: hello-share.jpg`                 | `/img/covers/hello-share.jpg` |
| `![Diagram](diagram.png)` in the post body | `/img/diagram.png`            |

Paths starting with `/` (`cover: /photos/hello.jpg`), relative paths (`./`, `../`) and full URLs (`https://…`) are always used exactly as written, so you can still point at an image anywhere.

To organise images your own way, change the folders. For example, to keep covers in `static/cover` and post images in `static/media`:

```ts
assets: {
	covers: '/cover',
	images: '/media'
},
```

Or put everything in one folder:

```ts
assets: {
	covers: '/img',
	images: '/img'
},
```

Moving the files is up to you: the config only changes where bare filenames are looked up.

### Code highlighting

For example, to switch to a different theme and add Python and Rust:

```ts
highlight: {
	themes: { light: 'catppuccin-latte', dark: 'catppuccin-mocha' },
	langs: ['ts', 'js', 'svelte', 'html', 'css', 'json', 'bash', 'md', 'yaml', 'python', 'rust']
}
```

---

## Build options: `vite.config.ts`

`vite.config.ts` loads `melan.config.ts` and hands it to Melan twice: `melan(config)` gives the components the config and finds your posts, and `melanPreprocess(config, …)` turns `.md` files into pages.

```ts
melanPreprocess(config, {
	// The site's base path; see "Serving from a sub-path" in getting-started.md
	base,
	// The layout wrapped around every post. Delete this line to use Melan's built-in one.
	layout: 'src/lib/components/PostLayout.svelte'
});
```

`layout` is a path from the project root. See [The post layout](customising.md#the-post-layout). Restart the dev server after changing these options.

---

## Frontmatter

Each post's settings live in the frontmatter at the top of its `.md` file. Every field is listed in [Writing posts](writing-posts.md#frontmatter), and your editor shows them on the `PostFrontmatter` type, which you can import from `melan`.
