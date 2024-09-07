/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import classNames from 'classnames';
import {
  componentMonitoringStore,
  hasClusterModule,
  hasPermission,
  Icon,
} from '@ks-console/shared';
import { get } from 'lodash';
import { useCacheStore as useStore } from '@ks-console/shared';
import { Col, LoadingOverlay } from '@kubed/components';
import {
  CardWrapper,
  Title,
  List,
  ServiceItem,
  CoreItem,
  CoreItemIcon,
  Content,
  StyleRow,
  NodeStatus,
} from './styles';
import ClusterResourceStatusTab from '../../../../components/Cards/Monitoring/ClusterResource';
import ETCDStatusTab from '../../../../components/Cards/Monitoring/ETCD';
import ServiceComponentStatusTab from '../../../../components/Cards/Monitoring/ServiceComponent';

const { fetchHealthMetrics } = componentMonitoringStore;

const getComponentStatus = (component: any) => {
  const conditions = component.conditions || [];

  return conditions.some((item: any) => item.status !== 'Ture' && item.type !== 'Healthy')
    ? 'unhealthy'
    : 'healthy';
};

const getCoreComponentStatus = (componentHealth: any, supportETCD?: boolean) => {
  const { data = {} } = componentHealth;
  const { kubernetes = [], node = {} } = data;
  const status: any = {};

  kubernetes.forEach((item: any) => {
    status[get(item, 'metadata.name')] = getComponentStatus(item);
  });

  status.node = node.healthyNodes === node.totalNodes ? 'healthy' : 'unhealthy';

  status['controller-manager'] = componentHealth.supportControllerManager ? 'healthy' : 'unhealthy';
  status.scheduler = componentHealth.supportKsScheduler ? 'healthy' : 'unhealthy';
  status['etcd-0'] = supportETCD ? 'healthy' : 'unhealthy';

  return status;
};

export default function Overview() {
  const params: Record<string, any> = useParams();
  const [supportETCD] = useStore<boolean>('supportETCD');
  const { cluster } = params;
  const navigate = useNavigate();

  const { data: componentHealth = {}, isLoading } = useQuery<any>(
    ['healthMetrics'],
    async () => {
      const result = await fetchHealthMetrics({ cluster });
      return result;
    },
    {
      enabled: hasClusterModule(cluster, 'whizard-monitoring'),
      refetchInterval: 2000,
    },
  );

  const handleNodeClick = () => {
    if (
      hasPermission({
        module: 'nodes',
        action: 'view',
        cluster,
      })
    ) {
      navigate(`/clusters/${cluster}/nodes`);
    }
  };

  const handleComponentsClick = (type: string) => {
    if (type === 'kubeSystem') {
      type = 'kubernetes';
    }
    if (
      hasPermission({
        module: 'monitoring',
        action: 'view',
        cluster,
      })
    ) {
      navigate(`/clusters/${cluster}/components?type=${type}`);
    }
  };

  const renderNodeStatus = () => {
    const { counts } = componentHealth || {};
    const { health = 0, total = 0 } = counts?.node || {};

    return (
      <CardWrapper hoverable padding={20}>
        <Title>
          <span>{t('CLUSTER_NODE_STATUS')}</span>
        </Title>
        <Content>
          <LoadingOverlay visible={isLoading}></LoadingOverlay>
          <NodeStatus
            themeName="light"
            name={t('NODE_ONLINE_STATUS')}
            legend={['ONLINE_NODES', 'ALL_NODES']}
            used={health}
            total={total}
            onClick={handleNodeClick}
          />
        </Content>
      </CardWrapper>
    );
  };

  const renderServiceComponents = () => {
    const { componentCounts: counts } = componentHealth;
    const components = [
      {
        type: 'kubesphere',
        icon: '/assets/kubesphere.svg',
      },
      {
        type: 'kubeSystem',
        icon: '/assets/kubernetes.svg',
      },
    ];
    return (
      <List>
        {components.map(item => {
          return (
            <ServiceItem key={item.type} onClick={() => handleComponentsClick(item.type)}>
              <img src={item.icon} />
              <p>
                {get(counts, `[${item.type}].health`, 0)}
                <span>/{get(counts, `[${item.type}].total`, 0)}</span>
              </p>
            </ServiceItem>
          );
        })}
      </List>
    );
  };

  const renderCoreComponents = () => {
    const statuses = getCoreComponentStatus(componentHealth, supportETCD);
    const components = [
      {
        type: 'etcd-0',
        name: 'etcd',
      },
      {
        type: 'controller-manager',
        name: t('CONTROLLER_MANAGER'),
      },
      {
        type: 'scheduler',
        name: t('KUBERNETES_SCHEDULER'),
      },
    ];

    return (
      <List>
        {components.map(item => {
          const status = statuses[item.type];

          return (
            <CoreItem key={item.type}>
              <CoreItemIcon className={classNames(status)}>
                <Icon
                  name={status === 'healthy' || status === 'ready' ? 'check' : 'substract'}
                  variant="light"
                  size={16}
                ></Icon>
              </CoreItemIcon>
              <p title={item.name}>{item.name}</p>
            </CoreItem>
          );
        })}
      </List>
    );
  };

  const renderComponentStatus = () => {
    return (
      <CardWrapper hoverable padding={20}>
        <Title>
          <span>{t('COMPONENT_STATUS')}</span>
        </Title>
        <Content>
          <LoadingOverlay visible={isLoading}></LoadingOverlay>
          {renderServiceComponents()}
          {renderCoreComponents()}
        </Content>
      </CardWrapper>
    );
  };

  return (
    <>
      <StyleRow gutter={[24, 24]}>
        <Col span={12}>{renderNodeStatus()}</Col>
        {null && <Col span={7}>{renderComponentStatus()}</Col>}
      </StyleRow>
      <StyleRow gutter={[24, 24]}>
        <Col span={12}>
          <ClusterResourceStatusTab cluster={cluster} />
          {supportETCD && <ETCDStatusTab cluster={cluster} />}
          <ServiceComponentStatusTab cluster={cluster} />
        </Col>
      </StyleRow>
    </>
  );
}
