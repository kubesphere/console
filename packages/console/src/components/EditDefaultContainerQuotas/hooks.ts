/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import { cpuFormat, memoryFormat, PathParams } from '@ks-console/shared';
import { endsWith, get, min, omit, pickBy, reduce } from 'lodash';
import * as React from 'react';
import { AvailableQuota, LimitValue } from './interfaces';
import { useQueryQuotaAll } from './store';

const resourceLimitKey = ['limits.cpu', 'limits.memory', 'requests.cpu', 'requests.memory'];

const findCpuOrMemoryMin = (dataArr: LimitValue[], key: string) => {
  const toArr = dataArr.map(item => get(item, key));
  return min(toArr);
};

const transformQuota = (data: LimitValue[]) => {
  return {
    'limits.cpu': findCpuOrMemoryMin(data, 'limits.cpu'),
    'limits.memory': findCpuOrMemoryMin(data, 'limits.memory'),
    'requests.cpu': findCpuOrMemoryMin(data, 'requests.cpu'),
    'requests.memory': findCpuOrMemoryMin(data, 'requests.memory'),
  };
};

const transformGpu = (data: Record<string, any>[]) => {
  // filter other keys,just need gpu field
  // every namespace has one gpu type
  const supportGpu = globals.config.supportGpuType;
  const gpuArr = data.map(item =>
    pickBy(item, (_, key) => supportGpu.some((type: string) => endsWith(key, type))),
  );
  return reduce(
    gpuArr,
    (total, current) => {
      const hasKey = get(total, `${Object.keys(current)[0]}`);
      if (hasKey) {
        return Number(hasKey) > Number(Object.values(current)[0])
          ? { ...total, ...current }
          : { ...total };
      }
      return { ...total, ...current };
    },
    {},
  );
};

const availableQuotaMemory = (data: Record<string, any> = {}) => {
  const newData = { ...data };
  Object.keys(data).forEach(key => {
    if (key.endsWith('memory')) {
      newData[key] = memoryFormat(data[key]);
    }
    if (key.endsWith('cpu')) {
      newData[key] = cpuFormat(data[key]);
    }
  });
  return newData;
};

const getSingleQuota = (data: Record<string, any>[]): AvailableQuota => {
  return {
    namespace: data[0],
    workspace: data[1],
  };
};
const getAvailableQuota = (arr: { data: Record<string, any> }[], isFederated = false) => {
  if (!isFederated) {
    return getSingleQuota(arr);
  }
  const [quotas, workspaceQuotas, gpuQuotas] = arr.reduce(
    (acc, cur, curIndex) => {
      if (curIndex % 2 === 0) {
        acc[0].push(cur.data);
      } else {
        acc[1].push(cur.data);
        gpuQuotas.push(omit(cur.data, resourceLimitKey));
      }
      return acc;
    },
    [[], [], []] as any,
  );
  return {
    workspace: transformQuota(workspaceQuotas),
    namespace: {
      ...transformQuota(quotas),
      ...transformGpu(gpuQuotas),
    },
  };
};

export const useAvailableQuota = (path: PathParams, clusters: string[], isFederated = false) => {
  const [availableQuota, setAvailableQuota] = React.useState<Record<string, any>>({});
  const { workspace, namespace } = path;

  const params = clusters.map(cluster => ({ cluster, workspace, namespace }));
  const result = useQueryQuotaAll(params, {
    select: availableQuotaMemory,
  });
  const isLoading = result.some(r => r.isLoading);

  React.useEffect(() => {
    if (!isLoading) {
      setAvailableQuota(getAvailableQuota(result as any, isFederated));
    }
  }, [isLoading]);
  return availableQuota;
};
