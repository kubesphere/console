/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import { get, isEmpty } from 'lodash';
import { useMutation, useQuery } from 'react-query';
import BaseStore from './store';
import { API_VERSIONS } from '../constants/common';
import { getApiVersion, getBaseInfo, getOriginData, request } from '../utils';

import type {
  ISubsets,
  PathParams,
  IServiceDetail,
  OriginalService,
  IOriginalEndPoint,
} from '../types';

interface ISuccessProps {
  onSuccess?: () => void;
}

const SERVICE_TYPES = {
  VirtualIP: 'VIRTUAL_IP',
  Headless: 'HEADLESS',
  ExternalName: 'EXTERNALNAME',
  Unknown: 'UNKNOWN',
};

const SERVICE_TYPES_VALUE: Record<string, any> = {
  VIRTUAL_IP: 'virtualIP',
  HEADLESS: 'headlessSelector',
};

const getServiceType = (item: OriginalService) => {
  const specType = get(item, 'spec.type');
  const clusterIP = get(item, 'spec.clusterIP');
  const selector = get(item, 'spec.selector', {});

  let type = SERVICE_TYPES.VirtualIP;
  if (specType === 'ClusterIP') {
    if (clusterIP === 'None' || clusterIP === '') {
      if (!isEmpty(selector)) {
        type = SERVICE_TYPES.Headless;
      } else {
        type = SERVICE_TYPES.Unknown;
      }
    }
  } else if (specType === 'ExternalName') {
    type = SERVICE_TYPES.ExternalName;
  }

  return type;
};

const mapper = (item: OriginalService) => {
  const specType = get(item, 'spec.type');
  const clusterIP = get(item, 'spec.clusterIP');
  const selector = get(item, 'spec.selector', {});

  return {
    type: getServiceType(item),
    clusterIP,
    selector,
    specType,
    ...getBaseInfo(item),
    namespace: get(item, 'metadata.namespace'),
    labels: get(item, 'metadata.labels', {}),
    annotations: get(item, 'metadata.annotations', {}),
    status: get(item, 'status'),
    ports: get(item, 'spec.ports', []),
    workloadType: get(item, 'metadata.annotations["kubesphere.io/workloadType"]', 'Deployment'),
    sessionAffinity: get(item, 'spec.sessionAffinity'),
    externalIPs: get(item, 'spec.externalIPs', []),
    externalName: get(item, 'spec.externalName'),
    loadBalancerIngress:
      // @ts-ignore
      get(item, 'status.loadBalancer.ingress', [])?.map((lb: any) => lb.ip || lb.hostname) ?? [],
    app: get(item, 'metadata.labels["app.kubernetes.io/name"]') || get(item, 'metadata.labels.app'),
    _originData: getOriginData<OriginalService>(item),
  };
};

const ServiceStore = () => {
  const module = 'services';
  const baseStore = BaseStore({
    module,
    mapper,
  });

  const { getDetailUrl, getPath } = baseStore;

  const fetchDetail = async (params: PathParams): Promise<IServiceDetail> => {
    const result = await request.get<any, OriginalService>(
      getDetailUrl({ ...params, module, apiVersion: getApiVersion(module) }),
    );
    return {
      ...params,
      ...mapper(result),
    };
  };

  const useUpdateYamlMutation = (options: ISuccessProps) => {
    const { onSuccess } = options;
    return useMutation(
      ({ params, data }: { params: PathParams; data: Record<string, any> }) => {
        return request.patch(getDetailUrl(params), data);
      },
      {
        onSuccess,
      },
    );
  };

  const endpointMapper = (item: ISubsets) => {
    return {
      addresses: item.address || [],
      ports: item.ports || [],
    };
  };

  const useServiceQuery = (params: PathParams) => {
    return useQuery({
      queryKey: [module, params],
      queryFn: () => fetchDetail(params),
      select: data => data,
    });
  };

  const useDeleteMutation = (options: ISuccessProps) => {
    const { onSuccess } = options;
    return useMutation(
      (params: PathParams) => {
        return request.delete(getDetailUrl(params));
      },
      { onSuccess },
    );
  };

  const useBatchDeleteMutation = (options: ISuccessProps) => {
    const { onSuccess } = options;

    return useMutation(
      ({ cluster, data }: { cluster?: string; data: Record<string, any>[] }) => {
        const reqs = data.map(item => {
          return request.delete(
            getDetailUrl({
              cluster,
              namespace: item.namespace,
              name: item.name,
            }),
          );
        });
        return Promise.allSettled(reqs);
      },
      {
        onSuccess,
      },
    );
  };

  const fetchEndPoints = async (params: PathParams) => {
    const { cluster, namespace, name } = params;
    const result: IOriginalEndPoint = await request.get(
      `api/v1${getPath({ cluster, namespace })}/endpoints/${name}`,
    );
    const endpoints = result.subsets || [];
    return endpoints.map(endpointMapper);
  };

  const useEndpointQuery = (params: PathParams) => {
    return useQuery(['endpoint', params], () => fetchEndPoints(params));
  };

  const usePatchMutation = (params: PathParams, options?: ISuccessProps) => {
    return useMutation(
      async (newObject: IServiceDetail['_originData']) =>
        request.patch(getDetailUrl(params), newObject),
      {
        onSuccess: options?.onSuccess,
      },
    );
  };

  return {
    ...baseStore,
    module,
    mapper,
    SERVICE_TYPES,
    SERVICE_TYPES_VALUE,
    fetchDetail,
    fetchEndPoints,
    getServiceType,
    useServiceQuery,
    useEndpointQuery,
    usePatchMutation,
    useDeleteMutation,
    useUpdateYamlMutation,
    useBatchDeleteMutation,
  };
};

export default ServiceStore();
