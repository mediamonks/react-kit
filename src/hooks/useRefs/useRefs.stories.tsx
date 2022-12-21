/* eslint-disable react/jsx-no-bind, react/no-multi-comp, react/jsx-no-literals */
import type { StoryObj } from '@storybook/react';
import { shuffle } from 'lodash-es';
import { useEffect, useState, type ReactElement } from 'react';
import { arrayRef } from '../../utils/arrayRef/arrayRef';
import { useRefs } from './useRefs';
import type { MutableRefs } from './useRefs.types';

export default {
  title: 'hooks/useRefs',
};

type MyRefs = MutableRefs<{
  item1: HTMLDivElement;
  item2: HTMLDivElement;
  btnMore: HTMLButtonElement | null;
  listItems: Array<HTMLLIElement>;
  keyList: Array<HTMLLIElement>;
}>;

type RefTableProps = {
  refs: MyRefs;
};

function useRerender(interval = 100): void {
  // eslint-disable-next-line react/hook-use-state
  const [, setRenderState] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setRenderState((oldValue) => oldValue + 1);
    }, interval);
    return (): void => {
      clearInterval(id);
    };
  }, [interval]);
}

function RefTable({ refs }: RefTableProps): ReactElement {
  // force re-render to show the new value of these refs
  useRerender();

  return (
    <table className="table">
      <thead>
        <tr>
          <th scope="col">Ref name</th>
          <th scope="col">Resolved Element</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>item1</td>
          <td>
            <code>{refs.item1.current?.outerHTML ?? null}</code>
          </td>
        </tr>
        <tr>
          <th>item2</th>
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
          <td>listItems</td>
          <td>
            <code>
              <pre>{refs.listItems.current?.map((element) => element.outerHTML).join('\n')}</pre>
            </code>
          </td>
        </tr>
        <tr>
          <td>keyList</td>
          <td>
            <code>
              <pre>{refs.keyList.current?.map((element) => element.outerHTML).join('\n')}</pre>
            </code>
          </td>
        </tr>
      </tbody>
    </table>
  );
}

function DemoComponent(): ReactElement {
  const refs = useRefs<MyRefs>();

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

      <RefTable refs={refs} />

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

export const Demo: StoryObj = {
  name: 'Demo',
  render() {
    return <DemoComponent />;
  },
};
