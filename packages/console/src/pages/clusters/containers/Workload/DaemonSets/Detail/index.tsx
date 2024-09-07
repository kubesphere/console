/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import { isEmpty, get } from 'lodash';
import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Loading, notify } from '@kubed/components';
import { useCacheStore as useStore } from '@ks-console/shared';
import {
  Icon,
  EditYamlModal,
  RecreateModal,
  DeleteConfirmModal,
  workloadStore,
  DetailPagee,
  getDisplayName,
  formatTime,
  yaml,
  ClusterAliasName,
  ProjectAliasName,
} from '@ks-console/shared';
import { useRollbackModal, useBaseInfoModal } from '../../../../hooks/useModal';
import type { FormattedWorkload } from '@ks-console/shared';
import type { EditYamlConfig, ModalBaseConfig } from '../../../../types/workload';

const {
  useGetDetail,
  useUpdateDeploymentMutation,
  useDeleteDeploymentMutation,
  useRollbackMutation,
} = workloadStore('daemonsets');
const WORKLOAD_TYPE = 'DAEMONSET';

const DaemonSetDetail = () => {
  const module = 'daemonsets';
  const authKey = module;
  const { cluster, namespace, name } = useParams();
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

  const [deleteConfig, setDeleteConfig] = useState<ModalBaseConfig<FormattedWorkload>>();
  const [recreateConfig, setRecreateConfig] = useState<ModalBaseConfig<FormattedWorkload>>();
  const [editYamlConfig, setEditYamlConfig] = useState<EditYamlConfig<FormattedWorkload>>({
    editResource: null,
    visible: false,
    yaml: '',
    readOnly: false,
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

  const { mutate: mutateUpdateYamlOpt, isLoading: yamlIsLoading } = useUpdateDeploymentMutation({
    onSuccess: () => {
      notify.success(t('UPDATE_SUCCESSFUL'));
      setEditYamlConfig({
        visible: false,
        yaml: '',
        readOnly: false,
        editResource: null,
      });
      refetch();
    },
  });
  const { mutate: mutateRecreateOpt, isLoading: recreateIsLoading } = useUpdateDeploymentMutation({
    onSuccess: () => {
      notify.success(t('RECREATE_SUCCESS_DESC'));
      setRecreateConfig({
        visible: false,
        source: null,
      });
      refetch();
    },
  });
  const { mutate: mutateDeleteOpt, isLoading: deleteIsLoading } = useDeleteDeploymentMutation({
    onSuccess: () => {
      notify.success(t('DELETED_SUCCESSFULLY'));
      setDeleteConfig({
        visible: false,
        source: null,
      });
      navigate(listUrl);
    },
  });

  useEffect(() => {
    setDetailProps({ module, detail, isLoading, isError });
  }, [detail]);

  const tabs = useMemo(() => {
    const path = `/clusters/${cluster}/projects/${namespace}/daemonsets/${name}`;
    return [
      {
        title: t('RESOURCE_STATUS'),
        path: `${path}/resource-status`,
      },
      {
        title: t('REVISION_RECORDS'),
        path: `${path}/revision-control`,
      },
      {
        title: t('METADATA'),
        path: `${path}/metadata`,
      },
      {
        title: t('ENVIRONMENT_VARIABLE_PL'),
        path: `${path}/env`,
      },
      {
        title: t('EVENT_PL'),
        path: `${path}/events`,
      },
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

  const actions = () => {
    return [
      {
        key: 'edit',
        icon: <Icon name="pen" />,
        text: t('EDIT_INFORMATION'),
        action: 'edit',
        show: true,
        onClick: () => {
          setEditBaseInfoVisible(true);
        },
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
      // {
      //   key: 'editConfigTemplate',
      //   icon: <Icon name="storage" />,
      //   text: t('EDIT_SETTINGS'),
      //   action: 'edit',
      //   onClick: () => {
      //     console.log('template');
      //   },
      // },
      {
        key: 'editYaml',
        icon: <Icon name="pen" />,
        text: t('EDIT_YAML'),
        action: 'edit',
        onClick: () => {
          const originData = get(detail, '_originData', {});
          setEditYamlConfig({
            editResource: detail as FormattedWorkload,
            yaml: yaml.getValue(originData),
            visible: true,
            readOnly: false,
          });
        },
      },
      {
        key: 'redeploy',
        icon: <Icon name="restart" />,
        text: t('RECREATE'),
        action: 'edit',
        onClick: () => {
          setRecreateConfig({
            visible: true,
            source: detail as FormattedWorkload,
          });
        },
      },
      {
        key: 'delete',
        icon: <Icon name="trash" />,
        text: t('DELETE'),
        action: 'delete',
        onClick: () => {
          setDeleteConfig({
            visible: true,
            source: detail as FormattedWorkload,
          });
        },
      },
    ];
  };

  const handleUpdateYaml = (value: string) => {
    mutateUpdateYamlOpt({
      params: {
        cluster,
        name: editYamlConfig.editResource?.name,
        namespace: editYamlConfig.editResource?.namespace,
      },
      data: yaml.load(value),
    });
  };
  const handleRecreateCancel = () => {
    setRecreateConfig({
      visible: false,
      source: null,
    });
  };
  const handleRecreate = () => {
    mutateRecreateOpt({
      params: {
        cluster,
        namespace: recreateConfig?.source?.namespace,
        name: recreateConfig?.source?.name,
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
  const handleCancelDelete = () => {
    setDeleteConfig({
      visible: false,
      source: null,
    });
  };
  const handleDelete = () => {
    mutateDeleteOpt({
      cluster,
      name: deleteConfig?.source?.name,
      namespace: deleteConfig?.source?.namespace,
      annotations: deleteConfig?.source?.annotations,
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
      {editYamlConfig.visible && (
        <EditYamlModal
          visible={editYamlConfig.visible}
          yaml={editYamlConfig.yaml}
          readOnly={editYamlConfig.readOnly}
          confirmLoading={yamlIsLoading}
          onCancel={() =>
            setEditYamlConfig({
              ...editYamlConfig,
              visible: false,
            })
          }
          onOk={handleUpdateYaml}
        />
      )}
      {recreateConfig?.visible && (
        <RecreateModal
          visible={recreateConfig?.visible}
          name={recreateConfig.source!.name}
          type={WORKLOAD_TYPE}
          confirmLoading={recreateIsLoading}
          onOk={handleRecreate}
          onCancel={handleRecreateCancel}
        />
      )}
      {deleteConfig?.visible && (
        <DeleteConfirmModal
          visible={deleteConfig?.visible}
          type={WORKLOAD_TYPE}
          resource={deleteConfig.source?.name}
          confirmLoading={deleteIsLoading}
          onOk={handleDelete}
          onCancel={handleCancelDelete}
        ></DeleteConfirmModal>
      )}
    </>
  );
};

export default DaemonSetDetail;
