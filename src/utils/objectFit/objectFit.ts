function objectFit(fit: 'contain' | 'cover') {
  return (
    parentWidth: number,
    parentHeight: number,
    childWidth: number,
    childHeight: number,
  ): { x: number; y: number; width: number; height: number; scale: number; cssText: string } => {
    if ([parentWidth, parentHeight, childWidth, childHeight].some((value) => value <= 0)) {
      throw new Error(`All arguments should have a positive value`);
    }

    const mathMethod = fit === 'contain' ? Math.min : Math.max;
    const scale = mathMethod(parentWidth / childWidth, parentHeight / childHeight);
    const width = Math.ceil(childWidth * scale);
    const height = Math.ceil(childHeight * scale);
    const x = Math.trunc((parentWidth - width) * 0.5);
    const y = Math.trunc((parentHeight - height) * 0.5);

    return {
      x,
      y,
      width,
      height,
      scale,
      cssText: `left:${x}px;top:${y}px;width:${width}px;height:${height}px;`,
    };
  };
}

export const contain = objectFit('contain');
export const cover = objectFit('cover');
