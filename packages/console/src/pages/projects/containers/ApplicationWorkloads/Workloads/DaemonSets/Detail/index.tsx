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
import { hasClusterModule, useV3action } from '@ks-console/shared';

import {
  Icon,
  RecreateModal,
  DeleteConfirmModal,
  workloadStore,
  DetailPagee,
  getDisplayName,
  formatTime,
  useCommonActions,
  ClusterAliasName,
  ProjectAliasName,
} from '@ks-console/shared';
import { useRollbackModal, useBaseInfoModal } from '../../../../../../clusters/hooks/useModal';
import type { FormattedWorkload } from '@ks-console/shared';

const module = 'daemonsets';
const WORKLOAD_TYPE = 'DAEMONSET';

const store = workloadStore(module);
const {
  useGetDetail,
  useUpdateDeploymentMutation,
  useDeleteDeploymentMutation,
  useRollbackMutation,
} = store;

const DaemonSetDetail = () => {
  const authKey = module;
  const params = useParams();
  const { cluster, namespace, name } = params;
  const navigate = useNavigate();

  const listUrl = useMemo(() => {
    return `/clusters/${cluster}/daemonsets`;
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
  const [, setDetailProps] = useStore('DaemonSetDetailProps', {
    module,
    detail: {},
    isLoading: false,
    isError: false,
  });

  const { renderBaseInfoModal, setEditBaseInfoVisible } = useBaseInfoModal<
    FormattedWorkload['_originData']
  >({
    params: {
      cluster,
      name,
      namespace,
    },
    data: detail?._originData,
    usePatchMutation: useUpdateDeploymentMutation({
      onSuccess: () => {
        notify.success(t('UPDATE_SUCCESSFUL'));
        setEditBaseInfoVisible(false);
        refetch();
      },
    }),
  });

  const { editBaseInfo, editYaml } = useCommonActions({
    store,
    params: {
      cluster,
      namespace: detail?.namespace,
      name: detail?.name,
    },
    callback: () => refetch(),
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

  const { mutate: mutateRecreateOpt, isLoading: recreateIsLoading } = useUpdateDeploymentMutation({
    onSuccess: () => {
      notify.success(t('RECREATE_SUCCESS_DESC'));
      closeRecreateModal();
      refetch();
    },
  });
  const { mutate: mutateDeleteOpt, isLoading: deleteIsLoading } = useDeleteDeploymentMutation({
    onSuccess: () => {
      notify.success(t('DELETED_SUCCESSFULLY'));
      closeDeleteModal();
      navigate(listUrl);
    },
  });

  useEffect(() => {
    setDetailProps({ module, detail, isLoading, isError });
  }, [detail]);

  const tabs = useMemo(() => {
    const path = `/clusters/${cluster}/projects/${namespace}/daemonsets/${name}`;
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

  const actions = () => {
    return [
      {
        key: 'edit',
        icon: <Icon name="pen" />,
        text: t('EDIT_INFORMATION'),
        action: 'edit',
        show: true,
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
      // {
      //   key: 'editHpa',
      //   icon: <Icon name="firewall" />,
      //   text: t('EDIT_AUTOSCALING'),
      //   disabled: isCustomScaling,
      //   action: 'edit',
      //   onClick: () => {
      //     console.log('hpa');
      //   },
      // },
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
  const handleDelete = () => {
    mutateDeleteOpt({
      cluster,
      name: detail?.name,
      namespace: detail?.namespace,
      annotations: detail?.annotations,
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
              label: t('DAEMONSET_PL'),
              url: listUrl,
            },
          }}
        />
      )}
      {renderBaseInfoModal()}
      {renderRollbackModal()}
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
          type={WORKLOAD_TYPE}
          resource={detail.name}
          visible={deleteModalIsOpen}
          confirmLoading={deleteIsLoading}
          onOk={handleDelete}
          onCancel={() => closeDeleteModal()}
        ></DeleteConfirmModal>
      )}
      {renderV3Modal()}
    </>
  );
};

export default DaemonSetDetail;
