import type { CharacterKey, KeyCode } from './keyCodes.js';

export type Key = KeyCode;

type EnglishAlphabetCharacters =
  | 'a'
  | 'b'
  | 'c'
  | 'd'
  | 'e'
  | 'f'
  | 'g'
  | 'h'
  | 'i'
  | 'j'
  | 'k'
  | 'l'
  | 'm'
  | 'n'
  | 'o'
  | 'p'
  | 'q'
  | 'r'
  | 's'
  | 't'
  | 'u'
  | 'v'
  | 'w'
  | 'x'
  | 'y'
  | 'z';
type LatinDigits = '0' | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9';
type FunctionKeys =
  | 'f1'
  | 'f2'
  | 'f3'
  | 'f4'
  | 'f5'
  | 'f6'
  | 'f7'
  | 'f8'
  | 'f9'
  | 'f10'
  | 'f11'
  | 'f12';
type NavigationKeys = 'down' | 'left' | 'right' | 'up' | 'end' | 'home' | 'pageup' | 'pagedown';
type EditingKeys = 'space' | 'backspace' | 'delete' | 'enter' | 'insert' | 'tab';
type UiKeys = 'escape';

export type SimpleKey =
  | EnglishAlphabetCharacters
  | LatinDigits
  | FunctionKeys
  | NavigationKeys
  | EditingKeys
  | UiKeys
  | CharacterKey;
export type Modifier = 'ctrl' | 'shift' | 'alt' | 'meta' | 'cmd';

// only create types for single and double modifiers
// if you want three or 4, use the array type instead, or use a cast (runtime it will work)
export type CombinedCommand =
  | `${Modifier}+${SimpleKey}`
  | `ctrl+${Exclude<Modifier, 'ctrl'>}+${SimpleKey}`
  | `cmd+${Exclude<Modifier, 'cmd'>}+${SimpleKey}`
  | `shift+${Exclude<Modifier, 'shift'>}+${SimpleKey}`;

// 'a', ['ctrl', 'a'], 'ctrl+a'
export type SimpleCommand =
  | SimpleKey
  | Modifier
  | [...Array<Modifier>, SimpleKey]
  | CombinedCommand;

export type Command = {
  code: Key;
  ctrlKey?: boolean;
  shiftKey?: boolean;
  altKey?: boolean;
  // Cmd on MacOS
  metaKey?: boolean;
};

// SimpleCommand can be:
// - a single key, e.g. 'a'
// - a shortcut, e.g. ['ctrl', 'b']
// - a shortcut, e.g. 'ctrl+b'
// - a sequence of keys, e.g. ['a', 'b', 'c']
// - a sequence of shortcuts, e.g. [['ctrl', 'b'], ['ctrl', 'c']]
// - a sequence of shortcuts, e.g. [['ctrl+b'], ['ctrl+c']]
export type SimpleShortcut =
  | SimpleCommand
  | Array<SimpleCommand>
  | Array<Array<SimpleKey | Modifier>>;

export type Shortcut = Command | Array<Command> | SimpleShortcut;

/* eslint-disable @typescript-eslint/no-unused-vars */
// const x: SimpleShortcut = 'x';
// const ctrlX: SimpleShortcut = ['ctrl', 'x'];
// const ctrlShiftX: SimpleShortcut = ['ctrl', 'shift', 'x'];
// const gi: SimpleShortcut = ['g', 'i'];
// // eslint-disable-next-line @typescript-eslint/naming-convention
// const ctrlKCtrlS: SimpleShortcut = [
//   ['ctrl', 'k'],
//   ['ctrl', 's'],
// ];

// const ctrlY: SimpleShortcut = ['ctrl+y'];
// const ctrlShiftSpace: SimpleShortcut = ['ctrl+shift+space'];
