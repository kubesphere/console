import React, { useMemo } from 'react';
import { get } from 'lodash';
import { useQuery } from 'react-query';
import { getLastMonitoringData, monitorStore } from '@ks-console/shared';
import { RadarChart } from '@kubed/charts';
import { Card, Loading } from '@kubed/components';
import ResourceItem from './ResourceItem';
import { Chart, List, Wrapper } from './styles';

interface Props {
  cluster: string;
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
  disk_size_usage: 'cluster_disk_size_usage',
  disk_size_capacity: 'cluster_disk_size_capacity',
  pod_count: 'cluster_pod_running_count',
  pod_capacity: 'cluster_pod_quota',
};

const getValue = (data: any) => get(data, 'value[1]', 0);
const { useMonitorStore, apiVersion } = monitorStore;

function ResourcesUsage({ cluster }: Props) {
  const getApi = () => `${apiVersion({ cluster })}`;
  const { fetchMetrics } = useMonitorStore({ getApiFn: getApi });

  const { data: metrics = {}, isLoading } = useQuery(['clusterMetrics'], async () => {
    return fetchMetrics({
      metrics: Object.values(MetricTypes),
      last: true,
    });
  });

  const resourceOptions: ResourceOption[] = useMemo(() => {
    const data = getLastMonitoringData(metrics);
    return [
      {
        name: t('CPU'),
        unitType: 'cpu',
        used: getValue(data[MetricTypes.cpu_usage]),
        total: getValue(data[MetricTypes.cpu_total]),
      },
      {
        name: t('MEMORY'),
        unitType: 'memory',
        used: getValue(data[MetricTypes.memory_usage]),
        total: getValue(data[MetricTypes.memory_total]),
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
    ];
  }, [metrics]);

  const radarOptions = resourceOptions.map(option => ({
    name: option.name,
    usage: Math.round((option.used * 100) / (option.total || option.used)),
  }));

  return (
    <Card sectionTitle={t('RESOURCE_USAGE')} className="mb12">
      {isLoading ? (
        <Loading />
      ) : (
        <Wrapper>
          <Chart>
            <RadarChart
              cx={180}
              cy={158}
              width={360}
              height={316}
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
          <List>
            {resourceOptions.map(option => (
              <ResourceItem key={option.name} {...option} />
            ))}
          </List>
        </Wrapper>
      )}
    </Card>
  );
}

export default ResourcesUsage;
