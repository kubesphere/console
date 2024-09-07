/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import { cloneDeep, isEmpty } from 'lodash';
import { NavMenuItem, checkNavItem, hasPermission } from '@ks-console/shared';

export function getAccessNavs(): NavMenuItem[] {
  const navs: NavMenuItem[] = [];
  const accessNavs = cloneDeep(globals.config.accessNavs);
  const filteredItems = accessNavs.children.filter((item: NavMenuItem) => {
    return checkNavItem(item, params => hasPermission({ ...params }));
  });

  if (!isEmpty(filteredItems)) {
    navs.push({ ...accessNavs, children: filteredItems });
  }

  return navs;
}
