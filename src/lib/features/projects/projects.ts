export const projects: Project[] = [
    {
        title: 'shadcn-svelte',
        logo: 'https://shadcn-svelte.com/favicon.ico',
        link: 'https://shadcn-svelte.com',
        description: 'A Svelte port of shadcn/ui'
    },
    {
        title: 'jsrepo',
        logo: 'https://jsrepo.dev/favicon.ico',
        link: 'https://jsrepo.dev',
        description: 'The modern registry toolchain'
    },
    {
        title: 'finalchat',
        logo: 'https://finalchat.app/favicon.png',
        link: 'https://finalchat.app',
        description: "The last chat you'll ever need"
    },
    {
        title: 'shadcn-svelte-extras',
        logo: 'https://shadcn-svelte-extras.com/favicon.png',
        link: 'https://shadcn-svelte-extras.com',
        description: 'Extra components for shadcn-svelte'
    }
];

export type Project = {
    title: string;
    link: string;
    description: string;
    logo: string;
};