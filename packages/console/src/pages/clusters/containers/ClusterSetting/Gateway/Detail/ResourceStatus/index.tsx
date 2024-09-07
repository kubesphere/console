/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import React, { useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { isEmpty } from 'lodash';
import {
  PodsCard,
  ContainerPortsCard,
  getActions,
  gatewayStore,
  gatewayMonitorStore,
  ReplicaCard,
  useDetailPage,
  FormattedGateway,
} from '@ks-console/shared';
import styled from 'styled-components';
import { useMutation, useQuery } from 'react-query';
import { notify } from '@kubed/components';

const CardWrapper = styled.div`
  margin-top: 12px;
`;

const { getApi, getGatewayParams } = gatewayMonitorStore;
const { gatewayPodsUrl, getGatewayPods, fetchDetail, scale } = gatewayStore;

const ResourceStatus = () => {
  const params = useParams();
  const { cluster, namespace } = params;

  const { detail, refetch } = useDetailPage<FormattedGateway>();
  const currentCluster = useMemo(() => {
    const url = location.pathname;
    return url.indexOf('federatedprojects') > -1
      ? (localStorage.getItem('federated-cluster') as string)
      : cluster;
  }, [cluster]);

  const prefix = useMemo(() => {
    return `/clusters/${currentCluster}`;
  }, [currentCluster]);

  const enabledActions = getActions({
    module: 'gateways',
    ...params,
    project: params.namespace,
  });

  const enableScaleReplica = enabledActions.includes('edit') && !detail?.isFedManaged;

  const { data: gatewayPods = {}, refetch: refetchGatewayPods } = useQuery(
    ['gatewayReplica', params],
    async () => {
      return getGatewayPods(params);
    },
  );

  const scaleSuccess = () => {
    refetch?.();
    refetchGatewayPods?.();
  };

  const { mutate } = useMutation(
    async (newReplicas: number) => {
      const lastestGateway = await fetchDetail({ cluster: currentCluster, namespace });
      if (lastestGateway?.resourceVersion === detail?.resourceVersion) {
        scale({ cluster: currentCluster, namespace }, newReplicas, detail!._originData);
      } else {
        // TODO: notify.info
        notify.error(t('GATEWAY_UPDATING_TIP'));
      }
    },
    { onSuccess: scaleSuccess },
  );

  const handleScale = (newReplicas: number) => {
    mutate(newReplicas);
  };

  const renderReplicaInfo = () => {
    return (
      <ReplicaCard
        module="gateways"
        detail={isEmpty(gatewayPods) ? detail : { ...detail, pods: gatewayPods }}
        onScale={handleScale}
        enableScale={enableScaleReplica}
      />
    );
  };

  const renderPort = () => {
    const { ports } = detail || {};

    if (isEmpty(ports) || !ports) return null;

    const $ports = ports.map((item: any) => {
      item.containerPort = item.nodePort;
      return item;
    });

    return (
      <CardWrapper>
        <ContainerPortsCard ports={$ports as any[]} />
      </CardWrapper>
    );
  };

  const renderPods = () => {
    if (!detail) {
      return null;
    }

    return (
      <PodsCard
        prefix={prefix}
        detail={detail}
        monitorOptions={{
          getApiFn: getApi,
          getParamsFn: getGatewayParams,
        }}
        queryOptions={{
          url: `${gatewayPodsUrl({
            ...params,
            cluster: currentCluster,
          })}/pods`,
        }}
      />
    );
  };

  return (
    <div>
      {renderReplicaInfo()}
      {renderPort()}
      {renderPods()}
    </div>
  );
};

export default ResourceStatus;
