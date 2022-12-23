import { StorybookConfig } from '@storybook/types';

export default {
  addons: ['@storybook/addon-links', '@storybook/addon-essentials'],
  docs: {
    docsPage: true,
  },
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  staticDirs: ['../public'],
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(ts|tsx)'],
} satisfies StorybookConfig;
