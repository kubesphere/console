/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

// TODO: this page should be added in devops extensions
import { capitalize, get } from 'lodash';
import {
  getBaseInfo,
  getOriginData,
  getPath,
  PathParams,
  useList,
  UseListInstance,
  UseListOptions,
} from '@ks-console/shared';

const formatDevops = (item: any) => {
  const phase = get(item, 'status.phase');
  const syncStatusKey = 'metadata.annotations["devopsproject.devops.kubesphere.io/syncstatus"]';
  const syncStatus = capitalize(get(item, syncStatusKey));

  const deletionTimestamp = get(item, 'metadata.deletionTimestamp');

  return {
    ...getBaseInfo(item),
    name: get(item, 'metadata.generateName'),
    devops: get(item, 'metadata.name'),
    workspace: get(item, 'metadata.labels["kubesphere.io/workspace"]'),
    namespace: get(item, 'status.adminNamespace'),
    status: deletionTimestamp ? 'Terminating' : phase || syncStatus || 'Active',
    sourceRepos: get(item, 'spec.argo.sourceRepos', []),
    destinations: get(item, 'spec.argo.destinations', []),
    _originData: getOriginData(item),
  };
};

export function useDevopsList<T>(
  {
    cluster,
    workspace,
    namespace,
    username,
    ...params
  }: PathParams & {
    type?: string;
    ascending?: boolean;
    limit?: number;
    labelSelector?: string;
    username?: string;
  },
  options?: Partial<UseListOptions<T>>,
): UseListInstance<T> {
  let url: string = `/kapis/devops.kubesphere.io/v1alpha3/workspaces/${workspace}${getPath({
    cluster,
    namespace,
  })}/workspacemembers/${username}/namespaces`;
  return useList<T>({
    url,
    format: formatDevops,
    params,
    autoFetch: !!workspace || !!cluster,
    ...options,
  });
}
