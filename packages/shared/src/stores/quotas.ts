import getBaseStore from './store';
import { getStoreWithQueryHooks } from './useStore';
import { getApiVersion } from '../utils';

const module = 'resourcequotas';

const apiVersion = getApiVersion(module);

const mapper = (d: Record<string, any>) => d;

const baseStore = getBaseStore({
  module,
  mapper,
  apiVersion,
});

const store = {
  ...baseStore,
  apiVersion,
  module,
  mapper,
};

export default getStoreWithQueryHooks(store);
