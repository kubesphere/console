/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import React, { createContext, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { StoreApi, createStore, useStore } from 'zustand';
import mitt from 'mitt';

interface Event {
  providerId?: string;
  key: string;
  value: any | ((value: any) => any);
}
const emitter = mitt<Record<string, Event>>();
interface Store {
  storage: Record<string, any>;
  storageAtom: Record<string, number>;
  setStorage: (key: string, value: any | ((value: any) => any)) => void;
}

const StoreContext = createContext<{
  store: StoreApi<Store> | undefined;
  providerId: string;
  defaultValues: Record<string, any>;
}>(undefined as any);

export const CacheStoreProvider = ({ children }: { children: React.ReactNode }) => {
  const providerId = useRef<string>(Math.random().toString(36).slice(2));
  const storeRef = useRef<StoreApi<Store>>();
  const defaultValuesRef = useRef<Record<string, any>>({});
  if (!storeRef.current) {
    storeRef.current = createStore(set => ({
      storage: {},
      storageAtom: {},
      setStorage: (key, value) => {
        return set(state => {
          const v = typeof value === 'function' ? value(state.storage[key]) : value;
          return {
            storage: { ...state.storage, [key]: v },
            storageAtom: { ...state.storageAtom, [key]: (state.storageAtom[key] || 0) + 1 },
          };
        });
      },
    }));
  }

  const handleMutateCacheStore = (event: Event) => {
    const { providerId: id, key, value } = event;
    if (id && id !== providerId.current) {
      return;
    } else {
      storeRef.current?.getState().setStorage(key, value);
    }
  };
  useEffect(() => {
    emitter.on(providerId.current, handleMutateCacheStore);
    emitter.on('CacheStoreProvider-*', handleMutateCacheStore);
    return () => {
      emitter.off(providerId.current, handleMutateCacheStore);
      emitter.on('CacheStoreProvider-*', handleMutateCacheStore);
    };
  }, []);
  const value = useMemo(() => {
    return {
      store: storeRef.current,
      providerId: providerId.current,
      defaultValues: defaultValuesRef.current,
    };
  }, [providerId.current, storeRef.current, defaultValuesRef.current]);
  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
};

export const useCacheProviderId = () => {
  const { providerId } = useContext(StoreContext);
  if (!providerId) {
    throw new Error('useCacheProviderId must be used within a CacheStoreProvider');
  }
  return useMemo(() => providerId, [providerId]);
};

export function useCacheStore<T = any>(
  key: string,
  initialState?: T,
): [T, (v: T | ((v: T) => T)) => void] {
  const { store, defaultValues } = useContext(StoreContext);
  if (!store) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  const id = useStore(store, state => state.storageAtom[key]);
  const [initialValue] = useState(() => {
    if (initialState !== undefined) {
      defaultValues[key] = initialState;
    }
    if (id === undefined) {
      return defaultValues[key];
    }
  });
  const value = useStore(store, state => state.storage[key]);
  const setValue = (v: T | ((v: T) => T)) => store.getState().setStorage(key, v);

  const v = id === undefined ? initialValue : value;
  return [v, setValue];
}

export const mutateCacheStore = (
  key: string,
  value: any | ((value: any) => any),
  providerId?: string,
) => {
  emitter.emit(providerId || 'CacheStoreProvider-*', { key, value, providerId });
};
