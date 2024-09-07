/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import { get } from 'lodash';
import { getBaseInfo, getOriginData } from '../utils';
import type { VolumeDetail } from '../types';
import getBaseStore from './store';

const module = 'persistentvolumeclaims';

export const getVolumePhase = <T extends Record<string, any>>(item: T) => {
  const phase = get(item, 'status.phase') ?? undefined;
  const deletionTime = get(item, 'metadata.deletionTimestamp');

  if (deletionTime) {
    return 'Terminating';
  }

  if (phase === 'Pendiente') {
    return 'Pending';
  }

  return phase;
};

const mapper = <T extends Record<string, any>>(item: T): VolumeDetail => {
  const deletionTime = get(item, 'metadata.deletionTimestamp');
  return {
    deletionTime,
    phase: getVolumePhase(item),
    ...getBaseInfo(item),
    storageProvisioner: get(
      item,
      'metadata.annotations["volume.beta.kubernetes.io/storage-provisioner"]',
    ),
    status: get(item, 'status', {}),
    conditions: get(item, 'status.conditions', []),
    namespace: get(item, 'metadata.namespace'),
    labels: get(item, 'metadata.labels'),
    annotations: get(item, 'metadata.annotations'),
    accessMode: get(item, 'spec.accessModes[0]'),
    accessModes: get(item, 'spec.accessModes'),
    storageClassName: get(item, 'spec.storageClassName'),
    resources: get(item, 'spec.resources'),
    capacity: get(item, 'status.capacity.storage', get(item, 'spec.resources.requests.storage')),
    inUse:
      get(item, 'metadata.annotations["kubesphere.io/in-use"]') === 'true' ||
      get(item, 'status.phase') === 'Bound',
    type: 'pvc',
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
