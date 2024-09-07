/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import { Modal } from '@kubed/components';
import React, { useCallback, useContext } from 'react';
import { MutationOp, getStoreWithQueryHooks } from './useStore';
import { ModalDispatcherContext } from './ModalProvider';

type ObjectType = Record<string, any>;
export const modalContextKey = '__modalContextKey';
export function withModalMutationHoc<T>(
  useHook: (d: ObjectType) => {
    isLoading: false;
    onOk: (modalContext: ObjectType, data?: ObjectType) => void;
  },
) {
  return (WrappedComponent: React.ComponentType<T>) => {
    const displayName = WrappedComponent.displayName || WrappedComponent.name || 'Component';

    const ComponentWithMutation = (props: ObjectType) => {
      const { forwardedRef } = props;
      const { isLoading, onOk: onOkProp } = useHook(props);
      const onOk = (data: ObjectType) => {
        onOkProp(props[modalContextKey], data);
      };

      // @ts-ignore
      return (
        <WrappedComponent
          ref={forwardedRef}
          {...(props as T)}
          confirmLoading={isLoading}
          onOk={onOk}
        />
      );
    };

    ComponentWithMutation.displayName = `withModalMutation(${displayName})`;

    return React.forwardRef((props: T, ref) => (
      <ComponentWithMutation {...props} forwardedRef={ref} />
    ));
  };
}

export const getUseBaseModal =
  (
    modal: React.ComponentType<any>,
    getBasePropsByContext: (d: ObjectType) => ObjectType = d => d,
  ) =>
  ({ key, deps }: { key: string; deps?: ObjectType }) => {
    const dispatch = useContext(ModalDispatcherContext);

    const getState = React.useRef<(d?: ObjectType) => [ObjectType, ObjectType]>();
    const activeRef = React.useRef(false);
    const depsRef = React.useRef(deps);
    depsRef.current = deps;

    React.useEffect(() => {
      if (activeRef.current && typeof getState.current === 'function') {
        const [props, context] = getState.current(deps);
        dispatch?.({
          type: 'update',
          payload: {
            ...getBasePropsByContext(context),
            ...props,
            [modalContextKey]: context,
            key,
          },
        });
      }
    }, [deps]);

    const close = useCallback(() => {
      activeRef.current = false;

      dispatch?.({
        type: 'hide',
        payload: {
          key,
        },
      });
    }, []);

    const open = useCallback(
      (props, context) => {
        activeRef.current = false;
        dispatch?.({
          type: 'show',
          payload: {
            onCancel: close,
            ...getBasePropsByContext(context),
            ...props,
            key,
            [modalContextKey]: context,
            modal,
          },
        });
      },
      [dispatch],
    );
    const openWithDeps = useCallback(
      (fn: (v?: ObjectType) => [ObjectType, ObjectType]) => {
        getState.current = fn;
        activeRef.current = true;
        const [props, context] = fn(depsRef.current);
        dispatch?.({
          type: 'show',
          payload: {
            onCancel: close,
            ...getBasePropsByContext(context),
            ...props,
            key,
            [modalContextKey]: context,
            modal,
          },
        });
      },
      [dispatch, deps],
    );
    return { open, close, openWithDeps };
  };

export const useBaseModal = getUseBaseModal(Modal);

interface ModalContextAction<T extends ObjectType> {
  getVariablesByContext?: (
    content: T,
    data?: any,
  ) =>
    | { op?: MutationOp; params: ObjectType; data?: unknown }
    | Promise<{ op?: MutationOp; params: ObjectType; data?: unknown }>;
  getHook?: (
    props: ObjectType & {
      store?: ReturnType<typeof getStoreWithQueryHooks> & { module: string };
    },
  ) => Function;
  op?: MutationOp;
}

export const getUseModalAction =
  <T extends ObjectType>({
    getVariablesByContext = ({ params }, data) => ({
      params,
      data,
    }),
    getHook = ({ store }) => store?.useMutations!,
    op,
  }: ModalContextAction<T>) =>
  (props: ObjectType) => {
    const { isLoading, mutate } = getHook(props)(op);
    const onOk = async (context: T, data?: unknown) => {
      const { onSuccess, onError, onSettled } = context;
      let d = await getVariablesByContext(context, data);
      mutate(d, {
        onSuccess,
        onError,
        onSettled,
      });
    };
    return { isLoading, onOk };
  };

// type TProps<T> = React.ComponentProps<React.ComponentType<T>>;
interface UseModalConfig<TProps, TContext extends ObjectType> {
  getHook?: (
    props: ObjectType & {
      store?: ReturnType<typeof getStoreWithQueryHooks> & { module: string } & ObjectType;
    },
  ) => Function;
  op?: MutationOp;
  component: React.ComponentType<TProps>;
  contextAndData2data?: (
    content: TContext,
    data: any,
  ) =>
    | { op?: MutationOp; params: ObjectType; data?: unknown }
    | Promise<{ op?: MutationOp; params: ObjectType; data?: unknown }>;
  key: string;
  context2props?: (context: TContext) => Partial<TProps>;
}

type ModalAction<TProps, Context, D> = {
  open: (props: TProps, context: Context) => void;
  close: () => void;
  openWithDeps: (fn: (v: D) => [TProps, Context]) => void;
};

export function getUseModal<Context extends ObjectType, TProps>(
  config: UseModalConfig<TProps, Context>,
) {
  const { getHook, op, context2props, key, component, contextAndData2data } = config;
  const useAction = getUseModalAction({
    op,
    getHook,
    getVariablesByContext: contextAndData2data,
  });
  const Component = withModalMutationHoc<any>(useAction as any)(component);

  return function <D>({
    key: _key = key,
    deps,
  }: {
    key?: string;
    deps?: D;
  } = {}): ModalAction<
    Partial<TProps> & { store: ObjectType },
    Context & Partial<Record<'onSuccess' | 'onError' | 'onSettled', Function>>,
    D
  > {
    return getUseBaseModal(
      Component,
      context2props as any,
    )({ key: _key, deps: deps as ObjectType }) as any;
  };
}
