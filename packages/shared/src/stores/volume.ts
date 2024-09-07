/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import { get } from 'lodash';
import { getBaseInfo, getOriginData } from '../utils';

//TODO: type
const getVolumePhase = (item: any) => {
  const phase = get(item, 'status.phase');
  const deletionTime = get(item, 'metadata.deletionTimestamp');

  if (deletionTime) {
    return 'Terminating';
  }

  return phase;
};

export const VolumeMapper = (item: any) => {
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

export const getVolumeType = (volume: any) => {
  if (volume.persistentVolumeClaim) {
    return 'Volume';
  }
  if (volume.HostPath) {
    return 'HostPath';
  }
  if (volume.emptyDir) {
    return 'EmptyDir';
  }
};
