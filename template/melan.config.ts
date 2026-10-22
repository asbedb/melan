// Your site's settings. Every option is explained in Melan's configuration guide:
// https://github.com/asbedb/melan/blob/main/docs/configuration.md
import { defineConfig } from '@asbedb/melan/config';

export default defineConfig({
	site: {
		title: 'Melan',
		description:
			'Melan is a reusable Svelte blog template with syntax highlighting and shadcn-svelte components.',
		homeImage: 'img/home-share.png',
		routes: [
			{ href: '/', label: 'Home', nav: false },
			{ href: '/about', label: 'About' },
			{ href: '/blog', label: 'Blog' }
		],
		accent: {
			light: 'oklch(0.3994 0.156 210.49)',
			dark: 'oklch(0.5024 0.3472 217.91)'
		},
		brand: {
			display: 'title',
			icon: 'icon.svg',
			home: { display: 'icon' }
		},
		latestPosts: { heading: 'Latest Posts', count: 6 },
		footer: {
			text: '© {year} {title}',
			links: [],
			poweredBy: true
		}
	},
	blog: {
		locale: 'en-AU',
		path: '/blog',
		assets: {
			covers: '/img/covers',
			images: '/img'
		},
		highlight: {
			langs: ['ts', 'js', 'svelte', 'html', 'css', 'json', 'bash', 'md', 'yaml']
		},
		codepen: {
			height: 400,
			tabs: 'result'
		}
	}
});
