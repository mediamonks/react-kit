import { useCallback, useEffect, useState, type ComponentProps, type ReactNode } from 'react';
import { ensuredForwardRef } from '../../hocs/ensuredForwardRef/ensuredForwardRef.js';
import { useResizeObserver } from '../../hooks/useResizeObserver/useResizeObserver.js';
import { adjustFontSize } from '../../utils/adjustFontSize/adjustFontSize.js';

type AutoAdjustFontSizeProps = ComponentProps<'div'> & {
  children: ReactNode;
  minFontSize?: number;
  maxFontSize?: number;
  axis?: 'x' | 'y';
};

export const AutoAdjustFontSize = ensuredForwardRef<HTMLDivElement, AutoAdjustFontSizeProps>(
  ({ children, minFontSize, maxFontSize, axis, style }, ref) => {
    const [parentElement, setParentElement] = useState<HTMLElement | null>(null);

    const updateFontSize = useCallback(() => {
      if (!ref.current) {
        return;
      }

      adjustFontSize(ref.current, minFontSize, maxFontSize, axis);
    }, [axis, maxFontSize, minFontSize, ref]);

    useEffect(() => {
      if (!ref.current) {
        return;
      }

      setParentElement(ref.current.parentElement);

      updateFontSize();
      ref.current.style.visibility = 'visible';
    }, [ref, updateFontSize]);

    useResizeObserver(parentElement, updateFontSize);

    return (
      <div
        ref={ref}
        style={{
          whiteSpace: 'nowrap',
          inlineSize: 'max-content',
          blockSize: 'max-content',
          visibility: 'hidden',
          ...style,
        }}
      >
        {children}
      </div>
    );
  },
);
