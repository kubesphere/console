/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import { get } from 'lodash';

import { NavMenuItem, permissionStore } from '@ks-console/shared';
const { getPlatformSettingsNavs } = permissionStore();

export function getNotificationManagementNav(): NavMenuItem | undefined {
  const platformSettingsNavs = getPlatformSettingsNavs().pop();
  const notificationManagementNavs: NavMenuItem | undefined = platformSettingsNavs?.children?.find(
    ({ name }: NavMenuItem) => {
      return name === 'notification-management';
    },
  );
  return notificationManagementNavs;
}

export function getNotificationConfigurationTabs(): NavMenuItem[] {
  const notificationManagementNav = getNotificationManagementNav();
  const tabs: NavMenuItem[] = get(notificationManagementNav ?? {}, 'children[0].tabs', []);

  return tabs;
}

export function getSubscriptionConfigurationTabs(): NavMenuItem[] {
  const subscriptionNav = getNotificationManagementNav();
  const tabs: NavMenuItem[] = get(subscriptionNav ?? {}, 'children[1].tabs', []);
  return tabs;
}
