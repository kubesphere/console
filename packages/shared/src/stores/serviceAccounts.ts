/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import { get } from 'lodash';

import baseStore from './store';
import { getOriginData, getBaseInfo } from '../utils';
import type { FormattedServiceAccount, OriginalServiceAccount } from '../types';

const module = 'serviceaccounts';

const mapper = (item: OriginalServiceAccount): FormattedServiceAccount => {
  return {
    ...getBaseInfo<OriginalServiceAccount>(item),
    namespace: get(item, 'metadata.namespace'),
    labels: get(item, 'metadata.labels', {}) as FormattedServiceAccount['labels'],
    annotations: get(item, 'metadata.annotations', {}) as FormattedServiceAccount['annotations'],
    role: get(item, 'metadata.annotations["iam.kubesphere.io/role"]', ''),
    secrets: get(item, 'secrets', []),
    _originData: getOriginData<OriginalServiceAccount>(item),
  };
};

const BaseStore = baseStore<FormattedServiceAccount>({ module, mapper });

const store = {
  ...BaseStore,
  module,
  mapper,
};

export default store;
