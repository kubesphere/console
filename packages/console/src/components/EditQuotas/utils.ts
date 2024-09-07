/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import { memoryFormat } from '@ks-console/shared';
import { cloneDeep, get, pick, set } from 'lodash';
import { QUOTAS_MAP } from './constants';
import { cpuFormat } from '../EditDefaultContainerQuotas/utils';

export const getGpuType = (value: Record<string, any>) => {
  const supportGpuType: string[] = globals.config.supportGpuType;
  if (!value) {
    return supportGpuType[0];
  }
  const keys = Object.keys(value);
  const types = supportGpuType.find(item => keys.some(key => key.endsWith(item)));
  const type = types || supportGpuType[0];
  return type;
};

export const getResourceLimit = (record: Record<string, string> = {}) => {
  const keys = [
    'limits.cpu',
    'limits.memory',
    'requests.cpu',
    'requests.memory',
    // `requests.${getGpuType(record)}`,
  ];
  // return pickBy(record, (_, key) => keys.includes(key));
  let obj = {};
  keys.forEach(key => {
    set(obj, key, record[key]);
  });
  set(obj, `requests['${getGpuType(record)}']`, record[`requests.${getGpuType(record)}`]);
  return obj;
};

export const resourceLimitOut = (record: Record<string, string> = {}) => {
  const keys = ['limits.cpu', 'limits.memory', 'requests.cpu', 'requests.memory'];
  let obj = {};
  const map = (key: string, value: string) => {
    if (key.endsWith('cpu') && value) {
      return cpuFormat(value);
    }
    if (key.endsWith('memory') && value) {
      return value;
    }
    return value;
  };
  keys.forEach(key => {
    set(obj, `['${key}']`, map(key, get(record, key)));
  });
  set(obj, `["requests.${getGpuType(record)}"]`, get(record, `requests['${getGpuType(record)}']`));
  return obj;
};

interface ValueItem {
  persistentvolumeclaims?: string;
  'requests.storage'?: string;
}

const linkResourceEndKeys = [
  'storageclass.storage.k8s.io/persistentvolumeclaims',
  'storageclass.storage.k8s.io/requests.storage',
];

export const getStorageResourceQuota = (record: Record<string, string> = {}) => {
  const linkQuota = Object.entries(cloneDeep(record))
    .map(([k, v]) => {
      let idx = linkResourceEndKeys.findIndex(key => k.endsWith(key));
      if (idx !== -1) {
        return [
          `${k.split('.').shift()}['${linkResourceEndKeys[idx].split('/').pop()}']`,
          idx === 1 ? memoryFormat(v, 'Gi')! : Number(v),
        ];
      }
      return undefined;
    })
    .reduce(
      (acc, cur) => {
        if (cur) {
          set(acc, cur[0], cur[1]);
        }
        return acc;
      },
      {} as Record<string, ValueItem>,
    );
  let storage = record['requests.storage'] ? memoryFormat(record['requests.storage'], 'Gi')! : '';
  return {
    ...pick(record, ['persistentvolumeclaims']),
    linkQuota,
    ['requests.storage']: storage,
    uuid: Math.random().toString(36).substr(2),
  };
};

export const getAppResourceQuota = (record: Record<string, string> = {}) => {
  const keys = [
    'limits.cpu',
    'limits.memory',
    'requests.cpu',
    'requests.memory',
    // `requests.${getGpuType(record)}`,
  ];
  return pick(
    record,
    Object.values(QUOTAS_MAP)
      .map(i => i.name)
      .filter(i => !keys.includes(i)),
  );
};

export const resourceQuotaOut = (record: Record<string, ValueItem> = {}) => {
  const { linkQuota = {}, ...rest } = record;
  let storage = rest['requests.storage'];
  if (storage) {
    set(rest, `['requests.storage']`, storage + 'Gi');
  } else {
    set(rest, `['requests.storage']`, undefined);
  }
  let obj = {};
  Object.entries(linkQuota).forEach(([k, v]) => {
    let m = v['requests.storage'];
    set(obj, `['${k}.${linkResourceEndKeys[0]}']`, v.persistentvolumeclaims ?? undefined);
    set(obj, `['${k}.${linkResourceEndKeys[1]}']`, m ? `${m}Gi` : null);
  });

  return { ...pick(rest, ['persistentvolumeclaims', `['requests.storage']`]), ...obj };
};
