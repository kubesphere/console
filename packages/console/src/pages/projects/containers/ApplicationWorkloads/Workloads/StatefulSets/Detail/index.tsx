/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import { isEmpty, get } from 'lodash';
import React, { useEffect, useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Loading, notify } from '@kubed/components';
import { useCacheStore as useStore } from '@ks-console/shared';
import { useDisclosure } from '@kubed/hooks';
import {
  Icon,
  RecreateModal,
  DeleteConfirmModal,
  workloadStore,
  DetailPagee,
  getDisplayName,
  formatTime,
  useCommonActions,
  useV3action,
  hasClusterModule,
  hpaStore,
  ClusterAliasName,
  ProjectAliasName,
} from '@ks-console/shared';
import {
  useWorkloadService,
  useRollbackModal,
  useAutoScalingModal,
} from '../../../../../../clusters/hooks/useModal';
import type { FormattedWorkload } from '@ks-console/shared';
import { Firewall } from '@kubed/icons';

const module = 'statefulsets';
const WORKLOAD_TYPE = 'STATEFULSET';
const store = workloadStore(module);
const {
  useGetDetail,
  useUpdateDeploymentMutation,
  useDeleteDeploymentMutation,
  useRollbackMutation,
} = store;
const { usePatchHpaMutation } = hpaStore;

const StatefulSetsDetail = () => {
  const authKey = module;
  const params = useParams();
  const { cluster, namespace, name } = params;
  const navigate = useNavigate();

  const k8sVersion = globals.clusterConfig?.[cluster!]?.k8sVersion;

  const listUrl = useMemo(() => {
    return `/clusters/${cluster}/statefulsets`;
  }, []);

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
  const [sharedDetail, setDetailProps] = useStore('StatefulSetDetailProps', {
    module,
    detail: {},
    isLoading: false,
    isError: false,
  });

  const {
    open: openDeleteModal,
    close: closeDeleteModal,
    isOpen: deleteModalIsOpen,
  } = useDisclosure();

  const {
    open: openRecreateModal,
    close: closeRecreateModal,
    isOpen: recreateModalIsOpen,
  } = useDisclosure();

  const { editBaseInfo, editYaml } = useCommonActions({
    store,
    params,
    callback: () => refetch(),
  });

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

  const { editWorkloadService } = useWorkloadService({ callback: refetch });

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
  const isCustomScaling = useMemo(() => {
    const labels = get(detail, 'labels', {});
    return Object.keys(labels).includes('autoscaling.kubeshpere.io/name');
  }, [detail]);

  useEffect(() => {
    setDetailProps({ module, detail, isLoading, isError });
  }, [detail]);

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
  const tabs = useMemo(() => {
    const path = `/clusters/${cluster}/projects/${namespace}/statefulsets/${name}`;

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
        value: creator ? creator : '',
      },
    ];
  }, [detail]);

  const { open, render: renderV3Modal } = useV3action();

  const isExtensionEnabledInCluster = hasClusterModule(cluster!, 'metrics-server');
  const actions = () => {
    return [
      {
        key: 'edit',
        icon: <Icon name="pen" />,
        text: t('EDIT_INFORMATION'),
        action: 'edit',
        onClick: () => editBaseInfo(detail),
      },
      {
        key: 'rollBack',
        icon: <Icon name="timed-task" />,
        text: t('ROLL_BACK'),
        action: 'edit',
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
        key: 'editService',
        show: detail.spec.serviceName,
        icon: <Icon name="network-router" />,
        text: t('EDIT_SERVICE'),
        action: 'edit',
        onClick: () => editWorkloadService({ type: 'Headless', detail }),
      },
      {
        key: 'editConfigTemplate',
        icon: <Icon name="storage" />,
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
        icon: <Icon name="pen" />,
        text: t('EDIT_YAML'),
        action: 'edit',
        onClick: () => editYaml(detail),
      },
      {
        key: 'redeploy',
        icon: <Icon name="restart" />,
        text: t('RECREATE'),
        action: 'edit',
        onClick: () => openRecreateModal(),
      },
      {
        key: 'delete',
        icon: <Icon name="trash" />,
        text: t('DELETE'),
        action: 'delete',
        onClick: () => openDeleteModal(),
      },
    ];
  };

  const handleRecreate = () => {
    mutateRecreateOpt({
      params: {
        cluster,
        namespace: detail.namespace,
        name: detail.name,
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
              label: t('STATEFULSET_PL'),
              url: listUrl,
            },
          }}
        />
      )}
      {renderRollbackModal()}
      {recreateModalIsOpen && (
        <RecreateModal
          visible={recreateModalIsOpen}
          name={detail.name}
          type={WORKLOAD_TYPE}
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
      {renderV3Modal()}
      {renderAutoScalingModal()}
    </>
  );
};

export default StatefulSetsDetail;
