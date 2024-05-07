import fs from "fs";
import path from "path";
import markdownit from 'markdown-it';

export const getPosts = () => {
    const postsDirectory = "./posts";

    const files = fs.readdirSync(postsDirectory);

    const posts = files.filter(file => file.endsWith(".md"));

    const md = markdownit();

    return posts.map(post => {
        const file = fs.readFileSync(path.resolve(postsDirectory, post)).toString();
        return {
            name: normalizeName(post),
            content: md.render(file)
        } 
    });
};

/**
 * 
 * @param {string} name
 * @returns {string} 
 */
const normalizeName = (name) => {
    name = name.replace(".md", "");

    const segments = name.split("-");

    let final = "";

    segments.forEach(seg => {
        final = final + seg[0].toUpperCase() + seg.slice(1) + " ";
    });

    return final.trim();
}