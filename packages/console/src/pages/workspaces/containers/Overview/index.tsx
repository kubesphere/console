/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import React from 'react';
import { Banner, BannerTip, Navs } from '@kubed/components';
import { Dashboard } from '@kubed/icons';
import { useNavigate, useParams } from 'react-router-dom';
import { hasClusterModule, isMultiCluster, useClusterStore } from '@ks-console/shared';

import ClusterBaseInfo from './Clusters';
import ResourcesUsage from './ResourceUsage';
import Ranking from './UsageRanking';

export default function Overview() {
  const params: Record<string, any> = useParams();
  const { workspace, tab } = params;
  const { clusters } = useClusterStore();

  const pageTabs = [
    {
      id: 'usage',
      label: t('RESOURCE_USAGE'),
      content: <ResourcesUsage />,
    },
    {
      id: 'clusters',
      label: t('CLUSTER_INFORMATION'),
      content: <ClusterBaseInfo />,
    },
  ];

  const hasWhizardMonitoring = clusters?.some(cluster =>
    hasClusterModule(cluster.name, 'whizard-monitoring'),
  );

  if (hasWhizardMonitoring) {
    pageTabs.splice(1, 0, {
      id: 'ranking',
      label: t('USAGE_RANKING'),
      content: <Ranking />,
    });
  }

  const navs = pageTabs.map(item => ({
    label: item.label,
    value: item.id,
  }));

  const navigate = useNavigate();
  const handleNavChange = (nav: string) => {
    navigate(`/workspaces/${workspace}/overview/${nav}`);
  };

  const renderMainContent = () => {
    const currentTab = pageTabs.find(item => item.id === tab) || pageTabs[0];
    return currentTab.content;
  };

  const tips = isMultiCluster()
    ? [
        {
          key: 'HOW_TO_APPLY_MORE_CLUSTER_Q',
          title: t('HOW_TO_APPLY_MORE_CLUSTER_Q'),
          description: t('HOW_TO_APPLY_MORE_CLUSTER_A'),
        },
      ]
    : [];

  return (
    <>
      <Banner
        icon={<Dashboard />}
        title={t('OVERVIEW')}
        description={t('WORKSPACE_OVERVIEW_DESC')}
        className="mb12"
      >
        <Navs data={navs} value={tab} onChange={handleNavChange} />
        {tips.map((tip: any) => (
          <BannerTip key={tip.key} title={t(tip.title)}>
            {t(tip.description)}
          </BannerTip>
        ))}
      </Banner>
      <div>{renderMainContent()}</div>
    </>
  );
}
