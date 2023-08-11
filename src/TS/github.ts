const githubApiToken = import.meta.env.VITE_GITHUB_API_TOKEN;

const getRepositoryStats = async (username, repo) => {
	try {
		const response = await fetch(`https://api.github.com/repos/${username}/${repo}`, {
			headers: {
				Authorization: `token ${githubApiToken}`,
			},
		});
		return response.json();
	} catch (error) {
		console.error("Error fetching repository statistics:", error.message);
		return null;
	}
};

const getRepoDescription = async (username, repo) => {
	const response = await getRepositoryStats(username, repo);
	return response.description;
};

export interface Language {
	name: string;
	lines: number;
}

const getRepoLangs = async (username, repo): Promise<Language[]> => {
	const response = await fetchGithub(`https://api.github.com/repos/${username}/${repo}/languages`);
	const result: Language[] = [];
	for (const key in response) {
		if (Object.hasOwnProperty.call(response, key)) {
			const value = response[key];
			result.push({
				name: key,
				lines: value,
			});
		}
	}
	return result;
};

const fetchGithub = async (url: string) => {
	try {
		const response = await fetch(url, {
			headers: {
				Authorization: `token ${githubApiToken}`,
			},
		});
		return response.json();
	} catch (error) {
		console.error("Error fetching repository statistics:", error.message);
		return null;
	}
};

export { getRepositoryStats, getRepoLangs, getRepoDescription };
