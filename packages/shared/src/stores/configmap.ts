/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import { get } from 'lodash';

import baseStore from './store';
import { getOriginData, getBaseInfo } from '../utils';
import type { FormattedConfigMap, OriginalConfigMap } from '../types';

const module = 'configmaps';

const mapper = (item: OriginalConfigMap): FormattedConfigMap => {
  return {
    ...getBaseInfo<OriginalConfigMap>(item),
    type: get(item, 'type'),
    data: get(item, 'data'),
    binaryData: get(item, 'binaryData'),
    labels: get(item, 'metadata.labels', {}) as FormattedConfigMap['labels'],
    namespace: get(item, 'metadata.namespace'),
    annotations: get(item, 'metadata.annotations') as unknown as FormattedConfigMap['annotations'],
    _originData: getOriginData<OriginalConfigMap>(item),
  };
};

const BaseStore = baseStore<FormattedConfigMap>({ module, mapper });

const store = {
  ...BaseStore,
  module,
  mapper,
};

export default store;
