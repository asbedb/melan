// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
import type { AdjacentPosts } from '#lib/blog/posts.ts';

declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		interface PageData {
			/** Set by routes/blog/+layout.ts on post pages. */
			adjacentPosts?: AdjacentPosts;
		}
		// interface PageState {}
		// interface Platform {}
	}
}

export {};
