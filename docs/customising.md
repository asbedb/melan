# Customising the look

Start with [Configuration](configuration.md): the site text, pages and navbar, navbar icon, accent colour, blog URL, image folders and code highlighting don't need any code changes. This guide covers the next layer: pages, colours, fonts and components.

## Adding a page

Any `+page.svelte` under `src/routes` is a page. The quickest start is to copy the example:

1. Copy `src/routes/about` to `src/routes/projects`.
2. Edit `src/routes/projects/+page.svelte`.
3. Add it to the navbar in `src/lib/site/config.ts`:

   ```ts
   routes: [
   	{ href: '/', label: 'Home', nav: false },
   	{ href: '/about', label: 'About' },
   	{ href: '/projects', label: 'Projects' },
   	{ href: blogConfig.path, label: 'Blog' }
   ],
   ```

To hide or switch off a page later, see [Pages and the navbar](configuration.md#pages-and-the-navbar).

You can also write a page in Markdown by naming it `+page.md`. It gets the blog post layout.

## Colours

Colours come from CSS variables in **`src/routes/layout.css`**. There are three ways to change them, from smallest to largest:

1. **Just the accent** (post titles, link underlines, the contents bar and other small details): set [`accent`](configuration.md#accent-the-accent-colour) in the site config. No CSS needed.
2. **A few colours:** override only those variables in the custom theme block (below).
3. **A whole new theme:** override every variable in the custom theme block, for light and dark mode.

Everything on the site uses these variables, including post text, so a custom theme reaches every page.

### The custom theme block

Below the default colours in `layout.css` there's a commented-out **Custom theme** section with a `:root` block (light mode) and a `.dark` block (dark mode). It comes after the defaults, so anything you set there wins, and anything you leave out keeps its default. Keep your colours there and the defaults above stay untouched, so you can always compare or go back.

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
| `--ink`                                  | The accent colour. Set here, it overrides `accent` in the site config                                             |
| `--radius`                               | Corner roundness (see below); light mode block only                                                               |

The `--chart-*` and `--sidebar-*` variables are only used by shadcn-svelte components the template doesn't include, so you can ignore them.

> Check that text stays readable: `--foreground` on `--background`, `--muted-foreground` on `--background` and `--primary-foreground` on `--primary` all need good contrast, in both modes. Try a few pages with the light/dark toggle in the navbar.

### Ready-made palettes

Pick one on the [shadcn-svelte themes page](https://shadcn-svelte.com/themes), copy its CSS and paste the `:root` and `.dark` blocks into the custom theme section. The variable names match.

## Corner radius

`--radius` in `:root` sets how round cards, buttons and images are. `0rem` gives square corners, `1rem` very round ones.

## Fonts

Melan uses two fonts, both loaded from [Fontsource](https://fontsource.org) in **`src/routes/layout.css`**:

| Font                                                              | Used for                                    | Variable         |
| ----------------------------------------------------------------- | ------------------------------------------- | ---------------- |
| [Playfair Display](https://fontsource.org/fonts/playfair-display) | Headings, the hero title, post titles       | `--font-heading` |
| [Source Serif 4](https://fontsource.org/fonts/source-serif-4)     | Everything else: body text, navbar, buttons | `--font-serif`   |

```css
/* Top of the file: load the fonts (and their italics) */
@import '@fontsource-variable/playfair-display';
@import '@fontsource-variable/playfair-display/wght-italic.css';
@import '@fontsource-variable/source-serif-4/opsz.css';
@import '@fontsource-variable/source-serif-4/opsz-italic.css';

@theme inline {
	/* Set which font each role uses */
	--font-serif: 'Source Serif 4 Variable', Georgia, serif;
	--font-heading: 'Playfair Display Variable', Georgia, serif;
}
```

Every `h1`–`h6` uses the heading font, in semibold. Use the `font-heading` class to put it on anything else.

### Swapping a font

For example, to use [Lora](https://fontsource.org/fonts/lora) for body text:

1. Install it:

   ```sh
   pnpm add -D @fontsource-variable/lora
   ```

2. Replace the two Source Serif imports in `layout.css`:

   ```css
   @import '@fontsource-variable/lora';
   @import '@fontsource-variable/lora/wght-italic.css';
   ```

3. Point the variable at it:

   ```css
   --font-serif: 'Lora Variable', Georgia, serif;
   ```

4. Remove the old package: `pnpm remove @fontsource-variable/source-serif-4`.

The heading font works the same way with `--font-heading`. Each font's Fontsource page shows the exact package name, the files to import and the `font-family` name to use.

> Prefer a **variable** font (`@fontsource-variable/…`) where one exists: one file covers every weight. If you pick a font that only comes in one weight, set headings to `font-normal` in the `h1`–`h6` rule near the bottom of `layout.css`, or the browser fakes a bold version that looks smudgy.

**Sans-serif instead?** Load a sans font (e.g. `@fontsource-variable/inter`), set `--font-sans: 'Inter Variable', sans-serif;`, and change `@apply font-serif;` on `html` near the bottom of `layout.css` to `@apply font-sans;`.

## Post text size and style

Post content is styled in **`src/lib/styles/blog.css`** with the Tailwind Typography plugin. To make the text bigger, add a size to the first `@apply` line:

```css
.blog-prose {
	@apply prose prose-lg max-w-none;
```

The sizes are `prose-sm`, `prose-base` (default), `prose-lg`, `prose-xl` and `prose-2xl`. Each scales the text, headings and spacing together. `prose md:prose-lg` uses the larger size only on wider screens.

Other things in this file:

- **`font-[450]`** makes post text slightly heavier than regular, for easier reading. Use `font-normal` for regular weight.
- **`prose-h2:mt-14`**, **`prose-h3:mt-10`** and the other `prose-h…` spacing set the space around headings.
- **The `--tw-prose-…` lines** map post colours to the theme variables, so posts follow your theme. Change one to colour a single part of posts differently, e.g. `--tw-prose-bullets: var(--color-ink);` for accent-coloured list bullets.
- **`prose-pre:text-sm`** sets the code block text size, separately from the body text.
- The `prose-headings:`, `prose-a:` and `prose-img:` lines style headings, links and images.

See the [Tailwind Typography docs](https://github.com/tailwindlabs/tailwindcss-typography) for every modifier.

## Layout and components

| To change                          | Edit                                             |
| ---------------------------------- | ------------------------------------------------ |
| The navbar                         | `src/lib/components/site/Navbar.svelte`          |
| The icon or title in the navbar    | `src/lib/components/site/Brand.svelte`           |
| The footer                         | `src/lib/components/site/Footer.svelte`          |
| The page loading bar               | `src/lib/components/site/PageLoader.svelte`      |
| The homepage hero                  | `src/lib/components/site/Hero.svelte`            |
| The homepage itself                | `src/routes/+page.svelte`                        |
| A post's page layout               | `src/lib/components/blog/BlogLayout.svelte`      |
| The title, date and tags on a post | `src/lib/components/blog/PostHeader.svelte`      |
| Post cards on the index            | `src/lib/components/blog/PostCard.svelte`        |
| The "On this page" contents        | `src/lib/components/blog/TableOfContents.svelte` |
| Previous / next links              | `src/lib/components/blog/PostNav.svelte`         |
| The blog index                     | `src/routes/blog/+page.svelte`                   |
| The 404 and error page             | `src/routes/+error.svelte`                       |

Pages are centred with `max-w-6xl` (72rem). Change it in each page's outer element, or in the components above, for a wider or narrower site.

## Adding shadcn-svelte components

UI components live in `src/lib/components/ui/` and come from [shadcn-svelte](https://shadcn-svelte.com/docs/components). To add another, e.g. a card:

```sh
pnpm dlx shadcn-svelte@latest add card
```

Then import it where you need it:

```svelte
<script lang="ts">
	import * as Card from '#lib/components/ui/card/index.ts';
</script>
```

The files are copied into your project, so you can edit them freely.

## Icons

- **Navbar icon:** replace `static/icon.svg`, or point [`brand.icon`](configuration.md#brand-the-navbar-icon-and-title) at another file in `static/`.
- **Favicon** (the browser tab icon): replace `src/lib/assets/favicon.svg`.
