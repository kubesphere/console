/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import { useQuery } from 'react-query';
import { merge } from 'lodash';
import { notify } from '@kubed/components';

import { request } from '../utils';
import { getClusterUrl } from '../utils/urlHelper';

const DEFAULT_KUBECTL_PARAMS = {
  nodename: '',
  cluster: '',
  namespace: '',
  pod: '',
  container: '',
  shell: 'bash',
};

export function getUsername() {
  return globals.user?.username ?? '';
}

interface GetClusterPathOptions {
  cluster?: string;
}

export function getClusterPath(options?: GetClusterPathOptions) {
  const cluster = options?.cluster;
  return cluster ? `/klusters/${cluster}` : '';
}

interface KubectlResponse {
  namespace: string;
  pod: string;
  container: string;
}

export interface FetchKubectlOptions {
  cluster?: string;
}

export async function fetchKubectl(options?: FetchKubectlOptions) {
  const cluster = options?.cluster;
  const clusterPath = getClusterPath({ cluster });
  const username = getUsername();
  const url = `kapis/resources.kubesphere.io/v1alpha2${clusterPath}/users/${username}/kubectl`;

  const result = await request.get<never, KubectlResponse>(url);

  if (!result) {
    notify.error(t('OPEN_TERMINAL_DESC'));
  }

  return merge({}, DEFAULT_KUBECTL_PARAMS, { cluster }, result);
}

export interface FetchTerminalWebSocketUrlOptions {
  nodename?: string;
  cluster?: string;
  namespace?: string;
  pod?: string;
  container?: string;
  shell?: string;
}

export async function fetchTerminalWebSocketUrl(options?: FetchTerminalWebSocketUrlOptions) {
  const params = merge({}, DEFAULT_KUBECTL_PARAMS, options);
  const { nodename, cluster, namespace, pod, container, shell = 'sh' } = params;
  const clusterPath = getClusterPath({ cluster });
  const urlPrefix = `kapis/terminal.kubesphere.io/v1alpha2${clusterPath}`;

  if (!pod && !nodename) {
    return getClusterUrl(`${urlPrefix}/users/${getUsername()}/kubectl`);
  }
  if (nodename) {
    return `${urlPrefix}/nodes/${nodename}/exec`;
  }

  const pathWithNamespaceAndPod = `namespaces/${namespace}/pods/${pod}`;
  const url = `${urlPrefix}/${pathWithNamespaceAndPod}/exec?container=${container}&shell=${shell}`;
  const result = await request
    .get(url, { headers: { 'x-ignore-error-notify': 'true' } })
    .then(() => true)
    .catch(reason => reason.response.status !== 404);

  if (!result) {
    return `${urlPrefix}/${pathWithNamespaceAndPod}?container=${container}&shell=${shell}`;
  }

  return url;
}

type UseTerminalWebSocketUrlQueryOptions = FetchTerminalWebSocketUrlOptions;

export function useTerminalWebSocketUrlQuery(options?: UseTerminalWebSocketUrlQueryOptions) {
  const queryKey = ['TERMINAL_WEBSOCKET_URL_QUERY', options];
  const result = useQuery(queryKey, () => fetchTerminalWebSocketUrl(options));
  const websocketUrl = result.data ?? '';

  return { ...result, websocketUrl };
}

export function getTerminalUploadUrl(params: {
  cluster?: string;
  namespace?: string;
  podName?: string;
  containerName?: string;
}) {
  const { cluster, namespace, podName: pod, containerName } = params;
  const clusterPath = getClusterPath({ cluster });
  return `kapis/terminal.kubesphere.io/v1alpha2${clusterPath}/namespaces/${namespace}/pods/${pod}/file?container=${containerName}`;
}

export function getTerminalDownloadUrl(params: {
  cluster?: string;
  namespace?: string;
  podName?: string;
  containerName?: string;
}) {
  const { cluster, namespace, podName: pod, containerName } = params;
  const clusterPath = getClusterPath({ cluster });
  return `kapis/terminal.kubesphere.io/v1alpha2${clusterPath}/namespaces/${namespace}/pods/${pod}/file?container=${containerName}`;
}
