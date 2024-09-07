/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import { get, groupBy, isEmpty, set } from 'lodash';
import { getComponentStatus, isMultiCluster, request } from '../../utils';
import { apiVersion, getNewValues } from '../monitoring';

type Count = {
  health: number;
  total: number;
};

export const getApi = () => `${apiVersion({})}/component_metrics`;

export const getNewRefreshedResult = (currentResult: any[] = [], originResult: any[] = []) => {
  const newResult = [...originResult];

  currentResult.forEach((record, index) => {
    const name = get(record, 'metric.__name__');
    let recordData: any = null;

    if (name) {
      const quantile = get(record, 'metric.quantile');
      const verb = get(record, 'metric.verb');
      const result = get(record, 'metric.result');
      const originRecord = newResult.find(_record => {
        if (quantile) {
          return get(_record, 'metric.quantile') === quantile;
        }

        if (verb) {
          return get(_record, 'metric.verb') === verb;
        }

        if (result) {
          return get(_record, 'metric.result') === result;
        }

        return get(_record, 'metric.__name__') === name;
      });

      if (isEmpty(originRecord)) {
        newResult.push(record);
      } else {
        recordData = originRecord;
      }
    } else {
      recordData = newResult[index];
    }

    if (!isEmpty(recordData)) {
      const newValues = getNewValues(recordData.values, record.value);
      set(recordData, 'values', newValues);
    }
  });

  return newResult;
};

export const fetchHealthMetrics = async ({ cluster }: { cluster: string }) => {
  const path =
    cluster && isMultiCluster()
      ? `kapis/clusters/${cluster}/resources.kubesphere.io/v1alpha2/componenthealth`
      : 'kapis/resources.kubesphere.io/v1alpha2/componenthealth';
  const result = await request.get<never, any>(path);

  const kubesphereStatus: any[] = result.kubesphereStatus || [];
  const ksComponents = groupBy(kubesphereStatus, 'namespace');

  const isSupportScheduler = kubesphereStatus.some(
    status =>
      get(status, 'label.component') === 'kube-scheduler' && get(status, 'healthyBackends', 0),
  );

  const isSupportControllerManager = kubesphereStatus.some(
    status =>
      get(status, 'label.component') === 'kube-controller-manager' &&
      get(status, 'healthyBackends', 0),
  );

  const data: Record<string, any[]> = {
    kubernetes: get(result, 'kubernetesStatus', []),
    node: get(result, 'nodeStatus', {}),
    kubesphere: get(ksComponents, 'kubesphere-system', []),
    kubeSystem: get(ksComponents, 'kube-system', []),
  };

  // components replicas count
  const counts: Record<string, Count> = {};
  // components count
  const componentCounts: Record<string, Count> = {};

  // calculate components count
  Object.entries(data).forEach(([key, components]) => {
    const count = {
      total: 0,
      health: 0,
    };

    const componentCount = { total: 0, health: 0 };

    if (key === 'node') {
      count.total = get(components, 'totalNodes', 0);
      count.health = get(components, 'healthyNodes', 0);
    } else if (key === 'kubernetes') {
      count.total = components.length;
      count.health = components.filter(
        component => getComponentStatus(component) === 'Healthy',
      ).length;
    } else {
      components.forEach(component => {
        count.total += component.totalBackends;
        count.health += component.healthyBackends;

        const status = getComponentStatus(component);
        componentCount.health += status === 'Healthy' ? 1 : 0;
        componentCount.total += status === 'Stopped' ? 0 : 1;
      });
    }

    counts[key] = count;
    componentCounts[key] = componentCount;
  });

  return {
    data,
    counts,
    componentCounts,
    supportKsScheduler: isSupportScheduler,
    supportControllerManager: isSupportControllerManager,
  };
};
