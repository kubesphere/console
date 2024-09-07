/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import { get, isEmpty } from 'lodash';
import { useList, UseListOptions } from '../../hooks';
import { PathParams } from '../workload/types';

type BasePathParams = {
  apiVersion?: string;
  resource?: string;
} & PathParams;

const getApiVersion = () => `kapis/monitoring.kubesphere.io/v1beta1`;

const handleResult = (results: any) => {
  if (isEmpty(results)) {
    return [];
  }

  return results.reduce((rankList: any, metric: any = {}) => {
    const sortName = metric.metric_name;
    const result = get(metric, 'data.result') || [];
    result.forEach((data: any, index: number) => {
      const item = rankList[index] || {};
      const value = get(data, 'value', []);
      const describeMsg = get(data, 'metric', {});
      item[sortName] = value[1];
      Object.assign(item, describeMsg);
      rankList[index] = item;
    });
    return rankList;
  }, []);
};

const getApi = ({ apiVersion }: BasePathParams) => {
  const $apiVersion = apiVersion || getApiVersion();
  return `${$apiVersion}/node_metrics`;
};

function useBaseRankList<T, P extends Record<string, any> = BasePathParams>({
  getApiFn = getApi,
  pathParams,
  params = {},
  options = {},
}: {
  getApiFn?: (params: P) => string;
  pathParams: P;
  params?: Record<string, any>;
  options?: Omit<UseListOptions<T>, 'url'>;
}) {
  const fetchUrl = getApiFn(pathParams);
  const payload = {
    type: 'rank',
    sort_type: 'desc',
    sort_metric: params.sort_metric || get(params, 'sort_metric_options.[0]'),
    ...params,
  };
  return useList({
    url: fetchUrl,
    params: payload,
    ...options,
  });
}

export default {
  getApiVersion,
  handleResult,
  useBaseRankList,
};
