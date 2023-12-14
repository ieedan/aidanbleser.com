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
		hook: "With the consistency and semantics Tailwind gives your codebase you would be irresponsible not to choose it for your next project.",
		component: TailwindBlogPost,
	},
].sort((a, b) => Date.parse(b.date.toString()) - Date.parse(a.date.toString()));
