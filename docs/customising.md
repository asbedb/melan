# Customising the look

Start with [Configuration](configuration.md): the site text, pages and navbar, navbar icon, accent colour, blog URL, image folders and code highlighting don't need any code changes. This guide covers the next layer: pages, colours, fonts, layouts and components.

## Adding a page

Any `+page.svelte` under `src/routes` is a page. The quickest start is to copy the example:

1. Copy `src/routes/about` to `src/routes/projects`.
2. Edit `src/routes/projects/+page.svelte`.
3. Add it to the navbar in `melan.config.ts`:

   ```ts
   routes: [
   	{ href: '/', label: 'Home', nav: false },
   	{ href: '/about', label: 'About' },
   	{ href: '/projects', label: 'Projects' },
   	{ href: '/blog', label: 'Blog' }
   ],
   ```

To hide or switch off a page later, see [Pages and the navbar](configuration.md#pages-and-the-navbar).

You can also write a page in Markdown by naming it `+page.md`. It gets the blog post layout.

## Colours

Colours come from CSS variables. Melan sets the defaults, and you override them in **`src/routes/layout.css`**. There are three ways to change them, from smallest to largest:

1. **Just the accent** (post titles, link underlines, the contents bar and other small details): set [`site.accent`](configuration.md#accent-the-accent-colour) in `melan.config.ts`. No CSS needed.
2. **A few colours:** override only those variables in the custom theme block (below).
3. **A whole new theme:** override every variable in the custom theme block, for light and dark mode.

Everything on the site uses these variables, including post text, so a custom theme reaches every page.

### The custom theme block

In `layout.css`, after the line that imports Melan's styles, there's a commented-out **Custom theme** section with a `:root` block (light mode) and a `.dark` block (dark mode). It comes after Melan's defaults, so anything you set there wins, and anything you leave out keeps Melan's colour. Delete a line to go back to the default.

To use it:

1. Find `Custom theme` in `src/routes/layout.css`.
2. Delete the two lines that say `Delete this line to switch the custom theme on`, one above `:root` and one below the `.dark` block.
3. Save. The example is a warm "paper and ink" theme; change the values to your own.

You can delete any line you don't want to change. For example, to change only the page background:

```css
:root {
	--background: oklch(0.98 0.01 85);
}

.dark {
	--background: oklch(0.18 0.02 260);
}
```

Any CSS colour works: `oklch()`, hex (`#faf7f0`), `rgb()` or `hsl()`. `oklch()` is the easiest to tweak by hand. Its three numbers are lightness (0 to 1), colourfulness (0 for grey, about 0.2 for vivid) and hue (0 to 360).

### What each variable colours

| Variable                                 | Used for                                                                                                          |
| ---------------------------------------- | ----------------------------------------------------------------------------------------------------------------- |
| `--background` / `--foreground`          | Page background and main text, including post text and headings                                                   |
| `--card` / `--card-foreground`           | Post cards and the About page's feature cards                                                                     |
| `--popover` / `--popover-foreground`     | The mobile menu and other pop-up panels                                                                           |
| `--primary` / `--primary-foreground`     | Filled buttons, active tags, link text in posts                                                                   |
| `--secondary` / `--secondary-foreground` | Tag badges                                                                                                        |
| `--muted` / `--muted-foreground`         | Subtle backgrounds (inline code, hovered menu items) and secondary text such as dates, summaries and list bullets |
| `--accent` / `--accent-foreground`       | Hover backgrounds on menus and outline buttons                                                                    |
| `--destructive`                          | The "Draft" badge and error states                                                                                |
| `--border` / `--input`                   | Borders, dividers, table lines, and form field borders                                                            |
| `--ring`                                 | The focus outline around links and buttons                                                                        |
| `--ink`                                  | The accent colour. Set here, it overrides `site.accent` in `melan.config.ts`                                      |
| `--radius`                               | Corner roundness (see below); light mode block only                                                               |

The `--chart-*` and `--sidebar-*` variables are only used by shadcn-svelte components Melan doesn't include, so you can ignore them.

> Check that text stays readable: `--foreground` on `--background`, `--muted-foreground` on `--background` and `--primary-foreground` on `--primary` all need good contrast, in both modes. Try a few pages with the light/dark toggle in the navbar.

### Ready-made palettes

Pick one on the [shadcn-svelte themes page](https://shadcn-svelte.com/themes), copy its CSS and paste the `:root` and `.dark` blocks into the custom theme section. The variable names match.

## Corner radius

`--radius` in the custom theme's `:root` sets how round cards, buttons and images are. `0rem` gives square corners, `1rem` very round ones.

## Fonts

Melan uses two fonts, both loaded from [Fontsource](https://fontsource.org):

| Font                                                              | Used for                                    | Variable         |
| ----------------------------------------------------------------- | ------------------------------------------- | ---------------- |
| [Playfair Display](https://fontsource.org/fonts/playfair-display) | Headings, the hero title, post titles       | `--font-heading` |
| [Source Serif 4](https://fontsource.org/fonts/source-serif-4)     | Everything else: body text, navbar, buttons | `--font-serif`   |

Every `h1`–`h6` uses the heading font, in semibold. Use the `font-heading` class to put it on anything else.

### Swapping a font

For example, to use [Lora](https://fontsource.org/fonts/lora) for body text:

1. Install it:

   ```sh
   pnpm add -D @fontsource-variable/lora
   ```

2. Import it in `src/routes/layout.css`, straight after the `@asbedb/melan/styles.css` line:

   ```css
   @import '@fontsource-variable/lora';
   @import '@fontsource-variable/lora/wght-italic.css';
   ```

3. Point the variable at it, anywhere below:

   ```css
   @theme inline {
   	--font-serif: 'Lora Variable', Georgia, serif;
   }
   ```

The heading font works the same way with `--font-heading`. Each font's Fontsource page shows the exact package name, the files to import and the `font-family` name to use. Melan's own fonts are only downloaded by browsers when something uses them, so a replaced font costs your readers nothing.

> Prefer a **variable** font (`@fontsource-variable/…`) where one exists: one file covers every weight. If you pick a font that only comes in one weight, add `@layer base { h1, h2, h3, h4, h5, h6 { @apply font-normal; } }` to `layout.css`, or the browser fakes a bold version that looks smudgy.

**Sans-serif instead?** Load a sans font (e.g. `@fontsource-variable/inter`), set `--font-sans: 'Inter Variable', sans-serif;` in the `@theme inline` block, and add `@layer base { html { @apply font-sans; } }`.

## Post text size and style

Post content is styled by Melan with the Tailwind Typography plugin, on the `blog-prose` class. Add your own rules for that class in `src/routes/layout.css` and they win over Melan's. To make the text bigger:

```css
.blog-prose {
	@apply prose-lg;
}
```

The sizes are `prose-sm`, `prose-base` (default), `prose-lg`, `prose-xl` and `prose-2xl`. Each scales the text, headings and spacing together. `md:prose-lg` uses the larger size only on wider screens.

Some other changes that work the same way:

- **`@apply font-normal;`** for regular-weight post text. Melan uses `font-[450]`, slightly heavier, for easier reading.
- **`@apply prose-h2:mt-10;`** and the other `prose-h…` modifiers change the space around headings.
- **`--tw-prose-bullets: var(--color-ink);`** colours the list bullets with the accent. Each `--tw-prose-…` variable colours one part of posts, and Melan maps them all to the theme variables.
- **`@apply prose-pre:text-base;`** sets the code block text size, separately from the body text.

Melan's full post styles are in `node_modules/@asbedb/melan/dist/styles/blog.css` if you want to see what's there. See the [Tailwind Typography docs](https://github.com/tailwindlabs/tailwindcss-typography) for every modifier.

## Layout and components

Your site is split in two. The pieces most people never need to change, such as the navbar, footer, post cards, contents list and the Markdown pipeline, come from the `@asbedb/melan` package, so they get fixes and new features when you update it. How those pieces are arranged lives in your own files:

| To change                   | Edit                                   |
| --------------------------- | -------------------------------------- |
| What goes around every page | `src/routes/+layout.svelte`            |
| The layout of a blog post   | `src/lib/components/PostLayout.svelte` |
| The homepage                | `src/routes/+page.svelte`              |
| The homepage hero           | `src/lib/components/Hero.svelte`       |
| The About page              | `src/routes/about/+page.svelte`        |
| The 404 and error page      | `src/routes/+error.svelte`             |
| The blog index              | `src/routes/blog/+page.svelte`         |

### The site layout

`src/routes/+layout.svelte` puts the navbar at the top, the page in the middle and the footer at the bottom. Move them, wrap them, or add your own banner or sidebar; the components are imported from `@asbedb/melan`:

```svelte
<script lang="ts">
	import { Footer, Navbar, PageLoader, SiteHead, siteConfig } from '@asbedb/melan';
</script>
```

### The post layout

Every post is wrapped in `src/lib/components/PostLayout.svelte`, set as `layout` in `vite.config.ts`. It looks the same as Melan's built-in layout, but it's yours: move the "On this page" contents, drop the cover image, or add a newsletter box under every post. It's built from these pieces, all imported from `@asbedb/melan`:

| Piece             | What it shows                                            |
| ----------------- | -------------------------------------------------------- |
| `PostHead`        | The page title, description and share tags (not visible) |
| `PostHeader`      | The title, summary, date, reading time and tags          |
| `PostCover`       | The cover image                                          |
| `TableOfContents` | The "On this page" contents                              |
| `PostNav`         | The previous and next post links                         |

The `copyButtons`, `codePenEmbeds`, `youtubeEmbeds`, `captionEmbeds` and `headingLinks` attachments on the post body add the code copy buttons, CodePen and YouTube embeds, image captions and smooth-scrolling heading links. Keep them if you rearrange things. To go back to Melan's layout, delete the `layout` line in `vite.config.ts`.

### Changing a Melan component

For anything CSS can't reach, copy the component into your own project and use your copy instead. For example, to change the navbar:

1. Copy `Navbar.svelte` from [Melan's source](https://github.com/asbedb/melan/tree/main/packages/melan/src/lib/components/site) into `src/lib/components/`.
2. Change its imports from relative paths to `@asbedb/melan` and `@asbedb/melan/ui`.
3. In `src/routes/+layout.svelte`, import your `Navbar` from `#lib/components/Navbar.svelte` instead of from `@asbedb/melan`.

Your copy won't get Melan's updates any more, so only copy what you need to change.

Pages are centred with `max-w-6xl` (72rem). Change it in each page's outer element for a wider or narrower site.

## Adding shadcn-svelte components

Melan's own pages use a few [shadcn-svelte](https://shadcn-svelte.com/docs/components) components, which you can use too:

```svelte
<script lang="ts">
	import { Badge, Button, Separator } from '@asbedb/melan/ui';
</script>
```

To add another, e.g. a card:

```sh
pnpm dlx shadcn-svelte@latest add card
```

It's copied into `src/lib/components/ui/`, so you can edit it freely. Then import it where you need it:

```svelte
<script lang="ts">
	import * as Card from '#lib/components/ui/card/index.ts';
</script>
```

## Icons

- **Navbar icon:** replace `static/icon.svg`, or point [`brand.icon`](configuration.md#brand-the-navbar-icon-and-title) at another file in `static/`.
- **Favicon** (the browser tab icon): replace `src/lib/assets/favicon.svg`.
