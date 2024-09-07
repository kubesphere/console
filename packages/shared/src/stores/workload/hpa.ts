/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import baseStore from '../store';
import { useMutation } from 'react-query';
import { request, getHpaFormattedData, getApiVersion } from '../../utils';

import { HpaMapper } from './mapper';
import type { PathParams, SuccessProps } from './types';

const store = () => {
  const BaseStore = baseStore({
    module: 'horizontalpodautoscalers',
    mapper: HpaMapper,
  });
  const { patch } = BaseStore;

  const deleteHpa = (params: PathParams, k8sVersion?: string) => {
    const version = getApiVersion('horizontalpodautoscalers', k8sVersion);
    const url = `/clusters/${params.cluster}/apis/${version}/namespaces/${params.namespace}/horizontalpodautoscalers/${params.name}`;
    return request.delete(url);
  };

  const usePatchHpaMutation = (params: PathParams, options?: SuccessProps) => {
    const k8sVersion = globals.clusterConfig?.[params.cluster!]?.k8sVersion;
    const version = getApiVersion('horizontalpodautoscalers', k8sVersion);
    const url = `/clusters/${params.cluster}/apis/${version}/namespaces/${params.namespace}/horizontalpodautoscalers/${params.name}`;
    return useMutation(
      (data?: Record<string, any>) => request.patch(url, getHpaFormattedData(data, k8sVersion)),
      {
        onSuccess: options?.onSuccess,
      },
    );
  };

  const createHpa = (params: PathParams, data: Record<string, any>) => {
    const k8sVersion = globals.clusterConfig?.[params.cluster!]?.k8sVersion;
    const version = getApiVersion('horizontalpodautoscalers', k8sVersion);
    const url = `/clusters/${params.cluster}/apis/${version}/namespaces/${params.namespace}/horizontalpodautoscalers`;
    return request.post(url, getHpaFormattedData(data, k8sVersion));
  };

  return {
    ...BaseStore,
    createHpa,
    deleteHpa,
    patchHPA: patch,
    usePatchHpaMutation,
  };
};

export default store();
