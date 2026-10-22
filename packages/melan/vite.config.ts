// Only here so `svelte-kit sync` can generate the `$app` types and svelte-package can find the
// preprocessor. The package is tried out through the template in ../../template.
import { sveltekit } from '@sveltejs/kit/vite';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import { defineConfig } from 'vite';

export default defineConfig({
	// `script: true` strips the TypeScript from components, so the package ships plain JavaScript.
	plugins: [sveltekit({ preprocess: vitePreprocess({ script: true }) })]
});
