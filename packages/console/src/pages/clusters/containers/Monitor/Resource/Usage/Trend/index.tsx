import React from 'react';
import { get, isEmpty } from 'lodash';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import {
  getAreaChartOps,
  getZeroValues,
  monitorStore,
  SimpleArea,
  workspaceMonitorStore,
} from '@ks-console/shared';
import { Card, LoadingOverlay } from '@kubed/components';
import { EmptyWrapper, Main } from '../styles';

const MetricTypes = {
  namespace_count: 'cluster_namespace_count',
};

const { fetchMetrics } = monitorStore.useMonitorStore({ getApiFn: workspaceMonitorStore.getApi });

function ProjectTrend() {
  const { cluster } = useParams();

  const { data: metrics, isLoading } = useQuery(['workspaceMetrics', cluster], async () => {
    const res = await fetchMetrics({
      cluster,
      metrics: Object.values(MetricTypes),
      step: '60m',
      times: 100,
    });
    return res;
  });

  const renderChart = () => {
    const config = getAreaChartOps({
      title: 'PROJECT_COUNT',
      unit: '',
      legend: ['PROJECT_COUNT'],
      data: get(metrics, `${MetricTypes.namespace_count}.data.result`) ?? [
        { values: getZeroValues() },
      ],
    });

    return <SimpleArea theme="light" categories={['PROJECT_COUNT']} {...config} />;
  };

  return (
    <Card hoverable padding={0}>
      <Main>
        <LoadingOverlay visible={isLoading} />
        {isEmpty(metrics) ? <EmptyWrapper>{t('NO_MONITORING_DATA')}</EmptyWrapper> : renderChart()}
      </Main>
    </Card>
  );
}

export default ProjectTrend;
