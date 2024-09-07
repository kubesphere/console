/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import { isEmpty, get, set, isArray } from 'lodash';
import { hasExtensionModuleAnnotation, isMultiCluster } from '../utils/checker';
import { getMinuteValue, getTimeRange, fillEmptyMetrics } from '../utils/monitoring';
import { useQuery } from 'react-query';
import request from '../utils/request';

interface UseFetchStatisticsQueryOptions {
  cluster?: string;
  namespace?: string;
  workspace?: string;
  enabled?: boolean;
}

interface UseFetchQueryOptions {
  cluster?: string;
  namespace?: string;
  workspace?: string;
  component?: string;
  container?: string;
  nodeName?: string;
  persistentvolumeclaim?: string;
  pod?: string;
  custom?: string;
  workload?: string; //TODO:
}

export const apiVersion = ({
  cluster,
  namespace,
  workspace,
  component,
  container,
  nodeName,
  persistentvolumeclaim,
  pod,
  workload, //workloadKind,workloadName
}: UseFetchQueryOptions) => {
  const apiVersionFront = 'kapis/monitoring.kubesphere.io/v1beta1';
  if (component) {
    return `${apiVersionFront}/component_metrics`;
  }
  if (pod) {
    return `${apiVersionFront}/pod_metrics`;
  }
  if (container) {
    return `${apiVersionFront}/container_metrics`;
  }
  if (nodeName) {
    return `${apiVersionFront}/node_metrics`;
  }
  if (persistentvolumeclaim) {
    return `${apiVersionFront}/persistentvolumeclaim_metrics`;
  }

  if (workload) {
    return `${apiVersionFront}/workload_metrics`;
  }
  if (namespace && namespace !== 'all') {
    return `${apiVersionFront}/namespace_metrics`;
  }
  if (workspace) {
    return `${apiVersionFront}/workspace_metrics`;
  }
  if ((isMultiCluster() && cluster) || namespace === 'all') {
    return `${apiVersionFront}/cluster_metrics`;
  }
  return 'kapis/monitoring.kubesphere.io/v1beta1';
};

export const getApi = (params: UseFetchQueryOptions) => `${apiVersion(params)}`;

export const handleParams = (params: any) => params;

export const getParams = (
  {
    // @ts-ignore
    start,
    // @ts-ignore
    end,
    step = '600s',
    times = 20,
    resources = [],
    metrics = [],
    last = false, // last time
    module,
    ...rest
  } = {} as Record<string, any>,
) => {
  const params: Record<string, any> = {
    ...rest,
  };
  if (module) {
    params.component = module;
    delete params.module;
  }

  if (!last) {
    Object.assign(params, {
      start,
      end,
      step: getMinuteValue(step),
      times,
    });

    if (!start || !end) {
      const timeRange = getTimeRange(params);
      params.start = timeRange.start;
      params.end = timeRange.end;
    }
  }

  if (params.start) {
    params.start = Math.floor(params.start);
  }

  if (params.end) {
    params.end = Math.floor(params.end);
  }

  if (!isEmpty(resources)) {
    params.resources_filter = `${resources.join('|')}`;
  }

  if (!isEmpty(metrics)) {
    params.metrics_filter = `${metrics.join('|')}`;
  }

  return params;
};

export const getResult = (result: any) => {
  const data: Record<string, any> = {};
  const results = isArray(result) ? result : get(result, 'results', []) || [];

  if (isEmpty(results)) {
    const metricName = get(result, 'metric_name');

    if (metricName) {
      data[metricName] = result;
    }
  } else {
    results.forEach((item: any) => {
      data[item.metric_name] = item;
    });
  }

  return data;
};

export const getNewValues = (origin = [], newValue = []) => {
  const values: any[] = isEmpty(origin) ? [] : [...origin];
  const value = newValue || [];

  if (!isEmpty(value)) {
    if (values.length > 10) {
      values.shift();
    }
    values.push(value);
  }

  return values;
};

export const getNewRefreshedResult = (
  currentResult = [],
  originResult = [],
  resourceName = 'resource_name',
) => {
  const newResult: any[] = [...originResult];

  currentResult.forEach((record: any, index) => {
    const resName = get(record, `metric.${resourceName}`);
    let recordData: Record<string, any> = {};

    if (resName) {
      const originRecord = newResult.find(_record => get(_record, `metric.${resName}`) === resName);

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

export const getRefreshResult = (newData = {}, origin: Record<string, any> = {}) => {
  const data = origin;

  if (isEmpty(data)) {
    return newData;
  }

  Object.values(newData).forEach(item => {
    const key = get(item, 'metric_name') || '';
    const metric = data[key];

    if (metric) {
      const currentResult = get(item, 'data.result') || [];
      const originResult = get(metric, 'data.result', get(metric, 'data.results')) || [];

      set(metric, 'data.result', getNewRefreshedResult(currentResult, originResult));
    }
  });

  return data;
};

export const getMoreResult = (newData = {}, origin: Record<string, any> = {}) => {
  const data = origin;

  if (isEmpty(data)) {
    return newData;
  }

  Object.values(newData).forEach(item => {
    const key = get(item, 'metric_name') || '';
    const metric = data[key];

    if (metric) {
      const originResult = get(metric, 'data.result', get(metric, 'data.results')) || [];
      const currentResult = get(item, 'data.result') || [];

      const newResult = [...originResult, ...currentResult];
      set(metric, 'data.result', newResult);
    }
  });

  return data;
};

export const checkEtcd = hasExtensionModuleAnnotation(
  'whizard-monitoring',
  'monitoring.kubesphere.io/enable-etcd-monitoring',
);

interface MonitorStoreProps {
  getApiFn?: (params: any) => any;
  getParamsFn?: (params: any) => any;
  handleParamsFn?: (params: any) => any;
}

const getStatisticUrl = ({ cluster, namespace, workspace }: UseFetchStatisticsQueryOptions) => {
  const clusterPath = cluster ? `/klusters/${cluster}` : '';
  const namespacePath = namespace ? `/namespaces/${namespace}` : '';
  const workspacePath = workspace ? `/workspaces/${workspace}` : '';
  let apiversion = '/resources.kubesphere.io/v1alpha3';
  let url;
  if (!cluster) {
    apiversion = '/tenant.kubesphere.io/v1beta1';
  }

  url = `/kapis${apiversion}${clusterPath}${namespacePath}${workspacePath}/metrics`;
  return url;
};

export function useFetchStatisticsQuery({
  cluster,
  namespace,
  workspace,
  enabled = true,
}: UseFetchStatisticsQueryOptions) {
  const url = getStatisticUrl({ cluster, namespace, workspace });

  const queryKey = [url];

  const result = useQuery({
    queryKey,
    queryFn: () => request.get<never, any>(url).catch(() => Promise.resolve([])),
    enabled: enabled,
  });
  const originalStatistics = result.data ?? [];
  const formattedStatistics = getResult(originalStatistics);

  return { ...result, originalStatistics, formattedStatistics };
}

export const useMonitorStore = ({
  getApiFn = getApi,
  handleParamsFn = handleParams,
  getParamsFn = getParams,
}: MonitorStoreProps = {}) => {
  let data = {};

  const fetchMetrics = async ({
    autoRefresh = false,
    more = false,
    fillZero = true,
    ...filters
  }) => {
    // @ts-ignore
    const params = handleParamsFn(getParamsFn(filters));
    const api = getApiFn(filters);

    const response = await request(api, { params });
    let result = getResult(response);
    if (more) {
      result = getMoreResult(result, data);
    }
    data = fillZero ? fillEmptyMetrics(params, result) : result;

    return data;
  };

  return { fetchMetrics, getApi: getApiFn, getParams: getParamsFn };
};
