import { expect, test } from '@playwright/experimental-ct-react';
import { Component } from './useMediaQuery.component.js';

test('Should detect initial screen size', async ({ page, mount }) => {
  await page.setViewportSize({
    width: 480,
    height: 480,
  });

  const component = await mount(<Component />, {});

  await expect(component).toContainText('large');
});

test('Should detect screen size changes', async ({ page, mount }) => {
  const component = await mount(<Component />, {});

  await page.setViewportSize({
    width: 250,
    height: 250,
  });

  // Wait for the resize to be handled by the hook
  await page.waitForTimeout(32);
  await expect(component).toContainText('small');

  await page.setViewportSize({
    width: 480,
    height: 480,
  });

  // Wait for the resize to be handled by the hook
  await page.waitForTimeout(32);

  await expect(component).toContainText('large');
});
