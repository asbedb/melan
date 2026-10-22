# Contributing to Melan

Thanks for helping out! Bug reports, fixes, docs improvements and new features are all welcome. This guide covers how to get set up and what a good contribution looks like.

## Ways to contribute

- **Report a bug.** Say what you did, what you expected, and what happened instead. Include your browser and OS for anything visual, and a screenshot if it helps.
- **Suggest a feature.** Explain the problem it solves for people using Melan. Open an issue before starting large changes so we can agree on the approach first.
- **Improve the docs.** Typos, unclear steps and missing examples in `README.md` or `docs/` are all fair game.
- **Send a fix or feature.** See below.

## Getting set up

You need [Node.js](https://nodejs.org) (a current LTS release) and [pnpm](https://pnpm.io). Please use pnpm, not npm or yarn: the lockfile is `pnpm-lock.yaml`, and other package managers won't respect it.

```sh
pnpm install
pnpm dev
```

`pnpm dev` builds the `melan` package, then rebuilds it whenever you save while running the template site at <http://localhost:5173>.

### How the repository is laid out

| Folder                  | What it is                                                                                             |
| ----------------------- | ------------------------------------------------------------------------------------------------------ |
| `packages/melan`        | The `melan` npm package. Anything every blog should get when it updates goes here.                     |
| `packages/create-melan` | The `pnpm create melan` CLI. When packed, it bundles a copy of `template/`.                            |
| `template`              | The starter blog people get, and the site you try your changes on. It uses `melan` from the workspace. |
| `docs`                  | The user guides.                                                                                       |

Rule of thumb: if a fix should reach existing blogs, it belongs in `packages/melan`. The template only holds what people are expected to make their own: config, posts, pages, the hero and the layouts. Keep it thin.

## Making a change

1. Create a branch from `main` with a short, descriptive name, e.g. `fix-toc-scroll` or `add-rss-feed`.
2. Make your change. Keep each pull request to one fix or feature.
3. Run the checks below and fix anything they report.
4. Update the docs if you changed behaviour, config options or frontmatter fields.
5. Add a changeset (see below) if you changed `packages/melan`, `packages/create-melan` or `template`.
6. Open a pull request.

### Checks

Run these before opening a pull request:

```sh
pnpm format   # format with Prettier
pnpm check    # type-check, including route and config types
pnpm lint     # Prettier and ESLint
pnpm build    # make sure the production build succeeds
```

The build also prints Svelte accessibility warnings (`a11y_*`). New code shouldn't add any.

### Changesets

Releases are made with [Changesets](https://github.com/changesets/changesets). Each pull request that changes a published package says how, in a small file under `.changeset/`:

```sh
pnpm changeset
```

Pick the packages and the kind of change, and write a sentence or two for the changelog, written for people running a blog:

- **patch:** a fix, with nothing for users to change.
- **minor:** a new feature or option, with nothing for users to change.
- **major:** anything users have to act on, such as a renamed config option, a removed export or a change to what the template's files must contain. Say exactly what to change.

Changes to `template/` reach people through `create-melan`, so choose `create-melan` for those. `melan` and `create-melan` are always released together with the same version.

## Code conventions

### TypeScript everywhere

- Write TypeScript, with `<script lang="ts">` in Svelte components.
- Use `.ts` extensions in import paths and for config files, never `.js`:

  ```ts
  import { blogConfig } from '#lib/blog/config.ts';
  ```

### Imports

- In the template, import Melan from `melan`, `melan/ui` and the other entries, and the template's own files with the `#lib/*` alias.
- In `packages/melan`, use relative imports with `.ts` extensions. svelte-package rewrites them to `.js` when it builds the package.
- **Files loaded by `vite.config.ts` at build time must not import Svelte components or `$app` modules**: `config/index.ts`, `vite.ts`, and the remark plugins in `blog/` (`mdsvex.ts`, `headings.ts`, `math.ts` and the others). Each starts with a comment saying so. Type-only imports such as `import type { RouteId } from '$app/types'` are fine, since they're removed before the file runs.
- Components read the site's config from `config/runtime.ts`, which gets it from the Vite plugin as `virtual:melan/config`.

### Svelte

- Use Svelte 5 runes (`$props`, `$state`, `$derived`, `$effect`) and attachments, not the legacy syntax.
- Pass internal links through `resolve()` from `$app/paths`, so they work with a base path. ESLint's `svelte/no-navigation-without-resolve` rule enforces this. In `packages/melan`, paths from the config go through `resolvePath()` in `paths.ts` instead, because the package has no routes of its own to type-check them against.
- Use the blog path from config (`blogConfig.path`) instead of writing `/blog`, so renaming the blog keeps working.

### Configuration over code

Blogs are customised from `melan.config.ts`, whose types live in `packages/melan/src/lib/config/index.ts`. When you add an option:

- Give it a sensible default, in `resolveConfig()`, so existing sites keep working without changes.
- Add a doc comment to its type. Editors show it as a tooltip.
- Document it in [`docs/configuration.md`](docs/configuration.md).

### Styling

- Use Tailwind classes and the theme variables in `packages/melan/src/lib/styles/melan.css` (`bg-background`, `text-muted-foreground` and so on), not hard-coded colours. That way light mode, dark mode and custom themes all work.
- For small accent details, use the `ink` colour (`text-ink`, `border-ink`, `decoration-ink`). It follows `site.accent` in the config.
- Post content styles live in `packages/melan/src/lib/styles/blog.css`.
- Respect `prefers-reduced-motion` for anything that animates.
- Make sure layouts work at phone width without scrolling sideways.

### Accessibility

- Every image needs meaningful alt text, or `alt=""` if it's purely decorative.
- Interactive elements must work with a keyboard and have an accessible name.
- Use real headings in order, and landmarks (`nav`, `main`, `aside`) where they fit.

### UI components

Components in `packages/melan/src/lib/components/ui/` come from [shadcn-svelte](https://shadcn-svelte.com). Keep changes to them small, so they're easy to update later. To add one, run `pnpm dlx shadcn-svelte@latest add <component>` in `template/`, move the new folder into the package, and change its imports to relative paths.

### Comments

Explain _why_, not _what_. A short comment on a non-obvious decision helps more than one that repeats the code.

## Commits and pull requests

- Write commit messages in the present tense, describing the change: "Add RSS feed", "Fix TOC highlight on short pages".
- In the pull request, explain what changed and why, and link any related issue.
- Include before and after screenshots for visual changes, in both light and dark mode.
- Mention anything you couldn't test.

## Releasing

Maintainers only. Pushing to `main` runs the release workflow, which opens a "Version packages" pull request whenever there are changesets waiting. Merging that pull request publishes `melan` and `create-melan` to npm and tags the release.

The first release has to be published by hand, because npm's trusted publishing can only be set up for packages that already exist:

```sh
npm login
pnpm changeset version   # turns the pending changesets into versions and changelogs
pnpm install             # updates the lockfile
git add -A && git commit -m "chore: version packages"
pnpm release             # builds both packages and publishes them
git push --follow-tags
```

Then, on npmjs.com, add the GitHub repository as a trusted publisher (workflow `release.yml`) for both `melan` and `create-melan`. Later releases go through the workflow.

## Licence

Melan is licensed under the [GNU General Public License v3.0 or later](LICENSE). By contributing, you agree that your contributions are licensed under the same terms.
