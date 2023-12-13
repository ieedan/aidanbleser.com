export type Route = {
    name: string;
    slug: string;
    routes?: Route[];
    expanded?: boolean; 
    hidden?: boolean;
}