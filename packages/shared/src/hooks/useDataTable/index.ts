/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import { useMemo } from 'react';
import type { TableOptions } from 'react-table';
import { useTable, useFilters, useSortBy, usePagination, useRowSelect } from 'react-table';

import type { Column } from '../../components/DataTable/types';
import { prepareColumns } from '../../components/DataTable/utils';

const plugins = [useFilters, useSortBy, usePagination, useRowSelect];

interface UseDataTableOptions<T extends Record<any, any> = Record<any, any>>
  extends Omit<TableOptions<T>, 'columns' | 'data'> {
  columns: Column<T>[];
  data: T[];
}

export type { UseDataTableOptions };

export function useDataTable<T extends Record<any, any> = Record<any, any>>({
  columns,
  data,
  ...rest
}: UseDataTableOptions<T>) {
  const { formatColumns } = useMemo(() => {
    return prepareColumns(columns);
  }, [columns]);

  const instance = useTable<T>(
    {
      columns: formatColumns,
      data,
      ...rest,
    },
    ...plugins,
  );

  return { instance };
}
