/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import React, { useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useMutation } from 'react-query';
import { get, isEmpty } from 'lodash';
import {
  getAreaChartOps,
  MonitorController,
  monitorStore,
  componentMonitoringStore,
  SimpleArea,
  getZeroValues,
} from '@ks-console/shared';
import { Content, Box, FullBox, Wrapper } from '../styles';

const MetricTypes: Record<string, string> = {
  schedule_attempts_count: 'scheduler_schedule_attempts',
  schedule_attempt_rate: 'scheduler_schedule_attempt_rate',
  scheduling_latency_average: 'scheduler_e2e_scheduling_latency',
  scheduling_latency_quantile: 'scheduler_e2e_scheduling_latency_quantile',
};

const { getApi } = componentMonitoringStore;
const { useMonitorStore } = monitorStore;

const { fetchMetrics } = useMonitorStore({ getApiFn: getApi });

function Scheduler() {
  const { cluster } = useParams();
  const [metrics, setMetrics] = useState<Record<string, any>>({});

  const { mutate, isLoading } = useMutation(
    (fetchParams: any) => {
      return fetchMetrics({
        module: 'scheduler',
        cluster,
        metrics: Object.values(MetricTypes),
        ...fetchParams,
      });
    },
    {
      onSuccess: data => {
        setMetrics(data);
      },
    },
  );

  const getSpecificData = (metricName: string, type: string, value: string) => {
    const data = get(metrics, `${MetricTypes[metricName]}.data.result`) || [];
    return data.find((item: any) => get(item, `metric.${type}`) === value) || {};
  };

  const configs = useMemo(() => {
    if (isEmpty(metrics)) {
      return [];
    }

    return [
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
      {
        type: 'grade',
        title: 'SCHEDULING_LATENCY',
        unit: 'ms',
        legend: ['99th', '90th', '50th', 'AVERAGE'],
        data: [
          getSpecificData('scheduling_latency_quantile', 'quantile', '0.99'),
          getSpecificData('scheduling_latency_quantile', 'quantile', '0.9'),
          getSpecificData('scheduling_latency_quantile', 'quantile', '0.5'),
          get(metrics, `${MetricTypes.scheduling_latency_average}.data.result[0]`),
        ],
      },
    ];
  }, [metrics]);

  return (
    <Wrapper>
      <MonitorController
        title={t('SCHEDULER_MONITORING')}
        step="2m"
        times={50}
        onFetch={mutate}
        loading={isLoading}
        isEmpty={isEmpty(metrics)}
      >
        <Content>
          {configs.map(item => {
            item.data = isEmpty(item.data) ? [{ values: getZeroValues() }] : item.data;
            const config = getAreaChartOps(item);
            // TODO: PercentArea
            return item.type === 'grade' ? (
              <FullBox key={item.title}>
                <SimpleArea
                  {...config}
                  categories={item.legend}
                  height={190}
                  colors={['lighterRed', 'lightestYellow', 'blue', 'dark']}
                  theme="light"
                  yAxisProps={{
                    width: 45,
                    tickFormatter: value => (value > 0 ? value : ''),
                  }}
                />
              </FullBox>
            ) : (
              <Box key={item.title}>
                <SimpleArea {...config} categories={item.legend} height={190} theme="light" />
              </Box>
            );
          })}
        </Content>
      </MonitorController>
    </Wrapper>
  );
}

export default Scheduler;
