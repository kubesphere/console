/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import { get } from 'lodash';
import { getBaseInfo, getOriginData } from '../utils';
import type { PVDetail } from '../types';
import { getVolumePhase } from './pvc';
import getBaseStore from './store';

const module = 'persistentvolumes';
const mapper = <T extends Record<string, any>>(item: T): PVDetail => {
  const creationTime = get(item, 'metadata.creationTimestamp');

  return {
    creationTime,
    phase: getVolumePhase(item),
    ...getBaseInfo(item),
    storageProvisioner: get(item, 'metadata.annotations["pv.kubernetes.io/provisioned-by"]'),
    status: get(item, 'status', {}),
    resourceVersion: get(item, 'metadata.resourceVersion'),
    annotations: get(item, 'metadata.annotations'),
    labels: get(item, 'metadata.labels'),
    accessMode: get(item, 'spec.accessModes[0]'),
    accessModes: get(item, 'spec.accessModes'),
    storageClassName: get(item, 'spec.storageClassName'),
    capacity: get(item, 'spec.capacity.storage', get(item, 'spec.resources.requests.storage')),
    volumeHandle: get(item, 'spec.csi.volumeHandle'),
    inUse: get(item, 'metadata.annotations["kubesphere.io/in-use"]') === 'true',
    type: 'pvc',
    persistentVolumeReclaimPolicy: get(item, 'spec.persistentVolumeReclaimPolicy'),
    volumeMode: get(item, 'spec.volumeMode'),
    _originData: getOriginData(item),
  };
};

const baseStore = getBaseStore({ module, mapper });

const store = {
  ...baseStore,
  module,
  mapper,
};

export default store;
