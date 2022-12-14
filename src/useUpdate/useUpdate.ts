import { useCallback, useEffect, useRef, useState } from 'react';

export class RequestedNewUpdateBeforePendingUpdateFinishedError extends Error {
  public constructor() {
    super(
      'Requested new update before pending update finished, please await pending update before requesting a new update',
    );
    this.name = 'RequestedNewUpdateBeforePendingUpdateFinishedError';
  }
}

/**
 * Hook that returns a callback that forces and update, the callback can be
 * awaited
 */
export function useUpdate(): () => Promise<void> {
  const [resolve, setResolve] = useState<() => void>();
  const rejectRef = useRef<(error: unknown) => void>();

  useEffect(() => {
    resolve?.();
  }, [resolve]);

  return useCallback(async () => {
    // Reject pending updates
    rejectRef.current?.(new RequestedNewUpdateBeforePendingUpdateFinishedError());

    const promise = new Promise<void>((_resolve, reject) => {
      setResolve(_resolve);
      rejectRef.current = reject;
    });

    return promise;
  }, []);
}
