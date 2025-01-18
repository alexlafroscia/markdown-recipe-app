import containerQueries from '@tailwindcss/container-queries';
import typography from '@tailwindcss/typography';
import type { Config } from 'tailwindcss';

export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],

	theme: {
		extend: {
			colors: {
				// Base colors
				black: 'var(--flexoki-black)',
				paper: 'var(--flexoki-paper)',

				// Grayscale
				gray: {
					50: 'var(--flexoki-50)',
					100: 'var(--flexoki-100)',
					150: 'var(--flexoki-150)',
					200: 'var(--flexoki-200)',
					300: 'var(--flexoki-300)',
					400: 'var(--flexoki-400)',
					500: 'var(--flexoki-500)',
					600: 'var(--flexoki-600)',
					700: 'var(--flexoki-700)',
					800: 'var(--flexoki-800)',
					850: 'var(--flexoki-850)',
					900: 'var(--flexoki-900)',
					950: 'var(--flexoki-950)',
				},

				// Red shades
				red: {
					50: 'var(--flexoki-red-50)',
					100: 'var(--flexoki-red-100)',
					150: 'var(--flexoki-red-150)',
					200: 'var(--flexoki-red-200)',
					300: 'var(--flexoki-red-300)',
					400: 'var(--flexoki-red-400)',
					500: 'var(--flexoki-red-500)',
					600: 'var(--flexoki-red-600)',
					700: 'var(--flexoki-red-700)',
					800: 'var(--flexoki-red-800)',
					850: 'var(--flexoki-red-850)',
					900: 'var(--flexoki-red-900)',
					950: 'var(--flexoki-red-950)',
				},

				// Orange shades
				orange: {
					50: 'var(--flexoki-orange-50)',
					100: 'var(--flexoki-orange-100)',
					150: 'var(--flexoki-orange-150)',
					200: 'var(--flexoki-orange-200)',
					300: 'var(--flexoki-orange-300)',
					400: 'var(--flexoki-orange-400)',
					500: 'var(--flexoki-orange-500)',
					600: 'var(--flexoki-orange-600)',
					700: 'var(--flexoki-orange-700)',
					800: 'var(--flexoki-orange-800)',
					850: 'var(--flexoki-orange-850)',
					900: 'var(--flexoki-orange-900)',
					950: 'var(--flexoki-orange-950)',
				},

				// Yellow shades
				yellow: {
					50: 'var(--flexoki-yellow-50)',
					100: 'var(--flexoki-yellow-100)',
					150: 'var(--flexoki-yellow-150)',
					200: 'var(--flexoki-yellow-200)',
					300: 'var(--flexoki-yellow-300)',
					400: 'var(--flexoki-yellow-400)',
					500: 'var(--flexoki-yellow-500)',
					600: 'var(--flexoki-yellow-600)',
					700: 'var(--flexoki-yellow-700)',
					800: 'var(--flexoki-yellow-800)',
					850: 'var(--flexoki-yellow-850)',
					900: 'var(--flexoki-yellow-900)',
					950: 'var(--flexoki-yellow-950)',
				},

				// Green shades
				green: {
					50: 'var(--flexoki-green-50)',
					100: 'var(--flexoki-green-100)',
					150: 'var(--flexoki-green-150)',
					200: 'var(--flexoki-green-200)',
					300: 'var(--flexoki-green-300)',
					400: 'var(--flexoki-green-400)',
					500: 'var(--flexoki-green-500)',
					600: 'var(--flexoki-green-600)',
					700: 'var(--flexoki-green-700)',
					800: 'var(--flexoki-green-800)',
					850: 'var(--flexoki-green-850)',
					900: 'var(--flexoki-green-900)',
					950: 'var(--flexoki-green-950)',
				},

				// Cyan shades
				cyan: {
					50: 'var(--flexoki-cyan-50)',
					100: 'var(--flexoki-cyan-100)',
					150: 'var(--flexoki-cyan-150)',
					200: 'var(--flexoki-cyan-200)',
					300: 'var(--flexoki-cyan-300)',
					400: 'var(--flexoki-cyan-400)',
					500: 'var(--flexoki-cyan-500)',
					600: 'var(--flexoki-cyan-600)',
					700: 'var(--flexoki-cyan-700)',
					800: 'var(--flexoki-cyan-800)',
					850: 'var(--flexoki-cyan-850)',
					900: 'var(--flexoki-cyan-900)',
					950: 'var(--flexoki-cyan-950)',
				},

				// Blue shades
				blue: {
					50: 'var(--flexoki-blue-50)',
					100: 'var(--flexoki-blue-100)',
					150: 'var(--flexoki-blue-150)',
					200: 'var(--flexoki-blue-200)',
					300: 'var(--flexoki-blue-300)',
					400: 'var(--flexoki-blue-400)',
					500: 'var(--flexoki-blue-500)',
					600: 'var(--flexoki-blue-600)',
					700: 'var(--flexoki-blue-700)',
					800: 'var(--flexoki-blue-800)',
					850: 'var(--flexoki-blue-850)',
					900: 'var(--flexoki-blue-900)',
					950: 'var(--flexoki-blue-950)',
				},

				// Purple shades
				purple: {
					50: 'var(--flexoki-purple-50)',
					100: 'var(--flexoki-purple-100)',
					150: 'var(--flexoki-purple-150)',
					200: 'var(--flexoki-purple-200)',
					300: 'var(--flexoki-purple-300)',
					400: 'var(--flexoki-purple-400)',
					500: 'var(--flexoki-purple-500)',
					600: 'var(--flexoki-purple-600)',
					700: 'var(--flexoki-purple-700)',
					800: 'var(--flexoki-purple-800)',
					850: 'var(--flexoki-purple-850)',
					900: 'var(--flexoki-purple-900)',
					950: 'var(--flexoki-purple-950)',
				},

				// Magenta shades
				magenta: {
					50: 'var(--flexoki-magenta-50)',
					100: 'var(--flexoki-magenta-100)',
					150: 'var(--flexoki-magenta-150)',
					200: 'var(--flexoki-magenta-200)',
					300: 'var(--flexoki-magenta-300)',
					400: 'var(--flexoki-magenta-400)',
					500: 'var(--flexoki-magenta-500)',
					600: 'var(--flexoki-magenta-600)',
					700: 'var(--flexoki-magenta-700)',
					800: 'var(--flexoki-magenta-800)',
					850: 'var(--flexoki-magenta-850)',
					900: 'var(--flexoki-magenta-900)',
					950: 'var(--flexoki-magenta-950)',
				},
			},

			spacing: {
				half: '50%',
			},
		},
	},

	plugins: [typography, containerQueries],
} satisfies Config;
