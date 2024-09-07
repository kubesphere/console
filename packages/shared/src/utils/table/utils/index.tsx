/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import { BaseTable, Checkbox } from '@kubed/components';
import { Table, Row, ColumnDef as TableColumn } from '@tanstack/react-table';
import * as React from 'react';
import { Column } from '../../../components/DataTable/types';

export const defaultCheckboxColumn = {
  id: '_selector',
  meta: {
    th: {
      width: 42,
      align: 'center',
    },
  },
  header: ({ table }: { table: Table<any> }) => (
    <Checkbox
      checked={table.getIsAllRowsSelected()}
      indeterminate={table.getIsSomeRowsSelected()}
      onChange={e => {
        const indeterminate = table.getIsSomeRowsSelected();
        if (indeterminate) {
          e.target.checked = true;
        }
        table.getToggleAllRowsSelectedHandler()(e);
      }} //or getToggleAllPageRowsSelectedHandler
    />
  ),
  cell: ({ row }: { row: Row<any> }) => (
    <Checkbox
      checked={row.getIsSelected()}
      disabled={!row.getCanSelect()}
      onChange={row.getToggleSelectedHandler()}
    />
  ),
} as const;

export function prepareColumnsV8<T extends Record<string, any>>(columns: Column<T>[] = []) {
  const formatColumns: TableColumn<T>[] = [];
  const suggestions: BaseTable.Suggestions = [];
  columns.forEach(column => {
    const { title: header, field: accessor, id, filterOptions, width, render, ...rest } = column;

    const formatColumn = {
      header,
      accessorKey: accessor,
      id: id || accessor,
      meta: {
        th: {
          width: width || 0,
        },
      },
      cell: (props: any) => {
        if (!render) {
          return String(props.getValue());
        }
        return render(props.getValue(), props.row.original);
      },
      ...rest,
    } as TableColumn<T>;
    formatColumns.push(formatColumn);

    if (filterOptions || column.searchable) {
      suggestions.push({
        label: header,
        key: id || accessor,
        options: filterOptions,
      });
    }
  });
  return { formatColumns, suggestions };
}
