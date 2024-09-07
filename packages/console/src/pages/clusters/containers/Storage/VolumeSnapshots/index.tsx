/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import React from 'react';
import { Banner, Navs, BannerTip } from '@kubed/components';
import { Snapshot } from '@kubed/icons';
import { useNavigate, useParams } from 'react-router-dom';

import Embed from './Embed';

export default function VolumeSnapshots({ tab }: { tab: string }) {
  const params: Record<string, any> = useParams();
  const { cluster } = params;

  const pageTabs = [
    {
      id: 'snapshots',
      label: t('VOLUME_SNAPSHOT'),
      icon: <Snapshot />,
      content: <Embed tab="snapshots" />,
    },
    {
      id: 'snapshot-content',
      label: t('VOLUME_SNAPSHOT_CONTENT'),
      icon: <Snapshot />,
      content: <Embed tab="snapshot-content" />,
    },
  ];

  const navs = pageTabs.map(item => ({
    label: item.label,
    value: item.id,
  }));

  const navigate = useNavigate();
  const handleNavChange = (nav: string) => {
    navigate(`/clusters/${cluster}/volume-snapshots/${nav}`);
  };

  const currentTab = pageTabs.find(item => item.id === tab) || pageTabs[0];

  const banner = {
    title: t('VOLUME_SNAPSHOT_PL'),
    description: t('VOLUME_SNAPSHOT_DESC'),
  };

  const tips = [
    {
      title: t('WHAT_IS_VOLUME_SNAPSHOT_CLASS_Q'),
      key: 'WHAT_IS_VOLUME_SNAPSHOT_CLASS_Q',
      children: t('WHAT_IS_VOLUME_SNAPSHOT_CLASS_A'),
    },
    {
      title: t('WHAT_IS_VOLUME_SNAPSHOT_CONTENT_Q'),
      key: 'WHAT_IS_VOLUME_SNAPSHOT_CONTENT_Q',
      children: t('WHAT_IS_VOLUME_SNAPSHOT_CONTENT_A'),
    },
  ];

  return (
    <>
      <Banner icon={<Snapshot />} {...banner}>
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
