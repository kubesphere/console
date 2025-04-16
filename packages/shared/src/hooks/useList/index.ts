/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import { get } from 'lodash';
import { useState, useMemo, useEffect } from 'react';
import { useQuery } from 'react-query';

import request from '../../utils/request';
import type { UseListInstance, UseListOptions } from './types';

type ItemsKeys = 'items' | 'results';
type TotalKeys = 'totalItems' | 'total_item' | 'total_count' | 'length';

export type ListData<T, I extends string = ItemsKeys, P extends string = TotalKeys> = {
  [K in I]?: T[];
} & {
  [K in P]?: number;
};

const useData = <TQueryFnData>(
  url: string,
  params: Record<string, any> = {},
  autoFetch: boolean = true,
  callback?: (data: any) => any,
  staleTime?: number,
) => {
  return useQuery<TQueryFnData>(
    // @ts-ignore
    ['useList', url, params],
    async () => {
      const data = await request(url, { params });
      return data as any;
    },
    {
      keepPreviousData: true,
      staleTime: staleTime || 3000,
      enabled: autoFetch,
      onSuccess: data => {
        if (callback) callback(data);
      },
    },
  );
};

const formatData = (data: any[], format: (items: any) => any) => {
  return data.map(item => format(item));
};

export type { UseListOptions, UseListInstance };

export function useList<T>(options: UseListOptions<T>): UseListInstance<T> {
  // FIXME: should refresh list when params change
  const mode = options.mode || 'page';
  const autoFetch = options.autoFetch ?? true;
  const paramsFormatFn = options.paramsFormatFn;
  const { total: totalKey = '', items: itemsKey = '' } = options?.KeyMapper || {};

  const [isTriggerRefetch, setIsTriggerRefetch] = useState(false);

  const [responseData, setResponseData] = useState({
    data: [],
    total: 0,
  });
  const [state, setState] = useState<any>({
    page: options.page || 1,
    pageSize: options.pageSize || 10,
    params: options.params,
  });

  const requestParams: Record<string, any> = useMemo(() => {
    if (!paramsFormatFn) {
      return {
        ...state.params,
        page: state.page,
      };
    }

    return paramsFormatFn(state.params || {});
  }, [state.params, state.page, !!options.paramsFormatFn]);

  const { data, isFetching, isSuccess, refetch } = useData<ListData<T>>(
    options.url,
    requestParams,
    autoFetch,
    originalResponseData => {
      const formattedData =
        originalResponseData.items?.map((item: any) => options.format?.(item) || item) || [];

      options?.onSuccess?.({ ...originalResponseData, items: [...formattedData] });
    },
    options.staleTime,
  );

  useEffect(() => {
    if (isSuccess) {
      const totalCount = totalKey
        ? get(data, totalKey, 0)
        : data?.totalItems || data?.total_item || data?.total_count || data?.length || 0;
      const originalItems = itemsKey
        ? get(data, itemsKey, [])
        : (data?.items ?? data?.results ?? []);
      const items = options.format ? formatData(originalItems, options.format) : originalItems;

      if (mode === 'page' || state.page === 1) {
        setResponseData({
          total: totalCount,
          data: items,
        });
      } else {
        const newState = state.items || [];
        newState.push(...items);
        setResponseData({
          total: totalCount,
          data: newState as any,
        });
      }
    }
  }, [isSuccess, data]);

  const triggerRefetch = async () => {
    if (isTriggerRefetch) {
      await refetch();
      setIsTriggerRefetch(false);
    }
  };

  useEffect(() => {
    triggerRefetch();
  }, [isTriggerRefetch, state]);

  const isFirst = useMemo<boolean>(() => state.page === 1, [state.page, responseData.total]);

  const isLast = useMemo<boolean>(
    () =>
      responseData.total === 0 ||
      (responseData.total > 0 && state.page >= responseData.total / state.pageSize),
    [state.page, responseData.total],
  );

  function fetch() {
    if (!autoFetch) {
      setIsTriggerRefetch(true);
    }
  }

  function refresh() {
    if (mode === 'page' || state.page === 1) {
      refetch();
    } else {
      setState({
        ...state,
        page: 1,
      });
      fetch();
    }
  }

  function reFetch(params?: Record<string, any>) {
    setState({
      ...state,
      // items: [],
      // total: 0,
      page: params?.page || 1,
      params: { ...state.params, ...params },
    });
    fetch();
  }

  function clear() {
    setState({ page: 1, pageSize: 10 });
  }

  function gotoPage(page: number) {
    setState({
      ...state,
      page,
    });
    fetch();
  }

  function prevPage() {
    if (!isFirst) {
      gotoPage(state.page - 1);
    }
  }

  function nextPage() {
    if (!isLast) {
      gotoPage(state.page + 1);
    }
  }

  return {
    isLoading: isFetching,
    isFirst,
    isLast,
    ...state,
    ...responseData,
    refresh,
    reFetch,
    prevPage,
    nextPage,
    gotoPage,
    clear,
  };
}
