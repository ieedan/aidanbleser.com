import { defineBaseMetaTags } from 'svelte-meta-tags';

export function load({ url }) {
	const baseTags = defineBaseMetaTags({
		openGraph: {
			title: 'Aidan Bleser - Frontend Engineer',
			description: "Aidan Bleser's (ieedan) personal website and tech blog.",
			url: 'https://aidanbleser.com',
			siteName: 'Aidan Bleser',
			images: [
				{
					url: `${url.origin}/og.png`
				}
			]
		},
		twitter: {
			cardType: 'summary_large_image',
			title: 'Aidan Bleser - Frontend Engineer',
			description: "Aidan Bleser's (ieedan) personal website and tech blog.",
			image: `${url.origin}/og.png`
		}
	});

	return {
		...baseTags
	};
}
