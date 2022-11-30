module.exports = {
  framework: {
    name: '@storybook/react-vite',
    // options: { fastRefresh: true },
  },
  stories: [
    '../src/**/*.docs.mdx',
    '../src/**/*.stories.mdx',
    '../src/**/*.stories.@(js|jsx|ts|tsx)',
  ],
  addons: [
    '@storybook/addon-docs',
    //   '@storybook/addon-links',
    //   '@storybook/addon-essentials'
  ],
  staticDirs: ['../public'],
};
