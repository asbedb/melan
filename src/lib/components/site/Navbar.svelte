<script lang="ts">
	import MenuIcon from '@lucide/svelte/icons/menu';
	import { page } from '$app/state';
	import { resolve } from '$app/paths';
	import * as NavigationMenu from '#lib/components/ui/navigation-menu/index.ts';
	import * as Sheet from '#lib/components/ui/sheet/index.ts';
	import { Button } from '#lib/components/ui/button/index.ts';
	import { ModeToggle } from '#lib/components/theme/index.ts';
	import { siteConfig, navRoutes, isActive } from '#lib/site/config.ts';
	import Brand from './Brand.svelte';

	let menuOpen = $state(false);
</script>

<header
	class="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur [view-transition-name:site-header] supports-backdrop-filter:bg-background/60"
>
	<div class="mx-auto flex h-14 items-center gap-4 px-4 sm:px-10">
		<a
			href={resolve('/')}
			class="flex min-w-0 items-center gap-2.5 text-2xl font-semibold tracking-tight sm:text-3xl"
		>
			<Brand />
		</a>

		<div class="ml-auto flex shrink-0 items-center gap-2">
			{#if navRoutes.length}
				<!-- Desktop: inline links. Phones get the sheet menu below instead. -->
				<NavigationMenu.Root viewport={false} class="hidden sm:flex">
					<NavigationMenu.List>
						{#each navRoutes as route (route.href)}
							<NavigationMenu.Item>
								<NavigationMenu.Link
									href={resolve(route.href)}
									active={isActive(page.url.pathname, route.href)}
									class="px-3 py-2 text-lg font-bold underline decoration-ink"
								>
									{route.label}
								</NavigationMenu.Link>
							</NavigationMenu.Item>
						{/each}
					</NavigationMenu.List>
				</NavigationMenu.Root>
			{/if}

			<ModeToggle />

			{#if navRoutes.length}
				<Sheet.Root bind:open={menuOpen}>
					<Sheet.Trigger>
						{#snippet child({ props })}
							<Button {...props} variant="outline" size="icon" class="sm:hidden">
								<MenuIcon />
								<span class="sr-only">Open menu</span>
							</Button>
						{/snippet}
					</Sheet.Trigger>
					<Sheet.Content side="right" class="w-72">
						<Sheet.Header>
							<Sheet.Title>{siteConfig.brand?.title ?? siteConfig.title}</Sheet.Title>
						</Sheet.Header>
						<nav class="flex flex-col gap-1 px-4">
							{#each navRoutes as route (route.href)}
								{@const active = isActive(page.url.pathname, route.href)}
								<a
									href={resolve(route.href)}
									aria-current={active ? 'page' : undefined}
									onclick={() => (menuOpen = false)}
									class="rounded-lg px-3 py-2.5 text-lg font-bold hover:bg-muted aria-[current=page]:bg-muted"
								>
									{route.label}
								</a>
							{/each}
						</nav>
					</Sheet.Content>
				</Sheet.Root>
			{/if}
		</div>
	</div>
</header>
