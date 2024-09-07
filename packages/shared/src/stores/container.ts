/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import { useEffect, useRef, useState } from 'react';
import { stringify } from 'qs';
import { get, merge, omit } from 'lodash';
import { useQuery } from 'react-query';
import { request } from '../utils';
import { getClusterUrl } from '../utils/urlHelper';
import { PathParams, Container, ContainerStatus } from '../types';

export const encryptKey = get(globals, 'config.encryptKey', 'kubesphere');

export const module = 'containers';

type ContainerPayload = PathParams & {
  podName?: string;
  gateways?: string;
};

type UseContainerLogOptions = ContainerPayload & {
  enabled?: boolean;
  params: Record<string, any>;
};

export const getContainers = (
  containers: Container[],
  statuses: ContainerStatus[],
  namespace: string,
) =>
  containers.map(container => {
    const status = omit(statuses.find(item => item.name === container.name) || {}, 'image');

    return {
      ...container,
      ...status,
      namespace,
    };
  });

const getDetailUrl = ({ cluster, namespace, podName, gateways }: ContainerPayload) => {
  let path = `api/v1`;

  if (cluster) {
    path += `/klusters/${cluster}`;
  }

  if (gateways) {
    const ns =
      namespace === 'kubesphere-controls-system' || !namespace ? 'kubesphere-system' : namespace;
    return `kapis/gateway.kubesphere.io/v1alpha1/namespaces/${ns}/gateways/${gateways}/pods/${podName}`;
  }

  return `${path}/namespaces/${namespace}/pods/${podName}`;
};

export function useContainerLogQuery({
  cluster,
  namespace,
  podName,
  gateways,
  params,
  enabled = true,
}: UseContainerLogOptions) {
  const url = `${getDetailUrl({
    cluster,
    namespace,
    podName,
    gateways,
  })}/log`;
  const queryKey = [module, url, params];

  return useQuery(
    queryKey,
    () => {
      return request.get<never, string>(url, { params });
    },
    { enabled },
  );
}

export function useContainerLogFollow({
  cluster,
  namespace,
  podName,
  gateways,
  params,
  enabled = true,
}: UseContainerLogOptions) {
  const query = stringify(
    merge(
      {
        follow: true,
      },
      params,
    ),
  );
  const url = `${getClusterUrl(
    `/${getDetailUrl({
      cluster,
      namespace,
      podName,
      gateways,
    })}/log`,
  )}?${query}`;

  const xhr = useRef<XMLHttpRequest>();
  const [data, setData] = useState<string>('');

  function fetch() {
    xhr.current = new XMLHttpRequest();
    if (enabled) {
      xhr.current.addEventListener('readystatechange', () => {
        if (xhr.current?.readyState === XMLHttpRequest.LOADING && xhr.current.status === 200) {
          setData(xhr.current.responseText);
        }
      });

      xhr.current.open('GET', url);
      xhr.current.send();
    } else {
      xhr.current.abort();
    }
  }

  useEffect(() => {
    fetch();
    return () => xhr.current?.abort();
  }, [enabled, url]);

  const refetch = () => {
    xhr.current?.abort();
    fetch();
  };

  return { data, refetch };
}

export function getAllLogs({ cluster, namespace, podName, ...params }: UseContainerLogOptions) {
  return request.get<never, string>(`${getDetailUrl({ cluster, namespace, podName })}/log`, params);
}
