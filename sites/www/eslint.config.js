import globals from 'globals';
import js from '@eslint/js';
import ts from 'typescript-eslint';

// Plugins
import pluginUnicorn from 'eslint-plugin-unicorn';
import pluginCspell from '@cspell/eslint-plugin';
import pluginSvelte from 'eslint-plugin-svelte';
/*
 *  We this as well as prettier-plugin-tailwindcss because this
 *  is a bit more powerful but can't format *.svelte files
 */
import pluginTailwindCSS from 'eslint-plugin-tailwindcss';
import pluginPrettier from 'eslint-plugin-prettier/recommended';

export default [
	js.configs.recommended,
	...ts.configs.recommended,
	...pluginSvelte.configs['flat/recommended'],
	...pluginTailwindCSS.configs['flat/recommended'],
	pluginPrettier,
	{
		plugins: {
			unicorn: pluginUnicorn,
			'@cspell': pluginCspell,
			svelte: pluginSvelte,
		},
	},
	{
		languageOptions: {
			globals: {
				...globals.browser,
				...globals.node,
				$$Generic: 'readonly',
			},
		},
	},
	{
		files: ['**/*.svelte'],

		languageOptions: {
			parserOptions: {
				parser: ts.parser,
			},
		},
	},
	{
		rules: {
			'unicorn/filename-case': [
				'error',
				{
					case: 'kebabCase',
					ignore: ['\\S*.svelte$'],
				},
			],
			'unicorn/better-regex': 'error',
			'unicorn/consistent-destructuring': 'error',
			'tailwindcss/classnames-order': 'error',
			'tailwindcss/no-custom-classname': 'error',
			'tailwindcss/enforces-shorthand': 'error',
			'tailwindcss/no-contradicting-classname': 'error',
			'tailwindcss/enforces-negative-arbitrary-values': 'error',
			'default-param-last': 'off',
			'@typescript-eslint/no-unused-vars': [
				'error',
				{
					varsIgnorePattern: '^_|\\$\\$(Props|Events|Slots|Generic)$',
					argsIgnorePattern: '^_',
				},
			],
			'svelte/no-at-html-tags': 'warn',
			'svelte/spaced-html-comment': 'error',
			'no-self-assign': 'off',
			'no-async-promise-executor': 'off',
			'no-new-object': 'error',
			'object-shorthand': 'error',
			'prefer-object-spread': 'error',
			'prefer-template': 'error',
			'template-curly-spacing': 'error',
			'no-new-func': 'error',
			'prefer-arrow-callback': 'error',
			'no-else-return': 'error',
			'spaced-comment': 'error',
			'no-useless-escape': 'off',
			'no-console': ['error', { allow: ['info', 'clear', 'error', 'warn'] }],
			'no-nested-ternary': 'error',
			'no-prototype-builtins': 'off',
			'func-style': ['error', 'expression'],
			camelcase: 'error',
			'@typescript-eslint/array-type': ['error', { default: 'array' }],
			'@typescript-eslint/consistent-type-imports': ['error', { prefer: 'type-imports' }],
			'@typescript-eslint/prefer-as-const': 'error',
			'@cspell/spellchecker': [
				'error',
				{
					autoFix: false,
					cspell: {
						words: [],
					},
				},
			],
		},
	},
	{
		ignores: ['build/', '.svelte-kit/', 'dist/', 'node_modules/', 'vite.config.ts.*'],
	},
];
