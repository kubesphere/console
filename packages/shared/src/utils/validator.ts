/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

// @ts-ignore
import debounce from 'debounce-promise';
import request from './request';
import { getDetailUrl } from './urlHelper';
import type { PathParams } from '../types';
import { PATTERN_LABEL } from '../constants/patterns';

export const emailValidator = debounce(async (rule: any, value: string) => {
  const resp: any = await request.get('kapis/iam.kubesphere.io/v1beta1/users', {
    params: { fieldSelector: `spec.email=${value}` },
    // @ts-ignore
    headers: { 'x-check-exist': true },
  });

  if (resp.exist) return Promise.reject(t('EMAIL_EXISTS'));
  return Promise.resolve();
}, 500);

export const nameValidator = debounce(async (params: PathParams) => {
  const url = getDetailUrl(params);
  const resp: any = await request.get(url, {
    // @ts-ignore
    headers: { 'x-check-exist': true },
  });

  if (resp.exist) return Promise.reject(t('USERNAME_EXISTS'));
  return Promise.resolve();
}, 500);

// validate same item key
export const annotations = (rule: any, value: Record<string, string> = {}) => {
  // const keys = value.map(item => Object.keys(item)[0]);
  // if (keys.length !== new Set(keys).size) {
  //   return Promise.reject(t('DUPLICATE_KEYS'));
  // }
  return Promise.resolve();
};

export const isValidLabel = (label: Record<string, string>) =>
  Object.entries(label).every(
    ([key, value]) =>
      value.length <= 63 &&
      key.length <= (key.indexOf('/') !== -1 ? 253 : 63) &&
      key.replace(/\//g, '').replace(PATTERN_LABEL, '') === '' &&
      value.replace(PATTERN_LABEL, '') === '',
  );
