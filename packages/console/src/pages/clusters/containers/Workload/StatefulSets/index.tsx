/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import React, { useRef, useState } from 'react';
import { isUndefined } from 'lodash';
import { useParams, Link } from 'react-router-dom';
import { Field, notify } from '@kubed/components';
import WorkloadBanner from '../../../components/WorkloadBanner';
import {
  workloadStore,
  DataTable,
  NamespaceSelector,
  Icon,
  StopModal,
  EditBaseInfoModal,
  EditYamlModal,
  RecreateModal,
  DeleteConfirmModal,
  useItemActions,
  useBatchActions,
  useTableActions,
  TableRef,
  getDisplayName,
  getWorkloadStatus,
  formatTime,
  yaml,
  OriginData,
} from '@ks-console/shared';
import WorkloadStatus from '../../../../../components/WorkloadStatus';
import WorkLoadAvatar from '../../../components/workloadAvatar';
import { ProjectWrapper } from './styles';
//types
import { Column, FormattedWorkload } from '@ks-console/shared';
import { EditYamlConfig, ModalBaseConfig, BatchOptConfig } from '../../../types/workload';

// stores
const WORKLOAD_TYPE = 'STATEFULSET';
const {
  mapper,
  getResourceUrl,
  getWatchListUrl,
  useUpdateDeploymentMutation,
  useDeleteDeploymentMutation,
  useBatchDeleteWorkloadMutation,
  useBatchStopDeploymentMutation,
} = workloadStore('statefulsets');

const StatefulSets = () => {
  const module = 'statefulsets';
  const authKey = module;
  const tableRef = useRef<TableRef<FormattedWorkload>>();
  const [namespace, setNamespace] = useState('');

  const [batchDeleteConfig, setBatchDeleteConfig] = useState<BatchOptConfig<FormattedWorkload>>();
  const [batchStopConfig, setBatchStopConfig] = useState<BatchOptConfig<FormattedWorkload>>();

  const { mutate: mutateBatchDelete, isLoading: batchDeleteIsLoading } =
    useBatchDeleteWorkloadMutation({
      onSuccess: () => {
        notify.success(t('DELETED_SUCCESSFULLY'));
        setBatchDeleteConfig({
          visible: false,
          source: null,
        });
      },
    });
  const { mutate: mutateBatchStop, isLoading: stopIsLoading } = useBatchStopDeploymentMutation({
    onSuccess: () => {
      notify.success(t('STOP_SUCCESS_DESC'));
      setBatchStopConfig({
        visible: false,
        source: null,
      });
    },
  });

  const [baseConfig, setBaseConfig] = useState<ModalBaseConfig<FormattedWorkload>>();
  const [editYamlConfig, setEditYamlConfig] = useState<EditYamlConfig<FormattedWorkload>>({
    editResource: null,
    visible: false,
    yaml: '',
    readOnly: false,
  });
  const [recreateConfig, setRecreateConfig] = useState<ModalBaseConfig<FormattedWorkload>>();
  const [deleteConfig, setDeleteConfig] = useState<ModalBaseConfig<FormattedWorkload>>();

  // page params
  const params: Record<string, any> = useParams();
  const { cluster } = params;

  const { mutate: mutateEditBaseInfo, isLoading: baseInfoIsLoading } = useUpdateDeploymentMutation({
    onSuccess: () => {
      notify.success(t('UPDATE_SUCCESSFUL'));
      setBaseConfig({
        visible: false,
        source: null,
      });
    },
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
    },
  });

  const { mutate: mutateRecreateOpt, isLoading: recreateIsLoading } = useUpdateDeploymentMutation({
    onSuccess: () => {
      notify.success(t('RECREATE_SUCCESS_DESC'));
      setRecreateConfig({
        visible: false,
        source: null,
      });
    },
  });

  const { mutate: mutateDeleteOpt, isLoading: deleteIsLoading } = useDeleteDeploymentMutation({
    onSuccess: () => {
      notify.success(t('DELETED_SUCCESSFULLY'));
      setDeleteConfig({
        visible: false,
        source: null,
      });
    },
  });

  // Table actions
  const renderTableAction = useTableActions({
    authKey,
    params,
    actions: [
      {
        key: 'create',
        text: t('CREATE'),
        action: 'create',
        props: {
          color: 'secondary',
          shadow: true,
        },
        onClick: () => {},
      },
    ],
  });
  const renderBatchActions = useBatchActions({
    authKey,
    params: { cluster },
    actions: [
      {
        key: 'delete',
        text: t('DELETE'),
        action: 'delete',
        onClick: () => {
          const selectedRows = tableRef.current?.getSelectedFlatRows() as FormattedWorkload[];
          setBatchDeleteConfig({
            visible: true,
            source: selectedRows,
          });
        },
        props: {
          color: 'error',
        },
      },
      {
        key: 'stop',
        text: t('STOP'),
        action: 'edit',
        onClick: () => {
          const selectedRows = tableRef.current?.getSelectedFlatRows() as FormattedWorkload[];
          setBatchStopConfig({
            visible: true,
            source: selectedRows,
          });
        },
      },
    ],
  });
  const renderItemActions = useItemActions({
    authKey,
    params: { cluster },
    actions: [
      {
        key: 'edit',
        icon: <Icon name="pen" />,
        text: t('EDIT_INFORMATION'),
        action: 'edit',
        show: record => !record.isFedManaged,
        onClick: (_, record) => {
          setBaseConfig({
            visible: true,
            source: record as FormattedWorkload,
          });
        },
      },
      {
        key: 'editYaml',
        icon: <Icon name="pen" />,
        text: t('EDIT_YAML'),
        action: 'edit',
        show: record => !record.isFedManaged,
        onClick: (_, workload) => {
          setEditYamlConfig({
            editResource: workload as FormattedWorkload,
            yaml: yaml.getValue(workload._originData),
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
        show: record => !record.isFedManaged,
        onClick: (e, record) => {
          setRecreateConfig({
            visible: true,
            source: record as FormattedWorkload,
          });
        },
      },
      {
        key: 'delete',
        icon: <Icon name="trash" />,
        text: t('DELETE'),
        action: 'delete',
        show: record => !record.isFedManaged,
        onClick: (_, record) => {
          setDeleteConfig({
            visible: true,
            source: record as FormattedWorkload,
          });
        },
      },
    ],
  });

  // table columns
  const getItemDesc = (record: any) => {
    const asRecord = record as FormattedWorkload;
    const { reason } = getWorkloadStatus(asRecord, module);
    // const { status, reason } = getWorkloadStatus(asRecord, module);

    return reason !== '' ? (
      // TODO: implement here with exist component
      // <StatusReason status={status} reason={t(reason)} data={record} />
      <span>reason</span>
    ) : (
      record.description || '-'
    );
  };

  const columns: Column[] = [
    {
      title: t('NAME'),
      field: 'name',
      searchable: true,
      sortable: true,
      render: (value, record) => (
        <Field
          avatar={WorkLoadAvatar(record, WORKLOAD_TYPE)}
          value={
            <Link
              to={`/clusters/${cluster}/projects/${record.namespace}/statefulsets/${record.name}`}
            >
              {getDisplayName(record)}
            </Link>
          }
          label={getItemDesc(record)}
        />
      ),
    },
    {
      title: t('STATUS'),
      field: 'status',
      canHide: true,
      width: '22%',
      render: (status, record) => <WorkloadStatus record={record} module={module} />,
    },
    {
      title: t('PROJECT'),
      field: 'namespace',
      width: '22%',
      canHide: true,
      render: ns => <Link to={`/clusters/${cluster}/projects/${namespace}`}>{ns}</Link>,
    },
    {
      title: t('UPDATE_TIME_TCAP'),
      field: 'updateTime',
      width: 152,
      canHide: true,
      sortable: true,
      render: updateTime => <span>{formatTime(updateTime)}</span>,
    },
    {
      title: '',
      field: 'more',
      canHide: false,
      sortable: false,
      width: 58,
      render: (value, row) => renderItemActions(value, row),
    },
  ];

  // left namespace
  const handleNamespaceChange = (name: string) => {
    setNamespace(isUndefined(name) ? '' : name);
  };
  const LeftProject = (
    <ProjectWrapper>
      <NamespaceSelector cluster={cluster} onChange={handleNamespaceChange} />
    </ProjectWrapper>
  );

  // table batch event
  const handleBatchStop = () => {
    mutateBatchStop({
      data: batchStopConfig?.source as Record<string, any>[],
    });
  };
  const handleCancelBatchStop = () => {
    setBatchStopConfig({
      visible: false,
      source: null,
    });
  };
  const handleBatchDelete = () => {
    mutateBatchDelete({
      data: batchDeleteConfig?.source as Record<string, any>[],
    });
  };
  const handleCancelBatchDelete = () => {
    setBatchDeleteConfig({
      visible: false,
      source: null,
    });
  };

  // table item action
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
  const handleEditBaseInfo = (value: OriginData<Record<string, any>>) => {
    mutateEditBaseInfo({
      params: {
        cluster,
        name: baseConfig?.source?.name,
        namespace: baseConfig?.source?.namespace,
      },
      data: value,
    });
  };

  const url = getResourceUrl({ cluster, namespace });
  return (
    <>
      <WorkloadBanner module={module} />
      <DataTable
        ref={tableRef}
        tableName={module}
        rowKey="uid"
        placeholder={t('SEARCH_BY_NAME')}
        url={url}
        format={data => mapper(data)}
        columns={columns}
        parameters={{}}
        useStorageState={false}
        watchOptions={{
          enabled: true,
          module,
          url: getWatchListUrl(params),
        }}
        batchActions={renderBatchActions()}
        toolbarLeft={LeftProject}
        toolbarRight={renderTableAction()}
      />
      {batchStopConfig?.visible && (
        <StopModal
          isSubmitting={stopIsLoading}
          visible={batchStopConfig.visible}
          resource={batchStopConfig.source?.map(item => item.name).join(',')}
          type={WORKLOAD_TYPE}
          onOk={handleBatchStop}
          onCancel={handleCancelBatchStop}
        />
      )}
      {batchDeleteConfig?.visible && (
        <DeleteConfirmModal
          visible={batchDeleteConfig?.visible}
          type={WORKLOAD_TYPE}
          resource={batchDeleteConfig.source?.map(item => item.name)}
          confirmLoading={batchDeleteIsLoading}
          onOk={handleBatchDelete}
          onCancel={handleCancelBatchDelete}
        ></DeleteConfirmModal>
      )}
      {baseConfig?.visible && (
        <EditBaseInfoModal
          visible={baseConfig.visible}
          initialValues={baseConfig.source!._originData}
          onCancel={() =>
            setBaseConfig({
              ...baseConfig,
              visible: false,
            })
          }
          onOk={handleEditBaseInfo}
          confirmLoading={baseInfoIsLoading}
        />
      )}
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

export default StatefulSets;
