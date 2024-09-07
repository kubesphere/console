/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

export const PAGE_CHANGED = 'PAGE_CHANGED';
export const PAGE_SIZE_CHANGED = 'PAGE_SIZE_CHANGED';
export const TOTAL_COUNT_CHANGED = 'TOTAL_COUNT_CHANGED';
export const FILTER_CHANGED = 'FILTER_CHANGED';
export const SORTBY_CHANGED = 'SORTBY_CHANGED';

export type State = {
  sortBy: { id: string; desc: boolean }[];
  filters: Record<string, any>[];
  pageIndex: number;
  pageSize: number;
  totalCount?: number;
  hiddenColumns?: string[];
  parameters?: Record<string, any>;
};

export const initialState: State = {
  sortBy: [{ id: 'createTime', desc: true }],
  filters: [],
  hiddenColumns: [],
  pageIndex: 0,
  pageSize: 10,
};

export const reducer = (state: State, { type, payload }: { type: string; payload: any }) => {
  switch (type) {
    case PAGE_CHANGED:
      return {
        ...state,
        pageIndex: payload,
      };
    case PAGE_SIZE_CHANGED:
      return {
        ...state,
        pageSize: payload.pageSize,
        pageIndex: payload.pageIndex,
      };
    case TOTAL_COUNT_CHANGED:
      return {
        ...state,
        totalCount: payload,
      };
    case SORTBY_CHANGED:
      return {
        ...state,
        sortBy: payload,
      };
    case FILTER_CHANGED:
      return {
        ...state,
        pageIndex: 0,
        filters: payload,
      };
    default:
      throw new Error(`Unhandled action type: ${type}`);
  }
};
