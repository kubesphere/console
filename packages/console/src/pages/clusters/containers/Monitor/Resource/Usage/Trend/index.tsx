/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import React, { useState } from 'react';
import { get, isEmpty } from 'lodash';

import { useParams } from 'react-router-dom';
import {
  getAreaChartOps,
  getZeroValues,
  monitorStore,
  SimpleArea,
  MonitorController,
  workspaceMonitorStore,
} from '@ks-console/shared';
import { Card } from '@kubed/components';
import { Main } from '../styles';
import { useMutation } from 'react-query';

const MetricTypes = {
  namespace_count: 'cluster_namespace_count',
};

const { fetchMetrics } = monitorStore.useMonitorStore({ getApiFn: workspaceMonitorStore.getApi });

function ProjectTrend() {
  const { cluster } = useParams();
  const [metrics, setMetrics] = useState();

  const { mutate, isLoading } = useMutation<any>(
    (fetchParams: any) => {
      return fetchMetrics({
        cluster,
        metrics: Object.values(MetricTypes),
        originData: metrics,
        ...fetchParams,
      });
    },
    {
      onSuccess: data => {
        setMetrics(data);
      },
    },
  );

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

  const isEmptyData = (data: any) => {
    if (isEmpty(data)) return true;

    const result = Object.values(data).every(item => isEmpty(get(item, 'data.result')));
    return result;
  };

  return (
    <Card hoverable padding={0}>
      <Main>
        <MonitorController
          step="1h"
          times={24}
          className="mb12"
          onFetch={mutate}
          loading={isLoading}
          isEmpty={isEmptyData(metrics)}
        >
          {renderChart()}
        </MonitorController>
      </Main>
    </Card>
  );
}

export default ProjectTrend;
