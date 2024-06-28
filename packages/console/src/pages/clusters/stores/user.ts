import { PathParams, request, userStore as us } from '@ks-console/shared';
import { useInfiniteQuery } from 'react-query';
import { getNextApiParam as getNextPageParam } from './base';

export const useInfinityQueryUserList = (
  params: PathParams,
  data: Record<string, any>,
  options = {},
) => {
  const queryKey = ['InfinityWorkspaceList', params, data];
  const ret = useInfiniteQuery(
    queryKey,
    ({ pageParam = data }) => {
      return request.get(us.getListUrl(params), { params: pageParam });
    },
    { getNextPageParam, ...options },
  );
  return {
    ...ret,
    data: ret.data?.pages?.flatMap(({ items = [] }) => items.map(us.mapper)),
  };
};
