/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import {
  componentMonitoringStore,
  Constants,
  FormattedStatistics,
  getAreaChartOps,
  monitorStore,
  OriginalStatisticsMetricResult,
  SimpleArea,
  StatusTabs,
} from '@ks-console/shared';
import { get, isEmpty } from 'lodash';
import React, { useMemo } from 'react';
import { useQuery } from 'react-query';
import TabItem from '../ETCD/tab';

const MetricTypes: Record<string, string> = {
  request_latencies_total: 'apiserver_request_latencies',
  request_latencies_apis: 'apiserver_request_by_verb_latencies',
  request_rate: 'apiserver_request_rate',
  schedule_attempts_count: 'scheduler_schedule_attempts',
  schedule_attempt_rate: 'scheduler_schedule_attempt_rate',
};

const { getApi } = componentMonitoringStore;
const { useMonitorStore } = monitorStore;

function ServiceComponentStatusTab({ cluster }: { cluster: string }) {
  const { fetchMetrics } = useMonitorStore({
    getApiFn: getApi,
  });

  const { data: apiserverMetrics = {} } = useQuery<FormattedStatistics>(
    ['apiserverMetrics'],
    async () => {
      const result = await fetchMetrics({
        module: 'apiserver',
        cluster,
        metrics: [
          MetricTypes.request_latencies_total,
          MetricTypes.request_latencies_apis,
          MetricTypes.request_rate,
        ],
        step: '5m',
        times: 100,
      });
      return result;
    },
    {
      refetchInterval: 10000,
    },
  );

  const { data: schedulerMetrics = {}, isLoading: isSchedulerLoading } =
    useQuery<FormattedStatistics>(
      ['schedulerMetrics'],
      async () => {
        const result = await fetchMetrics({
          module: 'scheduler',
          cluster,
          metrics: [MetricTypes.schedule_attempts_count, MetricTypes.schedule_attempt_rate],
          step: '5m',
          times: 100,
        });
        return result;
      },
      {
        refetchInterval: 10000,
      },
    );

  const metrics = useMemo(() => {
    return {
      ...apiserverMetrics,
      ...schedulerMetrics,
    };
  }, [apiserverMetrics, schedulerMetrics]);

  const getSpecificData = (
    metricName: string,
    type: string,
    value: string,
  ): OriginalStatisticsMetricResult | {} => {
    const data = get(metrics, `${MetricTypes[metricName]}`, {});
    const result: OriginalStatisticsMetricResult[] = get(data, 'data.result', []);
    return result.find(item => get(item, `metric.${type}`) === value) || {};
  };

  const getVerbData = (value: string) => getSpecificData('request_latencies_apis', 'verb', value);

  const renderChart = (option: any) => {
    const commonProps = {
      theme: 'light',
      key: option.title,
      height: '100%',
    };
    const config = getAreaChartOps(option);

    if (isEmpty(config.data)) return null;

    switch (option.type) {
      default:
      case 'area': {
        return <SimpleArea {...commonProps} {...config} categories={option.legend} />;
      }
    }
  };

  const getTabOptions = () => {
    const { ICON_TYPES } = Constants;
    const result = [
      {
        icon: ICON_TYPES.apiserver,
        name: 'API_SERVER',
        title: 'REQUEST_LATENCY_TCAP',
      },
      {
        icon: ICON_TYPES.apiserver,
        name: 'API_SERVER',
        title: 'REQUEST_RATE',
      },
      {
        icon: ICON_TYPES.scheduler,
        name: 'SCHEDULER',
        title: 'SCHEDULE_ATTEMPTS_TCAP',
      },
      {
        icon: ICON_TYPES.scheduler,
        name: 'SCHEDULER',
        title: 'SCHEDULING_RATE_TCAP',
      },
    ];

    return result.map(item => ({
      props: item,
      component: TabItem,
    }));
  };

  const getContentOptions = () => {
    const result = [
      {
        type: 'area',
        title: 'REQUEST_LATENCY',
        unit: 'ms',
        legend: ['REST_GET', 'REST_POST', 'REST_PATCH', 'REST_DELETE', 'REST_PUT', 'TOTAL_AVERAGE'],
        data: [
          getVerbData('GET'),
          getVerbData('POST'),
          getVerbData('PATCH'),
          getVerbData('DELETE'),
          getVerbData('PUT'),
          get(metrics, [MetricTypes.request_latencies_total, 'data', 'result', 0], {}),
        ],
      },
      {
        type: 'area',
        title: 'REQUEST_PER_SECOND',
        unit: t('TIMES_PER_SECOND'),
        legend: ['REQUEST'],
        data: get(metrics, [MetricTypes.request_rate, 'data', 'result']),
      },
      {
        type: 'area',
        title: 'SCHEDULE_ATTEMPTS',
        unit: '',
        legend: ['SUCCESS', 'ERROR', 'FAILURE'],
        data: [
          getSpecificData('schedule_attempts_count', 'result', 'scheduled'),
          getSpecificData('schedule_attempts_count', 'result', 'error'),
          getSpecificData('schedule_attempts_count', 'result', 'unschedulable'),
        ],
        areaColors: ['blue', 'red', 'yellow'],
      },
      {
        type: 'area',
        title: 'SCHEDULING_RATE',
        unit: t('TIMES_PER_SECOND'),
        legend: ['SUCCESS', 'ERROR', 'FAILURE'],
        data: [
          getSpecificData('schedule_attempt_rate', 'result', 'scheduled'),
          getSpecificData('schedule_attempt_rate', 'result', 'error'),
          getSpecificData('schedule_attempt_rate', 'result', 'unschedulable'),
        ],
        areaColors: ['blue', 'red', 'yellow'],
      },
    ];

    return result.map(item => ({
      props: item,
      render: renderChart,
    }));
  };

  return (
    <StatusTabs
      title={t('SERVICE_COMPONENT_MONITORING')}
      tabOptions={getTabOptions()}
      contentOptions={getContentOptions()}
      loading={isSchedulerLoading}
    />
  );
}

export default ServiceComponentStatusTab;
