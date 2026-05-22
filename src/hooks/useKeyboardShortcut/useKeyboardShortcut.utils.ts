import { parseShortcut } from './parseShortcut.js';
import type { UseKeyboardShortcutOptions } from './useKeyboardShortcut.js';
import type { Command, Shortcut } from './useKeyboardShortcut.types.js';

const { userAgent } = window.navigator;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const platform = (window.navigator as any)?.userAgentData?.platform || userAgent;
const isWindows = platform.includes('Win');

/**
 * When Ctrl or Cmd keys are required for the command,
 * it's safe to use in inputs, since it won't insert a character.
 *
 * Shift does capitals, and option adds special characters.
 */
export function hasInputSafeModifiers(shortcut: Array<Command>): boolean {
  return shortcut.every((modifier) => modifier.ctrlKey || modifier.metaKey);
}

/**
 * On windows, we don't have a Cmd key, so we map it to Ctrl.
 */
function convertToWindowsCommand(command: Command): Command {
  // if it already has a ctrlKey, we should not "remove" the meta key
  if (command.ctrlKey) {
    return command;
  }
  return {
    ...command,
    ctrlKey: command.ctrlKey || command.metaKey,
    metaKey: false,
  };
}

function isCommand(command: object | string): command is Command {
  if (typeof command === 'string') {
    return false;
  }

  return command && 'key' in command;
}

/**
 * Normalizes the shortcut into an array of commands, so it can be used in the Sequence hook.
 *
 * @param shortcut The shortcut in any format
 * @returns
 */
function ensureCommandFormat(shortcut: Shortcut | undefined): Array<Command> {
  if (!shortcut) {
    return [];
  }

  // a single command, wrap as an array
  if (isCommand(shortcut)) {
    return [shortcut];
  }

  // make sure this is an array of actual commands
  if (Array.isArray(shortcut) && shortcut.every((item) => isCommand(item))) {
    return shortcut;
  }

  // if not any of the above, it can only be a SimpleShortcut type (i.e. we need string parsing)
  return parseShortcut(shortcut);
}

export function getPlatformCommand({
  command: commandFromProps,
  convertPlatforms = true,
  windowsCommand: windowsCommandProps,
  macOsCommand: macOsCommandProps,
}: Pick<
  UseKeyboardShortcutOptions,
  'windowsCommand' | 'macOsCommand' | 'convertPlatforms' | 'command'
>): Array<Command> {
  const internalCommand = ensureCommandFormat(commandFromProps);

  // eslint-disable-next-line no-nested-ternary
  const windowsCommand = windowsCommandProps
    ? ensureCommandFormat(windowsCommandProps)
    : convertPlatforms
      ? internalCommand.map((element) => convertToWindowsCommand(element))
      : internalCommand;

  // eslint-disable-next-line no-nested-ternary
  const macOsCommand = macOsCommandProps
    ? ensureCommandFormat(macOsCommandProps)
    : convertPlatforms
      ? internalCommand.map((element) => element)
      : internalCommand;

  return isWindows ? windowsCommand : macOsCommand;
}
