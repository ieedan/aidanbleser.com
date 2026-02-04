import postsIndex from '$prerendered/blog/posts';

export type BlogPost = {
	key: string;
	title: string;
	description: string;
	date: string;
	content: string;
	contentMd: string;
	/** Reading time in minutes */
	readingTime: number;
};

export async function getBlogPost(name: string): Promise<BlogPost | null> {
	let postKey: string | null = null;
	for (const [key, value] of Object.entries(postsIndex)) {
		if (key === name || value.title === name) {
			postKey = key;
			break;
		}
	}

	if (!postKey) return null;

	const { default: post } = await import(`$prerendered/blog/posts/${postKey}.ts`);

	return {
		key: postKey,
		title: post.meta.title,
		description: post.meta.description,
		date: post.meta.date,
		content: post.content,
		contentMd: post.contentMd,
		readingTime: post.readingTime
	};
}

export function getMostRecentBlogPosts({
	count,
	excludeKey = ''
}: {
	count?: number;
	excludeKey?: string;
}): { key: string; title: string; description: string; date: string; readingTime: string }[] {
	return Object.entries(postsIndex)
		.map(([key, value]) => ({ key, ...value }))
		.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
		.filter((post) => post.key !== excludeKey)
		.slice(0, count);
}

export function formatDate(dateString: string): string {
	return new Date(dateString).toLocaleDateString('en-US', {
		year: 'numeric',
		month: 'short',
		day: 'numeric'
	});
}
