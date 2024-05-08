function isNumber(str: string): boolean {
	return /^[\s]*[+-]?(\d+(\.\d*)?|\.\d+)[\s]*$/.test(str);
}

export function capitalizeFirstLetter(path: string): string {
	const decodedPath = decodeURIComponent(path);

	if (isNumber(decodedPath)) return '#' + decodedPath;

	const hasNumbers = /[0-9]/.test(path);

	// This would indicate that is most likely an ID or something that we don't want to transform
	if (hasNumbers) return decodedPath;

	const spacedPath = decodedPath.replace(/[-]/g, ' ');

	// Capitalize the first letter of each word
	const words = spacedPath.split(' ');

	let capitalizedPath = '';

	for (let i = 0; i < words.length; i++) {
		const word = words[i];

		if (word && word.length > 0) {
			capitalizedPath += word[0].toUpperCase() + word.slice(1);
		}

		if (i < words.length - 1) capitalizedPath += ' ';
	}

	return capitalizedPath;
}
