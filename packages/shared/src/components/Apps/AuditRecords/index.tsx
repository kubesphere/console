/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import React from 'react';
import { Appcenter } from '@kubed/icons';
import { useParams } from 'react-router-dom';

import { Column, DataTable } from '../../DataTable';
import { formatTime } from '../../../utils';
import { VersionStatus } from '../VersionStatus';
import { useListQueryParams } from '../../../hooks';
import { getBaseUrl } from '../../../stores/openpitrix';

type Props = {
  appName?: string;
  columns?: Column[];
  versionID?: string;
  simpleMode?: boolean;
  className?: string;
};

export function AuditRecords({
  appName: appNames,
  versionID,
  simpleMode,
  columns,
  className,
}: Props): JSX.Element {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  const appName = appNames || useParams().appName;
  const tableColumns: Column[] = columns || [
    {
      title: t('TIME'),
      field: 'status_time',
      width: '20%',
      render: time => formatTime(time, 'YYYY-MM-DD HH:mm:ss'),
    },
    {
      title: t('STATUS'),
      field: 'status.state',
      canHide: true,
      width: '15%',
      render: status => <VersionStatus type={status} name={status} />,
    },
    {
      title: t('VERSION'),
      field: 'version_name',
      canHide: true,
      width: '15%',
    },
    {
      title: t('REJECTION_REASON'),
      field: 'reject',
      canHide: true,
      width: '40%',
      render: (_, item) => item.message || '-',
    },
    {
      title: t('OPERATOR'),
      field: 'operator',
      canHide: true,
      width: '10%',
      render: (_, item) => item.operator || '-',
    },
  ];
  const tableParameters = {
    status: [],
    order: 'status_time',
  };

  function transformRequestParams(params: Record<string, any>) {
    const { parameters, pageIndex, pageSize } = params;

    return useListQueryParams({
      ...parameters,
      page: pageIndex + 1,
      limit: pageSize,
    });
  }

  function serverDataFormatter(serverData: any) {
    return {
      ...serverData,
      totalItems: serverData.totalItems,
    };
  }

  return (
    <DataTable
      className={className}
      hideFilters
      rowKey="status_time"
      tableName="RELEASE_RECORD"
      url={getBaseUrl({ appName, versionID }, 'audits')}
      parameters={tableParameters}
      transformRequestParams={transformRequestParams}
      serverDataFormat={serverDataFormatter}
      columns={tableColumns}
      hideTableHead={simpleMode}
      showToolbar={!simpleMode}
      showFooter={!simpleMode}
      format={item => item}
      emptyOptions={{
        withoutTable: true,
        image: <Appcenter size={48} />,
        title: t('RELEASE_RECORD_EMPTY_DESC'),
        description: t('RELEASE_RECORD_EMPTY_DESC'),
      }}
    />
  );
}
