import { toMap } from "$lib/TS/to-map";
import WebDevWrapped2023 from "./2023WebDevWrapped/WebDevWrapped2023.svelte";
import TailwindBlogPost from "./TailwindCSS-9-27-2023/TailwindBlogPost.svelte";

export type Post = {
	date: Date;
	title: string;
	readMinutes: number;
	/** Brief summary to get the reader interested */
	hook: string;
	component: ConstructorOfATypedSvelteComponent;
};

export const posts: Post[] = [
	{
		date: new Date("9-27-2023"),
		readMinutes: 5,
		title: "Not using TailwindCSS for your next project is IRRESPONSIBLE",
		hook: "With the consistency and semantics Tailwind gives your codebase you would be irresponsible not to choose TailwindCSS for your next project.",
		component: TailwindBlogPost,
	},
	{
		date: new Date("12-21-2023"),
		readMinutes: 10,
		title: "My 2023 Web Development Wrapped",
		hook: "2023 has been a huge year in my web development journey. Continue reading to see how far I have come and the technologies I will be using in 2024.",
		component: WebDevWrapped2023,
	},
];

export const postsMap = toMap(posts, (a) => {
	return { key: a.title, value: a };
});
