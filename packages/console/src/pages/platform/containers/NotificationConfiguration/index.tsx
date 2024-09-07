/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import React from 'react';
import { isEmpty } from 'lodash';
import { Loudspeaker } from '@kubed/icons';
import { useNavigate, useParams } from 'react-router-dom';
import { Banner, Navs } from '@kubed/components';

import { NavMenuItemTab } from '@ks-console/shared';
import Embed from './embed';
import type { LabelValue } from '../../types';
import { getNotificationConfigurationTabs } from '../../utils/navs';

import { ConfigFormWrapper } from './styles';

function NotificationConfiguration(): JSX.Element {
  const navigate = useNavigate();
  const { tab = 'mail' } = useParams();
  const tabs: NavMenuItemTab[] = getNotificationConfigurationTabs();
  const navs: LabelValue[] = tabs.map((item: NavMenuItemTab) => ({
    label: t(item.title || ''),
    value: item.name,
  }));

  function handleNavsChange(navKey: string): void {
    navigate(`/settings/channel-configuration/${navKey}`);
  }

  return (
    <ConfigFormWrapper>
      <div className="mb12">
        <Banner
          icon={<Loudspeaker />}
          title={t('NOTIFICATION_CONFIGURATION')}
          description={t('NOTIFICATION_CONFIGURATION_DESC')}
        />
        {!isEmpty(navs) && (
          <Navs className="mt12" value={tab} onChange={handleNavsChange} data={navs} />
        )}
      </div>
      <Embed tab={tab} />
    </ConfigFormWrapper>
  );
}

export default NotificationConfiguration;
