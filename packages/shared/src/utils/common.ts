/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import { customAlphabet } from 'nanoid';
import { hasExtensionModuleAnnotation, isMultiCluster } from './checker';
import { isNull, isUndefined } from 'lodash';
import { hasClusterModule } from './nav';

type Lang = 'en' | 'zh' | 'tc';
export const getBrowserLang = (defaultValue = 'en'): Lang => {
  // @ts-ignore
  const lang = (navigator.language || navigator.browserLanguage).toLowerCase();

  if (lang === 'zh-tw') {
    return 'tc';
  }
  if (lang.indexOf('zh') !== -1) {
    return 'zh';
  }
  if (lang.indexOf('en') !== -1) {
    return 'en';
  }

  return window.globals?.config?.defaultLang || defaultValue;
};

export const getUserLang = (defaultValue = '') => globals?.user?.lang ?? defaultValue;

export const getCurrentLang = (defaultValue?: string) => {
  const userLang = getUserLang(defaultValue);

  if (userLang) {
    return userLang;
  }

  return getBrowserLang(defaultValue);
};

export function updateOriginalItem<TOriginalItem extends Record<string, any>>(
  listData: TOriginalItem[],
  item?: TOriginalItem,
) {
  const listDataShadow = [...listData];
  const uid = item?.metadata?.uid;
  if (uid) {
    const index = listData.findIndex(currentItem => currentItem?.metadata?.uid === uid);
    if (index >= 0) {
      listDataShadow.splice(index, 1, item);
    }
  }

  return listDataShadow;
}

export function updateFormattedItem<TFormattedItem extends Record<string, any>>(
  listData: TFormattedItem[],
  item?: TFormattedItem,
) {
  const listDataShadow = [...listData];
  const uid = item?.uid;
  if (uid) {
    const index = listData.findIndex(currentItem => currentItem?.uid === uid);
    if (index >= 0) {
      listDataShadow.splice(index, 1, item);
    }
  }

  return listDataShadow;
}

export function joinSelector(selector: any = {}) {
  return Object.entries(selector)
    .filter(entry => !isUndefined(entry[1]) && !isNull(entry[1]))
    .map(([key, value]) => `${key}=${value}`)
    .join(',');
}

export function hideGPUByLicense(config: Record<string, any>, cluster: string) {
  const params = config;

  const isGPUMonitor = hasExtensionModuleAnnotation(
    'whizard-monitoring',
    'monitoring.kubesphere.io/enable-gpu-monitoring',
  );

  const isShowGPUMonitor =
    !isMultiCluster() || !cluster
      ? isGPUMonitor
      : isGPUMonitor && hasClusterModule(cluster, 'whizard-monitoring');

  const type = Object.prototype.toString.call(params);

  if (!isShowGPUMonitor) {
    if (type === '[object Array]') {
      return params.filter((item: Record<string, any>) => {
        const param = item.key || item.field || item.title || item.name || item.icon || item;
        return param.toLowerCase().indexOf('gpu') < 0;
      });
    }

    Object.keys(params)
      .filter(item => item.indexOf('gpu') > -1)
      .forEach(item => delete params[item]);
    return params;
  }

  return params;
}
export const hasChinese = (str: string) => /.*[\u4E00-\u9FA5]+.*/.test(str);
export const cacheFunc = (key: string, func: (key: any) => void, context: any) => {
  context._funcCaches = context._funcCaches || {};

  if (!context._funcCaches[key]) {
    context._funcCaches[key] = func;
  }

  return context._funcCaches[key];
};

export function showOutSiteLink(): boolean | undefined {
  return globals.config.showOutSiteLink;
}

export function learnMoreTip(text: string): string {
  const reg = /<a.+?>(.+)<\/a>/g;
  const showOutSite = showOutSiteLink();
  const showLink = isUndefined(showOutSite) ? true : showOutSite;

  if (!showLink && !isUndefined(text) && reg.test(text)) {
    return text.replace(reg, '');
  }

  return text;
}

export function generateId(length?: number): string {
  return customAlphabet('0123456789abcdefghijklmnopqrstuvwxyz', length || 6)();
}
