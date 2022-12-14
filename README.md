[![npm version](https://img.shields.io/npm/v/@mediamonks/react-hooks)](https://www.npmjs.com/package/@mediamonks/react-hooks)
[![npm downloads](https://img.shields.io/npm/dm/@mediamonks/react-hooks)](https://www.npmjs.com/package/@mediamonks/react-hooks)

# @mediamonks/react-hooks

Collection of commonly used React hooks.

## Getting started

### Installing

Add `@mediamonks/react-hooks` to your project:

```sh
npm i @mediamonks/react-hooks
```

### Example

Use a hook inside a component:

```tsx
import { useToggle } from '@mediamonks/react-hooks';

function DemoComponent() {
  const [state, toggle] = useToggle(false);

  return (
    <div>
      <div>{state} </div>
      <button onClick={() => toggle()}>Toggle</button>
    </div>
  );
}
```

## Docs

[https://mediamonks.github.io/react-hooks/](https://mediamonks.github.io/react-hooks/)

## Development

The information below should help you develop new hooks in this library.

Run `npm run test -- --watch` to run all unit tests in watch mode.

Run `npm run storybook` to preview your stories and documentation.

### Folder Structure

`useHookName`

- `useHookName.ts` – The Hook itself
- `useHookName.stories.tsx` – To showcase the hook with a working UI, also used for dom testing
- `useHookName.stories.mdx` – Documentation about the hook
- `useHookName.test.tsx` – Unit tests for the hook

### Steps for adding a new Hook:

Run the `plop` script and enter your hook name starting with `use`.

```shell
npm run plop
```

Which will execute the following steps, where you need to fill in the content.

- Create a new folder and a new `ts` file with the hook
  - Use the `use` prefix for the name of the hook
  - Use named exports to export the hook
  - Enter JSDoc for description and parameters
- Re-export the hook in the `index.ts`
- Add a markdown file documenting the hook
  - General description
  - Reference for types, parameters, return type
  - Simple and extended use cases
- Add a story file to test out the hook
  - Add an instructions banner at the top of the story
  - Create a type for the StoryArgs that match the template, so it can be used when rendering the
    Story inside tests.
- Add unit tests for the hook

## Writing Unit test

Hooks can be tested using the `renderHook` function that now exists in `@testing-library/react`.

At the time of writing, this method is undocumented. It can be used as follows:

```ts
import { renderHook } from '@testing-library/react';

// init the hook
const { result, rerender, unmount } = renderHook(useToggle, {
  // values passed to your hook
  initialProps: { foo: 'bar' },
});

// inspect the response of the hook
console.log(result.current);
```

### Run Component Lifecycle

To interact with your hook, you must use the `act` function.

```ts
import { act, renderHook } from '@testing-library/react';

// init the hook
const { result, rerender, unmount } = renderHook(useToggle, {
  // values passed to your hook
  initialProps: { foo: 'bar' },
});

// inspect the response of the hook
console.log(result.current);

await act(() => {
  // interact with your hook
  result.current[1]();
});

// inspect the updated value of the hook
console.log(result.current);
```
