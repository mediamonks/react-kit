import { expect, test } from '@playwright/experimental-ct-react';
import { UseMediaQueryComponent } from './useMediaQuery.component.js';

test('Should detect initial screen size', async ({ page, mount }) => {
  await page.setViewportSize({
    width: 480,
    height: 480,
  });

  const component = await mount(<UseMediaQueryComponent />);

  await expect(component).toContainText('large');
});

test('Should detect screen size changes', async ({ page, mount }) => {
  await mount(<UseMediaQueryComponent />);

  await page.setViewportSize({
    width: 250,
    height: 250,
  });

  // Wait for the resize to be handled by the hook
  await page.getByText('small').waitFor();

  await page.setViewportSize({
    width: 480,
    height: 480,
  });

  await page.getByText('large').waitFor();
});
