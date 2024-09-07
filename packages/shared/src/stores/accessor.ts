/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import { PathParams } from '../types';
import getBaseStore from './store';
import { getStoreWithQueryHooks } from './useStore';

const module = 'accessors';
const apiVersion = 'apis/storage.kubesphere.io/v1alpha1';

const baseStore = getBaseStore({ module, apiVersion });

const patch = (store: typeof baseStore) => {
  return (params: PathParams, data: Record<string, any>) => {
    return store.patch(params, data, {
      headers: {
        'x-ignore-error-notify': 'true',
      },
    });
  };
};
const store = {
  ...baseStore,
  module,
  patch: patch(baseStore),
};

export default getStoreWithQueryHooks(store);
