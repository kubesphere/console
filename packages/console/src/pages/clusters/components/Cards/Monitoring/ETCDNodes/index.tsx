/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import React, { useMemo } from 'react';
import { get, isEmpty } from 'lodash';
import { useQuery } from 'react-query';
import { LoadingOverlay } from '@kubed/components';
import { componentMonitoringStore, FormattedStatistics, monitorStore } from '@ks-console/shared';
import Item from './item';
import { EmptyWrapper, List, Title, Wrapper } from './styles';

const MetricTypes = {
  etcd_online: 'etcd_server_up_total',
  etcd_total: 'etcd_server_total',
  etcd_has_leader: 'etcd_server_has_leader',
  etcd_leader_changes: 'etcd_server_leader_changes',
  etcd_server_list: 'etcd_server_list',
  etcd_server_is_leader: 'etcd_server_is_leader',
};

const { getApi } = componentMonitoringStore;
const { useMonitorStore } = monitorStore;

function ETCDNodes({ cluster }: { cluster?: string }) {
  const prefix = '/infrastructure/nodes';
  const { fetchMetrics } = useMonitorStore({
    getApiFn: getApi,
  });

  const { data: metrics, isLoading } = useQuery<FormattedStatistics>(
    ['etcdServerMetrics'],
    async () => {
      const result = await fetchMetrics({
        module: 'etcd',
        cluster,
        metrics: Object.values(MetricTypes),
        last: true,
      });
      return result;
    },
    {
      refetchInterval: 10000,
    },
  );

  const getResult = (type: string) => get(metrics, [type, 'data', 'result']) || [];

  const list = useMemo(() => {
    const leader = getResult(MetricTypes.etcd_has_leader);
    const isLeaderList = getResult(MetricTypes.etcd_server_is_leader);
    const changes = getResult(MetricTypes.etcd_leader_changes);
    const nodes = getResult(MetricTypes.etcd_server_list);

    return nodes.map(node => {
      const ip = get(node, 'metric.node_ip');
      const isOnline = get(node, 'value[1]') === '1';
      const hasLeader =
        get(
          leader.find(item => get(item, 'metric.node_ip') === ip),
          'value[1]',
        ) === '1';
      const isLeader =
        get(
          isLeaderList.find(item => get(item, 'metric.node_ip') === ip),
          'value[1]',
        ) === '1';
      const leaderChanges =
        get(
          changes.find(item => get(item, 'metric.node_ip') === ip),
          'value[1]',
        ) || 0;

      return {
        ...node.metric,
        hasLeader,
        isLeader,
        leaderChanges,
        isOnline,
      };
    });
  }, [metrics]);

  return (
    <Wrapper>
      <Title>{t('SERVICE_STATUS')}</Title>
      <List>
        <LoadingOverlay visible={isLoading} />
        {isEmpty(list) ? (
          <EmptyWrapper
            title={t('NO_DATA')}
            image={<img src="/assets/empty-card.svg" />}
            imageStyle={{ width: '100%', background: 'none' }}
          />
        ) : (
          list.map((item, index) => <Item prefix={prefix} data={item} key={index}></Item>)
        )}
      </List>
    </Wrapper>
  );
}

export default ETCDNodes;
