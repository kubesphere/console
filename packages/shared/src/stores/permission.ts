/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import type { NavMenuItem } from '../components/Layouts/NavMenu';
import {
  hasKSModule,
  isPlatformAdmin as isPlatformAdminFn,
  isMultiCluster as isMultiClusterFn,
  parser,
  nav as navFn,
} from '../utils';

const { safeParseJSON } = parser;
const { hasPermission, checkNavItem, checkClusterVersionRequired } = navFn;
import { get, cloneDeep, isEmpty } from 'lodash';

const PermissionStore = () => {
  const isMultiCluster: boolean = isMultiClusterFn();
  const isPlatformAdmin: boolean = isPlatformAdminFn();

  const getGlobalNavs = () => {
    const navs: NavMenuItem[] = [];
    const globalNavs = cloneDeep(globals.config.globalNavs);

    globalNavs?.children?.forEach((nav: any) => {
      if (checkNavItem(nav, params => hasPermission(params))) {
        navs.push(nav);
      }
    });

    return navs;
  };

  const enableGlobalNav = (() => {
    const navs = getGlobalNavs();
    return navs.length > 0;
  })();

  const getClusterNavs = (cluster?: string) => {
    if (!get(globals.user, `clusterRules[${cluster}]`)) {
      return [];
    }

    const navs: NavMenuItem[] = [];
    const clusterNavs = cloneDeep(globals.config.clusterNavs);

    const filteredItems = clusterNavs.children.filter((item: any) => {
      item.cluster = cluster;
      return checkNavItem(item, params => hasPermission({ ...params, cluster }));
    });

    if (!isEmpty(filteredItems)) {
      checkClusterVersionRequired(filteredItems, cluster);
      navs.push({ ...clusterNavs, children: filteredItems });
    }

    return navs;
  };

  const getProjectNavs = ({
    cluster,
    workspace,
    project,
  }: {
    cluster?: string;
    workspace?: string;
    project?: string;
  }) => {
    if (!get(globals.user, `projectRules[${cluster}][${project}]`)) {
      return [];
    }

    const navs: NavMenuItem[] = [];
    const projectNavs = cloneDeep(globals.config.projectNavs);

    const filteredItems = projectNavs.children.filter((item: any) => {
      item.cluster = cluster;
      return checkNavItem(item, params =>
        hasPermission({ ...params, cluster, workspace, project }),
      );
    });

    if (!isEmpty(filteredItems)) {
      checkClusterVersionRequired(filteredItems, cluster);
      navs.push({ ...projectNavs, children: filteredItems });
    }

    return navs;
  };

  const getfederatedProjectNavs = () => {
    const navs: NavMenuItem[] = [];
    const projectNavs = cloneDeep(globals.config.federatedProjectNavs);

    const filteredItems = projectNavs.children.filter((item: any) => {
      return checkNavItem(item, () => true);
    });

    if (!isEmpty(filteredItems)) {
      navs.push({ ...projectNavs, children: filteredItems });
    }

    return navs;
  };

  const getWorkspaceNavs = (workspace: string, clusters: Array<string>): NavMenuItem[] => {
    if (!get(globals.user, `workspaceRules[${workspace}]`)) {
      return [];
    }

    const navs: NavMenuItem[] = [];
    const workspaceNavs = cloneDeep(globals.config.workspaceNavs);

    const filteredItems = workspaceNavs.children.filter((item: NavMenuItem) => {
      item.clusters = clusters;
      return checkNavItem(item, params => hasPermission({ ...params, workspace }));
    });

    if (!isEmpty(filteredItems)) {
      navs.push({ ...workspaceNavs, children: filteredItems });
    }

    return navs;
  };

  const getPlatformSettingsNavs = () => {
    if (!get(globals.user, 'globalRules.platform-settings')) {
      return [];
    }

    const navs: NavMenuItem[] = [];
    const platformSettingsNavs = cloneDeep(globals.config.platformSettingsNavs);

    const filteredItems = platformSettingsNavs.children.filter((item: any) => {
      return checkNavItem(item, params => hasPermission(params));
    });

    if (!isEmpty(filteredItems)) {
      navs.push({ ...platformSettingsNavs, children: filteredItems });
    }

    return navs;
  };

  const cacheHistory = (url: string, obj: Record<string, any>) => {
    let histories = safeParseJSON(localStorage.getItem('history-cache') || '', {});
    let historiesArr = histories[globals.user.username] || ([] as Record<string, any>[]);
    historiesArr = historiesArr.filter((item: Record<string, any>) => item.url !== url);

    localStorage.setItem(
      'history-cache',
      JSON.stringify({
        [globals.user.username]: [{ url, ...obj }, ...historiesArr].slice(0, 8),
      }),
    );
  };

  return {
    ...navFn,
    isMultiCluster,
    isPlatformAdmin,
    enableGlobalNav,
    hasKSModule,
    getClusterNavs,
    getProjectNavs,
    getfederatedProjectNavs,
    getWorkspaceNavs,
    cacheHistory,
    getGlobalNavs,
    getPlatformSettingsNavs,
  };
};

export default PermissionStore;
