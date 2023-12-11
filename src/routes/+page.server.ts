import { get } from "$lib/TS/api";

export type Resume = {
    skills: Skill[];
    experience: Experience[];
    education: Education[];
};

export type Skill = {
    name: string;
    yearsExperience: number;
};

export type Experience = {
    name: string;
    location: string;
    from: string; 
    to: string; 
    description: string;
};

export type Education = {
    name: string;
    from: string; 
    to: string; 
    degree: string;
};

export async function load() {
    const response = await get<Resume>('/resume');

    return response.body ?? { skills: [], experience: [], education: [] };
}