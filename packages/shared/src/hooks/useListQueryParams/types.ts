/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

export type ConditionParams = {
  status?: string;
  appID?: string;
  versionID?: string;
  repoID?: string | string[];
  resourceName?: string;
};

export type UseQueryParamsOption = {
  order: string;
  limit?: number;
  page?: number;
  noLimit?: boolean;
  status?: string;
  appID?: string;
  versionID?: string;
  repoID?: string;
  statistics?: boolean;
  reverse?: boolean;
  more?: any;
  workspace?: string;
  filters?: Record<string, any>;
  keyword?: string;
  categoryID?: string;
  repoId?: string;
  otherQuery?: Record<string, any>;
  [key: string]: unknown;
};

export type UseQueryParamsInstance = {
  sortBy: string;
  limit: number;
  page: number;
  conditions: string;
  ascending?: boolean;
  statistics?: boolean;
  labelSelector?: string;
  name?: string;
};
