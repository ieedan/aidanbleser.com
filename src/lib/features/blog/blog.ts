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
	/** Whether the post is newer than 30 days */
	isNew: boolean;
};

/**
 * Determines if a blog post is newer than 30 days old
 * @param dateString - The date string of the blog post
 * @returns true if the post is newer than 30 days, false otherwise
 */
export function isPostNew(dateString: string): boolean {
	const postDate = new Date(dateString).getTime();
	return Date.now() - postDate < 30 * 24 * 60 * 60 * 1000;
}

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
		readingTime: post.readingTime,
		isNew: isPostNew(post.meta.date)
	};
}

export function getMostRecentBlogPosts({
	count,
	excludeKey
}: {
	count?: number;
	excludeKey?: string;
} = {}): {
	key: string;
	title: string;
	description: string;
	date: string;
	readingTime: string;
	isNew: boolean;
}[] {
	return Object.entries(postsIndex)
		.map(([key, value]) => ({
			key,
			...value,
			isNew: isPostNew(value.date)
		}))
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
