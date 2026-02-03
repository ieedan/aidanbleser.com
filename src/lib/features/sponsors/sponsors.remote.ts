import { query } from '$app/server';
import { env } from '$lib/env.server';

type SponsorsResponse = {
    data: {
        user: {
            sponsors: {
                totalCount: number,
                nodes: { login: string }[]
            }
        }
    }
}

export const getSponsors = query(async () => {
    const username = 'ieedan';
    const query = `
    query($login: String!) {
      user(login: $login) {
        ... on Sponsorable {
          sponsors(first: 10) {
            totalCount
            nodes {
              ... on User {
                login
              }
              ... on Organization {
                login
              }
            }
          }
        }
      }
    }
  `;

    const response = await fetch('https://api.github.com/graphql', {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${env.GITHUB_TOKEN}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            query,
            variables: { login: username }
        })
    });

    const result = await response.json() as SponsorsResponse;
    return {
        total: result.data.user.sponsors.totalCount,
        sponsors: result.data.user.sponsors.nodes.map(node => node.login)
    };
});
