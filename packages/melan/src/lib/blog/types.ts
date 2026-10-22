/** Frontmatter accepted at the top of a blog post `.md` file. Every field is optional. */
export interface PostFrontmatter {
	title?: string;
	/** Publish date, e.g. `2026-10-20`. Posts are sorted by this on the index, newest first. */
	date?: string;
	/** Last-updated date. Shown alongside `date` when set. */
	updated?: string;
	description?: string;
	/** Fallback for `description`. */
	excerpt?: string;
	/** Author name. */
	author?: string;
	/** Image shown above the post and on its index card. */
	cover?: string;
	coveralt?: string;
	/** Share image; falls back to `cover`. */
	ogimage?: string;
	/** A YAML list, or a comma-separated string. */
	tags?: string[] | string;
	/** Hidden from the index in production builds and marked `noindex`. */
	draft?: boolean;
	/** Canonical URL, for posts that were first published elsewhere. */
	canonical?: string;
	/** Minutes to read. Worked out from the post's word count unless set by hand. */
	readingTime?: number;
	/** Set to `false` to hide the "On this page" table of contents. */
	toc?: boolean;
	/** The post's h2/h3 headings. Filled in from the Markdown — don't set by hand. */
	headings?: PostHeading[];
}

/** A heading listed in a post's table of contents. */
export interface PostHeading {
	depth: number;
	text: string;
	id: string;
}
