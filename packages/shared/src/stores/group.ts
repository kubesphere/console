/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import { useQuery } from 'react-query';
import { getPath } from '../hooks/useUrl';
import { request } from '../utils';

const apiVersion = 'kapis/iam.kubesphere.io/v1beta1';

export const useGetWorkspaceRoleBinding = (
  group: string,
  { cluster, workspace, namespace, ...rest }: Record<string, any>,
) => {
  const params = rest;
  if (group) {
    params.labelSelector = `iam.kubesphere.io/group-ref=${group}`;
  }
  return useQuery([cluster, workspace, namespace], async () => {
    if (!workspace) {
      return {};
    }
    const res = await request.get(
      `${apiVersion}${getPath({
        cluster,
        workspace,
        namespace,
      })}/workspacerolebindings`,
      { params },
    );
    return res as any;
  });
};
