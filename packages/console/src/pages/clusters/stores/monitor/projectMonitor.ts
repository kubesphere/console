/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import { PathParams, monitorStore } from '@ks-console/shared';
import { useQuery } from 'react-query';

const handleParams = (params: PathParams) => params;
const apiVersion = 'kapis/monitoring.kubesphere.io/v1beta1';

const getApi = () => {
  return `${apiVersion}/namespace_metrics`;
};

const { fetchMetrics } = monitorStore.useMonitorStore({
  getApiFn: getApi,
  handleParamsFn: handleParams,
});

export const useQueryProjectMonitor = (
  params: Record<string, any>,
  option: Record<string, any> = [],
) => {
  return useQuery(
    ['projectMonitor', params],
    async () => {
      return fetchMetrics({ ...params });
    },
    option,
  );
};
