/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

/* eslint-disable */
// @ts-nocheck
import React, { MouseEventHandler } from 'react';
import {
  TableInstance,
  UseColumnOrderInstanceProps,
  UseColumnOrderState,
  UseExpandedHooks,
  UseExpandedInstanceProps,
  UseExpandedOptions,
  UseExpandedRowProps,
  UseExpandedState,
  UseFiltersColumnOptions,
  UseFiltersColumnProps,
  UseFiltersInstanceProps,
  UseFiltersOptions,
  UseFiltersState,
  UseGlobalFiltersInstanceProps,
  UseGlobalFiltersOptions,
  UseGlobalFiltersState,
  UseGroupByCellProps,
  UseGroupByColumnOptions,
  UseGroupByColumnProps,
  UseGroupByHooks,
  UseGroupByInstanceProps,
  UseGroupByOptions,
  UseGroupByRowProps,
  UseGroupByState,
  UsePaginationInstanceProps,
  UsePaginationOptions,
  UsePaginationState,
  UseResizeColumnsColumnOptions,
  UseResizeColumnsColumnProps,
  UseResizeColumnsOptions,
  UseResizeColumnsState,
  UseRowSelectHooks,
  UseRowSelectInstanceProps,
  UseRowSelectOptions,
  UseRowSelectRowProps,
  UseRowSelectState,
  UseSortByColumnOptions,
  UseSortByColumnProps,
  UseSortByHooks,
  UseSortByInstanceProps,
  UseSortByOptions,
  UseSortByState,
} from 'react-table';

declare module 'react-table' {
  export interface UseFlexLayoutInstanceProps<D extends Record<string, unknown>> {
    totalColumnsMinWidth: number;
  }

  export interface UseFlexLayoutColumnProps<D extends Record<string, unknown>> {
    totalMinWidth: number;
  }

  export interface TableOptions<D extends Record<string, unknown>>
    extends UseExpandedOptions<D>,
      UseFiltersOptions<D>,
      UseFiltersOptions<D>,
      UseGlobalFiltersOptions<D>,
      UseGroupByOptions<D>,
      UsePaginationOptions<D>,
      UseResizeColumnsOptions<D>,
      UseRowSelectOptions<D>,
      UseSortByOptions<D> {}

  export interface Hooks<D extends Record<string, unknown> = Record<string, unknown>>
    extends UseExpandedHooks<D>,
      UseGroupByHooks<D>,
      UseRowSelectHooks<D>,
      UseSortByHooks<D> {}

  export interface TableInstance<D extends Record<string, unknown> = Record<string, unknown>>
    extends UseColumnOrderInstanceProps<D>,
      UseExpandedInstanceProps<D>,
      UseFiltersInstanceProps<D>,
      UseGlobalFiltersInstanceProps<D>,
      UseGroupByInstanceProps<D>,
      UsePaginationInstanceProps<D>,
      UseRowSelectInstanceProps<D>,
      UseFlexLayoutInstanceProps<D>,
      UsePaginationInstanceProps<D>,
      UseSortByInstanceProps<D> {}

  export interface TableState<D extends Record<string, unknown> = Record<string, unknown>>
    extends UseColumnOrderState<D>,
      UseExpandedState<D>,
      UseFiltersState<D>,
      UseGlobalFiltersState<D>,
      UseGroupByState<D>,
      UsePaginationState<D>,
      UseResizeColumnsState<D>,
      UseRowSelectState<D>,
      UseSortByState<D> {
    rowCount: number;
  }

  export interface ColumnInterface<D extends Record<string, unknown> = Record<string, unknown>>
    extends UseFiltersColumnOptions<D>,
      UseGroupByColumnOptions<D>,
      UseResizeColumnsColumnOptions<D>,
      UseSortByColumnOptions<D> {
    align?: string;
    description?: React.ReactNode;
    sortable?: boolean;
    filterOptions?: { label: string | React.ReactNode; key: any }[];
  }

  export interface ColumnInstance<D extends Record<string, unknown> = Record<string, unknown>>
    extends UseFiltersColumnProps<D>,
      UseGroupByColumnProps<D>,
      UseResizeColumnsColumnProps<D>,
      UseFlexLayoutColumnProps<D>,
      UseSortByColumnProps<D> {
    canHide?: boolean;
  }

  export interface Cell<D extends Record<string, unknown> = Record<string, unknown>>
    extends UseGroupByCellProps<D> {}

  export interface Row<D extends object = {}>
    extends UseExpandedRowProps<D>,
      UseGroupByRowProps<D>,
      UseRowSelectRowProps<D> {
    canSelect?: boolean;
  }

  export interface TableCommonProps {
    title?: string;
    'aria-label'?: string;
  }

  export interface TableSortByToggleProps {
    title?: string;
  }

  export interface TableGroupByToggleProps {
    title?: string;
  }

  // export type FixedColumn<T extends {}> = Column<T> & { fixed: boolean; width: number };
  // export type UnionColumns<T extends {}> = FixedColumn<T> | (Column<T> & { fixed?: boolean });
}

export type TableMouseEventHandler = (instance: TableInstance<T>) => MouseEventHandler;

/* eslint-disable */
