/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import { getBaseInfo, getOriginData, PathParams, request, useUrl } from '@ks-console/shared';
import { get, pick } from 'lodash';
import { useQueries, useQuery } from 'react-query';
import { FormattedLimitRange, OriginalLimitRange } from '../types/LimitRange';
import { IProjectAbnormalworkloads, IProjectQuota } from '../types/project';
import projectStore from './project.new';

function getOverviewPath({ cluster, namespace }: PathParams) {
  let path = '';
  if (cluster) {
    path += `/klusters/${cluster}`;
  }
  if (namespace) {
    path += `/namespaces/${namespace}`;
  }
  return path;
}

export const useQueryProjectQuotaAndStatus = (params: PathParams) => {
  return useQueries<[IProjectQuota, IProjectAbnormalworkloads]>([
    {
      queryKey: ['projectQuotas', params],
      queryFn: () =>
        request.get(`kapis/resources.kubesphere.io/v1alpha2${getOverviewPath(params)}/quotas`),
    },
    {
      queryKey: ['projectAbnormalworkloads', params],
      queryFn: () =>
        request.get(
          `kapis/resources.kubesphere.io/v1alpha2${getOverviewPath(params)}/abnormalworkloads`,
        ),
    },
  ]);
};

const limitRangeMapper = (item: OriginalLimitRange): FormattedLimitRange => ({
  ...getBaseInfo(item),
  namespace: get(item, 'metadata.namespace'),
  limit: get(item, 'spec.limits[0]', ''), // ??? defaultValue
  _originData: getOriginData(item),
});

export const useQueryProjectLimitRanges = (params: PathParams) => {
  const rest = pick(params, ['cluster', 'namespace']);
  return useQuery<FormattedLimitRange[]>(
    ['projectLimitRanges', rest],
    () => request.get(`api/v1${projectStore.getPath(rest)}/limitranges`),
    {
      enabled: !!params.namespace,
      select: (data: any): FormattedLimitRange[] => {
        return data.items?.map(limitRangeMapper);
      },
    },
  );
};

export const useQueryProjectQuota = (params: PathParams, option: Record<string, any> = {}) => {
  const url = useUrl({ module: 'resourcequotas' });
  return useQuery(
    ['projectQuota', params],
    () => request.get(`kapis/resources.kubesphere.io/v1alpha2${url.getPath(params)}/quotas`),
    {
      select: d => d.data,
      ...option,
    },
  );
};
