/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import React from 'react';
import styled from 'styled-components';
import { Card } from '@kubed/components';
import { useParams } from 'react-router-dom';
import {
  Column,
  DataTable,
  formatTime,
  openpitrixStore,
  StatusIndicator,
} from '@ks-console/shared';

const StyledCard = styled(Card)`
  & > div:nth-child(2) {
    padding: 0;
  }
`;

const { getRepoUrl } = openpitrixStore;

function Events(): JSX.Element {
  const { workspace, repoId } = useParams();
  const columns: Column[] = [
    {
      title: t('CREATION_TIME_TCAP'),
      field: 'create_time',
      width: '24%',
      render: create_time => formatTime(create_time, `YYYY-MM-DD HH:mm:ss`),
    },
    {
      title: t('STATUS'),
      field: 'status',
      width: '16%',
      render: status => <StatusIndicator type={status}>{t(status)}</StatusIndicator>,
    },
    {
      title: t('MESSAGE'),
      field: 'result',
      render: result => result || '-',
    },
  ];

  return (
    <StyledCard sectionTitle={t('EVENT_PL')}>
      <DataTable
        tableName="events"
        // @ts-ignore TODO
        url={getRepoUrl({ workspace, repo_id: repoId, name: 'events' })}
        rowKey="create_time"
        columns={columns}
        format={item => item}
        showFooter={false}
        showToolbar={false}
      />
    </StyledCard>
  );
}

export default Events;
