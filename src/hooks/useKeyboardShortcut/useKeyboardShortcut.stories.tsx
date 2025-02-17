/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react/jsx-no-bind */
/* eslint-disable react/jsx-no-literals */
/* eslint-disable react/no-multi-comp */
import type { Meta, StoryObj } from '@storybook/react';
import { useRef, useState } from 'react';
import { useDebugMessage } from './useDebugMessage.js';
import { useKeyboardShortcut } from './useKeyboardShortcut.js';

const meta = {
  title: 'Hooks/useKeyboardShortcut',
  parameters: {
    layout: 'centered',
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  render: () => {
    const [lastPressed, setLastPressed] = useDebugMessage();

    useKeyboardShortcut(
      {
        command: 'h',
      },
      () => {
        setLastPressed('H key pressed!');
      },
    );

    return (
      <div>
        <h3>Basic Keyboard Shortcut</h3>
        <p>Press &apos;h&apos; to trigger the shortcut</p>
        <div>Last action: {lastPressed}</div>
      </div>
    );
  },
};

export const Combination: Story = {
  render: () => {
    const [lastPressed, setLastPressed] = useDebugMessage();

    useKeyboardShortcut(
      {
        command: 'cmd+s',
      },
      (event) => {
        event.preventDefault();
        setLastPressed('Save shortcut pressed! (Cmd/Ctrl + S)');
      },
    );

    return (
      <div>
        <h3>Combination Shortcut</h3>
        <p>Press Cmd+S (macOS) or Ctrl+S (Windows) to trigger</p>
        <div>Last action: {lastPressed}</div>
      </div>
    );
  },
};

export const PlatformSpecific: Story = {
  render: () => {
    const [lastPressed, setLastPressed] = useDebugMessage();

    useKeyboardShortcut(
      {
        macOsCommand: 'cmd+z',
        windowsCommand: 'ctrl+z',
      },
      () => {
        setLastPressed('Undo shortcut pressed!');
      },
    );

    return (
      <div>
        <h3>Platform-Specific Shortcut</h3>
        <p>Press Cmd+Z (macOS) or Ctrl+Z (Windows) to trigger</p>
        <div>Last action: {lastPressed}</div>
      </div>
    );
  },
};

export const InputField: Story = {
  render: () => {
    const [lastPressed, setLastPressed] = useDebugMessage();

    useKeyboardShortcut(
      {
        command: 'cmd+k',
      },
      (event) => {
        event.preventDefault();
        setLastPressed('Cmd+K pressed while input may be focused!');
      },
    );

    return (
      <div>
        <h3>Input Field Behavior</h3>
        <p>Press Cmd+K, it will work even when input is focused</p>
        <input type="text" placeholder="Type here..." />
        <div>Last action: {lastPressed}</div>
      </div>
    );
  },
};

export const CustomElement: Story = {
  render: () => {
    const [lastPressed, setLastPressed] = useDebugMessage();
    const buttonRef = useRef<HTMLButtonElement>(null);

    useKeyboardShortcut(
      {
        ref: buttonRef,
        command: 'e',
      },
      () => {
        setLastPressed('E pressed while button was focused!');
      },
    );

    return (
      <div>
        <h3>Custom Element Binding</h3>
        <p>Focus the button and press &apos;e&apos;</p>
        {/* eslint-disable-next-line react/button-has-type */}
        <button ref={buttonRef}>Focus me and press &apos;e&apos;</button>
        <div>Last action: {lastPressed}</div>
      </div>
    );
  },
};

export const SingleKeyAutoIgnore: Story = {
  render: () => {
    const [lastPressed, setLastPressed] = useDebugMessage();

    useKeyboardShortcut(
      {
        command: 'q',
      },
      () => {
        setLastPressed('Q key pressed! (ignored when input is focused)');
      },
    );

    return (
      <div>
        <h3>Single Key with Auto Ignore</h3>
        <p>Press &apos;q&apos; - shortcut will be ignored when input is focused</p>
        <input type="text" placeholder="Type here..." />
        <div>Last action: {lastPressed}</div>
      </div>
    );
  },
};

export const SingleKeyNoIgnore: Story = {
  render: () => {
    const [lastPressed, setLastPressed] = useDebugMessage();

    useKeyboardShortcut(
      {
        command: 'w',
        ignoreWhenInputFocussed: false,
      },
      () => {
        setLastPressed('W key pressed! (works even when input is focused)');
      },
    );

    return (
      <div>
        <h3>Single Key without Ignore</h3>
        <p>Press &apos;w&apos; - shortcut will work even when input is focused</p>
        <input type="text" placeholder="Type here..." />
        <div>Last action: {lastPressed}</div>
      </div>
    );
  },
};

export const Sequence: Story = {
  render: () => {
    const [lastPressed, setLastPressed] = useDebugMessage();

    useKeyboardShortcut(
      {
        command: ['alt+n', 'alt+m'],
      },
      (event) => {
        event.preventDefault();
        setLastPressed('Alt+N Alt+M sequence completed!');
      },
    );

    return (
      <div>
        <h3>Sequence Shortcut</h3>
        <p>Press Alt+N followed by Alt+M within 1 second</p>
        <div>Last action: {lastPressed}</div>
      </div>
    );
  },
};

export const KonamiCode: Story = {
  render: () => {
    const [lastPressed, setLastPressed] = useDebugMessage();
    const [cheatActivated, setCheatActivated] = useState(false);

    useKeyboardShortcut(
      {
        command: ['up', 'up', 'down', 'down', 'left', 'right', 'left', 'right', 'b', 'a'],
      },
      () => {
        setLastPressed('Konami Code Activated! 🎮');
        setCheatActivated(true);
      },
    );

    return (
      <div>
        <h3>Konami Code</h3>
        <p>Enter the Konami Code: ↑ ↑ ↓ ↓ ← → ← → B A</p>
        <div>Last action: {lastPressed}</div>
        {cheatActivated && (
          <div style={{ marginTop: '1rem', fontSize: '2rem' }}>
            🎉 Congratulations! You found the secret! 🎉
          </div>
        )}
      </div>
    );
  },
};
