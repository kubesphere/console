/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import { cloneDeep, get, isEmpty } from 'lodash';
import {
  hasKSModule,
  NavMenuItem,
  checkNavItem,
  hasPermission,
  checkClusterVersionRequired,
} from '@ks-console/shared';

type GetProjectNavsParams = {
  cluster: string;
  workspace: string;
  namespace: string;
};

export function getProjectNavs({
  cluster,
  workspace,
  namespace,
}: Partial<GetProjectNavsParams>): NavMenuItem[] {
  if (!get(globals.user, `projectRules[${cluster}][${namespace}]`)) {
    return [];
  }

  const navs: NavMenuItem[] = [];
  const projectNavs = cloneDeep(globals.config.projectNavs);
  const filteredItems = projectNavs.children.filter((item: NavMenuItem) => {
    return checkNavItem({ ...item, cluster }, params =>
      hasPermission({ ...params, cluster, workspace, project: namespace }),
    );
  });

  if (!isEmpty(filteredItems)) {
    checkClusterVersionRequired(filteredItems, cluster || '');
    navs.push({ ...projectNavs, items: filteredItems });
  }

  return navs;
}

export function getDefaultApplicationType(): string {
  return hasKSModule('openpitrix') ? 'template' : '';
}
