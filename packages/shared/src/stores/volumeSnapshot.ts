/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import { get, isEmpty } from 'lodash';
import { getBaseInfo, getOriginData } from '../utils';
import type { VolumeSnapshotDetail } from '../types';
import getBaseStore from './store';
import { getStoreWithQueryHooks } from './useStore';

const module = 'volumesnapshots';
// const resourceKind = 'VolumeSnapshot';

const mapper = <T extends Record<string, any>>(item: T): VolumeSnapshotDetail => {
  const { spec = {}, status = {}, metadata = {} } = item;
  const { error = {}, readyToUse } = status;
  const { message } = error;
  const { namespace = '', deletionTimestamp = '' } = metadata;
  const snapshotSourceName = get(spec, 'source.persistentVolumeClaimName');

  return {
    ...getBaseInfo(item),
    snapshotClassName: get(spec, 'volumeSnapshotClassName', '-'),
    restoreSize: get(status, 'restoreSize', 0),
    error,
    errorMessage: message,
    generating: !readyToUse && isEmpty(error),
    readyToUse,
    backupStatus: deletionTimestamp ? 'deleting' : readyToUse ? 'success' : 'updating',
    namespace,
    snapshotSourceName,
    _originData: getOriginData(item),
  };
};

const baseStore = getBaseStore({
  module,
  mapper,
});

const store = {
  ...getStoreWithQueryHooks(baseStore),
  module,
  mapper,
};

export default store;
