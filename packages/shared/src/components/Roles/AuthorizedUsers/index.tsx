/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import React, { useState, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import type { ColumnDef } from '@tanstack/react-table';
import { Card, DataTable } from '@kubed/components';

import type { FormattedUser } from '../../../types';
import { formatTime, useUrlSearchParamsStatus, tableState2Query } from '../../../utils';
import { userStore } from '../../../stores';
import StatusIndicator from '../../StatusIndicator';

const { useFetchMembersList } = userStore;

interface Props {
  roleKey: string;
}

function AuthorizedUsers({ roleKey }: Props) {
  const { name, namespace, workspace, cluster } = useParams();

  const { state, setState } = useUrlSearchParamsStatus(['']);
  const query = tableState2Query(state);

  const { isFetching, formattedUsers, refetch } = useFetchMembersList({
    roleKey,
    name,
    namespace,
    workspace,
    cluster,
    ...query,
  });

  const columns: ColumnDef<FormattedUser, any>[] = [
    {
      accessorKey: 'username',
      header: t('USERNAME'),
    },
    {
      accessorKey: 'status',
      header: t('STATUS'),
      cell: ({ getValue }) => {
        const status = getValue();
        return <StatusIndicator type={status}>{t(`USER_${status.toUpperCase()}`)}</StatusIndicator>;
      },
    },
    {
      accessorKey: 'lastLoginTime',
      header: t('LAST_LOGIN'),
      cell: ({ getValue }) => {
        const time = getValue();
        return <p>{time ? formatTime(time) : t('NOT_LOGIN_YET')}</p>;
      },
    },
  ];

  const data = useMemo(() => formattedUsers, [JSON.stringify(formattedUsers)]);

  const [baseConfig] = useState(() =>
    DataTable.getDefaultTableOptions<FormattedUser>({
      tableName: 'AuthorizedUsers',
      manual: true,
    }),
  );

  const table = DataTable.useTable<FormattedUser>({
    ...baseConfig,
    columns,
    loading: isFetching,
    data,
    // rowCount: totalCount,
    state,
    autoResetPageIndex: true,
    meta: {
      ...baseConfig.meta,
      refetch,
    },
    onParamsChange: setState,
  });

  return (
    <Card sectionTitle={t('AUTHORIZED_USER_PL')} padding={0}>
      <DataTable.DataTable table={table} />
      {/*<Table
        url={url}
        columns={columns}
        tableName="users"
        rowKey="name"
        parameters={parameters}
        format={data => formatUser(data as OriginalUser)}
        showToolbar={false}
        emptyOptions={{
          element: (
            <StyledEmpty
              title={t('USER')}
              description={<span>{t('NO_AUTHORIZED_USER_DESC')}</span>}
              image={<Human size={48} />}
            />
          ),
          withoutTable: true,
        }}
      />*/}
    </Card>
  );
}

export default AuthorizedUsers;
