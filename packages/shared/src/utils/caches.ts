/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import { useCacheStore as useStore } from '../index';

export function getWorkspacesAliasName(workspace: string) {
  const [workspacesAliasName] = useStore('workspaceAliasName');
  return workspacesAliasName?.[workspace] || workspace;
}

export function getProjectAliasName(project: string, workspace?: string) {
  const [projectAliasName = {}] = useStore('projectAliasName');
  if (!workspace) {
    let allprojectAliasName: any = {};
    Object.values(projectAliasName).forEach(obj => {
      allprojectAliasName = Object.assign({}, allprojectAliasName, obj);
    });
    return allprojectAliasName?.[project || ''] || project;
  }
  return projectAliasName?.[workspace || '']?.[project] || project;
}

export function getUserAliasName(user?: string) {
  const [userAliasName = {}] = useStore('userAliasName');
  return userAliasName?.[user || ''] || user;
}

export function getClusterAliasName(cluster: string) {
  const [aliasName = {}] = useStore('clustersAliasName');
  return aliasName?.[cluster || ''] || cluster;
}

export function getPlatformRolesAliasName(role: string) {
  const [aliasName = {}] = useStore('platformRolesAliasName');
  return aliasName?.[role || ''] || role;
}

export function useGetClusterAliasName(cluster: string) {
  const [aliasName = {}] = useStore('clustersAliasName');
  return aliasName?.[cluster || ''] || cluster;
}

export function useGetPlatformRolesAliasName(role: string) {
  const [aliasName = {}] = useStore('platformRolesAliasName');
  return aliasName?.[role || ''] || role;
}

export function useGetWorkspacesAliasName(workspace: string) {
  const [workspacesAliasName] = useStore('workspaceAliasName');
  return workspacesAliasName?.[workspace] || workspace;
}

export function useGetProjectAliasName(project: string, workspace?: string) {
  const [projectAliasName = {}] = useStore('projectAliasName');
  if (!workspace) {
    let allprojectAliasName: any = {};
    Object.values(projectAliasName).forEach(obj => {
      allprojectAliasName = Object.assign({}, allprojectAliasName, obj);
    });
    return allprojectAliasName?.[project || ''] || project;
  }
  return projectAliasName?.[workspace || '']?.[project] || project;
}
