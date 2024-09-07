/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import { isEmpty, get } from 'lodash';
import { useQuery, useMutation } from 'react-query';
import baseStore from '../store';
import { request } from '../../utils';
import ObjectMapper from '../../utils/object.mapper';
import { getVolumeType, VolumeMapper } from '../volume';
import hpaStore from './hpa';
import type {
  PathParams,
  SuccessProps,
  DeleteProps,
  DeploymentPatchProps,
  BatchOptProps,
} from './types';

//TODO: type
export const getWorkloadVolumes = async (detail: any, setDetail = false) => {
  const prefix = detail.cluster
    ? `api/v1/klusters/${detail.cluster}/namespaces/${detail.namespace}/persistentvolumeclaims`
    : `api/v1/namespaces/${detail.namespace}/persistentvolumeclaims`;
  let specVolumes = [];
  if (!isEmpty(detail.volumes)) {
    const promises: any[] = [];
    specVolumes = detail.volumes.map((volume: any) => {
      let volumeName = '';
      if (volume.persistentVolumeClaim) {
        volumeName = volume.persistentVolumeClaim.claimName;
        promises.push(request.get(`${prefix}/${volumeName}`));
      } else {
        volumeName = volume.HostPath ? volume.HostPath.path : volume.name;
      }

      return {
        ...volume,
        storage: '-',
        name: volumeName,
        mountName: volume.name,
        type: getVolumeType(volume),
      };
    });

    const volumesResult = await Promise.all(promises);
    const volumes = volumesResult.map(VolumeMapper);

    specVolumes.forEach((volume: any) => {
      if (volume.type === 'Volume') {
        const volumeDetail: any = volumes.find(_volume => _volume.name === volume.name) || {};
        volume.storage = volumeDetail.capacity;
        volume.capacity = volumeDetail.capacity;
        volume.storageClassName = volumeDetail.storageClassName;
        volume.accessMode = get(volumeDetail, 'accessMode');
      }

      // get volume mounts
      if (!isEmpty(detail.containers)) {
        const mounts: any[] = [];

        detail.containers.forEach((container: any) => {
          if (!isEmpty(container.volumeMounts)) {
            container.volumeMounts.forEach((mount: any) => {
              if (mount.name === volume.mountName) {
                mounts.push({
                  ...mount,
                  container: container.name,
                  accessMode: mount.readOnly ? 'read-only' : 'read-write',
                });
              }
            });
          }
        });

        volume.mounts = mounts;
      }
    });
  }

  if (setDetail) {
    detail.volumes = specVolumes;
  }

  return specVolumes;
};

const workloadStore = (module: string) => {
  const mapper = ObjectMapper[module];

  const BaseStore = baseStore({
    module,
    mapper,
  });
  const { getDetailUrl, getPath, patch } = BaseStore;
  const { deleteHpa } = hpaStore;

  const del = (params: PathParams, k8sVersion?: string) => {
    return request.delete(getDetailUrl(params, k8sVersion), {
      data: {
        kind: 'DeleteOptions',
        apiVersion: 'v1',
        propagationPolicy: 'Background',
      },
    });
  };

  const batchDelete = (items: Record<string, any>[], k8sVersion?: string) => {
    const promises: any[] = [];

    items.map(item => {
      promises.push(del(item, k8sVersion));

      const relateHPA = get(item, "annotations['kubesphere.io/relatedHPA']");

      if (relateHPA) {
        promises.push(deleteHpa({ name: relateHPA, namespace: item.namespace }));
      }
    });

    return Promise.allSettled(promises);
  };

  const getReplica = async (params: PathParams) => {
    const result = await request.get(getDetailUrl(params));
    const detail = { ...params, ...mapper(result) };
    return detail;
  };

  const useGetDetail = (params: PathParams, k8sVersion?: string) => {
    return useQuery([module, params], async () => {
      const data = await request.get(getDetailUrl(params, k8sVersion));
      return { ...params, ...mapper(data) };
    });
  };

  const useUpdateDeploymentMutation = (options?: SuccessProps) => {
    const onSuccess = options?.onSuccess;
    return useMutation(({ params, data }: DeploymentPatchProps) => patch(params, data), {
      onSuccess,
    });
  };

  const useDeleteDeploymentMutation = (options?: SuccessProps, k8sVersion?: string) => {
    const onSuccess = options?.onSuccess;
    return useMutation(
      (params: DeleteProps) => {
        const reqs = [];
        const { cluster, namespace, annotations = {} } = params;
        const relateHPA = annotations['kubesphere.io/relatedHPA'];

        if (relateHPA) {
          reqs.push(
            deleteHpa(
              {
                name: relateHPA,
                cluster,
                namespace,
              },
              k8sVersion,
            ),
          );
        }

        reqs.push(del(params, k8sVersion));

        return Promise.allSettled(reqs);
      },
      {
        onSuccess,
      },
    );
  };

  const useBatchDeleteWorkloadMutation = (options?: SuccessProps) => {
    const onSuccess = options?.onSuccess;
    return useMutation(
      (params: BatchOptProps) => {
        const { data } = params;

        return Promise.allSettled(data!.map(p => del(p)));
      },
      {
        onSuccess,
      },
    );
  };

  const stopDeployment = (params: PathParams) => {
    const patchFiled = {
      spec: {
        replicas: 0,
      },
    };
    return request.patch(getDetailUrl(params), patchFiled);
  };
  const useBatchStopDeploymentMutation = (options?: SuccessProps) => {
    const onSuccess = options?.onSuccess;
    return useMutation(
      (params: BatchOptProps) => {
        const { data } = params;
        return Promise.allSettled(data!.map(stopDeployment));
      },
      {
        onSuccess,
      },
    );
  };

  const reRun = async ({ name, cluster, namespace }: PathParams) => {
    const result = await request.get(getDetailUrl({ name, cluster, namespace }));
    const resourceVersion = get(result, 'metadata.resourceVersion');

    return request.post(
      `kapis/operations.kubesphere.io/v1alpha2${getPath({
        cluster,
        namespace,
      })}/jobs/${name}?action=rerun&resourceVersion=${resourceVersion}`,
      {},
    );
  };
  const useReRunMutation = (options?: SuccessProps) => {
    const onSuccess = options?.onSuccess;
    return useMutation(
      (params: PathParams) => {
        return reRun(params);
      },
      {
        onSuccess,
      },
    );
  };

  const switchStatus = ({
    params,
    on,
    k8sVersion,
  }: {
    params: PathParams;
    on?: boolean;
    k8sVersion?: string;
  }) => {
    const suspend = on ?? false;
    const data = { spec: { suspend: !suspend } };
    return request.patch(getDetailUrl(params, k8sVersion), data);
  };
  const useSwitchStatusMutation = (options?: SuccessProps) => {
    const onSuccess = options?.onSuccess;
    return useMutation(switchStatus, {
      onSuccess,
    });
  };

  const useRollbackMutation = (params: PathParams, options?: SuccessProps) => {
    return useMutation(
      (data: Record<string, any>) => {
        const headers =
          module === 'deployments'
            ? {
                headers: {
                  'content-type': 'application/json-patch+json',
                },
              }
            : undefined;

        return request.patch(getDetailUrl(params), data, headers);
      },
      {
        onSuccess: options?.onSuccess,
      },
    );
  };

  return {
    ...BaseStore,
    module,
    mapper,
    delete: del,
    batchDelete,
    reRun,
    useReRunMutation,
    getReplica,
    switchStatus,
    useGetDetail,
    useUpdateDeploymentMutation,
    useDeleteDeploymentMutation,
    useBatchDeleteWorkloadMutation,
    useBatchStopDeploymentMutation,
    useSwitchStatusMutation,
    useRollbackMutation,
  };
};

export default workloadStore;
