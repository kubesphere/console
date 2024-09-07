/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import React from 'react';

import { useTable, useExpanded, Column } from 'react-table';

import { ViewTable } from '../index';

import { TableWrapper, TableStyles, TBody, TableMain } from './styles';

interface Props {
  data: ViewTable[];
  columns: Column[];
  expandedRowRender: any;
}

function Table({ columns, data, expandedRowRender }: Props) {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    state: {},
  } = useTable(
    {
      columns,
      data,
    },
    useExpanded,
  );

  return (
    <TableWrapper>
      <TableMain>
        <TableStyles {...getTableProps()}>
          <thead className="table-thead">
            {headerGroups.map(headerGroup => (
              <tr {...headerGroup.getHeaderGroupProps()} className="table-row">
                {headerGroup.headers.map(column => (
                  <th {...column.getHeaderProps()}>{column.render('Header')}</th>
                ))}
              </tr>
            ))}
          </thead>

          <TBody {...getTableBodyProps()}>
            {rows.map(row => {
              prepareRow(row);

              if (row.id.length !== 1) {
                return (
                  <tr className="table-row-expand" {...row.getRowProps()}>
                    <td colSpan={row.allCells.length}>{expandedRowRender(row.values)}</td>
                  </tr>
                );
              }

              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map(cell => {
                    return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>;
                  })}
                </tr>
              );
            })}
          </TBody>
        </TableStyles>
      </TableMain>
    </TableWrapper>
  );
}

export default Table;
