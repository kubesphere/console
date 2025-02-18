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
  DeleteConfirmModal,
  getDisplayName,
  getWorkloadStatus,
  useBatchActions,
  useItemActions,
  NamespaceSelector,
  formatTime,
  TableRef,
  OriginData,
} from '@ks-console/shared';
import { workloadStore } from '@ks-console/shared';
import JobStatus from '../../../../../components/JobStatus';
import WorkloadBanner from '../../../components/WorkloadBanner';
import { ProjectWrapper } from './styles';
import WorkLoadAvatar from '../../../components/workloadAvatar';

// types
import { FormateJob } from '@ks-console/shared';
import { ModalBaseConfig, BatchOptConfig } from '../../../types/workload';
// stores
const WORKLOAD_TYPE = 'JOB';
const {
  mapper,
  getResourceUrl,
  getWatchListUrl,
  useReRunMutation,
  useUpdateDeploymentMutation,
  useDeleteDeploymentMutation,
  useBatchDeleteWorkloadMutation,
} = workloadStore('jobs');

const Deployment = () => {
  const module = 'jobs';
  const authKey = module;

  const tableRef = useRef<TableRef<FormateJob>>();
  const [namespace, setNamespace] = useState('');

  // for table batch action
  const [batchDeleteConfig, setBatchDeleteConfig] = useState<BatchOptConfig<FormateJob>>();

  // for table item's action
  const [baseConfig, setBaseConfig] = useState<ModalBaseConfig<FormateJob>>();
  const [deleteConfig, setDeleteConfig] = useState<ModalBaseConfig<FormateJob>>();

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

  const refetch = () => {
    tableRef?.current?.refetch();
  };
  const callback = (type: 'success' | 'error') => () => {
    if (type === 'success') {
      notify.success(t('OPERATION_SUCCESS'));
    } else {
      notify.error(t('OPERATION_FAILED'));
    }
    refetch();
  };

  const { mutate: mutateReRun } = useReRunMutation({
    onSuccess: callback('success'),
    // onError: callback('error'),
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
          const selectedRows = tableRef.current?.getSelectedFlatRows() as FormateJob[];
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
            source: record as FormateJob,
          });
        },
      },
      {
        key: 'rerun',
        icon: <Icon name="refresh" />,
        text: t('RERUN'),
        action: 'edit',
        onClick: (e, record) => {
          const { name, namespace: currentNamespace } = record as FormateJob;
          mutateReRun({ cluster, name, namespace: currentNamespace });
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
            source: record as FormateJob,
          });
        },
      },
    ],
  });

  // table columns
  const getItemDesc = (record: any) => {
    const asRecord = record as FormateJob;
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
            <Link to={`/clusters/${cluster}/projects/${record.namespace}/jobs/${record.name}`}>
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
      searchable: true,
      sortable: true,
      width: '20%',
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
      title: t('LAST_RUN_TIME'),
      field: 'updateTime',
      width: '20%',
      canHide: true,
      sortable: true,
      render: updateTime => <span>{formatTime(updateTime)}</span>,
    },
    {
      title: '',
      field: 'more',
      canHide: true,
      sortable: false,
      width: 58,
      render: (value, row) => renderItemActions(value, row),
    },
  ];

  // Left namespace select
  const handleNamespaceChange = (name: string) => {
    setNamespace(isUndefined(name) ? '' : name);
    // tableRef.current?.refetch()
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
      <WorkloadBanner module={module} tabs={tabs} title={t('JOB')} description={t('JOB_DESC')} />
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
