/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import type { ReactNode, ReactElement } from 'react';
import type { TableState, TableInstance } from 'react-table';
import type { EmptyProps } from '@kubed/components';

import type { UseWebSocketOptions } from '../../hooks';
import type { TableEmptyProps } from './TableEmpty';
import { TableSkeletonProps } from '../Skeletons/TableSkeleton';

interface BaseColumn {
  title: string | ReactNode;
  description?: { title?: string; content?: ReactNode };
  id?: string;
  searchable?: boolean;
  sortable?: boolean;
  filterOptions?: { label: string | ReactNode; key: any }[];
  canHide?: boolean;
  width?: number | string;
  minWidth?: number;
  maxWidth?: number;
}

type ValueOf<
  ObjectType,
  ValueType extends keyof ObjectType = keyof ObjectType,
> = ObjectType[ValueType];
type Render<T extends Record<string, any>> = (value: ValueOf<T>, row: T) => ReactNode;

interface RequiredFieldColumn<T extends Record<string, any>> {
  field: string;
  render?: Render<T>;
}

interface RequiredRenderColumn<T extends Record<string, any>> {
  field?: string;
  render: Render<T>;
}

export type Column<T extends Record<string, any> = Record<string, any>> = BaseColumn &
  (RequiredFieldColumn<T> | RequiredRenderColumn<T>);

type TransformParamsFn = (params: any) => any;

export interface TableEmptyObjectOptions extends TableEmptyProps {
  withoutTable?: boolean;
}

export interface TableEmptyElementOptions {
  withoutTable?: boolean;
  element: ReactElement | null;
}

type TableEmptyOptions = boolean | TableEmptyObjectOptions | TableEmptyElementOptions;

export interface TableFilteredEmptyObjectOptions extends EmptyProps {
  withoutTable?: boolean;
  showRefetchButton?: boolean;
  showClearAndRefetchButton?: boolean;
}

export type TableFilteredEmptyElementOptions = TableEmptyElementOptions;

type TableFilteredEmptyOptions =
  | boolean
  | TableFilteredEmptyObjectOptions
  | TableFilteredEmptyElementOptions;

export interface TableProps<
  T extends Record<string, any> = Record<string, any>,
  U extends Record<string, any> = Record<string, any>,
> {
  columns: Column<T>[];
  tableName: string;
  rowKey: string;
  className?: string;
  loading?: boolean;
  footer?: ReactNode;
  onChange?: (state: TableState<T>) => any;
  data?: Array<T>;
  format?: (data: Record<string, any>) => T;
  serverDataFormat?: (serverData: Record<string, any>) => U;
  initialState?: Record<string, any>;
  hideTableHead?: boolean;
  hideFilters?: boolean;
  manualSortBy?: boolean;
  manualFilters?: boolean;
  totalCount?: number;
  showToolbar?: boolean;
  showFooter?: boolean | 'only-multi-page';
  url?: string;
  fetchCallback?: (data: Array<T>) => any;
  batchActions?: ReactNode;
  onSelect?: (selectedRowIds: Record<string, boolean>, selectedFlatRows: T[]) => any;
  onPageChange?: (pageIndex: number, pageSize?: number) => void;
  onFilterInputChange?: (value: any) => void;
  disableRowSelect?: (row?: Record<string, any>) => boolean;
  onFilter?: () => any;
  onSort?: () => any;
  onRefresh?: () => any;
  simpleSearch?: boolean;
  placeholder?: string;
  selectType?: 'checkbox' | 'radio' | boolean;
  useStorageState?: boolean;
  header?: ReactNode;
  toolbarLeft?: ReactNode;
  toolbarRight?: ReactNode;
  parameters?: Record<string, any>;
  transformRequestParams?: TransformParamsFn;
  enableQueryString?: boolean;
  watchOptions?: Pick<
    UseWebSocketOptions<Record<string, any>, T>,
    'enabled' | 'url' | 'module' | 'isFederated' | 'format' | 'onAddedOrDeleted'
  >;
  emptyOptions?: TableEmptyOptions;
  onChangeData?: (data: T[]) => void;
  isLoading?: boolean;
  filteredEmptyOptions?: TableFilteredEmptyOptions;
  skeleton?: TableSkeletonProps;
  hideSettingMenu?: boolean;
}

export interface TableRef<T extends Record<string, any> = Record<string, any>> {
  instance: TableInstance<T>;
  refetch: () => void;
  getSelectedRowIds: () => Record<string, boolean>;
  getSelectedFlatRows: () => T[];
}
