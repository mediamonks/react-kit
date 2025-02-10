import type { StorybookConfig } from '@storybook/types';

export default {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(ts|tsx)'],
  staticDirs: ['../public'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
  ],
  framework: '@storybook/react-vite',
  docs: {
    autodocs: true,
  },
} satisfies StorybookConfig;
