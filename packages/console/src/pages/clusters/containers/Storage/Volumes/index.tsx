/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import React from 'react';
import { Banner, Navs, BannerTip } from '@kubed/components';
import { Storage } from '@kubed/icons';
import { useNavigate, useParams } from 'react-router-dom';

import Embed from './Embed';

export default function Workloads({ tab }: { tab: string }) {
  const params: Record<string, any> = useParams();
  const { cluster } = params;

  const pageTabs = [
    {
      id: 'Volumes/Volumes',
      label: t('PERSISTENT_VOLUME_CLAIM'),
      icon: <Storage />,
      content: <Embed tab="Volumes/Volumes" />,
    },
    {
      id: 'Volumes/PV',
      label: t('PERSISTENT_VOLUME'),
      icon: <Storage />,
      content: <Embed tab="Volumes/PV" />,
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

  const banner = {
    title: t('PERSISTENT_VOLUME_CLAIM_PL'),
    description: t('PERSISTENT_VOLUME_CLAIM_DESC'),
  };

  const tips = [
    {
      title: t('WHAT_IS_STORAGE_CLASS_Q'),
      key: 'WHAT_IS_STORAGE_CLASS_Q',
      children: t('WHAT_IS_STORAGE_CLASS_A'),
    },
    {
      title: t('WHAT_IS_LOCAL_VOLUME_Q'),
      key: 'WHAT_IS_LOCAL_VOLUME_Q',
      children: t('WHAT_IS_LOCAL_VOLUME_A'),
    },
  ];

  return (
    <>
      <Banner icon={<Storage />} {...banner} className="mb12">
        <Navs data={navs} value={tab} onChange={handleNavChange} />
        {tips.map(item => (
          <BannerTip key={item.key || item.title} title={item.title}>
            {item.children}
          </BannerTip>
        ))}
      </Banner>
      {currentTab.content}
    </>
  );
}
