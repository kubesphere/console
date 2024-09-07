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
import { Content, Box, FullBox, Wrapper, Status } from '../styles';
import ETCDNodes from '../../../../../components/Cards/Monitoring/ETCDNodes';

const MetricTypes: Record<string, string> = {
  proposals_committed_rate: 'etcd_server_proposals_committed_rate',
  proposals_applied_rate: 'etcd_server_proposals_applied_rate',
  proposals_failed_rate: 'etcd_server_proposals_failed_rate',
  proposals_pending_count: 'etcd_server_proposals_pending_count',
  db_size: 'etcd_mvcc_db_size',
  client_received_bytes: 'etcd_network_client_grpc_received_bytes',
  client_sent_bytes: 'etcd_network_client_grpc_sent_bytes',
  grpc_received_rate: 'etcd_grpc_server_msg_received_rate',
  grpc_sent_rate: 'etcd_grpc_server_msg_sent_rate',
  wal_fsync_duration_average: 'etcd_disk_wal_fsync_duration',
  wal_fsync_duration_quantile: 'etcd_disk_wal_fsync_duration_quantile',
  backend_commit_duration_average: 'etcd_disk_backend_commit_duration',
  backend_commit_duration_quantile: 'etcd_disk_backend_commit_duration_quantile',
};

const { getApi } = componentMonitoringStore;
const { useMonitorStore } = monitorStore;

const { fetchMetrics } = useMonitorStore({ getApiFn: getApi });

function Etcd() {
  const { cluster } = useParams();
  const [metrics, setMetrics] = useState<Record<string, any>>({});

  const { mutate, isLoading } = useMutation(
    (fetchParams: any) => {
      return fetchMetrics({
        module: 'etcd',
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

  const getQuantileData = (metricName: string, quantile: string) => {
    const data = get(metrics, `${MetricTypes[metricName]}.data.result`) || [];
    return data.find((item: any) => get(item, 'metric.quantile') === quantile) || {};
  };

  const configs = useMemo(() => {
    if (isEmpty(metrics)) {
      return [];
    }

    return [
      {
        type: 'size',
        title: 'DB_SIZE',
        unitType: 'memory',
        legend: ['DB_SIZE'],
        data: get(metrics, `${MetricTypes.db_size}.data.result`),
      },
      {
        type: 'area',
        title: 'CLIENT_TRAFFIC',
        unitType: 'traffic',
        legend: ['RECEIVED', 'SENT'],
        data: [
          get(metrics, `${MetricTypes.client_received_bytes}.data.result[0]`),
          get(metrics, `${MetricTypes.client_sent_bytes}.data.result[0]`),
        ],
      },
      {
        type: 'area',
        title: 'GRPC_STREAM_MESSAGES',
        unit: t('TIMES_PER_SECOND'),
        legend: ['RECEIVED', 'SENT'],
        data: [
          get(metrics, `${MetricTypes.grpc_received_rate}.data.result[0]`),
          get(metrics, `${MetricTypes.grpc_sent_rate}.data.result[0]`),
        ],
      },
      {
        type: 'grade',
        title: 'WAL_FSYNC',
        unit: 'ms',
        legend: ['99th', '90th', '50th', 'AVERAGE'],
        data: [
          getQuantileData('wal_fsync_duration_quantile', '0.99'),
          getQuantileData('wal_fsync_duration_quantile', '0.9'),
          getQuantileData('wal_fsync_duration_quantile', '0.5'),
          get(metrics, `${MetricTypes.wal_fsync_duration_average}.data.result[0]`),
        ],
      },
      {
        type: 'grade',
        title: 'DB_FSYNC',
        unit: 'ms',
        legend: ['99th', '90th', '50th', 'AVERAGE'],
        data: [
          getQuantileData('backend_commit_duration_quantile', '0.99'),
          getQuantileData('backend_commit_duration_quantile', '0.9'),
          getQuantileData('backend_commit_duration_quantile', '0.5'),
          get(metrics, `${MetricTypes.backend_commit_duration_average}.data.result[0]`),
        ],
      },
      {
        type: 'area',
        title: 'RAFT_PROPOSAL',
        unit: t('TIMES_PER_SECOND'),
        legend: ['PROPOSAL_COMMITTED', 'PROPOSAL_APPLIED', 'PROPOSAL_FAILED', 'PROPOSAL_PENDING'],
        data: [
          get(metrics, `${MetricTypes.proposals_committed_rate}.data.result[0]`),
          get(metrics, `${MetricTypes.proposals_applied_rate}.data.result[0]`),
          get(metrics, `${MetricTypes.proposals_failed_rate}.data.result[0]`),
          get(metrics, `${MetricTypes.proposals_pending_count}.data.result[0]`),
        ],
        areaColors: ['blue', 'green', 'red', 'yellow'],
      },
    ];
  }, [metrics]);

  return (
    <Wrapper>
      <MonitorController
        title={t('ETCD_MONITORING')}
        step="2m"
        times={50}
        onFetch={mutate}
        loading={isLoading}
        isEmpty={isEmpty(metrics)}
      >
        <Content>
          <FullBox>
            <Status>
              <ETCDNodes cluster={cluster} />
            </Status>
          </FullBox>
          {configs.map(item => {
            item.data = isEmpty(item.data) ? [{ values: getZeroValues() }] : item.data;
            const config = getAreaChartOps(item);
            // TODO: PercentArea
            const params =
              item.type === 'grade'
                ? {
                    colors: ['lighterRed', 'lightestYellow', 'blue', 'dark'],
                    yAxisProps: {
                      width: 45,
                      tickFormatter: (value: any) => (value > 0 ? value : ''),
                    },
                  }
                : {};
            return (
              <Box key={item.title}>
                <SimpleArea
                  {...config}
                  categories={item.legend}
                  height={190}
                  theme="light"
                  {...params}
                />
              </Box>
            );
          })}
        </Content>
      </MonitorController>
    </Wrapper>
  );
}

export default Etcd;
