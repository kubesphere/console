/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import { request } from '../../utils';
import { apiVersion, getMoreResult, getResult } from '../monitoring';
import { isEmpty } from 'lodash';

export const resourceName = 'pod';

type ApiParams = {
  nodeName?: string;
  namespace?: string;
  workloadKind?: string;
  workloadName?: string;
  pod?: string;
  cluster?: string;
};

export const getApi = ({ pod }: ApiParams) => {
  if (!pod) {
    return `${apiVersion({})}/pod_metrics`;
  }

  return `${apiVersion({ pod })}`;
};

export const fetchSortedMetrics = async ({
  limit = 10,
  page = 1,
  more = false,
  metrics = [],
  ...filters
}) => {
  const params = { ...filters };
  let data = {};

  if (!isEmpty(metrics)) {
    params.sort_metric = metrics.join('|');
  }

  params.limit = limit;
  params.page = page;

  const api = getApi(filters);

  const response = await request(api, { params });
  let result = getResult(response);

  if (more) {
    result = getMoreResult(result, data);
  }
  data = result;

  return data;
};
