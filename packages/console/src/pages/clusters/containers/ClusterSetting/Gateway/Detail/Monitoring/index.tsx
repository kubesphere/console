/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import React, { useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useMutation, useQuery } from 'react-query';
import { get, isEmpty } from 'lodash';
import { Select } from '@kubed/components';
import {
  FormattedGateway,
  FormattedPod,
  gatewayMonitorStore,
  gatewayStore,
  getAreaChartOps,
  MonitorController,
  monitorStore,
  SimpleArea,
  useDetailPage,
} from '@ks-console/shared';
import MonitoringOverview from '../../Components/MonitoringOverview';

const MetricTypes = {
  ingress_request_count: 'ingress_request_count',
  ingress_request_5xx_count: 'ingress_request_5xx_count',
  ingress_request_4xx_count: 'ingress_request_4xx_count',
  ingress_active_connections: 'ingress_active_connections',
  ingress_success_rate: 'ingress_success_rate',
  ingress_request_duration_average: 'ingress_request_duration_average',
  ingress_request_duration_50percentage: 'ingress_request_duration_50percentage',
  ingress_request_duration_95percentage: 'ingress_request_duration_95percentage',
  ingress_request_duration_99percentage: 'ingress_request_duration_99percentage',
  ingress_request_volume: 'ingress_request_volume',
  ingress_request_volume_by_ingress: 'ingress_request_volume_by_ingress',
  ingress_request_network_sent: 'ingress_request_network_sent',
  ingress_request_network_received: 'ingress_request_network_received',
};

const { useMonitorStore } = monitorStore;
const { getApi } = gatewayMonitorStore;
const { getGatewayPods } = gatewayStore;

const { fetchMetrics } = useMonitorStore({ getApiFn: getApi });

function Monitoring() {
  const { cluster, namespace, ...rest } = useParams();
  const { detail } = useDetailPage<FormattedGateway>();
  const currentCluster = useMemo(() => {
    const url = location.pathname;
    return url.indexOf('federatedprojects') > -1
      ? (localStorage.getItem('federated-cluster') as string)
      : cluster;
  }, [cluster]);
  const [podsName, setPodsName] = useState<string>();
  const [metrics, setMetrics] = useState<Record<string, any>>({});

  const { data: podData } = useQuery(['gatewayPods', currentCluster], async () => {
    const result = await getGatewayPods({
      ...rest,
      namespace,
      cluster: currentCluster,
    });
    let $podsName = '';
    const options = !isEmpty(result)
      ? result.map((item: FormattedPod) => ({ label: item.name, value: item.name }))
      : [];
    $podsName = isEmpty(options) ? '' : options[0].value;
    return {
      podsName: $podsName,
      options,
    };
  });

  useEffect(() => setPodsName(podData?.podsName), [podData?.podsName]);

  const { mutate, isLoading } = useMutation(
    (fetchParams: any) => {
      return fetchMetrics({
        cluster: currentCluster,
        metrics: Object.values(MetricTypes),
        job: `${detail?.name}-metrics`,
        namespace: namespace,
        pod: podsName,
        resources: [],
        fillZero: true,
        ...fetchParams,
      });
    },
    {
      onSuccess: data => {
        setMetrics(data);
      },
    },
  );

  const configs = useMemo(() => {
    if (isEmpty(metrics)) {
      return [];
    }
    const requestVolumeData = get(
      metrics,
      `${MetricTypes.ingress_request_volume_by_ingress}.data.result`,
      [],
    );

    const volumeLegend = requestVolumeData.map((item: any) => get(item, 'metric.ingress', ''));

    return [
      {
        title: 'REQUEST_COUNT',
        unit: '',
        legend: volumeLegend,
        data: requestVolumeData,
      },
      {
        title: 'CONNECTION_COUNT',
        unit: '',
        legend: ['CONNECTION_COUNT'],
        data: get(metrics, `${MetricTypes.ingress_active_connections}.data.result`, {}),
      },

      {
        title: 'REQUEST_LATENCY_MS',
        legend: [
          t('P_FIFTY_LATENCY'),
          t('P_NINETY_FIVE_LATENCY'),
          t('P_NINETY_NINE_LATENCY'),
          t('AVERAGE_LATENCY'),
        ],

        data: [
          get(metrics, `${MetricTypes.ingress_request_duration_50percentage}.data.result[0]`, {}),
          get(metrics, `${MetricTypes.ingress_request_duration_95percentage}.data.result[0]`, {}),
          get(metrics, `${MetricTypes.ingress_request_duration_99percentage}.data.result[0]`, {}),
          get(metrics, `${MetricTypes.ingress_request_duration_average}.data.result[0]`, {}),
        ],
        dot: 4,
      },
      {
        title: 'FAILED_REQUEST_COUNT',
        unit: '',
        legend: [t('FOUR_XX_REQUEST_COUNT'), t('FIVE_XX_REQUEST_COUNT')],
        data: [
          get(metrics, `${MetricTypes.ingress_request_4xx_count}.data.result[0]`, {}),
          get(metrics, `${MetricTypes.ingress_request_5xx_count}.data.result[0]`, {}),
        ],
      },
      {
        title: 'NETWORK_TRAFFIC',
        unit: '',
        unitType: 'traffic',
        legend: [t('INBOUND_TRAFFIC'), t('INBOUND_TRAFFIC')],
        data: [
          get(metrics, `${MetricTypes.ingress_request_network_received}.data.result[0]`, {}),
          get(metrics, `${MetricTypes.ingress_request_network_sent}.data.result[0]`, {}),
        ],
      },
    ];
  }, [metrics]);

  return (
    <>
      <MonitoringOverview />
      <MonitorController
        createTime={get(detail, 'createTime')}
        loading={isLoading}
        onFetch={mutate}
        title={
          <Select
            value={podsName}
            options={podData?.options || []}
            onChange={value => setPodsName(value)}
          />
        }
      >
        {configs.map(item => {
          const config = getAreaChartOps(item);
          if (isEmpty(config.data)) return null;

          return (
            <SimpleArea
              {...config}
              key={`${item.title}_${item.unitType}`}
              categories={item.legend}
              theme="light"
            />
          );
        })}
      </MonitorController>
    </>
  );
}

export default Monitoring;
