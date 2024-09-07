/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import React from 'react';
import { Banner, BannerTip } from '@kubed/components';
import { Cdn } from '@kubed/icons';

import { WorkspaceInfo } from './WorkspaceInfo';
import { NetworkIsolation } from './NetworkIsolation';

export default function BaseInfo() {
  const tips = [
    {
      key: 'WORKSPACE_BASE_INFO',
      title: t('WORKSPACE_BASE_INFO_Q1'),
      description: t('WORKSPACE_BASE_INFO_A1'),
    },
  ];

  return (
    <>
      <Banner
        icon={<Cdn />}
        title={t('BASIC_INFORMATION')}
        description={t('WORKSPACE_BASIC_INFO_DESC')}
        className="mb12"
      >
        {tips.map((tip: any) => (
          <BannerTip key={tip.key} title={t(tip.title)}>
            {t(tip.description)}
          </BannerTip>
        ))}
      </Banner>
      <WorkspaceInfo />
      <NetworkIsolation />
    </>
  );
}
