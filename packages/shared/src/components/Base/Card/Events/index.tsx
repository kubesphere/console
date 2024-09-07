/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import React from 'react';
import StatusIndicator from '../../../StatusIndicator';
import Panel from '../../Panel';

import { TableContent } from './styles';

function Events({ data, loading }: { data: Array<any>; loading: boolean }) {
  const columns = [
    {
      title: t('TYPE'),
      field: 'type',
      width: '10%',
      render: (type: any) => (
        <StatusIndicator type={type}>{t(`EVENT_${type.toUpperCase()}`)}</StatusIndicator>
      ),
    },
    {
      title: t('REASON'),
      field: 'reason',
      width: '16%',
    },
    {
      title: t('EVENT_AGE'),
      field: 'age',
      width: '16%',
      render: (value: string) => {
        return <span dangerouslySetInnerHTML={{ __html: value }} />;
      },
    },
    {
      title: t('SOURCE'),
      field: 'from',
      width: '18%',
    },
    {
      title: t('MESSAGE'),
      field: 'message',
    },
  ];

  return (
    <Panel title={t('EVENT_PL')}>
      <TableContent dataSource={data} columns={columns} loading={loading} />
    </Panel>
  );
}

export default Events;
