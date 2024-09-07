/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import { isEmpty, isUndefined, trimStart } from 'lodash';

import type { ConditionParams, UseQueryParamsInstance, UseQueryParamsOption } from './types';

function getConditions({ status, appID, versionID, repoID, resourceName }: ConditionParams) {
  const conditions: Record<string, string | string[] | undefined> = { status };

  if (resourceName === 'applications') {
    conditions.appID = appID;
    conditions.versionID = versionID;
  }

  if (repoID) {
    conditions.repoID = repoID;
  }

  return conditions;
}

function getFilterString(
  params: Record<string, any>,
  fuzzyMatchKeys = ['name', 'app.kubernetes.io/name', 'label', 'annotation'],
) {
  return Object.keys(params)
    .filter(key => !isUndefined(params[key]) && params[key] !== '')
    .map(key =>
      fuzzyMatchKeys.includes(key) && !/\|/g.test(params[key])
        ? `${key}~${trimStart(params[key])}`
        : `${key}=${trimStart(params[key])}`,
    )
    .join(',');
}

export function useListQueryParams(
  {
    status,
    appID,
    versionID,
    repoID,
    order,
    ascending,
    statistics,
    page,
    limit,
    keyword,
    categoryID,
    repoId,
    otherQuery,
    ...filters
  }: UseQueryParamsOption,
  resourceName?: string,
): UseQueryParamsInstance {
  const conditions = getConditions({ resourceName, status, appID, versionID, repoID });
  const params: UseQueryParamsInstance = {
    sortBy: order,
    // paging: `limit=${limit || 10},page=${page || 1}`,
    conditions: getFilterString(conditions),
    limit: limit || 10,
    page: page || 1,
    // name: keyword,
  };
  if (keyword) {
    params.name = keyword;
  }

  if (ascending === undefined) {
    ascending = false;
  }

  if (!isEmpty(filters)) {
    // TODO 此处的categoryID 是否未应用的categoryID 先修改了查询方式
    // if (filters.categoryID === 'all') {
    //   filters.categoryID = '';
    // }

    const filterStr = getFilterString(filters);
    params.conditions += filterStr ? `,${filterStr}` : '';
  }
  if (categoryID && categoryID !== 'all') {
    params.labelSelector = `application.kubesphere.io/app-category-name=${categoryID}`;
  }
  if (repoId) {
    params.labelSelector = params.labelSelector ? `${params.labelSelector},${repoId}` : repoId;
  }
  const { label: appLabel, ...others } = otherQuery || {};
  if (appLabel) {
    params.labelSelector = params.labelSelector ? `${params.labelSelector},${appLabel}` : appLabel;
  }

  if (ascending) {
    params.ascending = true;
  }

  if (statistics) {
    params.statistics = true;
  }

  return { ...params, ...others };
}
