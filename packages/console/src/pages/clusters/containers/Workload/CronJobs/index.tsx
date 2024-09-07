/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import React, { useRef, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

import { isUndefined } from 'lodash';
import { Field, notify } from '@kubed/components';
import {
  DataTable,
  Column,
  useTableActions,
  Icon,
  EditBaseInfoModal,
  EditYamlModal,
  DeleteConfirmModal,
  getDisplayName,
  getWorkloadStatus,
  useBatchActions,
  useItemActions,
  NamespaceSelector,
  formatTime,
  yaml,
  TableRef,
  OriginData,
} from '@ks-console/shared';
import { workloadStore } from '@ks-console/shared';
import JobStatus from '../../../../../components/JobStatus';
import WorkloadBanner from '../../../components/WorkloadBanner';
import { ProjectWrapper } from './styles';
import WorkLoadAvatar from '../../../components/workloadAvatar';

// types
import { FormateCronJob } from '@ks-console/shared';
import { EditYamlConfig, ModalBaseConfig, BatchOptConfig } from '../../../types/workload';
// stores
const WORKLOAD_TYPE = 'CRONJOB';
const {
  mapper,
  getResourceUrl,
  getWatchListUrl,
  useSwitchStatusMutation,
  useUpdateDeploymentMutation,
  useDeleteDeploymentMutation,
  useBatchDeleteWorkloadMutation,
} = workloadStore('cronjobs');

const Deployment = () => {
  const module = 'cronjobs';
  const authKey = module;

  const tableRef = useRef<TableRef<FormateCronJob>>();
  const [namespace, setNamespace] = useState('');

  // for table batch action
  const [batchDeleteConfig, setBatchDeleteConfig] = useState<BatchOptConfig<FormateCronJob>>();

  // for table item's action
  const [baseConfig, setBaseConfig] = useState<ModalBaseConfig<FormateCronJob>>();
  const [deleteConfig, setDeleteConfig] = useState<ModalBaseConfig<FormateCronJob>>();
  const [editYamlConfig, setEditYamlConfig] = useState<EditYamlConfig<FormateCronJob>>({
    editResource: null,
    visible: false,
    yaml: '',
    readOnly: false,
  });

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
  const { mutate: mutateSwitchStatus } = useSwitchStatusMutation({
    onSuccess: () => {},
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

  const { mutate: mutateEditBaseInfo, isLoading: baseInfoIsLoading } = useUpdateDeploymentMutation({
    onSuccess: () => {
      notify.success(t('UPDATE_SUCCESSFUL'));
      setBaseConfig({
        visible: false,
        source: null,
      });
    },
  });

  // page params
  const params: Record<string, any> = useParams();
  const { cluster } = params;

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
          const selectedRows = tableRef.current?.getSelectedFlatRows() as FormateCronJob[];
          setBatchDeleteConfig({
            visible: true,
            source: selectedRows,
          });
        },
        props: {
          color: 'error',
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
        onClick: (_, record) => {
          setBaseConfig({
            visible: true,
            source: record as FormateCronJob,
          });
        },
      },
      {
        key: 'editYaml',
        icon: <Icon name="pen" />,
        text: t('EDIT_YAML'),
        action: 'edit',
        onClick: (_, workload) => {
          setEditYamlConfig({
            editResource: workload as FormateCronJob,
            yaml: yaml.getValue(workload._originData),
            visible: true,
            readOnly: false,
          });
        },
      },
      {
        key: 'start',
        text: t('START'),
        action: 'edit',
        show: record => record.suspend,
        icon: <Icon name="start" />,
        onClick: (e, record) => {
          mutateSwitchStatus({
            params: { cluster: record.cluster, name: record.name, namespace: record.namespace },
            on: true,
          });
        },
      },
      {
        key: 'pause',
        text: t('PAUSE'),
        action: 'edit',
        show: record => !record.suspend,
        icon: <Icon name="stop" />,
        onClick: (e, record) => {
          mutateSwitchStatus({
            params: { cluster: record.cluster, name: record.name, namespace: record.namespace },
            on: false,
          });
        },
      },
      {
        key: 'delete',
        icon: <Icon name="trash" />,
        text: t('DELETE'),
        action: 'delete',
        onClick: (_, record) => {
          setDeleteConfig({
            visible: true,
            source: record as FormateCronJob,
          });
        },
      },
    ],
  });

  // table columns
  const getItemDesc = (record: any) => {
    const asRecord = record as FormateCronJob;
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
            <Link to={`/clusters/${cluster}/projects/${record.namespace}/cronjobs/${record.name}`}>
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
      sortable: true,
      width: '15%',
      render: (status, record) => <JobStatus record={record} module={module} />,
    },
    {
      title: t('PROJECT'),
      field: 'namespace',
      width: '18%',
      canHide: true,
      render: ns => <Link to={`/clusters/${cluster}/projects/${namespace}`}>{ns}</Link>,
    },
    {
      title: t('SCHEDULE'),
      field: 'spec.schedule',
      width: '15%',
      canHide: true,
    },
    {
      title: t('CREATION_TIME_TCAP'),
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

  // Left namespace select
  const handleNamespaceChange = (name: string) => {
    setNamespace(isUndefined(name) ? '' : name);
  };
  const LeftProject = (
    <ProjectWrapper>
      <NamespaceSelector cluster={cluster} onChange={handleNamespaceChange} />
    </ProjectWrapper>
  );

  // table batch event
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

  // handle update yaml event
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

  const tabs = [
    {
      value: 'jobs',
      label: t('JOB'),
    },
    {
      value: 'cronjobs',
      label: t('CRONJOB'),
    },
  ];

  const url = getResourceUrl({ cluster, namespace });
  return (
    <>
      <WorkloadBanner
        module={module}
        tabs={tabs}
        title={t('CRONJOB')}
        description={t('CRONJOB_DESC')}
      />
      <DataTable
        ref={tableRef}
        tableName={module}
        rowKey="uid"
        placeholder={t('SEARCH_BY_NAME')}
        url={url}
        columns={columns}
        parameters={{}}
        useStorageState={false}
        watchOptions={{
          enabled: true,
          module,
          url: getWatchListUrl(params),
        }}
        format={data => mapper(data)}
        batchActions={renderBatchActions()}
        toolbarLeft={LeftProject}
        toolbarRight={renderTableAction()}
      />
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

export default Deployment;
