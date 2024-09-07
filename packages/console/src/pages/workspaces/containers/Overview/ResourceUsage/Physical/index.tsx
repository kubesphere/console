/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import {
  getAreaChartOps,
  getZeroValues,
  hideGPUByLicense,
  MediumArea,
  MonitorController,
  monitorStore,
  PathParams,
  ResourceMonitorModal,
  useWorkspaceSelectedClusterStore,
} from '@ks-console/shared';
import { get, isEmpty } from 'lodash';
import React, { useCallback, useEffect, useState } from 'react';
import { useMutation } from 'react-query';
import { useParams } from 'react-router-dom';
import ClusterSelector from '../../../../components/clusterSelector';
import { Content, Item, Wrapper } from '../styles';

const MetricTypes: Record<string, string> = {
  cpu_usage: 'workspace_cpu_usage',
  memory_usage: 'workspace_memory_usage_wo_cache',
  gpu_usage: 'workspace_gpu_usage',
  gpu_memory_usage: 'workspace_gpu_memory_usage',
  disk_usage: 'workspace_disk_size_usage',
};

const { apiVersion } = monitorStore;
const getApiFn = ({ cluster, workspace }: PathParams) => `${apiVersion({ cluster, workspace })}`;
const { fetchMetrics } = monitorStore.useMonitorStore({ getApiFn });

function Physical() {
  const { workspace } = useParams();
  const { selectedCluster: cluster } = useWorkspaceSelectedClusterStore();
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [selectedItem, setSelectedItem] = useState<any>();
  const [metrics, setMetrics] = useState();

  const { mutate, isLoading } = useMutation<any>(
    (fetchParams: any) => {
      return fetchMetrics({
        cluster,
        workspace,
        metrics: Object.values(hideGPUByLicense(MetricTypes, cluster)),
        ...fetchParams,
      });
    },
    {
      onSuccess: data => {
        setMetrics(data);
      },
    },
  );

  useEffect(() => {
    mutate();
  }, [cluster]);

  const handleOpenModal = useCallback(config => {
    if (workspace) {
      config.workspace = workspace;
    }

    setModalVisible(true);
    setSelectedItem({ ...config });
  }, []);

  const handleHideModal = useCallback(() => {
    setModalVisible(false);
    setSelectedItem({});
  }, []);

  const configs = hideGPUByLicense(
    [
      {
        type: 'cpu',
        title: 'CPU',
        unitType: 'cpu',
        legend: ['USAGE'],
        metricType: MetricTypes.cpu_usage,
      },
      {
        type: 'memory',
        title: 'MEMORY',
        unitType: 'memory',
        legend: ['USAGE'],
        metricType: MetricTypes.memory_usage,
      },
      {
        type: 'gpu',
        title: 'GPU_USAGE',
        unitType: 'gpu',
        legend: ['GPU'],
        metricType: MetricTypes.gpu_usage,
      },
      {
        type: 'gpu_memory',
        title: 'GPU_MEMORY_USAGE',
        unitType: 'memory',
        legend: ['GPU_MEMORY'],
        metricType: MetricTypes.gpu_memory_usage,
      },
    ],
    cluster,
  );

  const isEmptyData = (data: any) => {
    if (isEmpty(data)) return true;

    const result = Object.values(data).every(item => isEmpty(get(item, 'data.result')));
    return result;
  };

  return (
    <>
      <MonitorController
        title={t('PHYSICAL_RESOURCE_PL')}
        step="1h"
        times={24}
        className="mb12"
        onFetch={mutate}
        customAction={<ClusterSelector />}
        loading={isLoading}
        isEmpty={isEmptyData(metrics)}
      >
        <Content>
          {configs.map((item: any) => {
            const itemData = get(metrics, `${item.metricType}.data.result`) || [];
            const config = getAreaChartOps({
              ...item,
              data: isEmpty(itemData) ? [{ values: getZeroValues() }] : itemData,
            });

            return (
              <Wrapper count={2} key={item.type}>
                <Item onClick={() => handleOpenModal(item)}>
                  <MediumArea height={100} {...config} categories={item.legend} theme="light" />
                </Item>
              </Wrapper>
            );
          })}
        </Content>
      </MonitorController>
      <ResourceMonitorModal
        visible={modalVisible}
        detail={selectedItem}
        cluster={cluster}
        workspace={workspace}
        onCancel={handleHideModal}
      />
    </>
  );
}

export default Physical;
