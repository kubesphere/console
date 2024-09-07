/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import { BaseStore, PathParams } from '../index';
import { merge } from 'lodash';
import { useInfiniteQuery, useMutation, useQuery } from 'react-query';

const getNextPageParam = (lastPage: Record<string, any>) => {
  const { data, total, limit, page, ...rest } = lastPage;
  const hasNextPage = limit * (page - 1) + data.length < total;
  if (hasNextPage) {
    const nextParams = {
      ...rest,
      page: lastPage.page + 1,
      limit,
    };
    return nextParams;
  }
  return undefined;
};

const getQueryDetail = <T extends Record<string, any>>(store: T) => {
  return <P>(params: PathParams, options: Record<string, any> = {}) => {
    const queryKey = [`Detail${store.module}`, params];
    return useQuery<P>({
      queryKey,
      queryFn: () => store.fetchDetail(params),
      ...options,
      enabled: (options?.enabled ?? true) && !!params.name,
    });
  };
};

const getUseQueryList = <T extends Record<string, any>>(store: T) => {
  return <P extends Record<string, any>>(
    params: PathParams & Record<string, any> = {},
    options: Record<string, any> = {},
  ) => {
    const queryKey = [`List${store.module}`, params];
    return useQuery<P>({
      queryKey,
      queryFn: () => store.fetchList(params),
      ...options,
    });
  };
};

const getUseInfinityQueryList = <T extends Record<string, any>>(store: T) => {
  return <P extends Record<string, any>>(
    params: PathParams & Record<string, any> = {},
    options: Record<string, any> = {},
  ) => {
    const queryKey = [`Infinity${store.module}`, params];
    const ret = useInfiniteQuery<P>(
      queryKey,
      ({ pageParam = params }) => {
        return store.fetchList(pageParam);
      },
      { getNextPageParam, ...options },
    );
    return {
      ...ret,
      data: ret.data?.pages?.flatMap(({ data = [] }) => data),
    };
  };
};

export type MutationOp = 'POST' | 'PUT' | 'PATCH' | 'UPDATE' | 'DELETE' | 'BATCH_DELETE';

export const getMutations = <T extends ReturnType<typeof BaseStore>>(store: T) => {
  return (op?: MutationOp, defaultParams?: PathParams, options: Record<string, any> = {}) => {
    return useMutation(async ({ op: op1, params, data }: Record<string, any>) => {
      const p = merge({}, defaultParams, params);
      switch (op1 ?? op) {
        case 'POST':
          return store.post(p, data);
        case 'PUT':
          return store.put(p, data);
        case 'PATCH':
        case 'UPDATE':
          return store.patch(p, data);
        case 'DELETE':
          return store.delete(data);
        case 'BATCH_DELETE':
          return store.batchDelete(data);
        default:
          throw new Error(`unknown op: ${op1 ?? op}`);
      }
    }, options);
  };
};

export const getStoreWithQueryHooks = <T extends ReturnType<typeof BaseStore>>(store: T) => {
  return {
    ...store,
    useQueryDetail: getQueryDetail(store),
    useMutations: getMutations(store),
    useInfiniteQueryList: getUseInfinityQueryList(store),
    useQueryList: getUseQueryList(store),
  };
};
