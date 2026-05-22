import type { Unreffable } from '../../utils/unref/unref.js';
import { useEventListener } from '../useEventListener/useEventListener.js';
import { isShortcutDown } from './isShortcutDown.js';
import { type KeyCode } from './keyCodes.js';
import { isModifierKeyCode } from './parseShortcut.js';
import type { Command, Shortcut, SimpleShortcut } from './useKeyboardShortcut.types.js';
import { getPlatformCommand, hasInputSafeModifiers } from './useKeyboardShortcut.utils.js';
import { useSequence } from './useSequence.js';

export type UseKeyboardShortcutOptions<T extends EventTarget | null = EventTarget> = {
  ref?: Unreffable<T>;
  ignoreWhenInputFocused?: 'auto' | true | false;
  command?: Shortcut;
  convertPlatforms?: boolean;
  windowsCommand?: Shortcut;
  macOsCommand?: Shortcut;
  eventType?: 'keyup' | 'keydown';
  shouldStopPropagation?: boolean;
  shouldPreventDefault?: boolean;
};

export function useKeyboardShortcut<T extends EventTarget | null>(
  keyOrOptions: SimpleShortcut | UseKeyboardShortcutOptions<T>,
  callback: (keyboardEvent: KeyboardEvent) => void,
): void {
  const options =
    typeof keyOrOptions === 'string' || Array.isArray(keyOrOptions)
      ? { command: keyOrOptions }
      : keyOrOptions;

  const {
    ref = document.body,
    ignoreWhenInputFocused: ignoreWhenInputFocusedProp = 'auto',
    eventType = 'keydown',
    shouldStopPropagation = false,
    shouldPreventDefault = false,
    ...shortcutProps
  } = options;

  const shortcut = getPlatformCommand(shortcutProps);

  // For "auto"
  // - when we have Ctrl/Cmd modifiers, the shortcut is safe to use
  // - otherwise, we ignore the shortcut when in an input,
  // as it will also type the character in the input when wanting to trigger the shortcut
  const ignoreWhenInputFocused =
    ignoreWhenInputFocusedProp === 'auto'
      ? !hasInputSafeModifiers(shortcut)
      : ignoreWhenInputFocusedProp;

  const { check } = useSequence<Command, KeyboardEvent>(
    shortcut,
    // check the keyboard input against the next-up command in the sequence
    (currentCommand, keyboardEvent) => {
      // if a modifier key is pressed, we should ignore this if we are not checking for a modifier as a key itself
      // the sequence will reset the timer to give users more time, but not the progress itself, so it's safe
      if (
        !isModifierKeyCode(currentCommand.code) &&
        isModifierKeyCode(keyboardEvent.code as KeyCode)
      ) {
        return;
      }

      // check if the current command in the sequence is down, including all its modifiers
      return isShortcutDown(keyboardEvent, currentCommand);
    },
    // this fires when the sequence is complete
    (keyboardEvent) => {
      if (shouldStopPropagation) {
        keyboardEvent.stopPropagation();
      }

      if (shouldPreventDefault) {
        keyboardEvent.preventDefault();
      }

      callback(keyboardEvent);
    },
  );

  useEventListener(ref, eventType, (event: Event): void => {
    const keyboardEvent = event as KeyboardEvent;

    if (keyboardEvent.key === undefined) {
      // Synthetic event (e.g., Chrome autofill). Ignore.
      return;
    }

    const target = keyboardEvent.target as HTMLElement;

    // TODO: make this configurable?
    if (
      ignoreWhenInputFocused &&
      (target.isContentEditable ||
        target instanceof HTMLInputElement ||
        target instanceof HTMLTextAreaElement ||
        target instanceof HTMLSelectElement)
    ) {
      // Ignore shortcut when inside an input.
      return;
    }

    // Check the keyboard event against the current command in the sequence
    check(keyboardEvent);
  });
}
