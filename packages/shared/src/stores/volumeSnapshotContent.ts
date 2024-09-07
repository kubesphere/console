/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

// import { useMutation } from 'react-query';
import { get, isEmpty } from 'lodash';

import type { VolumeSnapshotContentDetail } from '../types';

// import { request } from '../utils';
import { getBaseInfo, getOriginData } from '../utils/getter';
import getBaseStore from './store';

const module = 'volumesnapshotcontents';
// const resourceKind = 'VolumeSnapshotContent';

const mapper = <T extends Record<string, any>>(item: T): VolumeSnapshotContentDetail => {
  const { spec = {}, status = {}, metadata = {} } = item;
  const { deletionTimestamp = '', creationTimestamp = '' } = metadata;
  const { error = {}, readyToUse, snapshotHandle } = status;
  const { message } = error;

  return {
    ...getBaseInfo(item),
    creationTimestamp,
    deletionTimestamp,
    namespace: get(spec, 'volumeSnapshotRef.namespace'),
    snapshotClassName: get(spec, 'volumeSnapshotClassName', '-'),
    volumeSnapshot: get(spec, 'volumeSnapshotRef.name'),
    annotations: get(item, 'metadata.annotations'),
    labels: get(item, 'metadata.labels'),
    deletionPolicy: get(spec, 'deletionPolicy', '-'),
    driver: get(spec, 'driver', ''),
    source: get(spec, 'source', {}),
    error,
    errorMessage: message,
    generating: !readyToUse && isEmpty(error),
    readyToUse,
    status: readyToUse ? 'ready' : 'unready',
    snapshotHandle,
    restoreSize: get(status, 'restoreSize', 0),
    _originData: getOriginData(item),
  };
};

const baseStore = getBaseStore({
  module,
  mapper,
});

const store = {
  ...baseStore,
  module,
  mapper,
};

export default store;
