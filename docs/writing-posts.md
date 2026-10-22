# Writing posts

## Creating a post

Each post is a folder inside the blog folder, `src/routes/blog/`, holding a `+page.md` file. The folder name is the post's URL:

```
src/routes/blog/my-first-post/+page.md   →   /blog/my-first-post
```

The blog folder can be renamed, e.g. to `src/routes/writing` for `/writing/my-first-post`. See [Renaming the blog](configuration.md#renaming-the-blog). The examples here use the default, `/blog`.

New posts appear on the blog index, under the homepage's latest posts, and in the previous/next links of the posts around them. There's nothing to register.

## Frontmatter

The block between the `---` lines at the top of a post sets its details. Every field is optional.

```md
---
title: Code Blocks, Highlighting and Copy Buttons
date: 2026-10-10
updated: 2026-10-20
description: A sample post full of code samples.
author: Jane Doe
cover: my-cover.jpg
coveralt: A laptop on a wooden desk next to a cup of coffee
tags:
  - Development
  - Tutorial
---
```

| Field         | What it does                                                                                                          |
| ------------- | --------------------------------------------------------------------------------------------------------------------- |
| `title`       | The post title. Defaults to the folder name.                                                                          |
| `date`        | Publish date (`YYYY-MM-DD`). Posts are sorted by this, newest first.                                                  |
| `updated`     | Last-updated date, shown next to `date`.                                                                              |
| `description` | Shown under the title, on the post's card, and as the search/share description.                                       |
| `excerpt`     | Used if there's no `description`.                                                                                     |
| `author`      | Author name, shown with the date.                                                                                     |
| `cover`       | Image shown above the post and on its card. A bare filename is looked up in the covers folder, see [Images](#images). |
| `coveralt`    | Alt text for the cover image.                                                                                         |
| `ogimage`     | Image for social share cards. Defaults to `cover`. Looked up in the covers folder like `cover`.                       |
| `tags`        | A YAML list, or a comma-separated string like `tags: Development, Tutorial`. Readers can filter the index by tag.     |
| `draft`       | `true` hides the post in production and marks it `noindex`. It's still visible in `pnpm dev`.                         |
| `canonical`   | The original URL, for posts first published somewhere else.                                                           |
| `readingTime` | Minutes to read. Worked out from the word count unless you set it.                                                    |
| `toc`         | `false` hides the "On this page" contents for this post.                                                              |

## Headings and the "On this page" contents

Every `##` (h2) and `###` (h3) heading is listed in the "On this page" contents. On wide screens it's a sticky sidebar, and on phones a menu above the post. Use h3s for subsections and they're indented under their h2.

```md
## Images

### Inline images

### Alt text
```

- The contents only appear when a post has **two or more** h2/h3 headings.
- Each heading gets an address made from its text, so `## Alt text` can be linked to as `/blog/my-post#alt-text`.
- Each heading also gets a small `#` link after it, so readers can share a section. Clicking it scrolls smoothly to the heading and puts the section's address in the address bar, ready to copy. With a mouse the `#` appears when the heading is hovered; on touch screens it's always shown.
- To hide the contents on one post, set `toc: false` in its frontmatter.
- Start at `##`. The post title is already the page's `#` heading.

## Images

Image files live in `static/`. Give a **bare filename** and it's looked up in the folder set in `blog.assets` in `melan.config.ts`:

| Image                   | Default folder       | Write                       | Becomes                    |
| ----------------------- | -------------------- | --------------------------- | -------------------------- |
| `cover` / `ogimage`     | `static/img/covers/` | `cover: my-cover.jpg`       | `/img/covers/my-cover.jpg` |
| Images in the post body | `static/img/`        | `![A diagram](diagram.png)` | `/img/diagram.png`         |

Paths starting with `/` and full URLs are used exactly as written, so `![A diagram](/other/diagram.png)` and `cover: https://example.com/photo.jpg` work too.

To use different folders, e.g. `static/cover` for covers, change `assets` in the blog config. See [Image folders](configuration.md#image-folders).

Images get rounded corners from the post styles.

### Alt text

Describe every image: in the square brackets for images in the post, and with `coveralt` for the cover. Screen readers read it out, and it shows if the image fails to load.

- **Say what the image shows**, e.g. `![The Vite logo, a yellow lightning bolt over a purple triangle](vite.png)`.
- **Don't start with "image of" or "picture of".** Screen readers already announce it as an image, and the build warns about alt text containing "image", "picture" or "photo" (`a11y_img_redundant_alt`).
- **A cover with no `coveralt`** is treated as decorative, and screen readers skip it. That's fine for a purely decorative cover, but describe it if it shows something meaningful.

## Code blocks

Fence code with three backticks and the language name:

````md
```ts
export function add(a: number, b: number) {
	return a + b;
}
```
````

Code is highlighted for light and dark mode and gets a copy button. Languages not listed in `blog.highlight.langs` in `melan.config.ts` are shown as plain text; see [Code highlighting](configuration.md#code-highlighting) to add more.

Wrap short snippets in single backticks, like `` `npm run build` ``, to show them as inline code.

## Maths

Equations are written in TeX and rendered with [KaTeX](https://katex.org). Wrap inline maths in single dollar signs, and put display maths on its own lines between double dollar signs:

```md
The area of a circle is $A = \pi r^2$.

$$
\int_{-\infty}^{\infty} e^{-x^2} \, dx = \sqrt{\pi}
$$
```

- Equations are rendered when the site is built, so they appear straight away and don't need any JavaScript in the browser.
- Wide display equations scroll sideways on small screens rather than stretching the page.
- If an equation has a mistake, the build prints a warning with the file and line, and the post shows the TeX in red where the equation would be.
- For a dollar sign that isn't maths, escape it: `\$5`.

See [KaTeX's supported functions](https://katex.org/docs/supported) for what you can write.

## CodePen embeds

Paste a link to a pen on a line of its own and it becomes an embedded, runnable pen:

```md
Here's the demo:

https://codepen.io/your-name/pen/abcDEF
```

- Links to a pen's `pen`, `full`, `details` or `embed` view all work, as do team pens (`codepen.io/team/<team>/pen/<id>`).
- The embed follows the site's light and dark mode and loads only when it's scrolled near.
- A CodePen link inside a sentence stays a normal link.
- Without JavaScript, readers get a link to the pen instead.

The height and the tabs a pen opens on are set for every pen with `codepen` in the blog config. See [Configuration](configuration.md#blog-config-srclibblogconfigts). To change them for one pen, use the component instead:

```md
<script>
	import { CodePen } from '#lib/components/blog/index.ts';
</script>

<CodePen user="your-name" pen="abcDEF" height={600} tabs="html,result" title="A CSS loading spinner" />
```

## Links

Write links the usual Markdown way: `[the SvelteKit docs](https://svelte.dev/docs/kit)`.

- **Links to other websites** (`https://…`) open in a new tab and get a small external-link icon after them. You don't need to do anything to get this.
- **Links within your site** open in the same tab. Write them as paths, e.g. `[my last post](/blog/hello-world)`, or link to a section with `#`, e.g. `[see below](#alt-text)`.

Link underlines use the site's [accent colour](configuration.md#accent-the-accent-colour).

## Tables, quotes and lists

Standard Markdown works as you'd expect. Wide tables scroll sideways on small screens rather than stretching the page, and quotes get a border in the accent colour.

## Using Svelte in a post

Posts are processed by [mdsvex](https://mdsvex.pngwn.io), so you can import and use Svelte components inside the Markdown:

```md
<script>
	import { Badge } from '#lib/components/ui/badge/index.ts';
</script>

Here's a badge: <Badge>New</Badge>
```

## Drafts

Set `draft: true` to work on a post without publishing it. In `pnpm dev` it shows up with a red "Draft" badge. Production builds leave it off the index and out of the previous/next links, and mark the page `noindex`.

## Previous and next links

The bottom of each post links to the next (newer) post on the left and the previous (older) post on the right, based on `date`. The newest post only has a "Previous post" link, and the oldest only a "Next post" one.
