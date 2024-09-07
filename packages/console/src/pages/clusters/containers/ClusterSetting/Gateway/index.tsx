/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import React, { useMemo, useRef } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { isEmpty, set } from 'lodash';
import { Banner, LoadingOverlay, Navs, notify } from '@kubed/components';
import { Loadbalancer } from '@kubed/icons';
import { useCacheStore as useStore } from '@ks-console/shared';
import {
  getActions,
  gatewayStore,
  FormattedGateway,
  DeleteConfirmModal,
  TableRef,
} from '@ks-console/shared';
import GatewayCard from './Components/GatewayCard';
import ProjectGatewayList from './Components/ProjectGatewayList';
import GatewaySetting from './GatewaySetting';
import GatewayUpdateModal from './Components/GatewayUpdate';

export interface GatewayConfig {
  setVisible: boolean;
  deleteVisible: boolean;
  updateVisible: boolean;
  gateway: null | FormattedGateway;
  payloads: Record<string, any>;
}

const LoadingWrapper = styled.div`
  height: 150px;
  background: #fff;
  position: relative;
`;

function Gateway() {
  const navigate = useNavigate();
  const location = useLocation();
  const { cluster, component } = useParams();
  const projectRef = useRef<TableRef>(null);
  const [gatewayConfigs, setGatewayConfigs] = useStore<GatewayConfig>('gatewayConfigs', {
    setVisible: false,
    deleteVisible: false,
    updateVisible: false,
    gateway: null,
    payloads: {},
  });

  const { data: gateway, isLoading, refetch } = gatewayStore.useGetMutation({ cluster });

  const resetConfigs = () =>
    setGatewayConfigs({
      setVisible: false,
      deleteVisible: false,
      updateVisible: false,
      gateway: null,
      payloads: {},
    });

  const { mutate: mutateCreate, isLoading: isCreateLoading } = gatewayStore.usePostMutation(
    { cluster },
    {
      onSuccess: () => {
        resetConfigs();
        refetch();
        projectRef.current?.refetch();
        notify.success(t('CREATE_SUCCESSFUL'));
      },
    },
  );

  const { mutate: mutateEdit, isLoading: isEditLoading } = gatewayStore.usePutMutation(
    { cluster },
    {
      onSuccess: () => {
        resetConfigs();
        refetch();
        projectRef.current?.refetch();
        notify.success(t('UPDATE_SUCCESSFUL'));
      },
    },
  );

  const { mutate: mutateDelete, isLoading: isDeleteLoading } = gatewayStore.useBatchDeleteMutation({
    onSuccess: () => {
      resetConfigs();
      refetch();
      projectRef.current?.refetch();
      notify.success(t('DISABLE_SUCCESSFUL'));
    },
  });

  const { mutate: mutateUpdate, isLoading: isUpdateLoading } = gatewayStore.useUpdateMutation(
    {},
    {
      onSuccess: () => {
        resetConfigs();
        refetch();
        projectRef.current?.refetch();
        notify.success(t('UPDATE_SUCCESSFUL'));
      },
    },
  );

  const navData = [
    {
      value: 'cluster',
      label: t('CLUSTER_GATEWAY'),
    },
    {
      value: 'project',
      label: t('PROJECT_GATEWAY_PL'),
    },
  ];
  const enabledActions = getActions({
    module: 'cluster-settings',
    cluster,
  });

  const onNavChange = function (value: string) {
    navigate(`/clusters/${cluster}/gateways/${value}`);
  };

  const Content = useMemo(() => {
    if (isLoading) {
      return (
        <LoadingWrapper>
          <LoadingOverlay visible />
        </LoadingWrapper>
      );
    }

    if (component === 'cluster')
      return (
        <GatewayCard
          type="cluster"
          action={enabledActions}
          gateway={gateway as FormattedGateway}
          prefix={location.pathname}
        />
      );

    if (component === 'project') {
      return <ProjectGatewayList ref={projectRef} />;
    }
    return null;
  }, [gateway, component, isLoading]);

  const handleDealGateway = async (data: any) => {
    const { namespace, name } = gatewayConfigs.payloads;
    if (gatewayConfigs.gateway) {
      const latestData = await gatewayStore.fetchDetail({ cluster, namespace, name });
      if (latestData?.resourceVersion === gatewayConfigs.gateway?.resourceVersion) {
        set(data, 'metadata.resourceVersion', latestData?.resourceVersion);
        mutateEdit({
          params: { cluster, namespace, name },
          data,
        });
      } else {
        notify(t('GATEWAY_UPDATING_TIP'));
      }
    } else {
      set(data, 'metadata', {
        namespace,
        name,
        creator: globals.user.username,
        createTime: new Date(),
        annotations: { ...data.metadata.annotations },
      });
      if (namespace !== 'kubesphere-controls-system') {
        set(data, 'spec.controller.scope', { enabled: true, namespace });
      }
      mutateCreate({
        data,
      });
    }
  };

  const handleDeleteGateway = () => {
    const items =
      gatewayConfigs.payloads?.reqs?.length > 1 ? gatewayConfigs.payloads?.reqs : [{ cluster }];
    mutateDelete({
      items,
      isOld: isEmpty(gateway?.createTime),
    });
  };

  const handleUpdateGateway = () => {
    if (gateway?._originData) {
      mutateUpdate({
        data: gateway._originData,
        params: {
          cluster,
          namespace: gatewayConfigs.payloads?.namespace,
          gatewayName: gateway._originData.metadata.name,
        },
      });
    }
  };

  return (
    <>
      <Banner
        icon={<Loadbalancer />}
        title={t('GATEWAY_SETTINGS')}
        description={t('CLUSTER_GATEWAY_DESC')}
        className="mb12"
      >
        <Navs data={navData} defaultValue={component} onChange={onNavChange} />
      </Banner>
      {Content}
      {gatewayConfigs.setVisible && (
        <GatewaySetting
          visible={gatewayConfigs.setVisible}
          template={gatewayConfigs.gateway?._originData}
          onCancel={resetConfigs}
          confirmLoading={isCreateLoading || isEditLoading}
          onOk={handleDealGateway}
        />
      )}
      {gatewayConfigs.deleteVisible && (
        <DeleteConfirmModal
          visible={gatewayConfigs.deleteVisible}
          type={gatewayConfigs.payloads.type || 'GATEWAY'}
          resource={gatewayConfigs.payloads.resource}
          tip={
            gatewayConfigs.payloads.resource
              ? t('DELETE_RESOURCE_TYPE_DESC_GW', {
                  resource: gatewayConfigs.payloads.resource,
                  type: t('GATEWAY_LOW'),
                })
              : t('DISABLE_GATEWAY_TIP')
          }
          confirmLoading={isDeleteLoading}
          title={
            gatewayConfigs.payloads?.reqs?.length > 1
              ? t('DISABLE_MULTIPLE_GATEWAYS')
              : t('DISABLE_GATEWAY')
          }
          onOk={handleDeleteGateway}
          onCancel={resetConfigs}
        />
      )}
      {gatewayConfigs.updateVisible && (
        <GatewayUpdateModal
          visible={gatewayConfigs.updateVisible}
          onOk={handleUpdateGateway}
          onCancel={resetConfigs}
          confirmLoading={isUpdateLoading}
        />
      )}
    </>
  );
}

export default Gateway;
