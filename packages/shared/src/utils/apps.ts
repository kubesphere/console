/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import { capitalize } from 'lodash';

import type { AppVersion, AppDetail } from '../types';
import {
  RADON_DB_APP_ID_MAP,
  STATUS_TRANSFER_MAP,
  UN_CATE_KEY,
  APP_VERSION_STATUS_MAP,
} from '../constants/common';

export function isUnCategorizedCtg(categoryName: string): boolean {
  return categoryName === UN_CATE_KEY;
}

export function transferAppStatus(status: string): string {
  if (STATUS_TRANSFER_MAP[status]) {
    return t(`APP_STATUS_${STATUS_TRANSFER_MAP[status].toUpperCase().replace(/[^A-Z]+/g, '_')}`);
  }

  return status;
}

export function transferVersionStatus(status: string): string {
  if (APP_VERSION_STATUS_MAP[status]) {
    return t(
      `APP_VERSION_STATUS_${APP_VERSION_STATUS_MAP[status].toUpperCase().replace(/[^A-Z]+/g, '_')}`,
    );
  }
  if (STATUS_TRANSFER_MAP[status]) {
    return status === 'draft'
      ? t('APP_STATUS_NOT_SUBMITTED')
      : t(`APP_STATUS_${STATUS_TRANSFER_MAP[status].toUpperCase().replace(/[^A-Z]+/g, '_')}`);
  }

  return status;
}

export function getVersionTypesName(typeStr: string): string {
  if (!typeStr) {
    return '-';
  }

  const types = typeStr.split(',');

  return types.map(type => capitalize(type)).join(' ');
}

export const getUncategorizedApp = 'kubesphere-app-uncategorized';

export function getCreateAppParams(data: Record<string, any>) {
  const { base64Str, appName, versionName, workspace, ...otherData } = data;
  return {
    repoName: 'upload',
    package: base64Str,
    originalName: appName,
    categoryName: getUncategorizedApp,
    appName: appName || undefined,
    versionName,
    workspace,
    ...otherData,
  };
}

export function getCreateAppParamsFormData(data: Record<string, any>) {
  const { appName, versionName, workspace, ...otherData } = data;
  return {
    repoName: 'upload',
    originalName: appName,
    categoryName: getUncategorizedApp,
    appName: appName || undefined,
    versionName,
    workspace,
    ...otherData,
  };
}

export function getCategoryDisplayName(name: string): string {
  if (!name) return '-';
  if (name === getUncategorizedApp) {
    return t('APP_CATE_UNCATEGORIZED');
  }
  return t(`APP_CATE_${name.toUpperCase().replace(/[^A-Z]+/g, '_')}`, {
    defaultValue: name,
  });
}
export const getDetailMetadataCategory = (categories: AppDetail) => {
  const aliasName = categories?.metadata?.annotations?.['kubesphere.io/alias-name'];
  if (aliasName) {
    return aliasName;
  }
  const label = categories?.metadata?.name;

  return getCategoryDisplayName(label);
};
export function getAppCategoryNames(categories: any[]): string {
  const categoryNames = categories.reduce((names: string[], { categoryID, name, status }) => {
    if ((categoryID && status !== 'disabled') || categoryID === 'radondb') {
      const result = isUnCategorizedCtg(categoryID) ? t('APP_CATE_UNCATEGORIZED') : name;
      return names.concat(t(result || categoryID));
    }

    return names;
  }, []);

  return categoryNames.join(',') || '-';
}

export function downloadFileFromBase64(base64Str = '', fileName: string): void {
  const a = document.createElement('a');
  a.href = `data:application/tar+gzip;base64,${base64Str}`;
  a.download = `${fileName}.tgz`;
  a.click();
}

export function generateMarks(min: number, max: number): number[] {
  const n = 5;
  const step = parseInt(((max - min) / n).toString(), 10);
  const o: any[] = [];

  for (let i = 0; i < n; i++) {
    const v = min + i * step;
    o[v] = v;
  }

  o[max] = max;

  return o.filter(k => !!k);
}

export function isRadonDB(appId: string): boolean {
  return Object.values(RADON_DB_APP_ID_MAP).includes(appId);
}

export function getAvatar(icon: string): string {
  const defaultUrl = 'kapis/openpitrix.io/v2';
  return String(icon).startsWith('att-') ? `/${defaultUrl}/attachments/${icon}?filename=raw` : icon;
}

export function getPackageName(detail?: AppVersion): string {
  if (!detail) {
    return '';
  }

  const { metadata } = detail;
  const { name } = metadata;
  return name;

  // if (!spec.sources?.[0] || spec.sources?.[0].startsWith('att-')) {
  //   return `${appName}-${name}`;
  // }
  //
  // return spec.sources?.[0];
}
// get app-manage keys
export function getAuthKey(key: string = 'app-templates') {
  return location.href.includes('/apps-manage') ? 'manage-app' : key;
}

export function addCreateAppUrl(url: string) {
  return url;
}
