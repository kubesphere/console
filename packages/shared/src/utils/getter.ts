/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import QueryString from 'qs';
import {
  omit,
  get,
  isEmpty,
  isUndefined,
  trimEnd,
  set,
  replace,
  merge,
  pickBy,
  endsWith,
  isPlainObject,
} from 'lodash';
import { ACCESS_MODE_MAPPER } from '../constants/common';
import { getBrowserLang } from './common';

export const getServedVersion = (item: any) => {
  const versions = get(item, 'spec.versions', []);
  if (versions.length === 0) {
    return '';
  }
  let servedVersion = get(versions[versions.length - 1], 'name');
  versions.forEach((ver: any) => {
    if (get(ver, 'served', false)) {
      servedVersion = get(ver, 'name', servedVersion);
    }
  });
  return servedVersion;
};

export const getResourceCreator = <T extends Record<string, any>>(item: T): string =>
  get(item, 'metadata.annotations["kubesphere.io/creator"]') ||
  get(item, 'metadata.annotations.creator') ||
  '';

export const getDescription = <T extends Record<string, any>>(item: T): string => {
  const desc =
    get(item, 'metadata.annotations["kubesphere.io/description"]') ||
    get(item, 'metadata.annotations.desc') ||
    '';

  try {
    if (desc) {
      const jsonDesc = JSON.parse(desc);
      if (isPlainObject(jsonDesc)) {
        const useLang = get(globals, 'user.lang') || getBrowserLang();
        const lang = useLang === 'zh' ? 'zh' : 'en';
        return jsonDesc[lang];
      } else {
        return jsonDesc.toString();
      }
    }
  } catch (error) {
    return desc;
  }
  return desc;
};

export const getAliasName = <T extends Record<string, any>>(item: T): string =>
  get(item, 'metadata.annotations["kubesphere.io/alias-name"]') ||
  get(item, 'metadata.annotations.displayName') ||
  '';

export const getAnnotationsName = (detail: any, key: string) => {
  const name = detail?.metadata?.annotations || {};
  return name[key];
};

export function getAnnotationsAliasName(detail: any) {
  return getAnnotationsName(detail, 'kubesphere.io/alias-name');
}

export function getAnnotationsDescription(detail: any) {
  return getAnnotationsName(detail, 'kubesphere.io/description');
}

export function getRepoAppDisplayName(item: any) {
  const originalName = item?.metadata?.annotations?.['application.kubesphere.io/app-originalName'];
  if (originalName) {
    return originalName;
  }
}

export const getDisplayName = <T extends Record<string, any>>(item?: T): string => {
  if (isEmpty(item)) {
    return '';
  }
  const name = item?.name || item?.metadata.name;

  if (item?.display_name) {
    return item?.display_name;
  }
  if (
    getRepoAppDisplayName(item) &&
    ![undefined, 'upload'].includes(item?.metadata?.labels?.['application.kubesphere.io/repo-name'])
  ) {
    return getRepoAppDisplayName(item);
  }

  if (item?.aliasName) {
    return `${item.aliasName}(${name})`;
  }
  if (getAnnotationsAliasName(item)) {
    return `${getAnnotationsAliasName(item)}(${name})`;
  }
  return name;
};

type OmitKeys =
  | 'status'
  | 'metadata.uid'
  | 'metadata.selfLink'
  | 'metadata.generation'
  | 'metadata.ownerReferences'
  | 'metadata.resourceVersion'
  | 'metadata.creationTimestamp'
  | 'metadata.managedFields';

export type OriginData<T extends Record<string, any> = Record<string, any>> = Omit<T, OmitKeys>;

export const getOriginData = <T extends Record<string, any>>(
  item: T,
  unOmitKeys: Record<string, any> = {},
): OriginData<T> =>
  omit(
    item,
    [
      'status',
      'metadata.uid',
      'metadata.selfLink',
      'metadata.generation',
      !unOmitKeys.ownerReferences ? 'metadata.ownerReferences' : '',
      'metadata.resourceVersion',
      'metadata.creationTimestamp',
      'metadata.managedFields',
    ].filter(Boolean) as OmitKeys[],
  );

export interface BaseInfo {
  uid: string;
  name: string;
  creator: string;
  description: string;
  aliasName: string;
  createTime: string;
  resourceVersion: string;
  isFedManaged: boolean;
}

export interface BaseInfoFormValues {
  metadata: {
    name: string;
    annotations: {
      'kubesphere.io/alias-name'?: string;
      'kubesphere.io/description'?: string;
    };
  };
}

export interface GetDetailParams {
  apiPath: string;
  name: string;
  namespace?: string;
}

export interface BaseList {
  data: { name: string; isFedManaged?: boolean }[];
  page: number;
  limit: number;
  total: number;
  sortBy: string;
  ascending: boolean;
  silent: boolean;
  filters: object;
  isLoading: boolean;
  selectedRowKeys: string[];
}

export const getBaseInfo = <T extends Record<string, any>>(item: T): BaseInfo => ({
  uid: get(item, 'metadata.uid', ''),
  name: get(item, 'metadata.name', ''),
  creator: getResourceCreator<T>(item),
  description: getDescription<T>(item),
  aliasName: getAliasName<T>(item),
  createTime: get(item, 'metadata.creationTimestamp', ''),
  resourceVersion: get(item, 'metadata.resourceVersion', ''),
  isFedManaged: get(item, 'metadata.labels["kubefed.io/managed"]') === 'true',
});

export const getRoleBaseInfo = <T extends Record<string, any>>(
  item: T,
  module: 'workspaceroles' | 'globalroles' | 'clusterroles' | 'roles' | 'devopsroles' | string,
) => {
  const baseInfo = getBaseInfo<T>(item);
  const labels = get(item, 'metadata.labels', {});

  if (!get(labels, ['iam.kubesphere.io/role-template'])) {
    switch (module) {
      case 'workspaceroles': {
        const label = get(labels, ['kubesphere.io/workspace'], '');
        const name = baseInfo.name.slice(label.length + 1);
        if (globals.config?.presetWorkspaceRoles.includes(name)) {
          baseInfo.description = t(`ROLE_WORKSPACE_${name.toUpperCase().replace(/-/g, '_')}`);
        }
        break;
      }
      case 'globalroles': {
        const name = baseInfo.name;
        if (globals.config?.presetGlobalRoles.includes(name)) {
          baseInfo.description = t(`ROLE_${name.toUpperCase().replace(/-/g, '_')}`);
        }
        break;
      }
      case 'clusterroles': {
        const name = baseInfo.name;
        if (globals.config?.presetClusterRoles.includes(name)) {
          baseInfo.description = t(`ROLE_${name.toUpperCase().replace(/-/g, '_')}`);
        }
        break;
      }
      case 'roles': {
        const name = baseInfo.name;
        if (globals.config?.presetRoles.includes(name)) {
          baseInfo.description = t(`ROLE_PROJECT_${name.toUpperCase().replace(/-/g, '_')}`);
        }
        break;
      }
      case 'devopsroles': {
        const name = baseInfo.name;
        if (globals.config?.presetRoles.includes(name)) {
          baseInfo.description = t(`ROLE_DEVOPS_${name.toUpperCase().replace(/-/g, '_')}`);
        }
        break;
      }
      default:
    }
  }

  return baseInfo;
};

export function formatDefault<T extends Record<string, any>>(item: T) {
  return {
    ...getBaseInfo<T>(item),
    namespace: get(item, 'metadata.namespace', ''),
    spec: get(item, 'spec'),
    _originData: getOriginData(item),
  };
}

export type FormattedDefault = ReturnType<typeof formatDefault>;

export function getQuery<T>(): T {
  const search = window.location.search;

  if (!search) {
    return {} as T;
  }

  return QueryString.parse(search.split('?').pop() || '') as unknown as T;
}

export const mapAccessModes = (accessModes = [] as string[]) =>
  accessModes.map(item => ACCESS_MODE_MAPPER[item]);

export const memoryFormat = (memory: unknown, unit = 'Mi') => {
  if (isUndefined(memory) || memory === null || memory === '') {
    return null;
  }

  const units = ['ki', 'mi', 'gi', 'ti'];
  const currentUnit = String(memory).toLowerCase().slice(-2);

  let currentUnitIndex = units.indexOf(currentUnit) > -1 ? units.indexOf(currentUnit) : 1;
  const targetUnitIndex = units.indexOf(unit.toLowerCase());

  let value = Number(trimEnd(String(memory).toLowerCase(), currentUnit));

  if (/m$/g.test(String(memory))) {
    // transfer m to ki
    value = Number(trimEnd(String(memory), 'm')) / (1000 * 1024);
    currentUnitIndex = 0;
  } else if (/^[0-9.]*$/.test(String(memory))) {
    // transfer bytes to ki
    value = Number(memory) / 1024;
    currentUnitIndex = 0;
  }

  value *= 1024 ** (currentUnitIndex - targetUnitIndex);

  if (String(value).indexOf('.') > -1) {
    value = Number(value.toFixed(3));
  }

  return value;
};
export const getNodeRoles = (labels: any) => {
  let roles: string[] = [];

  if (!isEmpty(labels)) {
    roles = Object.keys(labels)
      .filter(key => key.startsWith('node-role.kubernetes.io/'))
      .map(key => key.replace('node-role.kubernetes.io/', ''));
  }

  return roles;
};

export function getWebsiteUrl() {
  const useLang = get(globals, 'user.lang') || getBrowserLang();
  const lang = useLang === 'zh' ? 'zh' : 'en';
  return globals.config.documents[lang] || globals.config.documents;
}

export const getLimitsRequestEndsWithDot = ({
  limits,
  requests,
}: {
  limits: Record<string, any>;
  requests: Record<string, any>;
}) => {
  const arr = [limits, requests];
  const result: Record<string, any>[] = [];
  arr.forEach((item, index: number) => {
    const tmp = {};
    if (!isUndefined(get(item, 'cpu', undefined)) && item.cpu.endsWith('.')) {
      set(tmp, 'cpu', trimEnd(item.cpu, '.'));
    }
    if (
      !isUndefined(get(item, 'memory', undefined)) &&
      item.memory.slice(0, item.memory.length - 2).endsWith('.')
    ) {
      set(tmp, 'memory', replace(item.memory, '.', ''));
    }
    result[index] = merge(item, tmp);
  });
  return { limits: result[0], requests: result[1] };
};

export const getGpuLimitsArr = (objData: Record<string, any>) => {
  const supportGpu: string[] = globals.config.supportGpuType;
  const gpusObj = pickBy(objData, (_, key) => supportGpu.some(type => endsWith(key, type)));
  return Object.keys(gpusObj).map(key => ({ [key]: gpusObj[key] }));
};
