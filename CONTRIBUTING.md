# Contributing to Melan

Thanks for helping out! Bug reports, fixes, docs improvements and new features are all welcome. This guide covers how to get set up and what a good contribution looks like.

## Ways to contribute

- **Report a bug.** Say what you did, what you expected, and what happened instead. Include your browser and OS for anything visual, and a screenshot if it helps.
- **Suggest a feature.** Explain the problem it solves for people using the template. Open an issue before starting large changes so we can agree on the approach first.
- **Improve the docs.** Typos, unclear steps and missing examples in `README.md` or `docs/` are all fair game.
- **Send a fix or feature.** See below.

## Getting set up

You need [Node.js](https://nodejs.org) (a current LTS release) and [pnpm](https://pnpm.io). Please use pnpm, not npm or yarn: the lockfile is `pnpm-lock.yaml`, and other package managers won't respect it.

```sh
pnpm install
pnpm dev
```

The [getting started guide](docs/getting-started.md) explains the project layout and where the config lives.

## Making a change

1. Create a branch from `main` with a short, descriptive name, e.g. `fix-toc-scroll` or `add-rss-feed`.
2. Make your change. Keep each pull request to one fix or feature.
3. Run the checks below and fix anything they report.
4. Update the docs if you changed behaviour, config options or frontmatter fields.
5. Open a pull request.

### Checks

Run these before opening a pull request:

```sh
pnpm format   # format with Prettier
pnpm check    # type-check, including route and config types
pnpm lint     # Prettier and ESLint
pnpm build    # make sure the production build succeeds
```

The build also prints Svelte accessibility warnings (`a11y_*`). New code shouldn't add any.

## Code conventions

### TypeScript everywhere

- Write TypeScript, with `<script lang="ts">` in Svelte components.
- Use `.ts` extensions in import paths and for config files, never `.js`:

  ```ts
  import { blogConfig } from '#lib/blog/config.ts';
  ```

### Imports

- In components and routes, import from `src/lib` with the `#lib/*` alias, as above.
- **Files loaded by `vite.config.ts` at build time must use relative imports**, because aliases aren't set up at that point. These are `src/lib/blog/config.ts`, `mdsvex.ts`, `headings.ts`, `external-links.ts`, `reading-time.ts` and `assets.ts`, and each one starts with a comment saying so. Type-only imports such as `import type { RouteId } from '$app/types'` are fine, since they're removed before the file runs.

### Svelte

- Use Svelte 5 runes (`$props`, `$state`, `$derived`, `$effect`) and attachments, not the legacy syntax.
- Pass internal links through `resolve()` from `$app/paths`, so they work with a base path. ESLint's `svelte/no-navigation-without-resolve` rule enforces this.
- Use the blog path from config (`blogConfig.path`) instead of writing `/blog`, so renaming the blog keeps working.

### Configuration over code

The template is meant to be customised from `src/lib/site/config.ts` and `src/lib/blog/config.ts`. When you add an option:

- Give it a sensible default, so existing sites keep working without changes.
- Add a doc comment to its type. Editors show it as a tooltip.
- Document it in [`docs/configuration.md`](docs/configuration.md).

### Styling

- Use Tailwind classes and the theme variables in `src/routes/layout.css` (`bg-background`, `text-muted-foreground` and so on), not hard-coded colours. That way light mode, dark mode and custom themes all work.
- For small accent details, use the `ink` colour (`text-ink`, `border-ink`, `decoration-ink`). It follows `siteConfig.accent`.
- Post content styles live in `src/lib/styles/blog.css`.
- Respect `prefers-reduced-motion` for anything that animates.
- Make sure layouts work at phone width without scrolling sideways.

### Accessibility

- Every image needs meaningful alt text, or `alt=""` if it's purely decorative.
- Interactive elements must work with a keyboard and have an accessible name.
- Use real headings in order, and landmarks (`nav`, `main`, `aside`) where they fit.

### UI components

Components in `src/lib/components/ui/` come from [shadcn-svelte](https://shadcn-svelte.com). Add new ones with `pnpm dlx shadcn-svelte@latest add <component>`. Keep changes to them small, so they're easy to update later.

### Comments

Explain _why_, not _what_. A short comment on a non-obvious decision helps more than one that repeats the code.

## Commits and pull requests

- Write commit messages in the present tense, describing the change: "Add RSS feed", "Fix TOC highlight on short pages".
- In the pull request, explain what changed and why, and link any related issue.
- Include before and after screenshots for visual changes, in both light and dark mode.
- Mention anything you couldn't test.

## Licence

Melan is licensed under the [GNU General Public License v3.0 or later](LICENSE). By contributing, you agree that your contributions are licensed under the same terms.
