import finalchatLogo from '$lib/assets/projects/finalchat.png';
import implementLogo from '$lib/assets/projects/implement.svg';
import jsrepoLogo from '$lib/assets/projects/jsrepo.ico';
import labelLogo from '$lib/assets/projects/label.svg';
import shadcnSvelteExtrasLogo from '$lib/assets/projects/shadcn-svelte-extras.png';
import shadcnSvelteLogo from '$lib/assets/projects/shadcn-svelte.ico';
import skillessLogo from '$lib/assets/projects/skilless.svg';
import superReviewLogo from '$lib/assets/projects/super-review.png';

const FEATURED_COUNT = 4;

export const projects: Project[] = [
	{
		title: 'finalchat',
		logo: finalchatLogo,
		website: 'https://finalchat.app',
		description: "The last chat you'll ever need"
	},
	{
		title: 'jsrepo',
		logo: jsrepoLogo,
		website: 'https://jsrepo.dev',
		description: 'The modern registry toolchain'
	},
	{
		title: 'shadcn-svelte-extras',
		logo: shadcnSvelteExtrasLogo,
		website: 'https://shadcn-svelte-extras.com',
		description: 'Extra components for shadcn-svelte'
	},
	{
		title: 'shadcn-svelte',
		logo: shadcnSvelteLogo,
		website: 'https://shadcn-svelte.com',
		description: 'A Svelte port of shadcn/ui'
	},
	{
		title: 'skilless',
		logo: skillessLogo,
		website: 'https://skilless.dev',
		github: 'https://github.com/ieedan/skilless',
		description: 'Powerful, invisible skill management',
		isNew: true
	},
	{
		title: 'super-review',
		logo: superReviewLogo,
		website: 'https://superreview.dev',
		github: 'https://github.com/ieedan/super-review',
		description: 'Code review for the agentic era'
	},
	{
		title: 'label',
		logo: labelLogo,
		github: 'https://github.com/ieedan/label',
		description: 'A super fast issue and PR labeler'
	},
	{
		title: 'implement',
		logo: implementLogo,
		website: 'https://implementjs.dev',
		github: 'https://github.com/ieedan/implement',
		description: 'A dead simple UI framework'
	}
];

export type Project = {
	title: string;
	description: string;
	logo: string;
	/** Public site. Used instead of the repo when both exist. */
	website?: string;
	/** Used when the project has no website. */
	github?: string;
	/** Pinned to the top of the featured list. */
	isNew?: boolean;
};

export function projectHref(project: Project): string {
	const href = project.website ?? project.github;
	if (!href) throw new Error(`${project.title} is missing a link`);
	return href;
}

/** Every project, with new ones kept in source order at the top. */
export function allProjects(source: readonly Project[] = projects): Project[] {
	return pickFeaturedProjects({ source, limit: source.length });
}

/** New projects stay in source order at the top. The rest fill the remaining slots. */
export function pickFeaturedProjects({
	source = projects,
	limit = FEATURED_COUNT,
	random = false
}: {
	source?: readonly Project[];
	limit?: number;
	random?: boolean;
} = {}): Project[] {
	const pinned = source.filter((project) => project.isNew);
	const rest = source.filter((project) => !project.isNew);
	const slots = Math.max(0, limit - pinned.length);
	const pool = random ? shuffle(rest) : rest;

	return [...pinned, ...pool.slice(0, slots)];
}

let sessionFeatured: Project[] | null = null;

/** Stable set for prerender and hydration. The browser selection replaces it once per session. */
export function featuredProjects(): Project[] {
	return sessionFeatured ?? pickFeaturedProjects();
}

export function selectFeaturedProjects(): Project[] {
	if (typeof window === 'undefined') return pickFeaturedProjects();
	sessionFeatured ??= pickFeaturedProjects({ random: true });
	return sessionFeatured;
}

function shuffle<T>(items: readonly T[]): T[] {
	const copy = [...items];

	for (let i = copy.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		const current = copy[i];
		copy[i] = copy[j];
		copy[j] = current;
	}

	return copy;
}
