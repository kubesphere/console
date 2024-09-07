/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import {
  useUrl,
  useList,
  PathParams,
  ingresStore,
  volumeStore,
  serviceStore,
  workloadStore,
  UseListOptions,
  useListQueryParams,
  UseQueryParamsOption,
} from '@ks-console/shared';

export const { getPath } = useUrl({ module: '' });

export function getBaseResourceUrl(params: PathParams, module: string): string {
  return `kapis/resources.kubesphere.io/v1alpha3${getPath(params)}/${module}`;
}

export type K8sListParams = {
  cluster?: string;
  namespace?: string;
  [key: string]: string | undefined;
};

const mapperObjectMap: Record<string, (item: any) => any> = {
  ingresses: ingresStore.mapper,
  services: serviceStore.mapper,
  persistentvolumeclaims: volumeStore.VolumeMapper,
  daemonsets: workloadStore('daemonsets').mapper,
  deployments: workloadStore('deployments').mapper,
  statefulsets: workloadStore('statefulsets').mapper,
};

interface UseBaseK8sListOptions extends Partial<UseListOptions<any>> {
  module: string;
  params: K8sListParams;
}

export function useBaseK8sList({ module, params, ...options }: UseBaseK8sListOptions) {
  const { cluster, namespace, ...restParams } = params;
  const { getListUrl } = useUrl({ module });
  const url = getListUrl({ cluster, namespace });

  return useList({
    url,
    params: restParams,
    format: (item: any) => ({
      cluster,
      module,
      ...mapperObjectMap[module](item),
    }),
    paramsFormatFn: requestParams => useListQueryParams(requestParams as UseQueryParamsOption),
    ...options,
  });
}
