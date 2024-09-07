/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import React, { useEffect } from 'react';
import { Banner, Navs } from '@kubed/components';
import { Linechart } from '@kubed/icons';
import { useNavigate, useParams } from 'react-router-dom';
import { hasExtensionModuleAnnotation, useCacheStore as useStore } from '@ks-console/shared';
import { hasClusterModule } from '@ks-console/shared';

import Overview from './Overview';
import PhysicalResource from './Monitor/PhysicalResource';
import APIServer from './Monitor/APIServer';
import Scheduler from './Monitor/Scheduler';
import Etcd from './Monitor/Etcd';
import NodeRanking from './Ranking';

export default function ClusterMonitor() {
  const params: Record<string, any> = useParams();
  const { cluster, tab } = params;
  const [supportETCD, setSupportETCD] = useStore<boolean>('supportETCD');

  useEffect(() => {
    const checkEtcd = hasExtensionModuleAnnotation(
      'whizard-monitoring',
      'monitoring.kubesphere.io/enable-etcd-monitoring',
    );
    setSupportETCD(hasClusterModule(cluster, 'whizard-monitoring') && checkEtcd);
  }, []);

  const pageTabs = [
    {
      id: 'overview',
      label: t('OVERVIEW'),
      content: <Overview />,
    },
    {
      id: 'resource',
      label: t('PHYSICAL_RESOURCES_MONITORING'),
      content: <PhysicalResource />,
    },
    {
      id: 'etcd',
      label: t('ETCD_MONITORING'),
      content: <Etcd />,
      requireETCD: true,
    },
    {
      id: 'api-server',
      label: t('API_SERVER_MONITORING'),
      content: <APIServer />,
    },
    {
      id: 'scheduler',
      label: t('SCHEDULER_MONITORING'),
      content: <Scheduler />,
    },
    {
      id: 'ranking',
      label: t('RESOURCE_USAGE_RANKING'),
      content: <NodeRanking />,
    },
  ];

  const navs = pageTabs
    .filter(item => !item.requireETCD || supportETCD)
    .map(item => ({
      label: item.label,
      value: item.id,
    }));

  const navigate = useNavigate();
  const handleNavChange = (nav: string) => {
    navigate(`/clusters/${cluster}/monitor-cluster/${nav}`);
  };

  const renderMainContent = () => {
    const currentTab = pageTabs.find(item => item.id === tab) || pageTabs[0];
    return currentTab.content;
  };

  return (
    <>
      <Banner
        icon={<Linechart />}
        title={t('CLUSTER_STATUS')}
        description={t('MONITORING_CLUSTER_DESC')}
      >
        <Navs data={navs} value={tab} onChange={handleNavChange} />
      </Banner>
      {renderMainContent()}
    </>
  );
}
