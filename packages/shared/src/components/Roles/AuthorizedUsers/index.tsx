/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import React, { useState, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import type { ColumnDef } from '@tanstack/react-table';
import { merge } from 'lodash';
import { Card, DataTable } from '@kubed/components';
import { Human } from '@kubed/icons';

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

  const { isFetching, totalItems, formattedUsers } = useFetchMembersList({
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
      meta: {
        th: { width: '33.33%' },
      },
    },
    {
      accessorKey: 'status',
      header: t('STATUS'),
      meta: {
        th: { width: '33.33%' },
      },
      cell: ({ getValue }) => {
        const status = getValue();
        return <StatusIndicator type={status}>{t(`USER_${status.toUpperCase()}`)}</StatusIndicator>;
      },
    },
    {
      accessorKey: 'lastLoginTime',
      header: t('LAST_LOGIN'),
      meta: {
        th: { width: '33.33%' },
      },
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
      enableToolbar: false,
    }),
  );

  const tableOptions: DataTable.TableOptions<FormattedUser> = merge({}, baseConfig, {
    columns,
    loading: isFetching,
    data,
    rowCount: totalItems,
    state,
    meta: {
      getProps: {
        table: () => ({
          style: {
            margin: '0 12px 12px',
          },
        }),
        empty: () => ({
          title: t('USER'),
          description: <span>{t('NO_AUTHORIZED_USER_DESC')}</span>,
          image: <Human size={48} />,
        }),
      },
    },
    onParamsChange: setState,
  });
  const table = DataTable.useTable<FormattedUser>(tableOptions);

  return (
    <Card sectionTitle={t('AUTHORIZED_USER_PL')} padding={0}>
      <DataTable.DataTable table={table} />
    </Card>
  );
}

export default AuthorizedUsers;
