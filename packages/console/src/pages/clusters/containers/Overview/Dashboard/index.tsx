/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import React from 'react';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import { useCacheStore as useStore } from '@ks-console/shared';
import {
  ClusterDetail,
  clusterStore,
  ClusterTitle,
  hasClusterModule,
  isMultiCluster,
  isPlatformAdmin,
} from '@ks-console/shared';
import { Card, Col, Row } from '@kubed/components';
import Tools from './Tools';
import ClusterInfo from './ClusterInfo';
// import ServiceComponents from './ServiceComponents';
import ResourcesUsage from './ResourcesUsage';
import KubernetesStatus from './KubernetesStatus';
import ClusterNodes from './ClusterNodes';
import { DarkWrapper, Text } from './styles';
import Resources from './Resources';

const { fetchVersion } = clusterStore;

function Dashboard() {
  const [detail] = useStore<ClusterDetail>('cluster');
  const { cluster } = useParams();

  const { data } = useQuery(['clusterVersion', detail], async () => {
    const res = await fetchVersion({ cluster: detail.name });
    return res;
  });

  if (!hasClusterModule(detail.name, 'whizard-monitoring')) {
    return (
      <>
        <Text fontSize={24}>{t('OVERVIEW')}</Text>
        <Row>
          <Col span={8}>
            <Resources />
            {isPlatformAdmin() && <Tools cluster={cluster!} insideTitle />}
          </Col>
          <Col style={{ overflow: 'hidden' }} span={4}>
            <Card hoverable padding={12}>
              <DarkWrapper>
                <ClusterTitle
                  titleStyle={{ flex: 'none' }}
                  width="100%"
                  cluster={detail}
                  size="large"
                  noStatus
                  theme="light"
                />
              </DarkWrapper>
              <ClusterInfo cluster={detail} />
            </Card>
          </Col>
        </Row>
      </>
    );
  }

  return (
    <>
      <ClusterTitle
        width="100%"
        className="mb12"
        titleStyle={{ flex: 'none' }}
        cluster={detail}
        size="large"
        noStatus
      />
      <Row>
        <Col span={8}>
          {isMultiCluster() && <ClusterInfo cluster={detail} version={data} />}
          {/* <ServiceComponents cluster={cluster!} /> */}
          <ResourcesUsage cluster={cluster!} />
          {isPlatformAdmin() && <Tools cluster={cluster!} />}
        </Col>
        <Col span={4}>
          <KubernetesStatus cluster={cluster!} />
          <ClusterNodes cluster={cluster!} />
        </Col>
      </Row>
    </>
  );
}

export default Dashboard;
