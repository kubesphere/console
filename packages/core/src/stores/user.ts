/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import { useQuery, useMutation } from 'react-query';
import { get } from 'lodash';
import { request, urlHelper, getOriginData, getBaseInfo, getApiVersion } from '@ks-console/shared';

import type { PathParams } from '@ks-console/shared';

const module = 'users';

const apiVersion = getApiVersion(module);

export const userMapper = (item: any) => ({
  ...getBaseInfo(item),
  username: get(item, 'metadata.name', ''),
  email: get(item, 'spec.email', ''),
  role: get(item, 'metadata.annotations["iam.kubesphere.io/role"]', ''),
  globalrole: get(item, 'metadata.annotations["iam.kubesphere.io/globalrole"]', ''),
  clusterrole: get(item, 'metadata.annotations["iam.kubesphere.io/clusterrole"]', ''),
  workspacerole: get(item, 'metadata.annotations["iam.kubesphere.io/workspacerole"]', ''),
  roleBind: get(item, 'metadata.annotations["iam.kubesphere.io/role-binding"]', ''),
  groups: get(item, 'spec.groups', []),
  status: get(item, 'status.state', 'Pending'),
  conditions: get(item, 'status.conditions', []),
  lastLoginTime: get(item, 'status.lastLoginTime'),
  _originData: getOriginData(item),
});

const getModule = ({
  cluster,
  workspace,
  namespace,
  devops,
}: { cluster?: string; workspace?: string; namespace?: string; devops?: string } = {}) => {
  if (namespace || devops) {
    return 'members';
  }

  if (workspace) {
    return 'workspacemembers';
  }

  if (cluster) {
    return 'clustermembers';
  }

  return 'users';
};

const getResourceUrl = (params = {}) =>
  `kapis/iam.kubesphere.io/v1beta1${urlHelper.getPath(params)}/${getModule(params)}`;

export const getDetailUrl = (params: PathParams) => {
  const mergedParams = { module, apiVersion, ...params };
  return `${getResourceUrl(mergedParams)}/${mergedParams.name}`;
};

export const useGetUser = (params: { name: string }) => {
  return useQuery(['user', params.name], async () => {
    const data = await request(getDetailUrl({ module, apiVersion, ...params }));
    return { ...params, ...userMapper(data) };
  });
};

export const useModifyPassword = (name: string, callback?: () => void) => {
  const url = `${getDetailUrl({ module, apiVersion, name })}/password`;
  return useMutation(
    data => {
      return request.put(url, data);
    },
    {
      onSuccess: () => {
        if (callback) {
          callback();
        }
      },
    },
  );
};

export const useUpdate = ({ name, ...params }: PathParams, callback?: (params: any) => void) => {
  const url = `${getDetailUrl({ module, apiVersion, name, ...params })}`;
  return useMutation(
    data => {
      return request.put(url, data);
    },
    {
      onSuccess: (data: any) => {
        if (callback) {
          callback(data);
        }
      },
    },
  );
};
