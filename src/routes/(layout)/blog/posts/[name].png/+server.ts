import { error, redirect } from '@sveltejs/kit';
import { ImageResponse } from '@ethercorps/sveltekit-og';
import { GoogleFont, resolveFonts } from '@ethercorps/sveltekit-og/fonts';
import { formatDate, getBlogPost } from '$lib/features/blog/blog.js';
import OG from '$lib/features/blog/og.svelte';

const interRegular = new GoogleFont('Inter', { weight: 400 });
const interSemiBold = new GoogleFont('Inter', { weight: 600 });
const interBold = new GoogleFont('Inter', { weight: 700 });

async function fetchAsDataUrl(url: string, fetch: typeof globalThis.fetch): Promise<string> {
	const res = await fetch(url);
	if (!res.ok) throw new Error(`Failed to fetch ${url}: ${res.status}`);
	const contentType = res.headers.get('content-type') ?? 'image/png';
	const buffer = await res.arrayBuffer();
	const base64 = Buffer.from(buffer).toString('base64');
	return `data:${contentType};base64,${base64}`;
}

export async function GET({ params, fetch }) {
	const post = await getBlogPost(params.name);
	if (!post) return error(404, 'Post not found');

	if (post.key !== params.name) throw redirect(302, `/blog/posts/${post.key}.png`);

	const avatarDataUrl = await fetchAsDataUrl(
		'https://avatars.githubusercontent.com/ieedan',
		fetch
	);

	return new ImageResponse(
		OG,
		{
			width: 1200,
			height: 630,
			fonts: await resolveFonts([interRegular, interSemiBold, interBold])
		},
		{
			title: post.title,
			description: post.description,
			readingTime: post.readingTime,
			date: formatDate(post.date),
			avatarDataUrl
		}
	);
}
