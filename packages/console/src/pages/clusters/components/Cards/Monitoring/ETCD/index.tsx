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
  SimpleArea,
  StatusTabs,
} from '@ks-console/shared';
import { get, isEmpty } from 'lodash';
import React from 'react';
import { useQuery } from 'react-query';
import ETCDNodes from '../ETCDNodes';
import TabItem from './tab';

const MetricTypes: Record<string, string> = {
  proposals_committed_rate: 'etcd_server_proposals_committed_rate',
  proposals_applied_rate: 'etcd_server_proposals_applied_rate',
  proposals_failed_rate: 'etcd_server_proposals_failed_rate',
  proposals_pending_count: 'etcd_server_proposals_pending_count',
  db_size: 'etcd_mvcc_db_size',
  client_received_bytes: 'etcd_network_client_grpc_received_bytes',
  client_sent_bytes: 'etcd_network_client_grpc_sent_bytes',
};

const { getApi } = componentMonitoringStore;
const { useMonitorStore } = monitorStore;

function ETCDStatusTab({ cluster }: { cluster: string }) {
  const { fetchMetrics } = useMonitorStore({
    getApiFn: getApi,
  });

  const {
    data: metrics,
    isLoading,
    refetch,
  } = useQuery<FormattedStatistics>(
    ['etcdMetrics'],
    async () => {
      const result = await fetchMetrics({
        module: 'etcd',
        cluster,
        metrics: Object.values(MetricTypes),
        step: '5m',
        times: 100,
      });
      return result;
    },
    {
      refetchInterval: 10000,
    },
  );

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
        icon: ICON_TYPES.etcd,
        name: 'etcd',
        title: 'ETCD_STATUS',
      },
      {
        icon: ICON_TYPES.etcd,
        name: 'etcd',
        title: 'ETCD_PROPOSAL',
      },
      {
        icon: ICON_TYPES.etcd,
        name: 'etcd',
        title: 'ETCD_DB_SIZE',
      },
      {
        icon: ICON_TYPES.etcd,
        name: 'etcd',
        title: 'ETCD_CLIENT_TRAFFIC',
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
        props: {
          cluster: cluster,
        },
        component: ETCDNodes,
      },
      {
        props: {
          type: 'area',
          title: 'RAFT_PROPOSAL',
          unit: t('TIMES_PER_SECOND'),
          legend: ['PROPOSAL_COMMITTED', 'PROPOSAL_APPLIED', 'PROPOSAL_FAILED', 'PROPOSAL_PENDING'],
          data: [
            get(metrics, [MetricTypes.proposals_committed_rate, 'data', 'result', 0], {}),
            get(metrics, [MetricTypes.proposals_applied_rate, 'data', 'result', 0], {}),
            get(metrics, [MetricTypes.proposals_failed_rate, 'data', 'result', 0], {}),
            get(metrics, [MetricTypes.proposals_pending_count, 'data', 'result', 0], {}),
          ],
          areaColors: ['blue', 'green', 'red', 'yellow'],
        },
        render: renderChart,
      },
      {
        props: {
          type: 'area',
          title: 'DB_SIZE',
          unitType: 'memory',
          legend: ['DB_SIZE'],
          data: get(metrics, [MetricTypes.db_size, 'data', 'result']),
        },
        render: renderChart,
      },
      {
        props: {
          type: 'area',
          title: 'CLIENT_TRAFFIC',
          unitType: 'traffic',
          legend: ['RECEIVED', 'SENT'],
          data: [
            get(metrics, [MetricTypes.client_received_bytes, 'data', 'result', 0], {}),
            get(metrics, [MetricTypes.client_sent_bytes, 'data', 'result', 0], {}),
          ],
        },
        render: renderChart,
      },
    ];

    return result;
  };

  return (
    <StatusTabs
      title={t('ETCD_MONITORING')}
      tabOptions={getTabOptions()}
      contentOptions={getContentOptions()}
      loading={isLoading}
      refetch={refetch}
    />
  );
}

export default ETCDStatusTab;
