/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import { storageClassStore } from '@ks-console/shared';
import { getUseModalAction } from '../../../../../../components/useModal';
import { pick, set } from 'lodash';

export const useUpdateStorageClasses = getUseModalAction({
  op: 'UPDATE',
});

export const usePutAccessor = getUseModalAction({
  getVariablesByContext: (_, data?: Record<string, any>) => {
    return {
      op: 'PUT',
      data,
      params: pick(data, ['name', 'cluster']),
    };
  },
});

export const usePatchStorageClasses = getUseModalAction({
  op: 'PATCH',
});

export const useUpdateDefaultStorageClasses = getUseModalAction({
  getHook: () => storageClassStore.useMutationDefault,
  getVariablesByContext: ({ params, name, defaultName }) => ({
    params,
    data: { defaultName, name },
  }),
});

export const useAutoresizer = getUseModalAction({
  getVariablesByContext: ({ params, detail }, annotations) => {
    const d = detail._originData;
    set(d, 'metadata.annotations', {
      ...d.metadata.annotations,
      ...annotations,
    });
    return {
      op: 'PATCH',
      params,
      data: d,
    };
  },
});
