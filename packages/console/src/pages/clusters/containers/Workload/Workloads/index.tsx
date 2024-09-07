/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import React from 'react';
import { Banner, Navs } from '@kubed/components';
import { Backup, StatefulSet, DeamonSet, Documentation } from '@kubed/icons';
import { useNavigate, useParams } from 'react-router-dom';

import Embed from './Embed';
import { workloadStore } from '@ks-console/shared';

export default function Workloads({ tab }: { tab: string }) {
  const params: Record<string, any> = useParams();
  const { cluster } = params;
  const { getDocsUrl } = workloadStore(tab);
  const docUrl = getDocsUrl();

  const pageTabs = [
    {
      id: 'deployments',
      label: t('DEPLOYMENTS'),
      content: <Embed tab="deployments" />,
      icon: <Backup />,
    },
    {
      id: 'statefulsets',
      label: t('STATEFULSETS'),
      content: <Embed tab="statefulsets" />,
      icon: <StatefulSet />,
    },
    {
      id: 'daemonsets',
      label: t('DAEMONSETS'),
      content: <Embed tab="daemonsets" />,
      icon: <DeamonSet />,
    },
  ];

  const navs = pageTabs.map(item => ({
    label: item.label,
    value: item.id,
  }));

  const navigate = useNavigate();
  const handleNavChange = (nav: string) => {
    navigate(`/clusters/${cluster}/${nav}`);
  };

  const currentTab = pageTabs.find(item => item.id === tab) || pageTabs[0];

  const description = (
    <div className="banner-desc">
      {t('WORKLOAD_DESC')}
      <Documentation />
      <a href={docUrl} target="_blank">
        {t('LEARN_MORE')}
      </a>
    </div>
  );

  const banner = {
    title: t('WORKLOAD_PL'),
    description: docUrl ? description : t('WORKLOAD_DESC'),
  };

  return (
    <>
      <Banner icon={currentTab.icon} {...banner}>
        <Navs data={navs} value={tab} onChange={handleNavChange} />
      </Banner>
      {currentTab.content}
    </>
  );
}
