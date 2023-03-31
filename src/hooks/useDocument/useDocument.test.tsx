import { renderHook } from '@testing-library/react';
import { useDocument } from './useDocument.js';

describe('useEventListener', () => {
  it('Should return the document', () => {
    const result = renderHook(useDocument);

    expect(result.result.current).toBeInstanceOf(Document);
  });
});
