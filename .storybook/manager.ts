import { addons } from '@storybook/manager-api';
import { create } from '@storybook/theming/create';

addons.setConfig({
  theme: create({
    base: 'dark',
    brandImage: 'logo.svg',
    brandUrl: 'https://monks.com',
    brandTitle: 'Frontend.Monks',
  }),
});
