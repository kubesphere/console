/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import { merge } from 'lodash';
import type { PartialDeep } from 'type-fest';
// import type { ObjectMeta } from '@ks-console/shared';
import { getBrowserLang, getUserLang } from '@ks-console/shared';

import type { OriginalExtension } from '../types/extension';
import { EMPTY_ORIGINAL_EXTENSION, DEFAULT_LANGUAGE } from '../constants/extension';

function makeOriginalExtension({
  data,
}: {
  data: PartialDeep<OriginalExtension>;
}): OriginalExtension {
  return merge(null, EMPTY_ORIGINAL_EXTENSION, data);
}

interface GetLocaleValueOptions<T> {
  data: Record<string, T> | undefined;
  defaultValue: T;
}

function getLocaleValue<T = string>({ data, defaultValue }: GetLocaleValueOptions<T>) {
  if (!data) {
    return defaultValue;
  }

  const userLanguage = getUserLang();
  const browserLanguage = getBrowserLang();

  return data[userLanguage] ?? data[browserLanguage] ?? data[DEFAULT_LANGUAGE] ?? defaultValue;
}

/* interface GetCategoryNamesByLabelsOptions {
  data: ObjectMeta['labels'];
  keyPrefix?: string;
} */

/* function getCategoryNamesByLabels({
  data,
  keyPrefix = 'category.kubesphere.io/',
}: GetCategoryNamesByLabelsOptions) {
  if (!data) {
    return [];
  }

  const categoryNames: string[] = [];

  Object.keys(data).forEach(key => {
    const isCategoryKey = key.startsWith(keyPrefix);
    if (isCategoryKey) {
      const categoryName = key.slice(keyPrefix?.length ?? 0, key.length);
      categoryNames.push(categoryName);
    }
  });

  return categoryNames;
} */

export { makeOriginalExtension, getLocaleValue };
