import type { StoryObj } from '@storybook/react';
import { shuffle } from 'lodash-es';
import { useRef, useState, type ReactElement } from 'react';
import { useRefs } from './useRefs';
import type { Refs } from './useRefs.types';
import { arrayRef } from './useRefs.util';

export default {
  title: 'useRefs',
};

type DemoComponentRefs = Refs<{
  item1: HTMLDivElement;
  item2: HTMLParagraphElement;
  btnMore: HTMLButtonElement;
  listItems: Array<HTMLElement | null>;
  keyList: Array<HTMLElement | null>;
}>;

// eslint-disable-next-line @typescript-eslint/naming-convention
function DemoComponent(): ReactElement {
  const listItemsRef = useRef([]);
  const keyListRef = useRef([]);

  const refs = useRefs<DemoComponentRefs>({
    listItems: listItemsRef,
    keyList: keyListRef,
  });

  const [count, setCount] = useState(3);
  const [keyList, setKeyList] = useState(['key A', 'key B', 'key C']);

  return (
    <div>
      <div className="alert alert-primary">
        <h4 className="alert-heading">Instructions!</h4>
        <p>See the collected refs from the Test Area below.</p>
        <p>If you add more or less items, you can test how array capturing works.</p>
        <p className="mb-0">
          If you shuffle the key list, you can test what happens when using stable keys that update
          in the array.
        </p>
      </div>
      <div>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Ref name</th>
              <th scope="col">Resolved Element</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td scope="row">item1</td>
              <td>
                <code>{refs.item1.current?.outerHTML ?? null}</code>
              </td>
            </tr>
            <tr>
              <td>item2</td>
              <td>
                <code>{refs.item2.current?.outerHTML ?? null}</code>
              </td>
            </tr>
            <tr>
              <td>btnMore</td>
              <td>
                <code>{refs.btnMore.current?.outerHTML ?? null}</code>
              </td>
            </tr>
            <tr>
              <td>itemList</td>
              <td>
                <code>
                  <pre>
                    {refs.listItems.current?.map((element) => element?.outerHTML).join('\n')}
                  </pre>
                </code>
              </td>
            </tr>
            <tr>
              <td>keyList</td>
              <td>
                <code>
                  <pre>{refs.keyList.current?.map((element) => element?.outerHTML).join('\n')}</pre>
                </code>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="card border-dark" data-ref="test-area">
        <div className="card-header">Test Area</div>
        <div className="card-body">
          <div ref={refs.item1}>container 1</div>
          <p ref={refs.item2}>paragraph 2</p>
          <button
            type="button"
            className="btn btn-danger btn-sm"
            onClick={(): void => {
              setCount((oldCount) => Math.max(0, oldCount - 1));
            }}
          >
            Less
          </button>{' '}
          <button
            type="button"
            className="btn btn-success btn-sm"
            onClick={(): void => {
              setCount((oldCount) => Math.min(10, oldCount + 1));
            }}
            ref={refs.btnMore}
          >
            More
          </button>
          <ul>
            {Array.from({ length: count }, (_, index) => (
              <li key={`item${index}`} ref={arrayRef(refs.listItems, index)}>
                list item {index}
              </li>
            ))}
          </ul>
          <button
            type="button"
            className="btn btn-primary btn-sm"
            onClick={(): void => {
              setKeyList(shuffle(keyList));
            }}
          >
            Shuffle
          </button>
          <ul>
            {keyList.map((item, index) => (
              <li key={item} ref={arrayRef(refs.keyList, index)}>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export const demo: StoryObj = {
  render() {
    return <DemoComponent />;
  },
  name: 'demo',
  args: {
    initialValue: true,
  },
};
