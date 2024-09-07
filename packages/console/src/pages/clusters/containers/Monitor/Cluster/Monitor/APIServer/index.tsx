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
import { Content, FullBox, Wrapper } from '../styles';

const MetricTypes: Record<string, string> = {
  request_latencies_total: 'apiserver_request_latencies',
  request_latencies_apis: 'apiserver_request_by_verb_latencies',
  request_rate: 'apiserver_request_rate',
};

const { getApi } = componentMonitoringStore;
const { useMonitorStore } = monitorStore;

const { fetchMetrics } = useMonitorStore({ getApiFn: getApi });

function APIServer() {
  const { cluster } = useParams();
  const [metrics, setMetrics] = useState<Record<string, any>>({});

  const { mutate, isLoading } = useMutation(
    (fetchParams: any) => {
      return fetchMetrics({
        module: 'apiserver',
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

  const getVerbData = (value: string) => getSpecificData('request_latencies_apis', 'verb', value);

  const configs = useMemo(() => {
    if (isEmpty(metrics)) {
      return [];
    }

    return [
      {
        type: 'io',
        title: 'REQUEST_LATENCY',
        unit: 'ms',
        legend: [
          'REST_CREATE',
          'REST_DELETE',
          'REST_DELETECOLLECTION',
          'REST_GET',
          'REST_POST',
          'REST_PATCH',
          'REST_PUT',
          'REST_UPDATE',
          'REST_LIST',
          'TOTAL_AVERAGE',
        ],
        data: [
          getVerbData('CREATE'),
          getVerbData('DELETE'),
          getVerbData('DELETECOLLECTION'),
          getVerbData('GET'),
          getVerbData('POST'),
          getVerbData('PATCH'),
          getVerbData('PUT'),
          getVerbData('UPDATE'),
          getVerbData('LIST'),
          get(metrics, `${MetricTypes.request_latencies_total}.data.result[0]`),
        ],
      },
      {
        type: 'request',
        title: 'REQUEST_PER_SECOND',
        unit: t('TIMES_PER_SECOND'),
        legend: ['REQUEST'],
        data: get(metrics, `${MetricTypes.request_rate}.data.result`),
      },
    ];
  }, [metrics]);

  return (
    <Wrapper>
      <MonitorController
        title={t('API_SERVER_MONITORING')}
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

            return (
              <FullBox key={item.title}>
                <SimpleArea {...config} categories={item.legend} height={190} theme="light" />
              </FullBox>
            );
          })}
        </Content>
      </MonitorController>
    </Wrapper>
  );
}

export default APIServer;
