/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import { get, noop, set } from 'lodash';
import { useMutation } from 'react-query';
import { getBaseInfo, getOriginData, request } from '../utils';
import { useUrl } from '../hooks';
import type { PathParams, OriginalKubeKey, FormattedKubeKey } from '../types';
const module = 'clusters';
const apiVersion = 'apis/kubekey.kubesphere.io/v1alpha1';
const getPathFn = ({ cluster, namespace }: { cluster?: string; namespace?: string } = {}) => {
  let path = '';

  if (cluster) {
    path += `/klusters/${cluster}`;
  }
  if (namespace) {
    path += `/namespaces/${namespace}`;
  }
  return path;
};
const getListUrlFn = (params?: PathParams) => {
  const { cluster, namespace, dryRun } = params || {};
  return `${apiVersion}${getPathFn({ cluster, namespace })}/${module}${
    dryRun ? '?dryRun=All' : ''
  }`;
};
const { getDetailUrl: useGetDetailUrl } = useUrl({ module, getListUrlFn });
export const getDetailUrl = (params: PathParams) => useGetDetailUrl(params);

export const kubeKeyMapper = (item: OriginalKubeKey): FormattedKubeKey => ({
  ...getBaseInfo(item),
  labels: get(item, 'metadata.labels'),
  annotations: get(item, 'metadata.annotations'),
  status: get(item, 'status'),
  spec: get(item, 'spec'),
  _originData: getOriginData(item),
});
export async function fetchDetail(params: PathParams): Promise<FormattedKubeKey> {
  const result = await request.get<OriginalKubeKey>(getDetailUrl(params));
  return { ...params, ...kubeKeyMapper(result.data) };
}
export function useKubeKeyUpdateMutation({
  detail,
  onSuccess = noop,
}: {
  detail: PathParams;
  onSuccess?: (data: any) => void;
}) {
  const url = getDetailUrl(detail);
  return useMutation<unknown, unknown, any>(
    async data => {
      const result = await fetchDetail(detail);
      const template = result._originData;
      const hosts = get(template, 'spec.hosts', []);
      const roleGroups = get(template, 'spec.roleGroups', {}) as Record<string, any>;
      data.roles.forEach((role: any) => {
        roleGroups[role] = roleGroups[role] || [];
        roleGroups[role].push(data.name);
      });
      set(template, 'spec.hosts', [...hosts, data]);
      set(template, 'spec.roleGroups', roleGroups);
      return request.put(url, template);
    },
    {
      onSuccess,
    },
  );
}
