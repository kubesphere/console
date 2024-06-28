import getBaseStore from './store';
import { getStoreWithQueryHooks } from './useStore';

const module = 'limitranges';
const apiVersion = 'api/v1';
const mapper = <T extends Record<string, any>>(item: T) => item;

const baseStore = getBaseStore({ module, mapper, apiVersion });

const store = {
  ...baseStore,
  module,
  mapper,
};

export default getStoreWithQueryHooks(store);
