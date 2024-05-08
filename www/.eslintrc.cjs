/** @type { import("eslint").Linter.Config } */
module.exports = {
	root: true,
	extends: [
		'eslint:recommended',
		'plugin:@typescript-eslint/recommended',
		'plugin:svelte/recommended',
		'prettier',
	],
	parser: '@typescript-eslint/parser',
	plugins: ['@typescript-eslint'],
	parserOptions: {
		sourceType: 'module',
		ecmaVersion: 2020,
		extraFileExtensions: ['.svelte'],
	},
	env: {
		browser: true,
		es2017: true,
		node: true,
	},
	overrides: [
		{
			files: ['*.svelte'],
			parser: 'svelte-eslint-parser',
			parserOptions: {
				parser: '@typescript-eslint/parser',
			},
			rules: {
				camelcase: 'error',
				'@typescript-eslint/no-unused-vars': [
					'error',
					{ varsIgnorePattern: '^_', argsIgnorePattern: '^_' },
				],
				'no-unused-vars': 'off',
				'no-self-assign': 'off', // This will allow you to self assign when working with arrays in .svelte files
				'no-console': 'error',
				'no-shadow': 'off',
				'@typescript-eslint/no-shadow': 'error',
				'@typescript-eslint/no-explicit-any': 'error',
				'no-nested-ternary': 'error',
				'svelte/no-at-html-tags': 'warn',
				'no-prototype-builtins': 'off',
				'no-useless-escape': 'off',
			},
		},
	],
	rules: {
		camelcase: 'error',
		'@typescript-eslint/no-unused-vars': [
			'error',
			{ varsIgnorePattern: '^_', argsIgnorePattern: '^_' },
		],
		'no-unused-vars': 'off',
		'no-console': 'error',
		'no-shadow': 'off',
		'@typescript-eslint/no-shadow': 'error',
		'@typescript-eslint/no-explicit-any': 'error',
		'no-nested-ternary': 'error',
		'no-prototype-builtins': 'off',
		'no-useless-escape': 'off',
	},
};
