// Loaded by vite.config.ts (through mdsvex.ts) at build time — keep imports relative.
import { EXTERNAL_LINK_CLASS } from './external-links.ts';

interface Node {
	type: string;
	url?: string;
	value?: string;
	children?: Node[];
}

/** Class on the placeholder a YouTube link becomes; blog/youtube-embeds.ts swaps in the embed. */
export const YOUTUBE_CLASS = 'youtube-embed';

const VIDEO_ID = /^[\w-]{11}$/;
// youtube.com, www./m./music. subdomains, and the -nocookie variant — but not e.g. "notyoutube.com"
const YOUTUBE_HOST = /^(?:(?:www|m|music)\.)?youtube(?:-nocookie)?\.com$/;

/**
 * Extracts the 11-character video ID from a YouTube link (watch, youtu.be, embed, shorts, live, v).
 * A bare ID is accepted too unless `allowBareId` is false.
 */
export function getYouTubeId(input: string, { allowBareId = true } = {}): string | null {
	input = input.trim();
	if (VIDEO_ID.test(input)) return allowBareId ? input : null;
	let u: URL;
	try {
		u = new URL(input);
	} catch {
		return null;
	}
	let id: string | null | undefined;
	if (u.hostname === 'youtu.be' || u.hostname === 'www.youtu.be') {
		id = u.pathname.split('/')[1];
	} else if (YOUTUBE_HOST.test(u.hostname)) {
		id = u.searchParams.get('v') ?? u.pathname.match(/^\/(?:embed|shorts|live|v)\/([^/]+)/)?.[1];
	}
	return id && VIDEO_ID.test(id) ? id : null;
}

const escapeAttr = (s: string) =>
	s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');

/** The YouTube URL when a paragraph holds nothing but a YouTube link (or bare YouTube URL). */
function tubeUrl(node: Node): { url: string; id: string } | undefined {
	const kids = (node.children ?? []).filter((c) => !(c.type === 'text' && !c.value?.trim()));
	if (kids.length !== 1) return;
	const [kid] = kids;
	const url = kid.type === 'link' ? kid.url : kid.type === 'text' ? kid.value?.trim() : undefined;
	if (!url) return;

	// Only real links: a paragraph that is just an 11-letter word ("programming") isn't a video.
	const id = getYouTubeId(url, { allowBareId: false });
	return id ? { url, id } : undefined;
}

/**
 * Remark plugin that turns a YouTube link on a line of its own into an embedded video. The
 * placeholder is a plain link, so it still works without JavaScript; the embed itself
 * is mounted in the browser so it can follow light and dark mode.
 */
export function remarkYouTube() {
	return (tree: Node) => {
		const visit = (node: Node) => {
			if (node.type === 'paragraph') {
				const match = tubeUrl(node);
				if (!match) return;
				node.type = 'html';
				const href = `https://www.youtube.com/watch?v=${match.id}`;
				node.value =
					`<div class="${YOUTUBE_CLASS}" data-id="${escapeAttr(match.id)}">` +
					`<a href="${href}" class="${EXTERNAL_LINK_CLASS}" target="_blank" rel="nofollow noopener noreferrer">` +
					`Watch the video on YouTube</a></div>`;
				delete node.children;
				return;
			}
			node.children?.forEach(visit);
		};
		visit(tree);
	};
}
