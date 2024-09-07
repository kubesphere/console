/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import type { ReactNode } from 'react';
import type { Column as TableColumn, TableState } from 'react-table';
import qs from 'qs';
import { useLocalStorage } from '@kubed/hooks';

import type { Column } from './types';
import { initialState, State } from './reducer';
import { Suggestions } from './Toolbar';

export function hasContent(value: ReactNode) {
  if (value === undefined || value === null) {
    return false;
  }

  const type = typeof value;

  if (type === 'boolean') {
    return false;
  }

  if (type === 'number') {
    return true;
  }

  if (typeof value === 'string') {
    return !!value.trim();
  }

  if (Array.isArray(value)) {
    return value.length > 0;
  }

  return true;
}

export function prepareColumns<T extends Record<string, unknown>>(
  columns: Column<T>[] = [],
): { formatColumns: TableColumn<T>[]; suggestions: Suggestions } {
  const formatColumns: TableColumn<T>[] = [];
  const suggestions: Suggestions = [];
  columns.forEach(column => {
    const { title: Header, field: accessor, id, filterOptions, width, render, ...rest } = column;

    const formatColumn = {
      Header,
      accessor,
      id: id || accessor,
      width: width || 0,
      Cell: (props: any) => {
        if (!render) {
          return String(props.value);
        }
        return render(props.value, props.row.original);
      },
      filterOptions,
      ...rest,
    } as TableColumn<T>;
    formatColumns.push(formatColumn);

    if (filterOptions || column.searchable) {
      suggestions.push({
        label: Header,
        key: id || accessor,
        options: filterOptions,
      });
    }
  });
  return { formatColumns, suggestions };
}

export const transformRequestParams = (params: State) => {
  const ret: Record<string, any> = {};

  if (params.filters.length > 0) {
    params.filters.forEach(filter => {
      ret[filter.id] = filter.value;
    });
  }

  if (params.sortBy.length > 0) {
    params.sortBy.forEach(sort => {
      ret.sortBy = sort.id;
      if (!sort.desc) {
        ret.ascending = true;
      }
    });
  }

  ret.limit = params.pageSize;
  ret.page = params.pageIndex + 1;

  return { ...ret, ...params.parameters };
};

const parseQueryString = (qsObj: Record<string, any>) => {
  const state: Record<string, any> = { filters: [] };
  Object.keys(qsObj).forEach(key => {
    if (key === 'page') {
      state.pageIndex = parseInt(qsObj[key]) - 1;
    } else if (key === 'pageSize') {
      state.pageSize = qsObj[key];
    } else if (key === 'sortBy') {
      state.sortBy = [{ id: qsObj.sortBy, desc: qsObj.desc === 'true' }];
    } else if (key === 'desc') {
    } else {
      state.filters.push({ id: key, value: qsObj[key] });
    }
  });
  return state;
};

export const getInitialState = (tableName: string, initState: Record<string, any> = {}) => {
  const qsObj = qs.parse(window.location.search, { ignoreQueryPrefix: true });
  const [storageState] = useLocalStorage({ key: `tableState:${tableName}` });
  const parsedStorageState: State = JSON.parse(storageState);
  return {
    ...initialState,
    ...initState,
    hiddenColumns: parsedStorageState?.hiddenColumns || [],
    ...parseQueryString(qsObj),
  };
};

export const genQueryString = (tableState: TableState) => {
  const { pageIndex, pageSize, filters, sortBy } = tableState;

  if (
    pageIndex ||
    pageSize !== 10 ||
    Object.keys(filters).length > 0 ||
    sortBy[0]?.id !== 'createTime' ||
    !sortBy[0]?.desc
  ) {
    // @ts-ignore
    const url = new URL(window.location);
    url.searchParams.set('page', `${pageIndex + 1}`);
    url.searchParams.set('pageSize', `${pageSize}`);
    if (filters.length) {
      filters.forEach(filter => {
        url.searchParams.set(filter.id, filter.value);
      });
    }
    if (sortBy.length) {
      sortBy.forEach(sort => {
        url.searchParams.set('sortBy', sort.id);
        url.searchParams.set('desc', `${sort.desc}`);
      });
    }

    window.history.pushState({}, '', url);
  } else {
    const { origin, pathname } = window.location;
    window.history.pushState({}, '', `${origin}${pathname}`);
  }
};
