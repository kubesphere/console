/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import {
  getAreaChartOps,
  getZeroValues,
  MediumArea,
  MonitorController,
  monitorStore,
  ResourceMonitorModal,
} from '@ks-console/shared';
import { get, isEmpty } from 'lodash';
import React, { useCallback, useState } from 'react';
import { useMutation } from 'react-query';
import { useParams } from 'react-router-dom';
import { Item, WrapContent, Wrapper } from '../styles';

const MetricTypes = {
  deployment_count: 'cluster_deployment_count',
  statefulset_count: 'cluster_statefulset_count',
  daemonset_count: 'cluster_daemonset_count',
  job_count: 'cluster_job_count',
  cronjob_count: 'cluster_cronjob_count',
  pvc_count: 'cluster_pvc_count',
  service_count: 'cluster_service_count',
  route_count: 'cluster_ingresses_count',
  pod_running_count: 'cluster_pod_running_count',
};

function VirtualResource({ workspace }: { workspace?: string }) {
  const { cluster } = useParams();
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [selectedItem, setSelectedItem] = useState<any>();
  const [metrics, setMetrics] = useState();

  const { fetchMetrics } = monitorStore.useMonitorStore();

  const { mutate, isLoading } = useMutation<any>(
    (fetchParams: any) => {
      return fetchMetrics({
        cluster,
        metrics: Object.values(MetricTypes),
        originData: metrics,
        ...fetchParams,
      });
    },
    {
      onSuccess: data => {
        setMetrics(data);
      },
    },
  );

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

  const configs = [
    {
      type: 'deployment',
      title: 'DEPLOYMENT',
      legend: ['DEPLOYMENT_PL'],
      metricType: MetricTypes.deployment_count,
    },
    {
      type: 'statefulset',
      title: 'STATEFULSET',
      legend: ['STATEFULSET_PL'],
      metricType: MetricTypes.statefulset_count,
    },
    {
      type: 'daemonset',
      title: 'DAEMONSET',
      legend: ['DAEMONSET_PL'],
      metricType: MetricTypes.daemonset_count,
    },
    {
      type: 'job',
      title: 'JOB',
      legend: ['JOB_PL'],
      metricType: MetricTypes.job_count,
    },
    {
      type: 'cronjob',
      title: 'CRONJOB',
      legend: ['CRONJOB_PL'],
      metricType: MetricTypes.cronjob_count,
    },
    {
      type: 'pvc',
      title: 'PERSISTENT_VOLUME_CLAIM',
      legend: ['PERSISTENT_VOLUME_CLAIM_PL'],
      metricType: MetricTypes.pvc_count,
    },
    {
      type: 'service',
      title: 'SERVICE',
      legend: ['SERVICE_PL'],
      metricType: MetricTypes.service_count,
    },
    {
      type: 'routes',
      title: 'ROUTE',
      legend: ['ROUTE_PL'],
      metricType: MetricTypes.route_count,
    },
    {
      type: 'pod',
      title: 'POD',
      legend: ['RUNNING_PODS'],
      metricType: MetricTypes.pod_running_count,
    },
  ];

  const isEmptyData = (data: any) => {
    if (isEmpty(data)) return true;

    const result = Object.values(data).every(item => isEmpty(get(item, 'data.result')));
    return result;
  };

  return (
    <>
      <MonitorController
        title={t('APPLICATION_RESOURCE_USAGE')}
        step="1h"
        times={24}
        className="mb12"
        onFetch={mutate}
        loading={isLoading}
        isEmpty={isEmptyData(metrics)}
      >
        <WrapContent>
          {configs.map(item => {
            const itemData = get(metrics, `${item.metricType}.data.result`) || [];
            const config = getAreaChartOps({
              ...item,
              data: isEmpty(itemData) ? [{ values: getZeroValues() }] : itemData,
            });

            return (
              <Wrapper key={item.type}>
                <Item onClick={() => handleOpenModal(item)}>
                  <MediumArea height={100} {...config} categories={item.legend} theme="light" />
                </Item>
              </Wrapper>
            );
          })}
        </WrapContent>
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

export default VirtualResource;
