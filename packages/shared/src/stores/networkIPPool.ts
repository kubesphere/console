/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import { useUrl } from '../hooks';
import { get, isUndefined, set } from 'lodash';
import { useMutation, useQuery } from 'react-query';
import { request, getOriginData, getBaseInfo, GetDetailParams } from '../utils';

export const module = 'ippools';
import type {
  FormattedNetworkIPPool,
  OriginalNetworkIPPool,
  CridObject,
  FormDataCreateNetworkIPPool,
  PathParams,
} from '../types';

const { getResourceUrl, getDetailUrl, getListUrl } = useUrl({ module });

function formatNetworkIPPool(item: OriginalNetworkIPPool): FormattedNetworkIPPool {
  const baseInfo = getBaseInfo(item);
  return {
    ...getBaseInfo<OriginalNetworkIPPool>(item),
    cidr: get(item, 'spec.cidr'),
    status: get(item, 'status', {}),
    workspace: get(item, 'metadata.labels["kubesphere.io/workspace"]', ''),
    isDefault: !isUndefined(get(item, 'metadata.labels["ippool.network.kubesphere.io/default"]')),
    selector: {
      'ippool.network.kubesphere.io/name': baseInfo.name,
    },
    _originData: getOriginData<OriginalNetworkIPPool>(item),
  };
}

function useNetworkIPPoolEditMutation(options?: { onSuccess?: () => void }) {
  const onSuccess = options?.onSuccess;
  return useMutation(
    ({ params, data }: { params: PathParams; data?: Record<string, any> }) => {
      return request.patch(getDetailUrl(params), data);
    },
    {
      onSuccess,
    },
  );
}

function useNetworkIPPoolUpdateMutation(
  params: GetDetailParams,
  options?: { onSuccess?: () => void },
) {
  const onSuccess = options?.onSuccess;
  return useMutation(
    async (data: Record<string, any>) => {
      const result = await request.get(getDetailUrl(params));
      const resourceVersion = get(result, 'metadata.resourceVersion');

      if (resourceVersion) {
        set(data, 'metadata.resourceVersion', resourceVersion);
      }
      return request.put(getDetailUrl(params), data);
    },
    {
      onSuccess,
    },
  );
}

function networkIPPoolsDeleteMutationFn(detail: FormattedNetworkIPPool) {
  const url = getDetailUrl(detail);
  return request.delete(url);
}

function useNetworkIPPoolsDeleteMutation(options?: { onSuccess?: () => void }) {
  const onSuccess = options?.onSuccess;
  return useMutation(
    (items: FormattedNetworkIPPool[]) => {
      const promises = items.map(networkIPPoolsDeleteMutationFn);
      return Promise.allSettled(promises);
    },
    { onSuccess },
  );
}

function useGetNetworkIPPool(params?: Record<string, any>) {
  return useQuery([module, params], async () => {
    const data = await request.get<any, OriginalNetworkIPPool>(getDetailUrl({ module, ...params }));
    return { ...params, ...formatNetworkIPPool(data) };
  });
}

function useNetworkIPPoolDeleteMutation(options?: { onSuccess?: () => void }) {
  const onSuccess = options?.onSuccess;
  return useMutation(
    (detail: FormattedNetworkIPPool) => {
      return request.delete(getDetailUrl(detail));
    },
    { onSuccess },
  );
}

interface CreateParams {
  cluster?: string;
  namespace?: string;
}

function networkIPPoolsCreateMutationFn(detail: CridObject, url: string) {
  const data = {
    apiVersion: 'network.kubesphere.io/v1alpha1',
    kind: 'IPPool',
    metadata: {
      name: detail.name,
      annotations: { 'kubesphere.io/description': detail?.desc },
    },
    spec: { type: 'calico', cidr: detail.cidr },
  };

  return request.post(url, data);
}

function useNetworkIPPoolCreateMutation(
  params: CreateParams,
  options?: { onSuccess?: () => void },
) {
  const onSuccess = options?.onSuccess;

  return useMutation(
    (data: FormDataCreateNetworkIPPool) => {
      const url = getListUrl(params);

      const { cidrs } = data;
      const promises = cidrs.map((item: any) => networkIPPoolsCreateMutationFn(item, url));
      return Promise.all(promises);
    },
    {
      onSuccess,
    },
  );
}

export {
  getResourceUrl,
  formatNetworkIPPool,
  useNetworkIPPoolEditMutation,
  useNetworkIPPoolUpdateMutation,
  useNetworkIPPoolsDeleteMutation,
  useGetNetworkIPPool,
  useNetworkIPPoolCreateMutation,
  useNetworkIPPoolDeleteMutation,
};
