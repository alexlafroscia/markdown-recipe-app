import { type InlineConfig, mergeConfig } from 'vite';
import type { StorybookConfig } from '@storybook/sveltekit';

const config: StorybookConfig = {
	stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|ts|svelte)'],
	addons: [
		'@storybook/addon-svelte-csf',
		'@storybook/addon-essentials',
		'@chromatic-com/storybook',
		'@storybook/addon-interactions',
	],
	framework: {
		name: '@storybook/sveltekit',
		options: {},
	},
	staticDirs: [
		// Serve the same static assets as ServerKit
		'../static',
	],
	viteFinal(config) {
		return mergeConfig(config, {
			server: {
				fs: {
					allow: ['..'],
				},
			},
		} satisfies InlineConfig);
	},
};
export default config;
