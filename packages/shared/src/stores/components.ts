/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import { get, groupBy } from 'lodash';
import { ComponentType, PathParams, SystemComponent } from '../types';
import baseStore from './store';
import { getComponentStatus, request, getApiVersion } from '../utils';

const name = 'SYSTEM_COMPONENT';

const module = 'components';

const apiVersion = getApiVersion(module);

const getListUrlFn = (params?: PathParams) =>
  `${apiVersion}/klusters/${params?.cluster}/components`;

const fetchList = async (params: PathParams) => {
  const result = await request.get(getListUrlFn(params));
  const components = groupBy(result, 'namespace');

  const data: Record<ComponentType, SystemComponent[]> = {
    kubernetes: get(components, 'kube-system', []),
    kubesphere: get(components, 'kubesphere-system', []),
  };

  const exceptionCount: Record<string, any> = {};
  const healthyCount: Record<string, any> = {};
  Object.entries(data).forEach(([key, values]) => {
    values.forEach(item => {
      const status = getComponentStatus(item);

      if (status === 'Warning') {
        exceptionCount[key] = exceptionCount[key] || 0;
        exceptionCount[key] += 1;
      }

      if (status === 'Healthy') {
        healthyCount[key] = healthyCount[key] || 0;
        healthyCount[key] += 1;
      }
    });
  });

  return {
    data,
    exceptionCount,
    healthyCount,
  };
};

const BaseStore = baseStore({ module, getListUrlFn });

export default {
  ...BaseStore,
  name,
  module,
  fetchList,
};
