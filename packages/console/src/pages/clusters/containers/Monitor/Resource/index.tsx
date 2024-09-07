/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { Banner, Navs } from '@kubed/components';
import { Linechart } from '@kubed/icons';

import Usage from './Usage';
import UsageRanking from './Ranking';

const Main = styled.div`
  margin-top: 12px;
`;

export default function ClusterMonitor() {
  const params: Record<string, any> = useParams();
  const { cluster, tab } = params;

  const pageTabs = [
    {
      id: 'usage',
      label: t('RESOURCE_USAGE'),
      content: <Usage />,
    },
    {
      id: 'ranking',
      label: t('USAGE_RANKING'),
      content: <UsageRanking />,
    },
  ];

  const navs = pageTabs.map(item => ({
    label: item.label,
    value: item.id,
  }));

  const navigate = useNavigate();
  const handleNavChange = (nav: string) => {
    navigate(`/clusters/${cluster}/monitor-resource/${nav}`);
  };

  const renderMainContent = () => {
    const currentTab = pageTabs.find(item => item.id === tab) || pageTabs[0];
    return currentTab.content;
  };

  return (
    <>
      <Banner
        icon={<Linechart />}
        title={t('APPLICATION_RESOURCE_PL')}
        description={t('MONITORING_APPLICATION_DESC')}
      >
        <Navs data={navs} value={tab} onChange={handleNavChange} />
      </Banner>
      <Main>{renderMainContent()}</Main>
    </>
  );
}
