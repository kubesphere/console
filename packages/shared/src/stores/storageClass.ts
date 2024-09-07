/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import { get } from 'lodash';
import type { PathParams, StorageClassDetail } from '../types';
import { getBaseInfo, getOriginData } from '../utils/getter';
import getBaseStore from './store';
import { getStoreWithQueryHooks } from './useStore';
import { useMutation } from 'react-query';
import { getPath } from '../hooks';

const module = 'storageclasses';
const apiVersion = '/kapis/storage.k8s.io/v1';
const getResourceUrlFn = (params?: PathParams): string => {
  return `${apiVersion}${getPath(params)}/storageclasses`;
};

const mapper = <T extends Record<string, any>>(item: T): StorageClassDetail => ({
  ...getBaseInfo(item),
  annotations: get(item, 'metadata.annotations', {}),
  default:
    get(item, 'metadata.annotations["storageclass.kubernetes.io/is-default-class"]') === 'true' ||
    get(item, 'metadata.annotations["storageclass.beta.kubernetes.io/is-default-class"]') ===
      'true',
  parameters: get(item, 'parameters'),
  provisioner: get(item, 'provisioner'),
  reclaimPolicy: get(item, 'reclaimPolicy'),
  volumeBindingMode: get(item, 'volumeBindingMode'),
  allowVolumeExpansion: get(item, 'allowVolumeExpansion'),
  supportSnapshot:
    get(item, "metadata.annotations['storageclass.kubesphere.io/support-snapshot']") === 'true',
  associationPVCCount: Number(get(item, 'metadata.annotations["kubesphere.io/pvc-count"]')),
  _originData: getOriginData(item),
});

const baseStore = getBaseStore({ module, mapper, apiVersion, getResourceUrlFn });

const getUseMutationDefault = (store: typeof baseStore) => {
  return () => {
    return useMutation(
      async ({
        params,
        data: { defaultName, name },
      }: {
        params: PathParams;
        data: { defaultName?: string; name: string };
      }) => {
        if (defaultName === name) {
          return void 0;
        }
        if (defaultName) {
          await store.patch(
            { ...params, name: defaultName },
            {
              metadata: {
                annotations: {
                  'storageclass.kubernetes.io/is-default-class': 'false',
                  'storageclass.beta.kubernetes.io/is-default-class': 'false',
                },
              },
            },
          );
        }
        await store.patch(
          { ...params, name },
          {
            metadata: {
              annotations: {
                'storageclass.kubernetes.io/is-default-class': 'true',
                'storageclass.beta.kubernetes.io/is-default-class': 'true',
              },
            },
          },
        );
      },
    );
  };
};
const store = {
  ...baseStore,
  module,
  mapper,
  useMutationDefault: getUseMutationDefault(baseStore),
};

export default getStoreWithQueryHooks(store);
