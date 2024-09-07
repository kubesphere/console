/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import React, { useImperativeHandle, forwardRef } from 'react';
import type { Ref } from 'react';
import type { TableInstance } from 'react-table';

import type { UseDataTableOptions } from '../../../hooks';
import { useDataTable } from '../../../hooks';
import type { TableWithoutHookProps } from './TableWithoutHook';
import { TableWithoutHook } from './TableWithoutHook';

interface BaseTableRefObject<T extends Record<any, any> = Record<any, any>> {
  instance: TableInstance<T>;
}

type BaseTableRef<T extends Record<any, any> = Record<any, any>> = Ref<
  BaseTableRefObject<T> | undefined
>;

interface BaseTableProps<T>
  extends Omit<UseDataTableOptions<T>, 'data'>,
    Omit<TableWithoutHookProps<T>, 'instance'> {
  dataSource: UseDataTableOptions<T>['data'];
  loading?: boolean;
}

function BaseTable<T extends Record<any, any> = Record<any, any>>(
  { columns, dataSource = [], styles }: BaseTableProps<T>,
  ref: BaseTableRef,
) {
  const { instance } = useDataTable({ columns, data: dataSource });

  useImperativeHandle(ref, () => ({ instance }), [instance]);

  return <TableWithoutHook instance={instance} styles={styles} />;
}

const Table = forwardRef(BaseTable);

export type { BaseTableRefObject, BaseTableRef, BaseTableProps };

export default Table;
