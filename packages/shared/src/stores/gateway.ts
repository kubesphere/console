/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import { get, isEmpty, merge, omit, set } from 'lodash';
import { stringify } from 'qs';
import { formatPod } from './pod';
import { useList } from '../hooks';
import { getApiVersion, getBaseInfo, request } from '../utils';
import { getPath } from '../utils/urlHelper';
import {
  FormattedGateway,
  GatewayLog,
  LoadBalancerIngress,
  OriginalGateway,
  OriginalPod,
  PathParams,
} from '../types';
import { useMutation, useQuery } from 'react-query';
import BaseStore from './store';

type GatewayParams = PathParams & { gatewayName?: string };
type GatewayLogParams = GatewayParams & {
  start_time: number;
  end_time: number;
  size: number;
  from: number;
};
type MutationFnParams<T = GatewayParams> = {
  params?: T;
  data: Record<string, any>;
};
type MutationOptions = {
  onSuccess?: (data?: Record<string, any>, params?: Record<string, any>) => void;
};

const module = 'gateways';
const isCluster = (namespace?: string) => namespace && namespace !== 'kubesphere-controls-system';
const apiVersion = getApiVersion(module);

const mapper = (item: OriginalGateway): FormattedGateway => {
  item.apiVersion = 'gateway.kubesphere.io/v1alpha1';
  item.kind = 'Gateway';

  const loadBalancerIngress = get(item, 'status.loadBalancer.ingress', []) as LoadBalancerIngress[];
  const lbSupport = get(item, "metadata.annotations['kubesphere.io/annotations']", '');

  // get the first ipv4 ingress's ip, because the k8s can't support ipv6's colon
  const defaultIngressIPV4 = loadBalancerIngress.find(
    (i: LoadBalancerIngress) => !i.ip?.includes(':'),
  )?.ip;

  return {
    ...getBaseInfo(item),
    namespace: get(item, 'metadata.namespace'), // it's not metadata.namespace
    annotations: omit(
      get(item, 'spec.service.annotations', {}),
      'servicemesh.kubesphere.io/enabled',
    ),
    externalIPs: get(item, 'spec.externalIPs', []),
    ports: get(item, 'status.service', []),
    loadBalancerIngress: loadBalancerIngress.map(
      (lb: LoadBalancerIngress) => lb.ip || lb.hostname,
    ) as LoadBalancerIngress[],
    defaultIngress: defaultIngressIPV4 || get(loadBalancerIngress, '[0].hostname'),
    isHostName: !!get(loadBalancerIngress, '[0].hostname'),
    serviceMeshEnable:
      get(item, 'spec.deployment.annotations["servicemesh.kubesphere.io/enabled"]') === 'true',
    replicas: get(item, 'spec.deployment.replicas'),
    type: get(item, 'spec.service.type'),
    config: get(item, 'spec.controller.config', {}),
    lb: lbSupport,
    _originData: item,
  };
};

const getOldGatewayUrl = (params: PathParams) =>
  `kapis/resources.kubesphere.io/v1alpha2${getPath(params)}/router`;

const gatewayUrl = ({ cluster, namespace, gatewayName = '' }: GatewayParams) =>
  `${apiVersion}${getPath({
    namespace: namespace || 'kubesphere-system',
    cluster,
  })}/${module}${isCluster(namespace) ? `/${gatewayName}` : ''}`;

const gatewayEditUrl = ({ cluster, namespace, gatewayName = '' }: GatewayParams) =>
  `/${isCluster(namespace) ? 'k' : ''}apis/gateway.kubesphere.io/v1alpha1${getPath({
    namespace: namespace || 'kubesphere-controls-system',
    cluster,
  })}/${module}${
    isCluster(namespace) ? `/${gatewayName}` : '/kubesphere-router-kubesphere-system'
  }`;

const gatewayPodsUrl = ({ cluster, namespace, gatewayName = '' }: GatewayParams) =>
  `${apiVersion}${getPath({
    namespace: namespace || 'kubesphere-system',
    cluster,
  })}/${module}${
    isCluster(namespace) ? `/${gatewayName}` : '/kubesphere-router-kubesphere-system'
  }`;

const projectGatewayListUrl = (cluster?: string) => `${apiVersion}${getPath({ cluster })}/gateways`;

const fetchDetail = async (params: GatewayParams) => {
  const url = gatewayUrl(params);
  const result = await request.get<any, OriginalGateway[]>(url);
  let data;
  if (result && !isEmpty(result)) {
    if (isCluster(params.namespace)) {
      const gatewayData = result
        .filter(item => item.metadata.name !== 'kubesphere-router-kubesphere-system')
        .map(item => mapper(item))
        .find(item => item.name.indexOf(params.namespace as string) > -1);
      if (gatewayData) {
        data = gatewayData;
      }
    } else {
      data = mapper(result[0]);
    }
  }
  return {
    ...data,
  };
};

const scale = (params: GatewayParams, newReplicas: number, data: OriginalGateway) => {
  set(data, 'spec.deployment.replicas', newReplicas);
  return request.put(gatewayUrl(params), data);
};

const getGatewayPods = async (params: GatewayParams) => {
  const url = `${gatewayPodsUrl(params)}/pods`;
  const result = await request.get<any, any>(url);
  let pods = [];
  if (result && result.totalItems > 0) {
    // TODO: Refactor Pod store
    pods = result.items.map((item: OriginalPod) => formatPod(item));
  }
  return pods;
};

const exportLinkFactory = ({
  cluster,
  namespace,
  gatewayName,
  start_time,
  end_time,
  ...params
}: Omit<GatewayLogParams, 'size' | 'from'>) => {
  const api = `${gatewayPodsUrl({
    cluster,
    namespace,
    gatewayName,
  })}/logs`;

  return `/${api}?${stringify({
    sort: 'asc',
    ...params,
    start_time: Math.floor(start_time / 1000),
    end_time: Math.floor(end_time / 1000),
    operation: 'export',
  })}`;
};

const useGatewayLogs = (params: GatewayLogParams, onSuccess?: () => void) => {
  const url = `${gatewayPodsUrl(params)}/logs`;
  // eslint-disable-next-line @typescript-eslint/naming-convention
  const { start_time, end_time, from, size } = params;
  return useList<GatewayLog>({
    url,
    KeyMapper: {
      total: 'query.total',
      items: 'query.records',
    },
    params: {
      ...params,
      start_time: start_time ? Math.floor(start_time / 1000) : undefined,
      end_time: end_time ? Math.floor(end_time / 1000) : undefined,
      container_query: 'controller',
    },
    page: Math.floor(from / size) + 1,
    pageSize: size,
    onSuccess,
  });
};

const useGetMutation = (params: GatewayParams) => {
  return useQuery([module, params], async () => {
    return fetchDetail(params);
  });
};

const getNodePorts = (gateway: FormattedGateway) => {
  if (!gateway.ports) {
    return '-';
  }

  return gateway.ports.map(port => `${port.name}:${port.nodePort}`).join('; ');
};

const getExternalIp = (gateway: FormattedGateway) => {
  let ip = '-';

  if (!isEmpty(gateway.loadBalancerIngress)) {
    ip = gateway.loadBalancerIngress.join('; ');
  } else if (!isEmpty(gateway.externalIPs)) {
    ip = gateway.externalIPs.join(';');
  }

  return ip;
};

const post = async (params: GatewayParams, data: Record<string, any>) => {
  return request.post(gatewayEditUrl(params), data);
};

const usePostMutation = (requestParams?: GatewayParams, options?: MutationOptions) => {
  const onSuccess = options?.onSuccess;
  return useMutation(
    async ({ data, params }: MutationFnParams) => {
      const p = merge({}, requestParams, params);
      return post(p, data);
    },
    { onSuccess },
  );
};

const put = async (params: GatewayParams, data: Record<string, any>) => {
  return request.put(gatewayEditUrl(params), data);
};

const usePutMutation = (requestParams?: GatewayParams, options?: MutationOptions) => {
  const onSuccess = options?.onSuccess;
  return useMutation(
    async ({ data, params }: MutationFnParams) => {
      const p = merge({}, requestParams, params);
      return put(p, data);
    },
    {
      onSuccess,
    },
  );
};

const update = async (params: GatewayParams, data: Record<string, any>) => {
  return request.post(`${gatewayEditUrl(params)}/upgrade`, data);
};

const useUpdateMutation = (requestParams?: GatewayParams, options?: MutationOptions) => {
  const onSuccess = options?.onSuccess;
  return useMutation(
    async ({ data, params }: MutationFnParams) => {
      const p = merge({}, requestParams, params);
      return update(p, data);
    },
    {
      onSuccess,
    },
  );
};

const getGatewayByProject = async (params: PathParams) => {
  const url = gatewayUrl(params);

  const result: OriginalGateway[] = await request.get(url);
  const dataList = [];

  for (let i = 0; i < 2; i++) {
    const data = result && result[i] ? mapper(result[i]) : undefined;
    dataList.push(data);
  }

  let detailGateway = dataList[0];

  if (get(detailGateway, 'name') !== 'kubesphere-router-kubesphere-system') {
    const temp = dataList[1];
    dataList[0] = temp;
    dataList[1] = detailGateway;
  }

  detailGateway = dataList[1] || dataList[0];

  return { dataList, detailGateway };
};

const del = (params: GatewayParams, isOld?: boolean) =>
  request.delete(isOld ? getOldGatewayUrl(params) : gatewayEditUrl(params));

const batchDelete = (items: Partial<GatewayParams>[], isOld?: boolean) => {
  const promises = items.map(item => del(item, isOld));
  return Promise.allSettled(promises);
};

const useBatchDeleteMutation = (options?: MutationOptions) => {
  const onSuccess = options?.onSuccess;
  return useMutation(
    ({ items, isOld }: { items: Partial<GatewayParams>[]; isOld?: boolean }) => {
      const promises = items.map(item => del(item, isOld));
      return Promise.allSettled(promises);
    },
    { onSuccess },
  );
};

const getUrlParams = ({ workspace, namespace, cluster }: PathParams) => {
  return workspace && !namespace
    ? { workspace, cluster }
    : { namespace: namespace || 'kubesphere-system', cluster };
};

const getIngressUrl = ({ cluster, namespace, workspace }: PathParams) => {
  const pathParams = getUrlParams({ workspace, namespace, cluster });

  return `kapis/gateway.kubesphere.io/v1alpha2${getPath(pathParams)}/availableingressclassscopes`;
};

const ingressClassScopesMapper = (item: Record<string, any>) => ({
  ...getBaseInfo(item),
  name: get(item, 'metadata.name'),
  ingressClass: get(item, 'spec.ingressClass.name'),
  service: get(item, 'status.service'),
  ingressIp: get(item, 'status.loadBalancer.ingress[0].ip', ''),
  _originData: item,
});

const useQueryNewGatewayByProject = (params: PathParams, options: Record<string, any>) => {
  const url = getIngressUrl(params);

  return useQuery<Record<string, any>[]>({
    queryKey: [module, 'Ingress', params],
    queryFn: () => request.get(url),
    select: data => {
      return data?.map(ingressClassScopesMapper);
    },
    ...options,
  });
};

const store = BaseStore({
  module,
  apiVersion,
  mapper,
});

export default {
  ...store,
  mapper,
  getOldGatewayUrl,
  gatewayUrl,
  gatewayEditUrl,
  gatewayPodsUrl,
  projectGatewayListUrl,
  fetchDetail,
  scale,
  getGatewayPods,
  exportLinkFactory,
  getGatewayByProject,
  useGatewayLogs,
  useGetMutation,
  getNodePorts,
  getExternalIp,
  post,
  usePostMutation,
  put,
  usePutMutation,
  update,
  useUpdateMutation,
  del,
  batchDelete,
  useBatchDeleteMutation,
  useQueryNewGatewayByProject,
};
