/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import { useCacheStore as useStore } from '../index';
import workspaceStore from './workspace';
import userStore from './user';
import clusterStore from './cluster';
import RoleStore from './role';
import { request, getDisplayName } from '../utils';

const roleStore = RoleStore('globalroles');

function getAliasNameList(list: any[]) {
  const obj: Record<string, string> = {};
  list?.map((item: any) => {
    obj[item.metadata.name] = getDisplayName(item);
  });
  return obj;
}
export async function getProjects(params: {
  cluster: string;
  workspace: string;
  aliasName: string;
}) {
  return new Promise(async resolve => {
    const url = `${
      params.cluster ? `/clusters/${params.cluster}` : ''
    }/kapis/tenant.kubesphere.io/v1beta1/workspaces/${params.workspace}/namespaces`;
    request
      .get(url)
      .then((res: any) => {
        if (res.items) {
          resolve({
            [params.workspace]: getAliasNameList(res.items),
          });
        }
      })
      .catch(() => {
        resolve({ [params.workspace]: {} });
      });
  });
}

let status = false;
async function getWorkspaces() {
  const [, setProjectAliasName] = useStore('projectAliasName');
  const [, setWorkspacesAliasName] = useStore('workspaceAliasName');
  const [, setUserAliasName] = useStore('userAliasName');
  const [, setClustersAliasName] = useStore('clustersAliasName');
  const [, setPlatformRolesAliasName] = useStore('platformRolesAliasName');
  if (status || location.href.includes('/login') || !globals?.user) return;
  status = true;
  const url = workspaceStore.getListUrl({});
  const res: any = await request.get(url);
  const aliasName: Record<string, string> = {};
  const alls: Promise<any>[] = [];
  res.items?.forEach((item: any) => {
    const params = {
      cluster: item.metadata.labels?.['cluster-role.kubesphere.io/edge'],
      workspace: item.metadata.name,
      aliasName: getDisplayName(item),
    };
    aliasName[params.workspace] = params.aliasName;
    alls.push(getProjects(params));
  });
  globals.workspacesAliasName = aliasName;
  setWorkspacesAliasName(aliasName);
  const promise = Promise.all(alls);
  promise.then((project: any[]) => {
    let projectMap: Record<string, Record<string, string>> = {};
    project.forEach(item => {
      projectMap = {
        ...projectMap,
        ...item,
      };
    });
    setProjectAliasName(projectMap);
    globals.projectAliasName = projectMap;
  });

  const user = await userStore.fetchList();
  if (user.data) {
    const userName = getAliasNameList(user.data);
    globals.userAliasName = userName;
    setUserAliasName(userName);
  }
  const data = await clusterStore.fetchAllCluster();
  if (data) {
    const clustersAliasName = getAliasNameList(data);
    globals.clustersAliasName = clustersAliasName;
    setClustersAliasName(clustersAliasName);
  }
  if (globals.user.globalRules.roles) {
    const roles = await roleStore.fetchList({ annotation: 'kubesphere.io/creator' });
    const platformRolesAliasName = getAliasNameList(roles.data);
    globals.platformRolesAliasName = platformRolesAliasName;
    setPlatformRolesAliasName(platformRolesAliasName);
  }
}

export default {
  getWorkspaces,
  getProjects,
};
