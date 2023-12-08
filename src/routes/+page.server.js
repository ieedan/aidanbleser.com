import { get } from "$lib/TS/api";


export async function load() {
    const response = await get('/resume');

    return response.body ?? { skills: [], experience: [], education: [] };
}