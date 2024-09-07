/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

declare module 'react' {
  function forwardRef<T, P = {}>(
    render: (props: P, ref: React.Ref<T>) => React.ReactElement | null,
  ): (props: P & React.RefAttributes<T>) => React.ReactElement | null;
}

import React, {
  useState,
  useMemo,
  useReducer,
  useEffect,
  useRef,
  useImperativeHandle,
  forwardRef,
} from 'react';
import type { PropsWithChildren } from 'react';
import {
  useTable,
  useFilters,
  useSortBy,
  usePagination,
  useRowSelect,
  Hooks,
  HeaderProps,
  CellProps,
} from 'react-table';
import cx from 'classnames';
import { get, merge, debounce, isEmpty, pick, has } from 'lodash';
import { Checkbox, LoadingOverlay } from '@kubed/components';
import { useLocalStorage, useDebouncedValue } from '@kubed/hooks';

import { updateOriginalItem } from '../../utils/common';
import { useWebSocket } from '../../hooks';
import { TableSkeleton } from '../Skeletons';

import type {
  Column,
  TableProps,
  TableRef,
  TableEmptyObjectOptions,
  TableEmptyElementOptions,
  TableFilteredEmptyElementOptions,
  TableFilteredEmptyObjectOptions,
} from './types';
import {
  DEFAULT_WATCH_OPTIONS,
  DEFAULT_EMPTY_OPTIONS,
  DEFAULT_FILTERED_EMPTY_OPTIONS,
} from './constants';
import {
  SORTBY_CHANGED,
  reducer,
  FILTER_CHANGED,
  TOTAL_COUNT_CHANGED,
  PAGE_SIZE_CHANGED,
} from './reducer';
import { hasContent, prepareColumns, getInitialState, genQueryString } from './utils';
import { useDidUpdate, useData } from './hooks';
import TableHead from './TableHead';
import { TableFooter } from './TableFooter';
import { Toolbar } from './Toolbar';
import { TableEmpty } from './TableEmpty';
import { TableFilteredEmpty } from './TableFilteredEmpty';
import { TableWrapper, TableMain, Table, TBody } from './styles';

const selectionHook = (hooks: Hooks<any>) => {
  hooks.getToggleAllRowsSelectedProps = [
    (props, { instance }) => {
      const canSelectRow = instance.rows.filter(row => row.canSelect);
      return [
        props,
        {
          onChange: () => {
            instance.rows.forEach(row => {
              if (row.canSelect) {
                return row.toggleRowSelected(
                  !instance.rows.filter(r => r.canSelect).every(r => r.isSelected),
                );
              }
              return false;
            });
          },
          checked: !isEmpty(canSelectRow) && canSelectRow.every(row => row.isSelected),
          indeterminate: Boolean(
            !instance.isAllRowsSelected && Object.keys(instance.state.selectedRowIds).length,
          ),
        },
      ];
    },
  ];
  hooks.allColumns.push(columns => [
    {
      id: '_selector',
      disableResizing: true,
      disableGroupBy: true,
      minWidth: 40,
      width: 40,
      maxWidth: 40,
      Aggregated: undefined,
      className: 'selector',
      Header: ({ getToggleAllRowsSelectedProps }: HeaderProps<any>) => (
        <Checkbox {...getToggleAllRowsSelectedProps()} />
      ),
      Cell: ({ row }: CellProps<any>) => {
        const disabled = !row.canSelect;

        return (
          <Checkbox
            {...row.getToggleRowSelectedProps()}
            disabled={disabled}
            style={disabled ? { cursor: 'not-allowed' } : undefined}
          />
        );
      },
    },
    ...columns,
  ]);
};

const hooks = [useFilters, useSortBy, usePagination, useRowSelect];
const withSelectionHooks = [...hooks, selectionHook];

function DataTableComponent<
  T extends Record<string, any> = Record<string, any>,
  U extends Record<string, any> = Record<string, any>,
>(props: PropsWithChildren<TableProps<T, U>>, ref: React.Ref<unknown> | undefined) {
  const {
    className,
    columns,
    // data = [],
    initialState: initialStateProp = {},
    hideFilters = false,
    manualSortBy = true,
    manualFilters = true,
    showFooter = true,
    showToolbar = true,
    hideTableHead = false,
    simpleSearch = false,
    enableQueryString = false,
    header,
    batchActions,
    toolbarLeft,
    toolbarRight,
    rowKey,
    placeholder,
    selectType = hasContent(batchActions) ? 'checkbox' : false,
    url,
    tableName,
    parameters = {},
    transformRequestParams,
    format = data => data as T,
    serverDataFormat,
    disableRowSelect,
    watchOptions,
    emptyOptions,
    filteredEmptyOptions,
    onSelect,
    onPageChange,
    onFilterInputChange,
    onChangeData,
    onRefresh,
    isLoading: isLoadingProp = false,
    skeleton,
    hideSettingMenu = false,
  } = props;

  const [, setStorageState] = useLocalStorage({ key: `tableState:${tableName}` });
  const initialState = getInitialState(tableName, initialStateProp);

  const [{ pageIndex, pageSize, totalCount, filters, sortBy }, dispatch] = useReducer(
    reducer,
    initialState,
  );

  const {
    isLoading,
    isFetching,
    isSuccess,
    data: serverData,
    refetch,
  } = useData(
    url || '',
    {
      pageIndex,
      pageSize,
      filters,
      sortBy,
      parameters,
    },
    tableName,
    transformRequestParams,
  );

  const handleRefresh = () => {
    onRefresh?.();
    refetch();
  };

  const { formatColumns, suggestions } = useMemo(() => {
    return prepareColumns<T>(columns);
  }, [columns]);

  const getRowId = (row: any, relativeIndex: number) => {
    return get(row, rowKey) || String(relativeIndex);
  };

  const [enabledLoading, setEnabledLoading] = useState(true);

  const debouncedRefetch = debounce(async () => {
    setEnabledLoading(false);
    await refetch();
    setEnabledLoading(true);
  }, 1000);
  const useWebSocketOptions: TableProps<T>['watchOptions'] = {
    ...DEFAULT_WATCH_OPTIONS,
    ...watchOptions,
    format,
    onAddedOrDeleted: () => debouncedRefetch(),
  };
  const { message } = useWebSocket<Record<string, any>, T>(useWebSocketOptions);
  const websocketMessageType = message?.type;
  const websocketMessageObject = message?.object;

  const memoServerData = useMemo(() => {
    if (!serverData) {
      return {
        items: [],
        totalItems: 0,
      };
    }

    if (serverDataFormat) {
      return serverDataFormat(serverData);
    }

    let totalItems = get(serverData, 'totalItems', 0);

    if (!has(serverData, 'totalItems') && has(serverData, 'metadata.remainingItemCount')) {
      totalItems =
        get(serverData, 'metadata.remainingItemCount', 0) +
        pageIndex * pageSize +
        serverData.items.length;
    }
    return { ...serverData, totalItems, items: serverData?.items ?? [] };
  }, [serverData, serverDataFormat]);

  const memoData = useMemo(() => {
    if (websocketMessageType === 'MODIFIED') {
      const oldItems = memoServerData?.items ?? [];
      const newItems = updateOriginalItem(oldItems, websocketMessageObject);
      return newItems?.map(format);
    }

    return memoServerData?.items?.map(format);
  }, [memoServerData, format, websocketMessageType, websocketMessageObject]);

  useEffect(() => {
    if (onChangeData) onChangeData(memoData);
  }, [memoData]);
  const tableHooks = selectType ? withSelectionHooks : hooks;

  const instance = useTable(
    {
      columns: formatColumns,
      data: memoData ?? [],
      manualSortBy,
      manualFilters,
      manualPagination: true,
      getRowId,
      pageCount: isSuccess ? Math.ceil(totalCount / pageSize) : 1,
      // @ts-ignore
      initialState,
      disableRowSelect,
      autoResetSelectedRows: false,
    },
    ...tableHooks,
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    state,
    selectedFlatRows,
  } = instance;
  const [debouncedState] = useDebouncedValue(state, 300);

  const clearAndRefetch = () => {
    instance.setAllFilters([]);
    instance.toggleAllRowsSelected(false);
    refetch();
  };

  useEffect(() => {
    setStorageState(JSON.stringify(debouncedState));
    if (enableQueryString) {
      genQueryString(debouncedState);
    }
  }, [setStorageState, debouncedState]);

  useEffect(() => {
    onPageChange?.(state.pageIndex, state.pageSize);
    dispatch({ type: PAGE_SIZE_CHANGED, payload: pick(state, ['pageIndex', 'pageSize']) });
  }, [state.pageIndex, state.pageSize]);

  useDidUpdate(() => {
    instance.gotoPage(0);
    dispatch({ type: SORTBY_CHANGED, payload: state.sortBy });
  }, [state.sortBy]);

  useDidUpdate(() => {
    instance.gotoPage(0);
    dispatch({ type: FILTER_CHANGED, payload: state.filters });
  }, [state.filters]);

  useEffect(() => {
    dispatch({
      type: TOTAL_COUNT_CHANGED,
      payload: memoServerData?.totalItems,
    });
  }, [memoServerData?.totalItems]);

  // TODO: onSelect has a bug, need Improvement
  useEffect(() => {
    onSelect?.(state.selectedRowIds ?? {}, selectedFlatRows?.map(d => d.original) ?? []);
  }, [state.selectedRowIds]);

  const tableRef = useRef<TableRef<T>>();

  useImperativeHandle(ref, () => ({
    instance,
    refetch: clearAndRefetch,
    getSelectedRowIds: () => debouncedState?.selectedRowIds ?? {},
    getSelectedFlatRows: () => selectedFlatRows?.map(d => d.original) ?? [],
  }));

  const getEmptyOptions = () => {
    const { withoutTable: DEFAULT_WITHOUT_TABLE } = DEFAULT_EMPTY_OPTIONS;
    if ((emptyOptions as TableEmptyElementOptions)?.element) {
      return {
        withoutTable: DEFAULT_WITHOUT_TABLE,
        ...(emptyOptions as TableEmptyElementOptions),
      };
    }

    if (filteredEmptyOptions === false) {
      return {
        element: null,
      };
    }

    const { withoutTable, ...emptyProps } = merge(
      {},
      DEFAULT_EMPTY_OPTIONS,
      emptyOptions as TableEmptyObjectOptions,
    );
    return {
      element: <TableEmpty {...emptyProps} />,
      withoutTable,
    };
  };

  const getFilteredEmptyOptions = () => {
    const { withoutTable: DEFAULT_WITHOUT_TABLE } = DEFAULT_FILTERED_EMPTY_OPTIONS;
    if ((filteredEmptyOptions as TableFilteredEmptyElementOptions)?.element) {
      return {
        withoutTable: DEFAULT_WITHOUT_TABLE,
        ...(filteredEmptyOptions as TableFilteredEmptyElementOptions),
      };
    }

    if (filteredEmptyOptions === false) {
      return {
        element: null,
      };
    }

    const { withoutTable, showRefetchButton, showClearAndRefetchButton, styles } = merge(
      {},
      DEFAULT_FILTERED_EMPTY_OPTIONS,
      filteredEmptyOptions as TableFilteredEmptyObjectOptions,
    );
    return {
      element: (
        <TableFilteredEmpty
          refetch={showRefetchButton ? refetch : false}
          clearAndRefetch={showClearAndRefetchButton ? clearAndRefetch : false}
          styles={styles}
        />
      ),
      withoutTable,
    };
  };

  const getFinalEmptyOptions = () => {
    if (!isEmpty(instance.state.filters)) {
      return getFilteredEmptyOptions();
    } else {
      return getEmptyOptions();
    }
  };

  const renderEmpty = () => {
    const options = getFinalEmptyOptions();
    return options.element;
  };

  const renderFooter = () => {
    if (!showFooter || (showFooter === 'only-multi-page' && instance.pageCount <= 1)) {
      return null;
    }

    return <TableFooter<T> instance={instance} totalCount={totalCount} />;
  };

  if (isLoading) {
    return <TableSkeleton {...skeleton} />;
  }

  if (totalCount === 0 && getFinalEmptyOptions().withoutTable) {
    return renderEmpty();
  }

  return (
    <TableWrapper padding={0} ref={tableRef} className={className}>
      {header}
      {showToolbar && (
        <Toolbar
          hideFilters={hideFilters}
          instance={instance}
          batchActions={batchActions}
          toolbarLeft={toolbarLeft}
          toolbarRight={toolbarRight}
          simpleSearch={simpleSearch}
          placeholder={placeholder}
          suggestions={suggestions}
          onFilterInputChange={onFilterInputChange}
          refetch={handleRefresh}
          hideSettingMenu={hideSettingMenu}
        />
      )}
      <TableMain className="table-main">
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
          {!hideTableHead && (
            <thead>
              {headerGroups.map(headerGroup => {
                return (
                  <tr {...headerGroup.getHeaderGroupProps()}>
                    {headerGroup.headers.map(column => {
                      const { key: headerKey } = column.getHeaderProps();
                      return <TableHead column={column} key={headerKey} selectType={selectType} />;
                    })}
                  </tr>
                );
              })}
            </thead>
          )}
          <TBody {...getTableBodyProps()}>
            {rows.map(row => {
              prepareRow(row);
              if (disableRowSelect) {
                row.canSelect = !disableRowSelect(row.original);
              } else {
                row.canSelect = true;
              }
              return (
                <tr {...row.getRowProps()} className={cx({ 'row-selected': row.isSelected })}>
                  {row.cells.map(cell => {
                    return (
                      <td
                        {...cell.getCellProps()}
                        className={cx({
                          'table-selector': cell.column.id === '_selector',
                          'table-more': cell.column.id === 'more',
                          'table-name': cell.column.id === 'name',
                        })}
                      >
                        {cell.render('Cell')}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </TBody>
        </Table>
      </TableMain>
      {totalCount === 0 && renderEmpty()}
      {renderFooter()}
      <LoadingOverlay visible={(enabledLoading && isFetching) || isLoadingProp} />
    </TableWrapper>
  );
}

export type { Column, TableProps, TableRef };

export { transformRequestParams } from './utils';

export { TableFooter } from './TableFooter';

export const DataTable = forwardRef(DataTableComponent);
