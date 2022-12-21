/* eslint-disable import/no-extraneous-dependencies */
import { type ReactNode, useCallback, useState } from 'react';

/**
 * This hook is an internal utility function to visually "log" messages inside your story UI.
 *
 * ```
 *  const { getLog, log } = useStorybookLog();
 *
 *  return (
 *    <div>
 *      <div>{getLog()}</div>
 *      <button onClick={() => log('clicked')}>Click me</button>
 *    </div>
 *  )
 * ```
 *
 * @param logRef The Ref that will hold the logs.
 */
export function useStorybookLog(): {
  getLog(): ReactNode;
  log(message: string): void;
} {
  const [logs, setLogs] = useState<Array<string>>([]);

  const log = useCallback((message: string) => {
    setLogs((oldLogs) => [...oldLogs, message]);
    setTimeout(() => {
      setLogs([]);
    }, 2000);
  }, []);

  const getLog = useCallback(
    () => (
      <>
        {logs.map((message) => (
          <div className="alert alert-dismissible alert-info">{message}</div>
        ))}
      </>
    ),
    [logs],
  );

  return { getLog, log };
}
