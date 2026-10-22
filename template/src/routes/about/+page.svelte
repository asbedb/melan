<script lang="ts">
	// A plain Svelte page: write any markup and components here. To rename it in the navbar,
	// hide it, or turn it off, edit its entry in `site.routes` (melan.config.ts).
	import ArrowRightIcon from '@lucide/svelte/icons/arrow-right';
	import FileTextIcon from '@lucide/svelte/icons/file-text';
	import PaletteIcon from '@lucide/svelte/icons/palette';
	import SettingsIcon from '@lucide/svelte/icons/settings';
	import { resolve } from '$app/paths';
	import { blogConfig, getRoute, isRouteEnabled, siteConfig } from '@asbedb/melan';
	import { Button, Separator } from '@asbedb/melan/ui';

	const title = getRoute('/about')?.label ?? 'About';
	const description = `What ${siteConfig.title} is and how it's put together.`;

	const DOCS_URL = 'https://github.com/asbedb/melan/blob/main/docs';

	const features = [
		{
			icon: FileTextIcon,
			title: 'Posts in Markdown',
			body: 'Drop a +page.md into the blog folder and it shows up on the index, with a table of contents, shareable heading links and links to the posts either side.'
		},
		{
			icon: PaletteIcon,
			title: 'Built on shadcn-svelte',
			body: 'Accessible components, Tailwind CSS and light and dark mode, with Playfair Display headings and Source Serif 4 text.'
		},
		{
			icon: SettingsIcon,
			title: 'Config, not code',
			body: 'The title, pages, navbar icon, accent colour, footer, blog folder, image folders and code highlighting all live in melan.config.ts.'
		}
	];

	/** A short tour of the config, mirroring docs/configuration.md. */
	const configGuide = [
		{
			title: 'Name and description',
			option: 'site.title, site.description',
			file: 'melan.config.ts',
			body: 'The site name is used in browser tabs and share cards. The description is the homepage’s search and share summary.',
			example: `title: 'My Blog',
description: 'Notes on things I build.',`
		},
		{
			title: 'Pages and the navbar',
			option: 'site.routes',
			file: 'melan.config.ts',
			body: 'The order of the list is the navbar order. Set nav: false to keep a page but leave it out of the navbar, or enabled: false to switch it off entirely.',
			example: `routes: [
	{ href: '/', label: 'Home', nav: false },
	{ href: '/about', label: 'About' },
	{ href: '/blog', label: 'Blog' }
],`
		},
		{
			title: 'Navbar icon',
			option: 'site.brand',
			file: 'melan.config.ts',
			body: 'Show the icon, the icon and title, or just the title, with an optional override for the homepage. Single-colour icons follow light and dark mode.',
			example: `brand: {
	display: 'icon', // or 'icon-title', 'title'
	icon: 'icon.svg', // a file in static/
	home: { display: 'icon-title' }
},`
		},
		{
			title: 'Accent colour',
			option: 'site.accent',
			file: 'melan.config.ts',
			body: 'One colour for post titles, link underlines, quote borders and the contents bar. Any CSS colour works; leave out dark to use the same colour in both modes.',
			example: `accent: {
	light: '#2563eb',
	dark: '#60a5fa'
},`
		},
		{
			title: 'Recent posts',
			option: 'site.latestPosts',
			file: 'melan.config.ts',
			body: 'How many of the newest posts to show on the homepage. The hero above them is your own component in src/lib/components/Hero.svelte, so edit it or delete it.',
			example: `latestPosts: { heading: 'Latest Posts', count: 6 },`
		},
		{
			title: 'Footer',
			option: 'site.footer',
			file: 'melan.config.ts',
			body: 'A line of text, links and the “Powered by Melan” credit. {year} and {title} are filled in for you.',
			example: `footer: {
	text: '© {year} {title}',
	links: [{ label: 'GitHub', href: 'https://github.com/you' }],
	poweredBy: true
},`
		},
		{
			title: 'The blog',
			option: 'blog',
			file: 'melan.config.ts',
			body: 'Date format, the blog’s URL, where images are looked up, and which languages code is highlighted in.',
			example: `locale: 'en-AU',
path: '/blog',
assets: { covers: '/img/covers', images: '/img' },`
		},
		{
			title: 'Fonts and theme colours',
			option: 'CSS variables',
			file: 'src/routes/layout.css',
			body: 'Not part of the config: fonts, colours and the corner radius are CSS variables. To restyle the site, uncomment the custom theme block and set your own light and dark colours.',
			example: `:root {
	--background: oklch(0.98 0.01 85);
	--foreground: oklch(0.22 0.02 260);
}

.dark {
	--background: oklch(0.18 0.02 260);
	--foreground: oklch(0.94 0.01 85);
}`
		}
	];
</script>

<svelte:head>
	<title>{title} · {siteConfig.title}</title>
	<meta name="description" content={description} />
	<meta property="og:title" content="{title} · {siteConfig.title}" />
	<meta property="og:description" content={description} />
</svelte:head>

<main class="mx-auto w-full max-w-6xl px-4 py-10 sm:py-16">
	<header class="flex max-w-3xl flex-col gap-4">
		<h1 class="scroll-m-20 text-3xl sm:text-4xl lg:text-5xl">
			{title}
		</h1>
		<p class="text-lg text-pretty text-muted-foreground">{siteConfig.description}</p>
	</header>

	<Separator class="my-8 sm:my-10" />

	<section aria-labelledby="features-heading">
		<h2 id="features-heading" class="mb-6 text-2xl">What's inside</h2>
		<ul class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
			{#each features as feature (feature.title)}
				<li class="flex flex-col gap-3 rounded-xl border bg-card p-5 text-card-foreground">
					<feature.icon class="size-5 text-muted-foreground" />
					<h3>{feature.title}</h3>
					<p class="text-sm text-pretty text-muted-foreground">{feature.body}</p>
				</li>
			{/each}
		</ul>
	</section>

	<section aria-labelledby="config-heading" class="blog-prose mt-12 max-w-3xl">
		<h2 id="config-heading">Making it yours</h2>
		<p>
			Most of the site is set from one config file, so you can make it your own without touching any
			components. Open it, change a value and save: the page updates straight away. The file is
			TypeScript, so your editor lists the options as you type and explains each one on hover.
			Optional parts can be deleted to switch them off, and <code>pnpm check</code> catches typos and
			links to pages that don't exist.
		</p>

		{#each configGuide as item (item.title)}
			<h3>{item.title}</h3>
			<p>
				{item.body}
				<span class="text-sm text-muted-foreground">
					<code>{item.option}</code> in <code>{item.file}</code>
				</span>
			</p>
			<pre class="[tab-size:2]"><code>{item.example}</code></pre>
		{/each}

		<p>
			Every option is explained in the
			<a
				href="{DOCS_URL}/configuration.md"
				target="_blank"
				rel="noopener noreferrer"
				class="external-link">configuration guide</a
			>, and fonts, colours and components in
			<a
				href="{DOCS_URL}/customising.md"
				target="_blank"
				rel="noopener noreferrer"
				class="external-link">customising the look</a
			>. This page itself is an ordinary Svelte component at
			<code>src/routes/about/+page.svelte</code>: replace it with your own text, or copy the folder
			to start another page.
		</p>
	</section>

	{#if isRouteEnabled(blogConfig.path)}
		<div class="mt-10">
			<Button href={resolve(blogConfig.path)}>
				Read the blog
				<ArrowRightIcon data-icon="inline-end" />
			</Button>
		</div>
	{/if}
</main>
