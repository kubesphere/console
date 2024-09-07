/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import { get } from 'lodash';
import { getOriginData, getBaseInfo } from '../utils';
import baseStore from './store';

import type { FormattedNetworkPolicy, OriginalNetworkPolicy } from '../types';

const mapper = (item: OriginalNetworkPolicy): FormattedNetworkPolicy => {
  return {
    ...getBaseInfo<OriginalNetworkPolicy>(item),
    namespace: get(item, 'metadata.namespace'),
    key: `${get(item, 'metadata.namespace')}-${get(item, 'metadata.name')}`,
    _originData: getOriginData<OriginalNetworkPolicy>(item),
  };
};

const module = 'networkpolicies';

const BaseStore = baseStore({ module, mapper });

const store = {
  ...BaseStore,
  module,
  mapper,
};

export default store;
