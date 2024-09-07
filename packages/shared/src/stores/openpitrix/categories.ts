/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import { request } from '../../utils';
import type { CategoryDetail } from '../../types';
import { UseListInstance, UseListOptions } from '../../hooks';

import { defaultUrl, getBaseUrl, useBaseList } from './base';

const resourceName = 'categories';

export const CATEGORY_ICONS: string[] = [
  'database',
  'export',
  'documentation',
  'mail',
  'calendar',
  'column',
  'earth',
  'picture',
  'firewall',
  'ai',
  'camera',
  'image',
  'increase',
  'network',
  'router',
  'storage',
  'scissors',
  'loadbalancer',
  'ip',
  'blockchain',
  'car',
  'nodes',
  'usb-redirection',
  'coding',
  'cdn',
  'ssh',
  'linechart',
  'cart',
  'cluster',
  'role',
  'wrench',
  'radio',
];

export function getCategoriesUrl(categoryID?: string): string {
  const baseCategoriesUrl = `${defaultUrl}/${resourceName}`;

  return baseCategoriesUrl + `${categoryID ? `/${categoryID}` : ''}`;
}

type UseCategoryListInput = {
  categoryID?: string;
  options?: Partial<UseListOptions<unknown>>;
};

export function useCategoryList({
  categoryID,
  options,
}: UseCategoryListInput = {}): UseListInstance<CategoryDetail> {
  const url = getCategoriesUrl(categoryID);

  return useBaseList(url, options);
}

export function deleteCategory(categoryID: string) {
  const url = getCategoriesUrl(categoryID);
  return request.delete(url);
}

export function updateCategory(categoryID: string, data: any) {
  return request.patch(getCategoriesUrl(categoryID), data);
}

export function createCategory(data: Pick<CategoryDetail, 'metadata' | 'spec'>) {
  const url = getBaseUrl({}, resourceName);

  return request.post(url, data);
}
