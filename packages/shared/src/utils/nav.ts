/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import { get, isEmpty, includes, isString, uniq } from 'lodash';
import {
  isMultiCluster,
  isPlatformAdmin,
  compareVersion,
  hasKSModule,
  hasClusterExtensionModule,
  hasExtensionModuleAnnotation,
  hasExtensionModuleAnnotationCluster,
} from './checker';
import { getLicenseErrorInfoFromLicenses } from '../utils/licenses';

export const hasClusterModule = (cluster: string, module: string) => {
  return get(
    globals,
    `ksConfig.enabledExtensionModulesStatus.${module}.clusterSchedulingStatuses.${cluster}`,
    false,
  );
};
export const checkNavItem = (item: any, callback: (params: any) => any) => {
  if (item.skipAuth) {
    return true;
  }

  if (item.admin && !isPlatformAdmin()) {
    return false;
  }

  if (item.multiCluster && !isMultiCluster()) {
    return false;
  }

  if (item.ksModule && !hasKSModule(item.ksModule)) {
    return false;
  }

  if (
    item.ksModule &&
    item.annotation &&
    !hasExtensionModuleAnnotation(item.ksModule, item.annotation)
  ) {
    return false;
  }

  if (item.ksModulesSome) {
    const ksModulesSome = item.ksModulesSome.split('|');
    if (!ksModulesSome.some((cm: string) => hasClusterModule(item.cluster, cm))) {
      if (item.ksModuleAnnotation) {
        const [ksModule, annotation] = item.ksModuleAnnotation.split('|');
        if (
          hasClusterModule(item.cluster, ksModule) &&
          !hasExtensionModuleAnnotation(ksModule, annotation)
        ) {
          return false;
        } else {
          const { isLicenseError, licenseAuthorizationStatus } = getLicenseErrorInfoFromLicenses({
            extensionName: ksModule,
          });
          item.isLicenseError = isLicenseError;
          item.licenseAuthorizationStatus = licenseAuthorizationStatus;
        }
      }
    } else {
      let licenseInfo: any = [];
      let isExitVal = false;
      ksModulesSome.forEach((cm: string) => {
        if (hasClusterModule(item.cluster, cm)) {
          const { isLicenseError, licenseAuthorizationStatus } = getLicenseErrorInfoFromLicenses({
            extensionName: cm,
          });
          if (!isLicenseError) {
            isExitVal = true;
          } else {
            licenseInfo.push({ isLicenseError, licenseAuthorizationStatus });
          }
        }
      });

      if (!isExitVal) {
        item.isLicenseError = licenseInfo[0].isLicenseError;
        item.licenseAuthorizationStatus = licenseInfo[0].licenseAuthorizationStatus;
      }
    }
  }

  if (item.ksModuleAnnotationClusters) {
    const [ksModule, annotation] = item.ksModuleAnnotationClusters.split('|');
    if (!hasExtensionModuleAnnotationCluster(ksModule, annotation, item.cluster)) {
      return false;
    }
    const { isLicenseError, licenseAuthorizationStatus } = getLicenseErrorInfoFromLicenses({
      extensionName: ksModule,
    });
    item.isLicenseError = isLicenseError;
    item.licenseAuthorizationStatus = licenseAuthorizationStatus;
  }

  if (
    item.clusterModulesSome &&
    !item.clusterModulesSome.split('|').some((cm: string) => hasClusterModule(item.cluster, cm))
  ) {
    return false;
  }

  if (
    item.clusterModule &&
    item.clusterModule
      .split('|')
      .every((cm: string) => !hasClusterExtensionModule(item.cluster, cm))
  ) {
    return false;
  }

  if (!item._children) {
    item._children = item.children;
  }

  if (item._children) {
    item.children = item._children.filter((child: any) => {
      const { cluster, clusters } = item;
      if (child.tabs) {
        return child.tabs.some((_child: any) => {
          _child.cluster = cluster;
          if (clusters) {
            _child.clusters = clusters;
          }
          return checkNavItem(_child, callback);
        });
      }
      if (clusters) {
        child.clusters = clusters;
      }
      child.cluster = cluster;
      return checkNavItem(child, callback);
    });

    delete item._children;

    return item.children.length > 0;
  }

  if (item.authKey && item.authKey.indexOf('|') !== -1) {
    return item.authKey.split('|').some((module: any) => callback({ module, action: 'view' }));
  }

  if (
    item.workspaceModule &&
    item.clusters &&
    !item.clusters.some((cluster: string) => hasClusterModule(cluster, item.workspaceModule))
  ) {
    return false;
  }

  return callback({
    module: item.authKey || item.name,
    action: item.authAction || 'view',
  });
};

export interface GetActionParams {
  project?: string;
  cluster?: string;
  module?: string;
  devops?: string;
  workspace?: string;
}

export interface ActionsArray<T> extends Array<T> {
  includes: (item: T) => boolean;
}

export function getActions({
  project,
  cluster,
  module,
  devops,
  workspace,
}: GetActionParams): ActionsArray<string> {
  let actions: ActionsArray<string> = [] as unknown as ActionsArray<string>;

  if (globals.config.disableAuthorization) {
    actions.push('*');
  }

  const adapter = (arr: string[]) => {
    if (includes(actions, '*')) {
      actions.push(...['view', 'edit', 'create', 'delete']);
    }

    arr.forEach(item => {
      if (!isString(item)) {
        Object.keys(item).forEach(key => {
          actions.push(key);
          actions.push(item[key]);
        });
      } else {
        actions.push(item);
      }
    });

    if (includes(actions, 'manage') && !includes(actions, '*')) {
      actions.push(...['view', 'edit', 'create', 'delete']);
    }

    actions = uniq(actions);

    actions.includes = function (param): boolean {
      if (includes(this, '*') || includes(this, 'manage')) {
        return true;
      }

      return includes(this, param);
    };

    return actions;
  };

  const globalUser = globals.user;

  if (project) {
    const defaultActions = get(
      globalUser,
      `projectRules[${cluster}][${project}]._`,
      getActions({ cluster, module }),
    );
    return adapter([
      ...get(globalUser, `projectRules[${cluster}][${project}][${module}]`, []),
      ...defaultActions,
    ]);
  }

  if (devops) {
    const defaultActions = get(globalUser, `devopsRules[${cluster}][${devops}]._`, []);
    return adapter([
      ...get(globalUser, `devopsRules[${cluster}][${devops}][${module}]`, []),
      ...defaultActions,
    ]);
  }

  if (workspace) {
    const defaultActions = get(globalUser, `workspaceRules[${workspace}]._`, []);
    return adapter([
      ...get(globalUser, `workspaceRules[${workspace}][${module}]`, []),
      ...defaultActions,
    ]);
  }

  if (cluster) {
    const defaultActions = get(globalUser, `clusterRules[${cluster}]._`, []);
    return adapter([
      ...get(globalUser, `clusterRules[${cluster}][${module}]`, []),
      ...defaultActions,
    ]);
  }

  const rules = get(globalUser, `globalRules[${module}]`, []);

  return adapter(rules);
}

export interface HasPermissionParams extends GetActionParams {
  action?: string;
  actions?: string[];
}

export const hasPermission = ({
  cluster,
  workspace,
  project,
  devops,
  module,
  action,
  actions,
}: HasPermissionParams) => {
  if (globals.config.disableAuthorization) {
    return true;
  }

  if (!isEmpty(actions)) {
    // @ts-ignore
    // TODO: 需要处理多个 actions 的问题
    return includes(getActions({ cluster, workspace, project, devops, module }), ...actions);
  }

  const finalActions = getActions({
    cluster,
    workspace,
    project,
    devops,
    module,
  });

  // @ts-ignore
  return finalActions.includes(action);
};

export const checkClusterVersionRequired = (navs: any[], cluster?: string) => {
  const ksVersion = isMultiCluster()
    ? get(globals, `clusterConfig.${cluster}.ksVersion`)
    : get(globals, 'ksConfig.ksVersion');

  navs.forEach(item => {
    if (item.requiredClusterVersion && compareVersion(ksVersion, item.requiredClusterVersion) < 0) {
      item.disabled = true;
      item.reason = 'CLUSTER_UPGRADE_REQUIRED';
    }

    if (item.children && item.children.length > 0) {
      checkClusterVersionRequired(item.children, cluster);
    }
  });
};
