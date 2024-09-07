/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import {
  ClusterTitle,
  FormattedCluster,
  getLastMonitoringData,
  hasClusterModule,
  hideGPUByLicense,
  monitorStore,
} from '@ks-console/shared';
import { RadarChart } from '@kubed/charts';
import { Card, Field, LoadingOverlay, Row } from '@kubed/components';
import { get } from 'lodash';
import React, { useMemo } from 'react';
import { useQuery } from 'react-query';
import ResourceItem from './ResourceItem';
import {
  Chart,
  CornerIcon,
  Info,
  InfoDesc,
  InfoTitle,
  Monitor,
  MonitorItem,
  StyledCol,
  StyledField,
  Wrapper,
} from './styles';

interface Props {
  cluster: FormattedCluster;
}

type ResourceOption = {
  name: string;
  unitType: string;
  used: number;
  total: number;
};

const MetricTypes = {
  cpu_usage: 'cluster_cpu_usage',
  cpu_total: 'cluster_cpu_total',
  memory_usage: 'cluster_memory_usage_wo_cache',
  memory_total: 'cluster_memory_total',
  gpu_usage: 'cluster_gpu_usage',
  gpu_total: 'cluster_gpu_total',
  gpu_memory_usage: 'cluster_gpu_memory_usage',
  gpu_memory_total: 'cluster_gpu_memory_total',
  disk_size_usage: 'cluster_disk_size_usage',
  disk_size_capacity: 'cluster_disk_size_capacity',
  pod_count: 'cluster_pod_running_count',
  pod_capacity: 'cluster_pod_quota',
};

const getValue = (data: any) => get(data, 'value[1]', 0);
const { useMonitorStore, apiVersion } = monitorStore;

function ClusterCard({ cluster }: Props) {
  const getApi = () => `${apiVersion({ cluster: cluster.name })}`;
  const { fetchMetrics } = useMonitorStore({ getApiFn: getApi });

  const { data: metrics = {}, isLoading } = useQuery(
    [cluster],
    async () => {
      return fetchMetrics({
        cluster: cluster.name,
        metrics: Object.values(hideGPUByLicense(MetricTypes, cluster.name)),
        last: true,
      });
    },
    { enabled: hasClusterModule(cluster.name, 'whizard-monitoring') && cluster.isReady },
  );

  const resourceOptions: ResourceOption[] = useMemo(() => {
    const data = getLastMonitoringData(metrics);
    return hideGPUByLicense(
      [
        {
          name: t('CPU'),
          unitType: 'cpu',
          used: getValue(data[MetricTypes.cpu_usage]),
          total: getValue(data[MetricTypes.cpu_total]),
        },
        {
          name: 'GPU',
          unitType: 'gpu',
          used: getValue(data[MetricTypes.gpu_usage]),
          total: getValue(data[MetricTypes.gpu_total]),
        },
        {
          name: t('MEMORY'),
          unitType: 'memory',
          used: getValue(data[MetricTypes.memory_usage]),
          total: getValue(data[MetricTypes.memory_total]),
        },
        {
          name: 'GPU_MEMORY',
          unitType: 'memory',
          used: getValue(data[MetricTypes.gpu_memory_usage]),
          total: getValue(data[MetricTypes.gpu_memory_total]),
        },
        {
          name: t('POD'),
          unitType: '',
          used: getValue(data[MetricTypes.pod_count]),
          total: getValue(data[MetricTypes.pod_capacity]),
        },
        {
          name: t('DISK'),
          unitType: 'disk',
          used: getValue(data[MetricTypes.disk_size_usage]),
          total: getValue(data[MetricTypes.disk_size_capacity]),
        },
      ],
      cluster.name,
    );
  }, [metrics]);

  const options = hideGPUByLicense(resourceOptions, cluster.name);
  const radarOptions = options.map((option: any) => ({
    name: option.name,
    usage: Math.round((option.used * 100) / (option.total || option.used)),
  }));

  return (
    <Card className="mb12">
      <LoadingOverlay visible={isLoading} />
      {hasClusterModule(cluster.name, 'whizard-monitoring') ? (
        <Wrapper>
          <Info>
            <InfoTitle>
              <ClusterTitle width="100%" cluster={cluster} />
            </InfoTitle>
            <InfoDesc>
              <StyledField
                label={t('KUBERNETES_VERSION')}
                value={cluster.kubernetesVersion}
              ></StyledField>
              <StyledField label={t('PROVIDER')} value={cluster.provider || '-'}></StyledField>
            </InfoDesc>
            {cluster.isReady && (
              <Chart>
                <RadarChart
                  cx={200}
                  cy={100}
                  width={400}
                  height={200}
                  data={radarOptions}
                  gridType="circle"
                  dataKey="name"
                  categories={['usage']}
                  minValue={0}
                  maxValue={100}
                  colors={[
                    {
                      stroke: '#345681',
                      fill: '#1c2d4267',
                    },
                  ]}
                />
              </Chart>
            )}
            <CornerIcon size={200} />
          </Info>
          {cluster.isReady && (
            <Monitor>
              {resourceOptions.map(option => (
                <MonitorItem key={option.name}>
                  <ResourceItem {...option} />
                </MonitorItem>
              ))}
            </Monitor>
          )}
        </Wrapper>
      ) : (
        <Row>
          <StyledCol span={6}>
            <ClusterTitle width="100%" cluster={cluster} />
          </StyledCol>
          <StyledCol span={3}>
            <Field label={t('KUBERNETES_VERSION')} value={cluster.kubernetesVersion}></Field>
          </StyledCol>
          <StyledCol span={3}>
            <Field label={t('PROVIDER')} value={cluster.provider || '-'}></Field>
          </StyledCol>
        </Row>
      )}
    </Card>
  );
}

export default ClusterCard;
