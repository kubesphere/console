import React from 'react';
import { useParams } from 'react-router-dom';
import { Icon, monitorStore } from '@ks-console/shared';
import { Card, Field, LoadingOverlay } from '@kubed/components';
import { Area, AreaWrapper } from '../styles';
import { get } from 'lodash';

const MetricTypes = {
  namespace_count: 'cluster_namespace_count',
  deployment_count: 'cluster_deployment_count',
  statefulset_count: 'cluster_statefulset_count',
  daemonset_count: 'cluster_daemonset_count',
  job_count: 'cluster_job_count',
  cronjob_count: 'cluster_cronjob_count',
  cluster_persistentvolumeclaim_count: 'cluster_persistentvolumeclaim_count',
  service_count: 'cluster_service_count',
  route_count: 'cluster_ingress_count',
  clusters_pod_count: 'cluster_pod_count',
  role_count: 'cluster_clusterrole_count',
  member_count: 'cluster_clusterrolebinding_count',
};

const { useFetchStatisticsQuery } = monitorStore;

function Resources() {
  const { cluster } = useParams();

  const { formattedStatistics: metrics, isLoading } = useFetchStatisticsQuery({ cluster });

  const configs = [
    {
      title: 'PROJECT',
      metricType: MetricTypes.namespace_count,
      icon: 'Project',
    },
    {
      title: 'POD',
      metricType: MetricTypes.clusters_pod_count,
      icon: 'Pod',
    },
    {
      title: 'DEPLOYMENT',
      metricType: MetricTypes.deployment_count,
      icon: 'Backup',
    },
    {
      title: 'STATEFULSET',
      metricType: MetricTypes.statefulset_count,
      icon: 'StatefulSet',
    },
    {
      title: 'DAEMONSET',
      metricType: MetricTypes.daemonset_count,
      icon: 'DeamonSet',
    },
    {
      title: 'JOB',
      metricType: MetricTypes.job_count,
      icon: 'Job',
    },
    {
      title: 'CRONJOB',
      metricType: MetricTypes.cronjob_count,
      icon: 'CronJob',
    },
    {
      title: 'PERSISTENT_VOLUME_CLAIM',
      metricType: MetricTypes.cluster_persistentvolumeclaim_count,
      icon: 'Storage',
    },
    {
      title: 'SERVICE',
      metricType: MetricTypes.service_count,
      icon: 'Appcenter',
    },
    {
      title: 'ROUTE',
      metricType: MetricTypes.route_count,
      icon: 'Loadbalancer',
    },
    {
      title: 'MEMBER',
      metricType: MetricTypes.member_count,
      icon: 'Human',
    },
    {
      title: 'ROLE',
      metricType: MetricTypes.role_count,
      icon: 'Role',
    },
  ];

  return (
    <Card hoverable padding={12} className="mb12">
      <LoadingOverlay visible={isLoading} />
      <AreaWrapper>
        {configs.map(i => {
          const value = get(metrics, `${i.metricType}.data.result[0].value[1]`, '0');

          return (
            <Area key={i.title}>
              <Field
                value={value}
                label={t(i.title)}
                avatar={<Icon name={i.icon || 'Cluster'} size={40} />}
              />
            </Area>
          );
        })}
      </AreaWrapper>
    </Card>
  );
}

export default Resources;
