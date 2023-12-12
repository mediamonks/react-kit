/**
 * Adjusts the font size of an HTML element to fit within its parent container.
 *
 * @param element - The HTML element whose font size needs to be adjusted.
 * @param minFontSize - The minimum font size in pixels. Default is 13 (minimal accessible font size).
 * @param maxFontSize - The maximum font size in pixels.
 * @param axis - The axis along which the font size should be adjusted. Can be 'x' or 'y'. Default is undefined (both axes).
 *
 * @throws {TypeError} If the parent element is null or if minFontSize is greater than maxFontSize.
 */
export function adjustFontSize(
  element: HTMLElement,
  // eslint-disable-next-line default-param-last
  minFontSize = 13,
  // eslint-disable-next-line default-param-last
  maxFontSize?: number,
  axis?: 'x' | 'y',
): void {
  if (maxFontSize && minFontSize > maxFontSize) {
    throw new TypeError('minFontSize is greater than maxFontSize');
  }

  if (element.parentElement === null) {
    throw new TypeError('Parent element is null');
  }

  // minimum font size in pixels
  let min = minFontSize;
  // maximum font size in pixels
  let max =
    maxFontSize ?? Math.max(element.parentElement.clientWidth, element.parentElement.clientHeight);
  let lastGoodFontSize;

  while (min <= max) {
    const mid = Math.floor((min + max) / 2);
    element.style.fontSize = `${mid}px`;

    const { width: elementWidthAfterLayout, height: elementHeightAfterLayout } =
      element.getBoundingClientRect();
    const { width: parentElementWidthAfterLayout, height: parentElementHeightAfterLayout } =
      element.parentElement.getBoundingClientRect();

    const exceedsWidth = axis !== 'y' && elementWidthAfterLayout > parentElementWidthAfterLayout;
    const exceedsHeight = axis !== 'x' && elementHeightAfterLayout > parentElementHeightAfterLayout;

    if (exceedsWidth || exceedsHeight) {
      // If the text is too wide/tall, decrease the font size
      max = mid - 1;
    } else {
      // If the text fits, increase the font size
      lastGoodFontSize = mid;
      min = mid + 1;
    }
  }

  element.style.fontSize = `${lastGoodFontSize}px`;
}
