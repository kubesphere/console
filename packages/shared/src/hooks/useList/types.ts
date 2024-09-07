/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

export type ListMode = 'infinity' | 'page';

export type KeyMapper = {
  total: string;
  items: string;
};

export interface Pagination {
  page: number;
  pageSize: number;
  total: number;
}

export interface List<T> extends Pagination {
  items?: T[];
  params?: Record<string, any>;
}

export type UseListState<T> = List<T>;

export interface UseListOptions<T> extends Partial<List<T>> {
  mode?: ListMode;
  isLoading?: boolean;
  url: string;
  params?: Record<string, any>;
  autoFetch?: boolean;
  KeyMapper?: KeyMapper;
  format?: (items: any) => any;
  paramsFormatFn?: (params: Record<string, any>) => Record<string, any>;
  onSuccess?: (data: List<T>) => void;
  staleTime?: number;
}

export interface UseListInstance<T> extends UseListState<T> {
  isLoading: boolean;
  isFirst: boolean;
  isLast: boolean;
  data?: T[];

  // async methods
  reFetch(params?: Record<string, any>): void;

  refresh(): void;

  gotoPage(page: number): void;

  nextPage(): void;

  prevPage(): void;

  // sync methods
  clear(): void;
}
