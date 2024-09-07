/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import React, { ReactNode, useMemo } from 'react';

import { openpitrixStore } from '../../../stores';
import { useListQueryParams } from '../../../hooks';
import { Column, DataTable } from '../../DataTable';
const { getBaseUrl, SORT_KEY } = openpitrixStore;

type Props = {
  workspace?: string;
  tableRef?: any;
  filter?: boolean;
  columns: Column[];
  categoryId?: string;
  batchActions?: ReactNode[] | null;
  toolbarRight?: ReactNode[] | null;
  emptyOptions?: any;
};

export function AppDataTable({
  columns,
  categoryId,
  batchActions,
  toolbarRight,
  tableRef,
  filter,
  workspace,
  emptyOptions,
}: Props): JSX.Element {
  const queryParams: Record<string, unknown> = useMemo(() => {
    const otherQuery = { label: 'application.kubesphere.io/repo-name=upload' };
    return {
      categoryID: categoryId,
      order: SORT_KEY,
      status: 'active|rejected|passed|suspended|draft',
      // repo_id: 'repo-helm',
      otherQuery,
    };
  }, [categoryId]);

  const requestParamsTransformer = (params: Record<string, any>) => {
    const { parameters, pageIndex, filters, pageSize } = params;
    const keyword = filters?.[0]?.value;
    const formattedParams: Record<string, any> = useListQueryParams({
      ...parameters,
      page: pageIndex + 1,
    });
    if (filter) {
      formattedParams.page = pageIndex + 1;
      formattedParams.limit = pageSize;
      delete formattedParams.paging;
    }

    if (!keyword) {
      return formattedParams;
    }

    return {
      ...formattedParams,
      conditions: formattedParams.conditions,
      name: keyword,
      // TODO 参数问题
      limit: 20,
      page: pageIndex + 1,
    };
  };

  const formatServerData = (serverData: any) => {
    return serverData;
  };

  return (
    <DataTable
      ref={tableRef}
      simpleSearch
      tableName="APP"
      rowKey="metadata.name"
      url={getBaseUrl({ workspace }, 'apps')}
      columns={columns}
      parameters={queryParams}
      format={data => data}
      batchActions={batchActions}
      toolbarRight={toolbarRight}
      serverDataFormat={formatServerData}
      transformRequestParams={requestParamsTransformer}
      emptyOptions={emptyOptions}
    />
  );
}

export default AppDataTable;
