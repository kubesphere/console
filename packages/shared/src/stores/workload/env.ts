/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import { useState } from 'react';
import { isNil, get } from 'lodash';
import { PathParams } from '../../types';
import { request, safeAtob } from '../../utils';
interface ListProps {
  data: Record<string, any>[];
  isLoading: boolean;
}

const envStore = () => {
  const [list, setList] = useState<ListProps>({
    data: [],
    isLoading: false,
  });

  const [variables, setVariables] = useState<ListProps>({
    data: [],
    isLoading: false,
  });

  const getPath = ({ cluster, namespace }: PathParams) => {
    let path = '';
    if (cluster) {
      path += `/klusters/${cluster}`;
    }
    if (namespace) {
      path += `/namespaces/${namespace}`;
    }
    return path;
  };

  const fetchVariables = async (container: Record<string, any>) => {
    setVariables({
      isLoading: true,
      data: [],
    });

    const { cluster, namespace, env = [] } = container;
    const requests: Promise<any>[] = [];
    const items: { name: string; key: string }[] = [];
    env.forEach((item: { [key: string]: any; name: string; key: string }) => {
      if ('valueFrom' in item) {
        const { secretKeyRef, configMapKeyRef } = item.valueFrom;

        if (secretKeyRef) {
          items.push({
            name: item.name,
            key: secretKeyRef.key,
          });
          requests.push(
            request.get(`api/v1${getPath({ cluster, namespace })}/secrets/${secretKeyRef.name}`),
          );
        }

        if (configMapKeyRef) {
          items.push({
            name: item.name,
            key: configMapKeyRef.key,
          });
          requests.push(
            request.get(
              `api/v1${getPath({ cluster, namespace })}/configmaps/${configMapKeyRef.name}`,
            ),
          );
        }
      } else {
        items.push(item);
        requests.push(item.value || '');
      }
    });

    const result = await Promise.all(requests);
    const data = items.map((item, index) => {
      const value: Record<string, any> = result[index];

      if (value.kind === 'Secret' && item.key) {
        return {
          name: item.name,
          value: safeAtob(get(value.data, item.key, '')),
        };
      }

      if (value.kind === 'ConfigMap' && item.key) {
        return {
          name: item.name,
          value: get(value.data, item.key, ''),
        };
      }

      return { value: '', ...item };
    });

    setVariables({
      data,
      isLoading: false,
    });

    container.variables = data;
    return container;
  };

  const fetchList = async ({
    cluster,
    namespace,
    containers = [],
    initContainers = [],
  }: {
    cluster: string;
    namespace: string;
    containers: Record<string, any>[];
    initContainers: Record<string, any>[];
  }) => {
    setList({
      data: [],
      isLoading: true,
    });
    containers = isNil(containers) ? [] : containers;
    initContainers = isNil(initContainers) ? [] : initContainers;
    const mergeContainers = [
      ...initContainers.map(item => ({ ...item, type: 'init' })),
      ...containers.map(item => ({ ...item, type: 'work' })),
    ];

    const data = await Promise.all(
      mergeContainers.map((container: Record<string, any>) => {
        container.cluster = cluster;
        container.namespace = namespace;
        return fetchVariables(container);
      }),
    );

    setList({
      data,
      isLoading: false,
    });
  };

  return {
    list,
    variables,
    getPath,
    fetchList,
    fetchVariables,
  };
};

export default envStore;
