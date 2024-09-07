/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import React, { useEffect, useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { isEmpty, get } from 'lodash';
import { DeleteConfirmModal, useCacheStore as useStore } from '@ks-console/shared';
import { useDisclosure } from '@kubed/hooks';
import { Loading, notify } from '@kubed/components';
import { Pen, TimedTask, Restart, Firewall, Trash, Storage } from '@kubed/icons';
import {
  RecreateModal,
  workloadStore,
  hpaStore,
  DetailPagee,
  getDisplayName,
  formatTime,
  useCommonActions,
  useV3action,
  hasClusterModule,
  ClusterAliasName,
  ProjectAliasName,
} from '@ks-console/shared';
import { useRollbackModal, useAutoScalingModal } from '../../../../../../clusters/hooks/useModal';
import type { FormattedWorkload } from '@ks-console/shared';

const module = 'deployments';
const WORKLOAD_TYPE = 'DEPLOYMENT';
const store = workloadStore(module);
const { usePatchHpaMutation } = hpaStore;

const DeploymentDetail = () => {
  const authKey = module;
  const params = useParams();
  const { cluster, namespace, name } = params;
  const navigate = useNavigate();
  const {
    useGetDetail,
    useUpdateDeploymentMutation,
    useRollbackMutation,
    useDeleteDeploymentMutation,
  } = store;

  const k8sVersion = globals.clusterConfig?.[cluster!]?.k8sVersion;

  const {
    data: detail,
    isLoading,
    isError,
    refetch,
  } = useGetDetail({
    cluster,
    name,
    namespace,
  });

  const [sharedDetail, setDetailProps] = useStore('DeploymentDetailProps', {
    module,
    detail: {},
    isLoading: false,
    isError: false,
  });

  const listUrl = useMemo(() => {
    return `/clusters/${cluster}/deployments`;
  }, []);

  const tabs = useMemo(() => {
    const path = `/clusters/${cluster}/projects/${namespace}/deployments/${name}`;

    return cluster && hasClusterModule(cluster, 'whizard-monitoring')
      ? [
          { title: t('RESOURCE_STATUS'), path: `${path}/resource-status` },
          { title: t('REVISION_RECORDS'), path: `${path}/revision-control` },
          { title: t('METADATA'), path: `${path}/metadata` },
          { title: t('MONITORING'), path: `${path}/monitors` },
          { title: t('ENVIRONMENT_VARIABLE_PL'), path: `${path}/env` },
          { title: t('EVENT_PL'), path: `${path}/events` },
        ]
      : [
          { title: t('RESOURCE_STATUS'), path: `${path}/resource-status` },
          { title: t('REVISION_RECORDS'), path: `${path}/revision-control` },
          { title: t('METADATA'), path: `${path}/metadata` },
          { title: t('ENVIRONMENT_VARIABLE_PL'), path: `${path}/env` },
          { title: t('EVENT_PL'), path: `${path}/events` },
        ];
  }, []);

  const isCustomScaling = useMemo(() => {
    const labels = get(detail, 'labels', {});
    return Object.keys(labels).includes('autoscaling.kubeshpere.io/name');
  }, [detail]);

  const attrs = useMemo(() => {
    if (isEmpty(detail)) {
      return [];
    }

    const { app, createTime, updateTime, creator } = detail;

    return [
      {
        label: t('CLUSTER'),
        value: <ClusterAliasName cluster={cluster} />,
      },
      {
        label: t('PROJECT'),
        value: <ProjectAliasName project={namespace} />,
      },
      {
        label: t('APP'),
        value: app ? app : '-',
      },
      {
        label: t('CREATION_TIME_TCAP'),
        value: formatTime(createTime),
      },
      {
        label: t('UPDATE_TIME_TCAP'),
        value: formatTime(updateTime),
      },
      {
        label: t('CREATOR'),
        value: creator,
      },
    ];
  }, [detail]);

  const { editBaseInfo, editYaml } = useCommonActions({
    store,
    params: {
      cluster,
      namespace: detail?.namespace,
      name: detail?.name,
    },
    callback: (type: string) => {
      switch (type) {
        case 'delete':
          navigate('/clusters/host/deployments');
          break;
        default:
          refetch();
      }
    },
  });

  const {
    open: openRecreateModal,
    close: closeRecreateModal,
    isOpen: recreateModalIsOpen,
  } = useDisclosure();

  const {
    open: openDeleteModal,
    close: closeDeleteModal,
    isOpen: deleteModalIsOpen,
  } = useDisclosure();

  const { mutate: mutateRecreateOpt, isLoading: recreateIsLoading } = useUpdateDeploymentMutation({
    onSuccess: () => {
      notify.success(t('RECREATE_SUCCESS_DESC'));
      closeRecreateModal();
      refetch();
    },
  });
  const { mutate: mutateDeleteOpt, isLoading: deleteIsLoading } = useDeleteDeploymentMutation(
    {
      onSuccess: () => {
        notify.success(t('DELETED_SUCCESSFULLY'));
        closeDeleteModal();
        navigate(listUrl);
      },
    },
    k8sVersion,
  );

  const { renderRollbackModal, setRollbackVisible } = useRollbackModal<
    FormattedWorkload['_originData']
  >({
    module,
    detail,
    data: detail?._originData,
    usePatchMutation: useRollbackMutation(
      {
        cluster,
        name,
        namespace,
      },
      {
        onSuccess: () => {
          notify.success(t('ROLLBACK_SUCCESSFUL'));
          setRollbackVisible(false);
          refetch();
        },
      },
    ),
  });

  const { renderAutoScalingModal, setScaleVisible } = useAutoScalingModal<
    FormattedWorkload['_originData']
  >({
    module,
    detail,
    data: detail?._originData,
    mutateUpdateDeploymentMutation: useUpdateDeploymentMutation({
      onSuccess: () => {
        notify.success(t('UPDATE_SUCCESSFUL'));
        setScaleVisible(false);
        refetch();
      },
    }),
    usePatchMutation: usePatchHpaMutation(
      {
        cluster,
        name,
        namespace,
      },
      {
        onSuccess: () => {
          notify.success(t('UPDATE_SUCCESSFUL'));
          setScaleVisible(false);
          refetch().then(({ data }) => {
            setDetailProps({
              ...sharedDetail,
              detail: data,
            });
          });
        },
      },
    ),
  });

  useEffect(() => {
    setDetailProps({ module, detail, isLoading, isError });
  }, [detail]);

  const { open, render: renderV3Modal } = useV3action();
  const isExtensionEnabledInCluster = hasClusterModule(cluster!, 'metrics-server');
  const actions = () => {
    return [
      {
        key: 'edit',
        icon: <Pen />,
        text: t('EDIT_INFORMATION'),
        action: 'edit',
        show: true,
        onClick: () => {
          editBaseInfo(detail);
        },
      },
      {
        key: 'rollBack',
        icon: <TimedTask />,
        text: t('ROLL_BACK'),
        action: 'edit',
        show: true,
        onClick: () => {
          setRollbackVisible(true);
        },
      },
      {
        key: 'editHpa',
        icon: <Firewall />,
        text: t('EDIT_AUTOSCALING'),
        show: Boolean(isExtensionEnabledInCluster),
        disabled: isCustomScaling,
        action: 'edit',
        onClick: () => {
          setScaleVisible(true);
        },
      },
      {
        key: 'editConfigTemplate',
        icon: <Storage />,
        text: t('EDIT_SETTINGS'),
        action: 'edit',
        onClick: () => {
          open({
            module,
            ...params,
            detail,
            v3Module: 'workload',
            v3StoreParams: module,
            hasRootStore: true,
            success: () => {
              notify.success(t('UPDATE_SUCCESSFUL'));
              refetch();
            },
          });
        },
      },
      {
        key: 'editYaml',
        icon: <Pen />,
        text: t('EDIT_YAML'),
        action: 'edit',
        show: !detail.isFedManaged,
        onClick: () => editYaml(detail),
      },
      {
        key: 'redeploy',
        icon: <Restart />,
        text: t('RECREATE'),
        action: 'edit',
        show: !detail.isFedManaged,
        onClick: () => {
          openRecreateModal();
        },
      },
      {
        key: 'delete',
        icon: <Trash />,
        text: t('DELETE'),
        action: 'delete',
        show: !detail.isFedManaged,
        onClick: () => openDeleteModal(),
      },
    ];
  };

  const handleRecreate = () => {
    mutateRecreateOpt({
      params: {
        cluster,
        namespace: detail?.namespace,
        name: detail?.name,
      },
      data: {
        spec: {
          template: {
            metadata: {
              annotations: {
                'kubesphere.io/restartedAt': new Date(),
              },
            },
          },
        },
      },
    });
  };

  return (
    <>
      {isLoading || isError ? (
        <Loading className="page-loading" />
      ) : (
        <DetailPagee
          tabs={tabs}
          cardProps={{
            name: getDisplayName(detail),
            authKey,
            params: { cluster, namespace, name },
            desc: get(detail, 'description', ''),
            actions: actions(),
            attrs,
            breadcrumbs: {
              label: t('DEPLOYMENT_PL'),
              url: listUrl,
            },
          }}
        />
      )}
      {renderV3Modal()}
      {renderRollbackModal()}
      {renderAutoScalingModal()}
      {recreateModalIsOpen && (
        <RecreateModal
          name={detail?.name}
          type={WORKLOAD_TYPE}
          visible={recreateModalIsOpen}
          confirmLoading={recreateIsLoading}
          onOk={handleRecreate}
          onCancel={() => closeRecreateModal()}
        />
      )}
      {deleteModalIsOpen && (
        <DeleteConfirmModal
          visible={deleteModalIsOpen}
          type={WORKLOAD_TYPE}
          resource={detail.name}
          confirmLoading={deleteIsLoading}
          onOk={() => {
            mutateDeleteOpt({
              cluster,
              name: detail.name,
              namespace: detail.namespace,
              annotations: detail.annotations,
            });
          }}
          onCancel={() => closeDeleteModal()}
        ></DeleteConfirmModal>
      )}
    </>
  );
};

export default DeploymentDetail;
