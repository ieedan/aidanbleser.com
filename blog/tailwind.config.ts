/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	darkMode: 'class',
	safeList: ['dark'],
	theme: {
		fontFamily: {
			serif: ['Geist Mono', 'Monospace'],
			sans: ['Geist Sans', 'sans-serif'],
		},
		extend: {
			colors: {
				background: {
					DEFAULT: 'var(--background-100)',
					secondary: 'var(--background-200)',
				},
				gray: {
					'100': 'hsl(var(--gray-100) / <alpha-value>)',
					'200': 'hsl(var(--gray-200) / <alpha-value>)',
					'300': 'hsl(var(--gray-300) / <alpha-value>)',
					'400': 'hsl(var(--gray-400) / <alpha-value>)',
					'500': 'hsl(var(--gray-500) / <alpha-value>)',
					'600': 'hsl(var(--gray-600) / <alpha-value>)',
					'700': 'hsl(var(--gray-700) / <alpha-value>)',
					'800': 'hsl(var(--gray-800) / <alpha-value>)',
					'900': 'hsl(var(--gray-900) / <alpha-value>)',
					'1000': 'hsl(var(--gray-1000) / <alpha-value>)',
				},
				blue: {
					'100': 'hsl(var(--blue-100) / <alpha-value>)',
					'200': 'hsl(var(--blue-200) / <alpha-value>)',
					'300': 'hsl(var(--blue-300) / <alpha-value>)',
					'400': 'hsl(var(--blue-400) / <alpha-value>)',
					'500': 'hsl(var(--blue-500) / <alpha-value>)',
					'600': 'hsl(var(--blue-600) / <alpha-value>)',
					'700': 'hsl(var(--blue-700) / <alpha-value>)',
					'800': 'hsl(var(--blue-800) / <alpha-value>)',
					'900': 'hsl(var(--blue-900) / <alpha-value>)',
					'1000': 'hsl(var(--blue-1000) / <alpha-value>)',
				},
				red: {
					'100': 'hsl(var(--red-100) / <alpha-value>)',
					'200': 'hsl(var(--red-200) / <alpha-value>)',
					'300': 'hsl(var(--red-300) / <alpha-value>)',
					'400': 'hsl(var(--red-400) / <alpha-value>)',
					'500': 'hsl(var(--red-500) / <alpha-value>)',
					'600': 'hsl(var(--red-600) / <alpha-value>)',
					'700': 'hsl(var(--red-700) / <alpha-value>)',
					'800': 'hsl(var(--red-800) / <alpha-value>)',
					'900': 'hsl(var(--red-900) / <alpha-value>)',
					'1000': 'hsl(var(--red-1000) / <alpha-value>)',
				},
				amber: {
					'100': 'hsl(var(--amber-100) / <alpha-value>)',
					'200': 'hsl(var(--amber-200) / <alpha-value>)',
					'300': 'hsl(var(--amber-300) / <alpha-value>)',
					'400': 'hsl(var(--amber-400) / <alpha-value>)',
					'500': 'hsl(var(--amber-500) / <alpha-value>)',
					'600': 'hsl(var(--amber-600) / <alpha-value>)',
					'700': 'hsl(var(--amber-700) / <alpha-value>)',
					'800': 'hsl(var(--amber-800) / <alpha-value>)',
					'900': 'hsl(var(--amber-900) / <alpha-value>)',
					'1000': 'hsl(var(--amber-1000) / <alpha-value>)',
				},
				green: {
					'100': 'hsl(var(--green-100) / <alpha-value>)',
					'200': 'hsl(var(--green-200) / <alpha-value>)',
					'300': 'hsl(var(--green-300) / <alpha-value>)',
					'400': 'hsl(var(--green-400) / <alpha-value>)',
					'500': 'hsl(var(--green-500) / <alpha-value>)',
					'600': 'hsl(var(--green-600) / <alpha-value>)',
					'700': 'hsl(var(--green-700) / <alpha-value>)',
					'800': 'hsl(var(--green-800) / <alpha-value>)',
					'900': 'hsl(var(--green-900) / <alpha-value>)',
					'1000': 'hsl(var(--green-1000) / <alpha-value>)',
				},
				teal: {
					'100': 'hsl(var(--teal-100) / <alpha-value>)',
					'200': 'hsl(var(--teal-200) / <alpha-value>)',
					'300': 'hsl(var(--teal-300) / <alpha-value>)',
					'400': 'hsl(var(--teal-400) / <alpha-value>)',
					'500': 'hsl(var(--teal-500) / <alpha-value>)',
					'600': 'hsl(var(--teal-600) / <alpha-value>)',
					'700': 'hsl(var(--teal-700) / <alpha-value>)',
					'800': 'hsl(var(--teal-800) / <alpha-value>)',
					'900': 'hsl(var(--teal-900) / <alpha-value>)',
					'1000': 'hsl(var(--teal-1000) / <alpha-value>)',
				},
				purple: {
					'100': 'hsl(var(--purple-100) / <alpha-value>)',
					'200': 'hsl(var(--purple-200) / <alpha-value>)',
					'300': 'hsl(var(--purple-300) / <alpha-value>)',
					'400': 'hsl(var(--purple-400) / <alpha-value>)',
					'500': 'hsl(var(--purple-500) / <alpha-value>)',
					'600': 'hsl(var(--purple-600) / <alpha-value>)',
					'700': 'hsl(var(--purple-700) / <alpha-value>)',
					'800': 'hsl(var(--purple-800) / <alpha-value>)',
					'900': 'hsl(var(--purple-900) / <alpha-value>)',
					'1000': 'hsl(var(--purple-1000) / <alpha-value>)',
				},
				pink: {
					'100': 'hsl(var(--pink-100) / <alpha-value>)',
					'200': 'hsl(var(--pink-200) / <alpha-value>)',
					'300': 'hsl(var(--pink-300) / <alpha-value>)',
					'400': 'hsl(var(--pink-400) / <alpha-value>)',
					'500': 'hsl(var(--pink-500) / <alpha-value>)',
					'600': 'hsl(var(--pink-600) / <alpha-value>)',
					'700': 'hsl(var(--pink-700) / <alpha-value>)',
					'800': 'hsl(var(--pink-800) / <alpha-value>)',
					'900': 'hsl(var(--pink-900) / <alpha-value>)',
					'1000': 'hsl(var(--pink-1000) / <alpha-value>)',
				},
				'component-background': {
					DEFAULT: 'hsl(var(--gray-100) / <alpha-value>)',
					hover: 'hsl(var(--gray-200) / <alpha-value>)',
					active: 'hsl(var(--gray-300) / <alpha-value>)',
				},
				border: {
					DEFAULT: 'hsl(var(--gray-400) / <alpha-value>)',
					hover: 'hsl(var(--gray-500) / <alpha-value>)',
					active: 'hsl(var(--gray-600) / <alpha-value>)',
				},
				'hc-background': {
					DEFAULT: 'hsl(var(--gray-700) / <alpha-value>)',
					hover: 'hsl(var(--gray-800) / <alpha-value>)',
				},
				foreground: {
					primary: 'hsl(var(--gray-1000) / <alpha-value>)',
					secondary: 'hsl(var(--gray-900) / <alpha-value>)',
					muted: 'hsl(var(--gray-600) / <alpha-value>)',
				},
			},
		},
	},

	plugins: [require('@tailwindcss/typography')],
};
