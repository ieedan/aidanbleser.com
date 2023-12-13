import TailwindBlogPost from "./TailwindCSS-9-27-2023/TailwindBlogPost.svelte";
import NamingThingsBlogPost from "./NamingThings-10-2-2023/NamingThingsBlogPost.svelte";

export type Post = {
    date: Date;
    title: string;
    /** Brief summary to get the reader interested */
    hook: string;
    component: ConstructorOfATypedSvelteComponent
}

export const posts: Post[] = [
    {
        date: new Date('9-27-2023'),
        title: "Not using TailwindCSS for your next project is IRRESPONSIBLE",
        hook: "TailwindCSS gives your codebase the consistency and semantics you wish you had everywhere for your CSS.",
        component: TailwindBlogPost
    },
    {
        date: new Date('10-2-2023'),
        title: "Naming things in your code",
        hook: "The guidance in naming things that I wish I had when I started programming.",
        component: NamingThingsBlogPost
    },
].sort((a, b) => Date.parse(b.date.toString()) - Date.parse(a.date.toString()));