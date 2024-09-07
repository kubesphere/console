/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import { get, omit } from 'lodash';
import React, { useState, useEffect, useMemo, useRef } from 'react';
import { Loading, Button, LoadingOverlay } from '@kubed/components';
import { useParams, Link } from 'react-router-dom';
import {
  StatusIndicator,
  Panel,
  Icon,
  RecordStore,
  workloadStore,
  formatTime,
  getJobStatus,
  Pagination,
} from '@ks-console/shared';
import { useCacheStore as useStore } from '@ks-console/shared';
import { TableContent, Header, PaginationWrapper } from './styles';

const { fetchStepListByK8s } = RecordStore;
const { reRun } = workloadStore('jobs');

const ExecuteRecords = () => {
  const [props] = useStore('cronjobsDetailProps');
  const { detail, isLoading } = props;

  const params = useParams();
  const [execute, setExecute] = useState({
    data: [],
    isLoading: true,
  });

  const pageContinueRef = useRef<Record<number, string | null>>({
    0: null,
  });

  const [pagination, setPagination] = useState({
    page: 0,
    limit: 10,
    total: 0,
  });

  const getPrefix = () => {
    const { cluster, workspace, namespace } = params;
    return `${workspace ? `/${workspace}` : ''}/clusters/${cluster}/projects/${namespace}`;
  };

  const fetchData = async (
    param = {
      page: 0,
      limit: 10,
    },
  ) => {
    const cluster = detail?.cluster ?? '';
    const namespace = detail?.namespace ?? '';
    const selector = get(detail, 'spec.jobTemplate.metadata.labels', {});
    setExecute({
      ...execute,
      isLoading: true,
    });
    const { data, _originData: originData } = await fetchStepListByK8s({
      ...omit(params, 'name'),
      cluster,
      namespace,
      selector,
      limit: param.limit,
      continue: pageContinueRef.current[param.page],
    });
    pageContinueRef.current[param.page + 1] = get(originData, 'metadata.continue');
    setPagination({
      ...pagination,
      page: param.page,
      total:
        param.page * param.limit + data.length + get(originData, 'metadata.remainingItemCount', 0),
    });
    setExecute({
      ...execute,
      data,
      isLoading: false,
    });
  };

  useEffect(() => {
    if (detail?.name) {
      fetchData();
    }
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

  const handleNext = () => {
    fetchData({
      page: pagination.page + 1,
      limit: 10,
    });
  };

  const handlePrev = () => {
    fetchData({
      page: Math.max(0, pagination.page - 1),
      limit: 10,
    });
  };

  const { data, isLoading: loading } = execute;
  return isLoading ? (
    <Loading className="page-loading" />
  ) : (
    <Panel>
      <Header>
        <span>{t('RUN_RECORDS')}</span>
      </Header>
      <TableContent dataSource={data} columns={columns} loading={loading} />
      <PaginationWrapper>
        <LoadingOverlay visible={loading} />
        {pagination.total > 0 && (
          <Pagination
            totalCount={pagination.total}
            {...pagination}
            onNextPage={handleNext}
            onPreviousPage={handlePrev}
          />
        )}
      </PaginationWrapper>
    </Panel>
  );
};

export default ExecuteRecords;
