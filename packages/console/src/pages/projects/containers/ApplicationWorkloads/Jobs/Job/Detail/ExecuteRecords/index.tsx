/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import React, { useState, useEffect } from 'react';
import { Loading, Button } from '@kubed/components';
import { useParams } from 'react-router-dom';
import { StatusIndicator, Panel, Icon, RecordStore, formatTime } from '@ks-console/shared';
import { useCacheStore as useStore } from '@ks-console/shared';
import { JOB_STATUS_MAP } from '../../../../../../../clusters/constants';
import { TableContent, Header } from './styles';
const { fetchExecuteRecords } = RecordStore;

const ExecuteRecords = () => {
  const [props] = useStore('JobDetailProps');
  const { detail, isLoading } = props;

  const params = useParams();
  const [execute, setExecute] = useState<{
    data: Record<string, any>[];
    page: number;
    limit: number;
    total: number;
    isLoading: boolean;
  }>({
    data: [],
    page: 1,
    limit: 10,
    total: 0,
    isLoading: true,
  });

  const fetchData = async () => {
    setExecute({
      ...execute,
      isLoading: true,
    });
    const data = await fetchExecuteRecords({ ...params });
    setExecute({
      ...execute,
      data,
      total: data.length || 0,
      isLoading: false,
    });
  };

  useEffect(() => {
    fetchData();
  }, [detail]);

  const columns = [
    {
      title: t('SN_NO'),
      field: 'id',
      width: '7%',
    },
    {
      title: t('STATUS'),
      filed: 'status',
      width: '19%',
      render: (_: any, record: Record<string, any>) => {
        const status = record.status;
        return (
          <StatusIndicator type={status} motion={status === 'running'}>
            {t(JOB_STATUS_MAP[status])}
          </StatusIndicator>
        );
      },
    },
    {
      title: t('MESSAGE'),
      field: 'messages[0]',
      render: (msg: string) => msg || '-',
    },
    {
      title: t('START_TIME'),
      field: 'start-time',
      render: (time: string) => formatTime(time),
    },
    {
      title: t('END_TIME'),
      field: 'completion-time',
      render: (time: string) => (!time || /^0001-01-01/.test(time) ? '-' : formatTime(time)),
    },
  ];

  const { data, isLoading: loading } = execute;
  return isLoading ? (
    <Loading className="page-loading" />
  ) : (
    <Panel>
      <Header>
        <span>{t('RUN_RECORDS')}</span>
        <Button variant="text" onClick={() => fetchData()}>
          <Icon name="refresh" />
        </Button>
      </Header>
      <TableContent dataSource={data} columns={columns} loading={loading} />
    </Panel>
  );
};

export default ExecuteRecords;
