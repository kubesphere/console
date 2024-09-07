/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import { get } from 'lodash';
import React, { useState, useEffect, useMemo } from 'react';
import { Loading, Button } from '@kubed/components';
import { useParams, Link } from 'react-router-dom';
import {
  StatusIndicator,
  Panel,
  Icon,
  RecordStore,
  workloadStore,
  formatTime,
  getJobStatus,
} from '@ks-console/shared';
import { useCacheStore as useStore } from '@ks-console/shared';
import { TableContent, Header } from './styles';

const { fetchListByK8s } = RecordStore;
const { reRun } = workloadStore('jobs');

const ExecuteRecords = () => {
  const [props] = useStore('cronjobsDetailProps');
  const { detail, isLoading } = props;

  const params = useParams();
  const [execute, setExecute] = useState({
    data: [],
    page: 1,
    limit: 10,
    total: 0,
    isLoading: true,
  });

  const getPrefix = () => {
    const { cluster, workspace, namespace } = params;
    return `${workspace ? `/${workspace}` : ''}/clusters/${cluster}/projects/${namespace}`;
  };

  const fetchData = async () => {
    const { cluster, namespace } = detail;
    const selector = get(detail, 'spec.jobTemplate.metadata.labels', {});
    setExecute({
      ...execute,
      isLoading: true,
    });
    const data = await fetchListByK8s({ ...params, cluster, namespace, selector });
    setExecute({
      ...execute,
      data,
      total: data.length || 0,
      isLoading: false,
    });
  };

  useEffect(() => {
    if (isLoading) {
      return;
    }

    fetchData();
  }, [detail]);

  const prefix = useMemo(() => getPrefix(), [detail]);

  const handleReExecute = (record: any) => {
    reRun(record).then(() => {
      fetchData();
    });
  };
  const columns = [
    {
      title: t('JOB'),
      field: 'name',
      width: '19%',
      render: (name: string) => (
        <Link className="item-name" to={`${prefix}/jobs/${name}`}>
          {name}
        </Link>
      ),
    },
    {
      title: t('STATUS'),
      filed: 'status',
      width: '19%',
      render: (status: any, record: Record<string, any>) => {
        const formatStatus = getJobStatus(record as any);
        return (
          <StatusIndicator type={formatStatus as any} motion>
            {t(formatStatus)}
          </StatusIndicator>
        );
      },
    },
    {
      title: t('START_TIME'),
      field: 'startTime',
      render: (time: string) => formatTime(time),
    },
    {
      title: t('END_TIME'),
      field: 'completionTime',
      render: (time: any, record: Record<string, any>) => {
        const failedTime = get(record, 'status.conditions[0].lastProbeTime');
        if (time) {
          return formatTime(time);
        }
        if (failedTime) {
          return formatTime(failedTime);
        }
        return '-';
      },
    },
    {
      title: '',
      field: 'more',
      render: (_: any, record: any) => {
        return (
          <Button variant="text" onClick={() => handleReExecute(record)}>
            <Icon name="refresh" />
          </Button>
        );
      },
    },
  ];

  const { data, isLoading: loading } = execute;
  return isLoading ? (
    <Loading className="page-loading" />
  ) : (
    <Panel>
      <Header>
        <span>{t('RUN_RECORDS')}</span>
      </Header>
      <TableContent dataSource={data} columns={columns} loading={loading} />
    </Panel>
  );
};

export default ExecuteRecords;
