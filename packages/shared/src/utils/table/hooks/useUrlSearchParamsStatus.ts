/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import { TableState } from '@tanstack/react-table';
import { isEmpty, set } from 'lodash';
import React from 'react';
import { useSearchParams } from 'react-router-dom';

export const status2UrlParams = (
  state: Partial<TableState>,
  params: URLSearchParams,
): URLSearchParams => {
  // const params = new URLSearchParams();
  const { pagination, columnFilters, sorting } = state;
  if (pagination) {
    params.set('limit', pagination.pageSize.toString());
    params.set('page', (pagination.pageIndex + 1).toString());
  }
  if (sorting && !isEmpty(sorting)) {
    const last = sorting[sorting.length - 1];
    params.set('sortBy', last.id);
    params.set('ascending', last.desc ? 'false' : 'true');
  }
  if (columnFilters && !isEmpty(columnFilters)) {
    columnFilters.forEach(({ id, value }) => {
      params.set(id, value as string);
    });
  }
  return params;
};

export const tableState2Query = (state: Partial<TableState>) => {
  const params = {};
  const { pagination, columnFilters, sorting } = state;
  if (pagination) {
    set(params, 'limit', pagination.pageSize.toString());
    set(params, 'page', (pagination.pageIndex + 1).toString());
  }
  if (sorting && !isEmpty(sorting)) {
    const last = sorting[sorting.length - 1];
    set(params, 'sortBy', last.id);
    set(params, 'ascending', last.desc ? 'false' : 'true');
  }
  if (columnFilters && !isEmpty(columnFilters)) {
    columnFilters.forEach(({ id, value }) => {
      set(params, `${id}`, value as string);
    });
  }
  return params;
};

export const urlParams2Status = (params?: URLSearchParams): Partial<TableState> => {
  if (!params) {
    return {};
  }
  const state: Partial<TableState> = {};
  const limit = params.get('limit');
  const page = params.get('page');
  const sortBy = params.get('sortBy');
  const ascending = params.get('ascending') ?? 'true';
  if (limit && page) {
    state.pagination = {
      pageSize: parseInt(limit),
      pageIndex: parseInt(page) - 1,
    };
  }

  if (sortBy) {
    state.sorting = [
      {
        id: sortBy,
        desc: ascending === 'false',
      },
    ];
  }
  const columnFilters = Array.from(params.keys()).filter(
    key => !['limit', 'page', 'sortBy', 'ascending'].includes(key),
  );
  if (!isEmpty(columnFilters)) {
    state.columnFilters = state.columnFilters ?? [];

    columnFilters.forEach(key => {
      const value = params.get(key);
      state.columnFilters?.push({
        id: key,
        value,
      });
    });
  }

  return state;
};

const omitUrlSearchParams = (params: URLSearchParams, omitKeys: string[]) => {
  const newParams = new URLSearchParams(params.toString());
  omitKeys.forEach(key => newParams.delete(key));
  return newParams;
};

const pickUrlSearchParams = (params: URLSearchParams | string, pickKeys: string[]) => {
  const p = typeof params === 'string' ? new URLSearchParams(params) : params;

  const newParams = new URLSearchParams();
  pickKeys.forEach(key => {
    if (p.has(key)) {
      newParams.set(key, p.get(key) as string);
    }
  });
  return newParams;
};

export const useUrlSearchParamsStatus = (
  omitKeys: string[] = [],
): {
  state: Partial<TableState>;
  setState: (state: Partial<TableState>, type: keyof TableState) => void;
  params: URLSearchParams;
  setParams: (params: URLSearchParams) => void;
} => {
  const [params, setParams] = useSearchParams();
  const paramsRef = React.useRef(params.toString());
  const [state, setState] = React.useState<Partial<TableState>>(
    urlParams2Status(omitUrlSearchParams(params, omitKeys)),
  );

  const handleState = React.useCallback((_state: Partial<TableState>, type: keyof TableState) => {
    if (type === 'columnFilters') {
      set(_state, 'pagination.pageIndex', 0);
    }
    const newParams = status2UrlParams(_state, pickUrlSearchParams(paramsRef.current, omitKeys));
    setState(_state);
    paramsRef.current = newParams.toString();
    setParams(newParams.toString());
  }, []);

  React.useEffect(() => {
    if (paramsRef.current !== params.toString()) {
      setState(urlParams2Status(omitUrlSearchParams(params, omitKeys)));
      paramsRef.current = params.toString();
    }
  }, [params]);

  return {
    state,
    setState: handleState,
    params,
    setParams,
  };
};
