/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import React from 'react';
import type { CSSProperties } from 'react';
import type { TableInstance } from 'react-table';
import { get } from 'lodash';

import TableHead from '../../DataTable/TableHead';

import { TableMain, Table, TBody } from './styles';

interface TableWithoutHookProps<T extends Record<any, any> = Record<any, any>> {
  instance: TableInstance<T>;
  styles?: {
    root?: CSSProperties;
  };
}

export type { TableWithoutHookProps };

export function TableWithoutHook<T extends Record<any, any> = Record<any, any>>({
  instance,
  styles,
}: TableWithoutHookProps<T>) {
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = instance;

  return (
    <TableMain style={styles?.root}>
      <Table {...getTableProps()}>
        {headerGroups.map(headerGroup => {
          return (
            <colgroup key={`colgroup-${headerGroup.getHeaderGroupProps().key}`}>
              {headerGroup.headers.map(column => {
                const { key: headerKey } = column.getHeaderProps();
                if (column.width) return <col width={column.width} key={`col-${headerKey}`} />;
                return <col key={`col-${headerKey}`} />;
              })}
            </colgroup>
          );
        })}
        <thead>
          {headerGroups.map(headerGroup => {
            return (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map(column => {
                  // return <th {...column.getHeaderProps()}>{column.render('Header')}</th>;

                  const { key: headerKey } = column.getHeaderProps();
                  return <TableHead column={column} key={headerKey} selectType={false} />;
                })}
              </tr>
            );
          })}
        </thead>
        <TBody {...getTableBodyProps()}>
          {rows.map(row => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map(cell => {
                  const { column } = cell;
                  const cellProps = get(column, 'cellProps', {});
                  return <td {...cell.getCellProps({ ...cellProps })}>{cell.render('Cell')}</td>;
                })}
              </tr>
            );
          })}
        </TBody>
      </Table>
    </TableMain>
  );
}
