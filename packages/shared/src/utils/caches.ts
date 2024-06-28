import { useCacheStore as useStore } from '../index';

export function getWorkspacesAliasName(workspace: string) {
  const [workspacesAliasName] = useStore('workspaceAliasName');
  return workspacesAliasName?.[workspace] || workspace;
}

export function getProjectAliasName(project: string, workspace?: string) {
  const [projectAliasName = {}] = useStore('projectAliasName');
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
