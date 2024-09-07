/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import { Reducer } from 'react';
import * as React from 'react';
import { Outlet } from 'react-router-dom';

export interface ModalProps {
  key: string;
  [propName: string]: any;
}
interface IModalState {
  id: number;
  map: Map<string, ModalProps>;
  keyIndex?: number;
}

interface IDisPatch {
  type: string;
  payload: ModalProps;
}
export const ModalDispatcherContext = React.createContext<React.Dispatch<IDisPatch> | null>(null);

const reducer = (state: IModalState, action: IDisPatch) => {
  const id = state.id + 1;
  const { map } = state;
  switch (action.type) {
    case 'update': {
      const item = { ...(map.get(action.payload.key) ?? {}), ...action.payload };
      map.set(item.key, item);
      return {
        id,
        map,
      };
    }
    case 'show': {
      const item = { visible: true, ...action.payload };
      map.set(item.key, item);
      return {
        id,
        map,
      };
    }
    case 'hide':
      map.delete(action.payload.key);
      return {
        id,
        map,
      };
    default:
      return state;
  }
};

const Empty = () => null;
export const ModalProvider = ({
  children,
}: {
  children: React.ReactChildren | React.ReactChild;
}) => {
  const [{ map }, dispatch] = React.useReducer<
    Reducer<IModalState, { type: string; payload: ModalProps }>
  >(reducer, { id: 1, map: new Map() });

  return (
    <ModalDispatcherContext.Provider value={dispatch}>
      <>
        {children}
        {Array.from(map.values()).map(item => {
          const { modal: Component = Empty, key, ...rest } = item;

          return item.visible ? <Component {...rest} visible key={key} /> : null;
        })}
      </>
    </ModalDispatcherContext.Provider>
  );
};

export const ModalProviderLayout = () => {
  return (
    <ModalProvider>
      <Outlet />
    </ModalProvider>
  );
};

export function withModalProvider<T>(WrappedComponent: React.ComponentType<T>) {
  return React.forwardRef((props: T, ref) => (
    <ModalProvider>
      <WrappedComponent {...props} ref={ref} />
    </ModalProvider>
  ));
}
