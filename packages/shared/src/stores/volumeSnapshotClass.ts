/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import { VolumeSnapshotClassDetail } from '../index';
import { get } from 'lodash';
import { getBaseInfo, getOriginData } from '../utils/getter';
import getBaseStore from './store';
import { getStoreWithQueryHooks } from './useStore';

const module = 'volumesnapshotclasses';

const mapper = <T extends Record<string, any>>(item: T): VolumeSnapshotClassDetail => {
  const { metadata = {}, apiVersion, driver, deletionPolicy, kind } = item;
  const { deletionTimestamp = '', creationTimestamp = '' } = metadata;

  return {
    ...getBaseInfo(item),
    apiVersion,
    driver,
    deletionPolicy,
    kind,
    count: get(metadata, 'annotations["kubesphere.io/snapshot-count"]', 0),
    creationTimestamp,
    deletionTimestamp,
    _originData: getOriginData(item),
  };
};

const baseStore = getBaseStore({
  module,
  mapper,
  // apiVersion: 'apis/snapshot.storage.k8s.io/v1beta1',
});

const store = {
  ...getStoreWithQueryHooks(baseStore),
  module,
  mapper,
  apiVersion: 'snapshot.storage.k8s.io/v1beta1',
};

export default store;
