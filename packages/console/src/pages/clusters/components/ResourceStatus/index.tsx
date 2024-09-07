/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import React, { useState, useMemo, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { isNil, uniqBy, flatten, isEmpty, get, debounce } from 'lodash';
import { useCacheStore as useStore } from '@ks-console/shared';
import {
  workloadStore,
  PodsCard,
  ContainerPortsCard,
  hpaStore,
  ReplicaCard,
  getActions,
  getApiVersion,
} from '@ks-console/shared';
import HpaCard from '../Cards/HpaCard';

import { CardWrapper } from './styles';
interface IProps {
  detailPropsName: string;
}

type PodsCardRefType = {
  reFetch: () => void;
};

const { checkName, fetchDetail } = hpaStore;

const ResourceStatus = ({ detailPropsName }: IProps) => {
  const params = useParams();
  const { workspace, cluster } = params;
  const [props, setDetailProps] = useStore(detailPropsName);
  const { detail = {}, module, isLoading } = props;
  const podscardRef = useRef<PodsCardRefType>(null);
  const [needUpdate, setUpdate] = useState(false);
  const enabledActions = getActions({
    module,
    ...params,
    project: params.namespace,
  });

  const enableScaleReplica: boolean = enabledActions.includes('edit');

  const enabledCancelHpa: boolean = enabledActions.includes('edit');

  const { getReplica, patch } = workloadStore(module);

  const replateData = useMemo(() => {
    let status = {} as { current: number; desire: number };

    switch (module) {
      default:
      case 'deployments': {
        status = {
          current: detail.availablePodNums || 0,
          desire: detail.podNums || 0,
        };
        break;
      }
      case 'statefulsets': {
        status = {
          current: get(detail, 'status.currentReplicas', detail.readyPodNums),
          desire: detail.podNums || 0,
        };
        break;
      }
      case 'daemonsets': {
        status = {
          current: get(detail, 'status.numberReady', 0),
          desire: get(detail, 'status.desiredNumberScheduled', 0),
        };
        break;
      }
      case 'gateways': {
        status = {
          current: Array.isArray(detail.pods) ? detail.pods.length : 1,
          desire: get(detail, 'replicas', 0),
        };
      }
    }
    return status;
  }, [detail, module]);

  const fetchReplica = debounce(async () => {
    const res = await getReplica(params);
    setDetailProps({ ...props, detail: res });
    if (!needUpdate) {
      setUpdate(true);
    }
  }, 500);

  const fetchContainerData = async () => {
    if (needUpdate) {
      await podscardRef.current?.reFetch();
      setUpdate(false);
    }
  };

  useEffect(() => {
    const { current, desire } = replateData;
    if (current !== desire) {
      fetchReplica();
    }
    if (current === desire && needUpdate) {
      fetchContainerData();
    }
  }, [needUpdate]);

  const [hpaDetail, setHpaDetail] = useState<Record<string, any>>({});

  const fetchHpaDetail = async () => {
    const k8sVersion = globals.clusterConfig?.[params.cluster!]?.k8sVersion;
    const version = getApiVersion('horizontalpodautoscalers', k8sVersion);
    const url = `/clusters/${params.cluster}/apis/${version}/namespaces/${params.namespace}/horizontalpodautoscalers/${params.name}`;
    checkName(detail, {}, url).then(async (resp: any) => {
      if (resp.exist) {
        const result = await fetchDetail({ ...detail, ...params }, url);
        setHpaDetail(result);
      }
    });
  };

  useEffect(() => {
    fetchHpaDetail();
  }, [props]);

  const renderPort = () => {
    const { noPorts } = props;

    if (noPorts) {
      return null;
    }

    let { containers } = detail;
    containers = isNil(containers) ? [] : containers;
    const ports = uniqBy(
      flatten(
        containers.map((container: any) => (isEmpty(container.ports) ? [] : container.ports)),
      ),
      'name',
    );

    if (isEmpty(ports)) return null;

    return (
      <CardWrapper>
        <ContainerPortsCard ports={ports as any[]} loading={isLoading} />
      </CardWrapper>
    );
  };

  const prefix = useMemo(() => {
    return `${workspace ? `/${workspace}` : ''}/clusters/${cluster}`;
  }, [workspace, cluster]);

  const renderPods = () => {
    return (
      <CardWrapper>
        <PodsCard ref={podscardRef} prefix={prefix} detail={detail} onRefresh={fetchReplica} />
      </CardWrapper>
    );
  };

  const handleDeleteHpa = () => {
    patch(detail, {
      metadata: {
        annotations: {
          'kubesphere.io/relatedHPA': null,
        },
      },
    }).then(() => {
      setHpaDetail({});
    });
  };

  const renderHpaConfig = () => {
    if (!hpaDetail?.name) {
      return null;
    }
    const k8sVersion = globals.clusterConfig?.[params.cluster!]?.k8sVersion;

    return (
      <CardWrapper>
        <HpaCard
          enabledCancelHpa={enabledCancelHpa}
          k8sVersion={k8sVersion}
          hpaDetail={hpaDetail}
          onDeleted={handleDeleteHpa}
        />
      </CardWrapper>
    );
  };

  const onScale = async (value: number) => {
    const data = { spec: { replicas: value } };
    await patch(detail, data);
    await fetchReplica();
  };

  return isEmpty(detail) ? null : (
    <>
      <ReplicaCard
        module={module}
        detail={{
          ...detail,
        }}
        onScale={onScale}
        enableScale={enableScaleReplica}
      />
      {renderHpaConfig()}
      {renderPort()}
      {renderPods()}
    </>
  );
};

export default ResourceStatus;
