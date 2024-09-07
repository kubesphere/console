/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import { get } from 'lodash';
import { useMutation, useQuery } from 'react-query';
import BaseStore from './store';
import { IngressDetail } from '../types/ingress';
import { getBaseInfo, getOriginData, request } from '../utils';
import type { PathParams } from '../types';
const module = 'ingresses';

interface ISuccessProps {
  onSuccess?: () => void;
}

const mapper = <T extends Record<string, any>>(item: T) => {
  const loadBalancerIngress = get(item, 'status.loadBalancer.ingress', []) as Record<string, any>[];
  return {
    ...getBaseInfo(item),
    namespace: get(item, 'metadata.namespace'),
    labels: get(item, 'metadata.labels', {}),
    annotations: get(item, 'metadata.annotations', {}),
    rules: get(item, 'spec.rules', []),
    tls: get(item, 'spec.tls', []),
    loadBalancerIngress: loadBalancerIngress.map((lb: Record<string, any>) => lb.ip || lb.hostname),
    app: get(item, 'metadata.labels["app.kubernetes.io/name"]'),
    _originData: getOriginData(item),
  };
};

// inject base function into storeFn
const ingresStore = () => {
  const baseStore = BaseStore<IngressDetail>({
    module,
    mapper,
  });
  const { getDetailUrl, fetchDetail } = baseStore;

  const useUpdateIngressMutation = (options?: ISuccessProps) => {
    const onSuccess = options?.onSuccess;
    return useMutation(
      ({ params, data }: { params: PathParams; data: Record<string, any> }) =>
        request.patch(getDetailUrl(params), data),
      {
        onSuccess,
      },
    );
  };

  const useDeleteIngressMutation = (options?: ISuccessProps) => {
    const onSuccess = options?.onSuccess;
    return useMutation((params: PathParams) => request.delete(getDetailUrl(params)), { onSuccess });
  };

  const useBatchDeleteIngressMutation = (options?: ISuccessProps) => {
    const onSuccess = options?.onSuccess;
    return useMutation(
      (data: IngressDetail[]) => {
        const reqs = data.map(item => request.delete(getDetailUrl(item)));
        return Promise.allSettled(reqs);
      },
      { onSuccess },
    );
  };

  const useDetailQuery = (params: PathParams) => {
    return useQuery([module, params], () => fetchDetail(params));
  };

  return {
    ...baseStore,
    mapper,
    useDetailQuery,
    useUpdateIngressMutation,
    useDeleteIngressMutation,
    useBatchDeleteIngressMutation,
  };
};

export default ingresStore();
