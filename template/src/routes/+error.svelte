<script lang="ts">
	// Shown for any error, including pages that don't exist and routes switched off in the config.
	import ArrowLeftIcon from '@lucide/svelte/icons/arrow-left';
	import ArrowRightIcon from '@lucide/svelte/icons/arrow-right';
	import { page } from '$app/state';
	import { resolve } from '$app/paths';
	import { blogConfig, getPosts, isRouteEnabled, LatestPosts, navRoutes, siteConfig } from 'melan';
	import { Badge, Button, Separator } from 'melan/ui';

	const notFound = $derived(page.status === 404);
	const heading = $derived(notFound ? 'Page not found' : 'Something went wrong');
	const message = $derived(
		notFound
			? 'The page you’re looking for doesn’t exist, or it has moved. Check the address, or try one of the links below.'
			: (page.error?.message ?? 'An unexpected error occurred. Please try again in a moment.')
	);

	const blogEnabled = isRouteEnabled(blogConfig.path);
	const recentPosts = blogEnabled ? getPosts().slice(0, 3) : [];
</script>

<svelte:head>
	<title>{page.status} · {siteConfig.title}</title>
	<meta name="robots" content="noindex" />
</svelte:head>

<main>
	<section class="relative isolate overflow-hidden border-b">
		<div
			aria-hidden="true"
			class="absolute inset-0 -z-10 bg-[linear-gradient(to_right,var(--border)_1px,transparent_1px),linear-gradient(to_bottom,var(--border)_1px,transparent_1px)] mask-[radial-gradient(ellipse_at_center,black_20%,transparent_70%)] bg-size-[3rem_3rem]"
		></div>

		<div class="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-16 sm:gap-8 sm:py-24">
			<p aria-hidden="true" class="font-heading text-8xl leading-none text-ink sm:text-9xl">
				{page.status}
			</p>

			<div class="flex flex-col gap-3">
				<h1 class="text-4xl text-balance sm:text-5xl">{heading}</h1>
				{#if notFound}
					<!-- Echoes the dictionary line in the homepage hero. -->
					<p class="flex flex-wrap items-baseline gap-x-2 gap-y-1 text-muted-foreground">
						<span>/fɔːr oʊ fɔːr/</span>
						<span aria-hidden="true">·</span>
						<span class="font-heading text-lg italic">noun</span>
						<span aria-hidden="true">·</span>
						<span class="text-foreground">a page that isn’t here</span>
					</p>
				{/if}
			</div>

			<p class="max-w-2xl text-lg text-pretty text-muted-foreground">{message}</p>

			<div class="flex flex-wrap gap-3">
				<Button href={resolve('/')} size="lg">
					Go home
					<ArrowRightIcon data-icon="inline-end" />
				</Button>
				{#if blogEnabled}
					<Button href={resolve(blogConfig.path)} variant="outline" size="lg">Read the blog</Button>
				{/if}
				<Button variant="ghost" size="lg" onclick={() => history.back()}>
					<ArrowLeftIcon data-icon="inline-start" />
					Go back
				</Button>
			</div>

			{#if navRoutes.length}
				<Separator class="max-w-2xl" />
				<nav aria-label="Pages" class="flex flex-col gap-3">
					<span class="text-xs font-medium tracking-widest text-muted-foreground uppercase">
						Or try
					</span>
					<ul class="flex flex-wrap gap-2">
						{#each navRoutes as route (route.href)}
							<li>
								<Badge variant="secondary" href={resolve(route.href)} class="h-7 px-3 text-sm">
									{route.label}
								</Badge>
							</li>
						{/each}
					</ul>
				</nav>
			{/if}
		</div>
	</section>

	{#if notFound}
		<LatestPosts heading="Recent posts" posts={recentPosts} />
	{/if}
</main>
