/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import React, { useMemo } from 'react';
import { Cluster, Data, Pen, Trash } from '@kubed/icons';
import { hideGPUByLicense, useCacheStore as useStore } from '@ks-console/shared';
import { useQueries } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { Banner, Card, Field, notify } from '@kubed/components';
import {
  Icon,
  Constants,
  clusterStore,
  monitorStore,
  ClusterDetail,
  getDisplayName,
  useActionMenu,
  FormattedCluster,
  getLastMonitoringData,
  getValueText,
  hasClusterModule,
} from '@ks-console/shared';

import { useClusterAction } from '../../../hooks/cluster';

import { Horizon, Content } from './styles';

const METRIC_TYPES = {
  cpu_usage: 'cluster_cpu_total',
  memory_usage: 'cluster_memory_total',
  gpu_usage: 'cluster_gpu_usage',
  gpu_memory_usage: 'cluster_gpu_memory_usage',
  disk_size_usage: 'cluster_disk_size_capacity',
  node_count: 'cluster_node_total',
};

const { useMonitorStore } = monitorStore;
const { fetchDetail, fetchVersion } = clusterStore;

interface ResourceOption {
  value: string;
  label: string;
  icon: string;
}

const BaseInfo = () => {
  const navigate = useNavigate();
  const metrics = Object.values(METRIC_TYPES);
  const [cluster, setCluster] = useStore<ClusterDetail>('cluster');
  const { fetchMetrics } = useMonitorStore();
  const { name, isReady, provider, kubernetesVersion } = cluster;

  const clusterIconName = useMemo(
    () => Constants.CLUSTER_PROVIDER_ICON[provider ?? ''] || 'kubernetes',
    [provider],
  );
  const { editBaseInfo, updateKubeConfig, unbindCluster } = useClusterAction();

  const [, { isLoading, data }] = useQueries([
    {
      queryKey: [name, 'version'],
      queryFn: () => {
        return fetchVersion({ cluster: name });
      },
      enabled: isReady,
    },
    {
      queryKey: [name, 'metrics'],
      queryFn: () => {
        return fetchMetrics({
          cluster: name,
          metrics,
          last: true,
        });
      },
      enabled: hasClusterModule(name, 'whizard-monitoring'),
    },
  ]);

  function getResourceOptions(): ResourceOption[] {
    if (isLoading) {
      return [];
    }

    const value = getLastMonitoringData(data);

    const config = [
      {
        value: getValueText(value[METRIC_TYPES.node_count]),
        label: getValueText(value[METRIC_TYPES.node_count]) === '1' ? t('NODE') : t('NODES'),
        icon: 'nodes',
      },
      {
        value: getValueText(value[METRIC_TYPES.cpu_usage], 'cpu'),
        label: t('CPU'),
        icon: 'cpu',
      },
      {
        value: getValueText(value[METRIC_TYPES.memory_usage], 'memory'),
        label: t('MEMORY'),
        icon: 'memory',
      },
      {
        value: getValueText(value[METRIC_TYPES.gpu_usage], 'gpu'),
        label: t('GPU'),
        icon: 'gpu',
      },
      {
        value: getValueText(value[METRIC_TYPES.gpu_memory_usage], 'memory'),
        label: t('GPU_MEMORY'),
        icon: 'computing',
      },
      {
        value: getValueText(value[METRIC_TYPES.disk_size_usage], 'disk'),
        label: t('DISK'),
        icon: 'storage',
      },
    ];
    return hideGPUByLicense(config, cluster.name);
  }

  const editSuccessCallback = async () => {
    notify.success(t('UPDATE_SUCCESSFUL'));
    const detail = await fetchDetail({ name: cluster.name });
    setCluster(detail);
  };

  const unbindCallback = () => {
    notify.success(t('REMOVE_SUCCESS'));
    navigate('/clusters');
  };

  const renderActions = useActionMenu<FormattedCluster>({
    authKey: 'clusters',
    params: { action: 'global-manage-clusters' },
    autoSingleButton: true,
    dropdownType: 'text',
    dropdownText: t('MANAGE'),
    actions: [
      {
        key: 'pen',
        action: 'global-manage-clusters',
        icon: <Pen />,
        text: t('EDIT_INFORMATION'),
        onClick: item => {
          editBaseInfo({ cluster: item, callback: editSuccessCallback });
        },
      },
      {
        key: 'data',
        action: 'global-manage-clusters',
        icon: <Data />,
        text: t('UPDATE_KUBECONFIG'),
        show: item => !item.isHost && item.connectionType !== 'proxy',
        onClick: item => {
          updateKubeConfig({ cluster: item, callback: editSuccessCallback });
        },
      },
      {
        key: 'trash',
        icon: <Trash />,
        action: 'global-manage-clusters',
        text: t('REMOVE_CLUSTER'),
        show: item => !item.isHost,
        onClick: item => {
          unbindCluster({ cluster: item, callback: unbindCallback });
        },
      },
    ],
  });

  return (
    <>
      <Banner
        className="mb12"
        icon={<Cluster />}
        title={t('BASIC_INFORMATION')}
        description={t('CLUSTER_BASE_INFO_DESC')}
      />
      <Card sectionTitle={t('CLUSTER_INFORMATION')} className="mb12">
        <Horizon>
          <Field
            label={t('CLUSTER')}
            value={getDisplayName(cluster)}
            avatar={<Icon name={clusterIconName} size={40} />}
          />
          {provider && <Field label={t('PROVIDER')} value={provider} />}
          {/* todo use version when kubernetesVersion is undefined and set default value is '-' */}
          <Field label={t('KUBERNETES_VERSION')} value={kubernetesVersion ?? '-'} />
          {renderActions(cluster)}
        </Horizon>
        {hasClusterModule(name, 'whizard-monitoring') && (
          <Content>
            {getResourceOptions().map(({ label, value, icon }) => (
              <Field
                key={label}
                label={label}
                value={value}
                avatar={<Icon name={icon} size={40} />}
              />
            ))}
          </Content>
        )}
      </Card>
    </>
  );
};

export default BaseInfo;
