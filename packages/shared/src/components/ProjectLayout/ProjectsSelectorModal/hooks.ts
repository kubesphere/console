/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import { QueryFunctionContext, useInfiniteQuery } from 'react-query';

import { devopsStore, projectStore, federatedProjectStore } from '../../../stores';
import { request } from '../../../utils';
import type {
  PathParams,
  FormattedDevops,
  OriginalDevops,
  FormattedNamespace,
  OriginalNamespace,
  FormattedFederateProject,
  OriginalFederatedProject,
} from '../../../types';

const { getDevopsTenantUrl, mapper: devopsMapper } = devopsStore;
const { getListUrl: getProjectListUrl, mapper: namespaceMapper } = projectStore;
const { getListUrl: getFederateListUrl, mapper: federatedProjectMapper } = federatedProjectStore;

type OriginalTypeProject = OriginalNamespace | OriginalDevops | OriginalFederatedProject;

export type FormattedTypeProject = FormattedNamespace | FormattedFederateProject | FormattedDevops;

type TypeProjectsFormatterFunc = (data: OriginalTypeProject) => FormattedTypeProject;

type UrlAndDataFormatterType = { url: string; formatter: TypeProjectsFormatterFunc };

interface FetchProjectsByTypeInfiniteParams {
  limit?: number;
  page?: number;
  sortBy?: string;
  name?: string;
  cluster?: string;
  labelSelector?: string;
}

function getUrlAndDataFormatterByType(type: string, params: PathParams): UrlAndDataFormatterType {
  const { cluster, workspace, namespace, devops } = params;
  const urlAndFormatterMap: Record<string, UrlAndDataFormatterType> = {
    projects: {
      url: getProjectListUrl({ cluster, workspace, namespace, devops }),
      formatter: namespaceMapper,
    },
    devops: {
      url: getDevopsTenantUrl({ cluster, workspace, namespace, devops }),
      formatter: devopsMapper as TypeProjectsFormatterFunc,
    },
    federatedprojects: {
      url: getFederateListUrl({ workspace, namespace, devops }),
      formatter: federatedProjectMapper as TypeProjectsFormatterFunc,
    },
  };

  return urlAndFormatterMap[type];
}

interface UseFetchProjectsByTypeInfiniteQueryOptions extends PathParams {
  type: string;
  params?: FetchProjectsByTypeInfiniteParams;
}

export function useFetchProjectsByTypeInfiniteQuery({
  type,
  params,
  cluster,
  workspace,
}: UseFetchProjectsByTypeInfiniteQueryOptions) {
  const { url, formatter } = getUrlAndDataFormatterByType(type, { workspace, cluster });
  const isFederated = type === 'federatedprojects';
  const defaultParams: FetchProjectsByTypeInfiniteParams = {
    limit: 10,
    page: 1,
    sortBy: 'createTime',
    labelSelector: isFederated
      ? `kubesphere.io/kubefed-host-namespace=true`
      : 'kubesphere.io/managed=true,kubesphere.io/kubefed-host-namespace!=true',
  };
  const finaleParams = { ...defaultParams, ...params };
  const queryKey = [url, finaleParams];

  const result = useInfiniteQuery({
    queryKey,
    queryFn: async ({
      queryKey: key,
      pageParam = defaultParams,
    }: QueryFunctionContext<typeof queryKey, FetchProjectsByTypeInfiniteParams>) => {
      // @ts-ignore
      const formatterParams = { ...pageParam, name: key[1].name };
      const dataList = await request.get<never, any>(url, { params: formatterParams });

      return { ...dataList, ...pageParam };
    },
    getNextPageParam: lastPage => {
      const { items, totalItems, limit, page, ...rest } = lastPage;
      const hasNextPage = limit * (page - 1) + items.length < totalItems;
      if (!hasNextPage) {
        return;
      }
      return { limit, page: page + 1, ...rest };
    },
  });

  const originalData: OriginalTypeProject[] =
    result.data?.pages.flatMap(({ items }) => items) ?? [];
  const formattedData: FormattedTypeProject[] = originalData.map(formatter);

  return { ...result, queryKey, originalData, formattedData };
}
