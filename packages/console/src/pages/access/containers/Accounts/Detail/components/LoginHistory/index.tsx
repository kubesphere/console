/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import React, { useRef } from 'react';
import { useParams } from 'react-router-dom';

import type { Column, OriginalUserLoginRecord } from '@ks-console/shared';
import { DataTable, StatusIndicator, userStore, TableRef } from '@ks-console/shared';

import { Header } from './styles';

const { formatUserLoginRecord } = userStore;

export default function LoginHistory() {
  const { name } = useParams<'name'>();
  const tableRef = useRef<TableRef>();

  const url = `kapis/iam.kubesphere.io/v1beta1/users/${name}/loginrecords`;

  const columns: Column[] = [
    {
      title: t('TIME'),
      field: 'displayCreateTime',
    },
    {
      title: t('STATUS'),
      field: 'spec.success',
      render: value => (
        <StatusIndicator type={value ? 'success' : 'failed'}>
          {value ? t('SUCCESSFUL') : t('FAILED')}
        </StatusIndicator>
      ),
    },
    {
      title: t('SOURCE_IP_ADDRESS'),
      field: 'spec.sourceIP',
    },
    {
      title: t('REASON'),
      field: 'spec.reason',
    },
  ];

  const formatServerData = (serverData: Record<string, any>) => {
    return {
      items: serverData.items || [],
      totalItems: serverData.totalItems,
    };
  };

  return (
    <DataTable
      tableName="userLoginRecords"
      rowKey="name"
      url={url}
      ref={tableRef}
      columns={columns}
      format={data => formatUserLoginRecord(data as OriginalUserLoginRecord)}
      showToolbar={false}
      showFooter="only-multi-page"
      serverDataFormat={formatServerData}
      header={<Header>{t('LOGIN_HISTORY')}</Header>}
    />
  );
}
