import { useEffect, useState } from 'react';

/**
 * Only used in Demo Stories
 *
 * Hook for displaying debug messages that automatically clear after a specified duration
 * @param duration Duration in milliseconds before the message is cleared
 * @returns Tuple containing the current message and a function to set a new message
 */
export const useDebugMessage = (duration = 2000): [string, (message: string) => void] => {
  const [message, setMessage] = useState<string>('');

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        setMessage('');
      }, duration);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [duration, message]);

  return [message, setMessage];
};
