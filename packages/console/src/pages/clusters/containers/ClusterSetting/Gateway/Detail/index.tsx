/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import React, { useEffect, useMemo, useRef } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { isEmpty, set } from 'lodash';
import { notify } from '@kubed/components';
import { Appcenter, Pen, Trash, Update } from '@kubed/icons';
import {
  DeleteConfirmModal,
  DetailPage,
  FormattedGateway,
  formatTime,
  gatewayStore,
} from '@ks-console/shared';
import { useCacheStore as useStore, ClusterAliasName } from '@ks-console/shared';
import { GatewayConfig } from '..';
import GatewaySetting from '../GatewaySetting';

const Detail = () => {
  const { cluster, namespace, workspace, component, gatewayName } = useParams();
  const ref = useRef<{
    detail: FormattedGateway;
    refetch: () => void;
  }>(null);

  const location = useLocation();
  const navigate = useNavigate();
  const [gatewayConfigs, setGatewayConfigs] = useStore<GatewayConfig>('gatewayConfigs', {
    setVisible: false,
    deleteVisible: false,
    updateVisible: false,
    gateway: null,
    payloads: {},
  });
  const currentCluster = useMemo(() => {
    const url = location.pathname;
    return url.indexOf('federatedprojects') > -1
      ? (localStorage.getItem('federated-cluster') as string)
      : cluster;
  }, [cluster]);

  const listUrl = useMemo(() => {
    return workspace
      ? `${location.pathname.split('gateways')[0]}gateways`
      : `${location.pathname.split('gateways')[0]}gateways/cluster`;
  }, [workspace]);

  const resetConfigs = () =>
    setGatewayConfigs({
      setVisible: false,
      deleteVisible: false,
      updateVisible: false,
      gateway: null,
      payloads: {},
    });

  const { mutate: mutateEdit, isLoading: isEditLoading } = gatewayStore.usePutMutation(
    { cluster },
    {
      onSuccess: () => {
        ref.current?.refetch();
        resetConfigs();
        notify.success(t('UPDATE_SUCCESSFUL'));
      },
    },
  );

  const { mutate: mutateDelete, isLoading: isDeleteLoading } = gatewayStore.useBatchDeleteMutation({
    onSuccess: () => {
      resetConfigs();
      notify.success(t('DISABLE_SUCCESSFUL'));
      navigate(listUrl);
    },
  });

  useEffect(() => {
    return () => localStorage.removeItem('federated-cluster');
  }, []);

  const attrs = (detail: FormattedGateway) => {
    if (isEmpty(detail)) {
      return [];
    }

    return [
      {
        label: t('CLUSTER'),
        value: <ClusterAliasName cluster={currentCluster} />,
      },
      {
        label: t('CREATION_TIME'),
        value: detail.createTime ? formatTime(detail.createTime) : '',
      },
      {
        label: t('UPDATE_TIME_TCAP'),
        value: detail.updateTime ? formatTime(detail.updateTime) : '',
      },
      {
        label: t('CREATOR'),
        value: detail.creator || '-',
      },
    ];
  };

  const actions = [
    {
      key: 'edit',
      icon: <Pen />,
      text: t('EDIT'),
      action: 'manage',
      onClick: () => {
        setGatewayConfigs({
          ...gatewayConfigs,
          setVisible: true,
          gateway: ref.current?.detail || null,
          payloads: {
            cluster: currentCluster,
            namespace,
          },
        });
      },
    },
    {
      key: 'update',
      icon: <Update />,
      text: t('UPDATE'),
      action: 'manage',
      show: !!isEmpty(ref.current?.detail.createTime),
      disabled: !isEmpty(ref.current?.detail.createTime),
      onClick: () => {
        setGatewayConfigs({
          ...gatewayConfigs,
          setVisible: true,
          gateway: ref.current?.detail || null,
          payloads: {
            cluster: currentCluster,
            namespace,
          },
        });
      },
    },
    {
      key: 'delete',
      icon: <Trash />,
      text: t('DISABLE'),
      action: 'delete',
      onClick: () => {
        setGatewayConfigs({
          ...gatewayConfigs,
          deleteVisible: true,
          gateway: ref.current?.detail || null,
          payloads: {
            cluster: currentCluster,
            namespace,
          },
        });
      },
    },
  ];

  const path = `/clusters/${cluster}/gateways/${component}/${gatewayName}`;

  const tabs = [
    {
      title: t('MONITORING'),
      path: `${path}/monitors`,
      clusterModule: 'whizard-monitoring',
    },
    {
      title: t('CONFIGURATION_OPTIONS'),
      path: `${path}/gateway-configs`,
    },
    {
      title: t('GATEWAY_LOGS'),
      path: `${path}/logs`,
      ksModule: 'whizard-logging',
    },
    {
      title: t('RESOURCE_STATUS'),
      path: `${path}/resource-status`,
    },
    {
      title: t('METADATA'),
      path: `${path}/metadata`,
    },
  ];

  const handleDealGateway = async (data: any) => {
    if (gatewayConfigs.gateway) {
      const latestData = await gatewayStore.fetchDetail({ cluster });
      if (latestData?.resourceVersion === ref.current?.detail?.resourceVersion) {
        set(data, 'metadata.resourceVersion', latestData?.resourceVersion);
        mutateEdit({
          data,
        });
      } else {
        notify(t('GATEWAY_UPDATING_TIP'));
      }
    }
  };

  const handleDeleteGateway = () => {
    const items =
      gatewayConfigs.payloads?.reqs?.length > 1 ? gatewayConfigs.payloads?.reqs : [{ cluster }];
    mutateDelete({ items, isOld: isEmpty(ref.current?.detail?.createTime) });
  };

  return (
    <>
      {gatewayConfigs.setVisible && (
        <GatewaySetting
          visible={gatewayConfigs.setVisible}
          template={gatewayConfigs.gateway?._originData}
          onCancel={resetConfigs}
          confirmLoading={isEditLoading}
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
      <DetailPage
        store={gatewayStore}
        tabs={tabs}
        ref={ref}
        authKey="gateways"
        params={{
          cluster,
          namespace,
        }}
        sideProps={{
          actions,
          attrs,
          icon: <Appcenter size={28} />,
          breadcrumbs: {
            label: workspace ? t('PROJECT_GATEWAY') : t('CLUSTER_GATEWAY'),
            url: listUrl,
            listName: '',
          },
        }}
      />
    </>
  );
};

export default Detail;
