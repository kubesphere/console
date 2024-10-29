/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import React from 'react';
import { useParams } from 'react-router-dom';
import type { ColumnDef } from '@tanstack/react-table';
import styled from 'styled-components';
import { Human } from '@kubed/icons';
import { Card, Empty, DataTable } from '@kubed/components';

import { Column, DataTable as Table } from '../../DataTable';
import StatusIndicator from '../../StatusIndicator';
import { userStore } from '../../../stores';
import { formatTime } from '../../../utils';
import type { OriginalUser } from '../../../types';

interface Props {
  roleKey: string;
}

const { mapper: formatUser, getResourceUrl, useFetchMembersList } = userStore;

const StyledEmpty = styled(Empty)`
  padding: 32px;
  // margin: -12px;
`;

function AuthorizedUsers({ roleKey }: Props) {
  const { name, namespace, workspace, cluster } = useParams();
  const url = getResourceUrl({
    namespace,
    workspace,
    cluster,
  });
  console.log(url);

  const { data } = useFetchMembersList({ name, namespace, workspace, cluster });
  console.log('useFetchMembersList', data);

  const columns: Column[] = [
    {
      title: t('USERNAME'),
      field: 'username',
      width: '33%',
    },
    {
      title: t('STATUS'),
      field: 'status',
      width: '33%',
      render: status => (
        <StatusIndicator type={status}>{t(`USER_${status.toUpperCase()}`)}</StatusIndicator>
      ),
    },
    {
      title: t('LAST_LOGIN'),
      field: 'lastLoginTime',
      width: '33%',
      render: time => <p>{time ? formatTime(time) : t('NOT_LOGIN_YET')}</p>,
    },
  ];
  const parameters = {
    [roleKey]: name,
    namespace,
    workspace,
    cluster,
  };

  return (
    <Card sectionTitle={t('AUTHORIZED_USER_PL')} padding={0}>
      <Table
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
      />
    </Card>
  );
}

export default AuthorizedUsers;
