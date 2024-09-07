/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import React, { useMemo } from 'react';
import { get } from 'lodash';
import { useQueries } from 'react-query';
import { getValueByUnit, hasClusterModule, hasKSModule, monitorStore } from '@ks-console/shared';
import { Card, Loading } from '@kubed/components';
import { Level, StyledField } from '../styles';

interface Props {
  cluster: string;
}

const MetricTypes: Record<string, string> = {
  request_latencies_total: 'apiserver_request_latencies',
  request_rate: 'apiserver_request_rate',
  schedule_attempts_count: 'scheduler_schedule_attempts',
};

const { apiVersion, useMonitorStore } = monitorStore;

const getApi = (cluster: string, module: string) => () => {
  return `${apiVersion({ cluster, component: module })}`;
};

function KubernetesStatus({ cluster }: Props) {
  const { fetchMetrics: fetchApiMetrics } = useMonitorStore({
    getApiFn: getApi(cluster, 'apiserver'),
  });
  const { fetchMetrics: fetchSchedulerMetrics } = useMonitorStore({
    getApiFn: getApi(cluster, 'scheduler'),
  });

  const [{ data: apiMetrics = {} }, { data: schedulerMetrics = {}, isLoading }] = useQueries([
    {
      queryKey: ['apiMetrics'],
      queryFn: async () => {
        return fetchApiMetrics({
          last: true,
          metrics: [MetricTypes.request_latencies_total, MetricTypes.request_rate],
        });
      },
      enabled: !!hasClusterModule(cluster, 'whizard-monitoring'),
    },
    {
      queryKey: ['schedulerMetrics'],
      queryFn: async () => {
        return fetchSchedulerMetrics({
          last: true,
          metrics: [MetricTypes.schedule_attempts_count],
        });
      },
      enabled: !!hasClusterModule(cluster, 'whizard-monitoring'),
    },
  ]);

  const metrics = useMemo(
    () => ({
      ...apiMetrics,
      ...schedulerMetrics,
    }),
    [apiMetrics, schedulerMetrics],
  );

  const getSpecificData = (metricName: string) => {
    const data: any[] = get(metrics, `${MetricTypes[metricName]}.data.result`) || [];
    return data.reduce(
      (prev, cur) => ({
        ...prev,
        [get(cur, 'metric.result')]: get(cur, 'value[1]', 0),
      }),
      {},
    );
  };

  const requestRate = Number(
    get(metrics, `${MetricTypes.request_rate}.data.result[0].value[1]`, 0),
  ).toFixed(3);

  const requestLatenciesTotal = getValueByUnit(
    get(metrics, `${MetricTypes.request_latencies_total}.data.result[0].value[1]`),
    'ms',
  );

  const scheduleAttemptsCount = getSpecificData('schedule_attempts_count');

  if (!hasKSModule('whizard-monitoring')) {
    return null;
  }

  return (
    <Card sectionTitle={t('KUBERNETES_STATUS')} className="mb12">
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <Level>
            <StyledField
              value={
                Number(requestRate) > 1
                  ? t('VALUE_REQUESTS_SECOND_PL', { value: requestRate })
                  : t('VALUE_REQUESTS_SECOND_PL')
              }
              label={t('API_REQUESTS_PER_SECOND')}
            />
            <StyledField value={`${requestLatenciesTotal} ms`} label={t('API_REQUEST_LATENCY')} />
          </Level>
          <Level>
            <StyledField
              value={scheduleAttemptsCount.scheduled || '-'}
              label={
                scheduleAttemptsCount.scheduled === 1
                  ? t('SCHEDULING_OPERATION')
                  : t('SCHEDULING_OPERATIONS')
              }
            />
            <StyledField
              value={scheduleAttemptsCount.error || '-'}
              label={
                scheduleAttemptsCount.error === 1
                  ? t('SCHEDULING_FAILURE')
                  : t('SCHEDULING_FAILURES')
              }
            />
          </Level>
        </>
      )}
    </Card>
  );
}

export default KubernetesStatus;
