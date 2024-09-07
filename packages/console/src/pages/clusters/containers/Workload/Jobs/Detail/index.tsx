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
  getJobStatus,
  ClusterAliasName,
  ProjectAliasName,
} from '@ks-console/shared';
import type { FormattedWorkload } from '@ks-console/shared';
import type { EditYamlConfig, ModalBaseConfig } from '../../../../types/workload';
import { useBaseInfoModal } from '../../../../hooks/useModal';

const { useGetDetail, useUpdateDeploymentMutation, useDeleteDeploymentMutation, reRun } =
  workloadStore('jobs');
const WORKLOAD_TYPE = 'JOB';

const DaemonSetDetail = () => {
  const module = 'jobs';
  const authKey = module;
  const { cluster, namespace, name } = useParams();
  const navigate = useNavigate();

  const listUrl = useMemo(() => {
    return `/clusters/${cluster}/jobs`;
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
  const [, setDetailProps] = useStore('JobDetailProps', {
    module,
    detail: {},
    isLoading: false,
    isError: false,
  });

  const [deleteConfig, setDeleteConfig] = useState<ModalBaseConfig<FormattedWorkload>>();
  const [recreateConfig, setRecreateConfig] = useState<ModalBaseConfig<FormattedWorkload>>();
  const [editYamlConfig, setEditYamlConfig] = useState<EditYamlConfig<FormattedWorkload>>({
    editResource: null,
    visible: false,
    yaml: '',
    readOnly: false,
  });

  const { renderBaseInfoModal, setEditBaseInfoVisible } = useBaseInfoModal({
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
    const path = `/clusters/${cluster}/projects/${namespace}/jobs/${name}`;
    return [
      {
        title: t('RUN_RECORDS'),
        path: `${path}/records`,
      },
      {
        title: t('RESOURCE_STATUS'),
        path: `${path}/resource-status`,
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
    const { spec = {} } = detail;
    const status = getJobStatus(detail);

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
        label: t('STATUS'),
        value: t(status),
      },
      {
        label: t('MAXIMUM_RETRIES'),
        value: spec.backoffLimit,
      },
      {
        label: t('COMPLETE_PODS'),
        value: spec.completions,
      },
      {
        label: t('PARALLEL_PODS'),
        value: spec.parallelism,
      },
      {
        label: t('MAXIMUM_DURATION'),
        value: spec.activeDeadlineSeconds || '-',
      },
      {
        label: t('CREATION_TIME_TCAP'),
        value: formatTime(detail.createTime),
      },
      {
        label: t('CREATOR'),
        value: detail.creator || '-',
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
        key: 'redeploy',
        icon: <Icon name="restart" />,
        text: t('RERUN'),
        action: 'edit',
        onClick: () => {
          reRun(detail).then(() => {
            refetch();
          });
        },
      },
      {
        key: 'editYaml',
        icon: <Icon name="eye" />,
        text: t('VIEW_YAML'),
        action: 'edit',
        onClick: () => {
          const originData = get(detail, '_originData', {});
          setEditYamlConfig({
            editResource: detail as FormattedWorkload,
            yaml: yaml.getValue(originData),
            visible: true,
            readOnly: true,
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
              label: t('JOB_PL'),
              url: listUrl,
            },
          }}
        />
      )}
      {renderBaseInfoModal()}
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
