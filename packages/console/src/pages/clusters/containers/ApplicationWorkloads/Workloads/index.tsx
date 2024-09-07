/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import React, { useRef, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

import { get } from 'lodash';
import { notify } from '@kubed/components';
import { useDisclosure } from '@kubed/hooks';
import {
  Avatar,
  Column,
  Icon,
  RecreateModal,
  StopModal,
  getWorkloadStatus,
  formatTime,
  TableRef,
  ListPage,
  useActionMenu,
  useCommonActions,
} from '@ks-console/shared';
import { workloadStore } from '@ks-console/shared';
import WorkloadStatus from '../../../../../components/WorkloadStatus';
import type { FormattedWorkload } from '@ks-console/shared';

const workloadTypeMapper: Record<string, any> = {
  deployments: 'DEPLOYMENT',
  daemonsets: 'DAEMONSET',
  statefulsets: 'STATEFULSET',
};

const Deployment = ({ module }: { module: string }) => {
  const WORKLOAD_TYPE = workloadTypeMapper[module];
  const params: Record<string, any> = useParams();
  const { cluster } = params;

  const authKey = module;
  const store = workloadStore(module);
  const { useUpdateDeploymentMutation, useBatchStopDeploymentMutation } = store;

  const tableRef = useRef<TableRef<FormattedWorkload>>();
  const [recordData, setRecordData] = useState<FormattedWorkload[]>([]);

  const refetch = () => {
    tableRef?.current?.refetch();
  };

  const {
    open: openBatchStopModal,
    close: closeBatchStopModal,
    isOpen: batchStopModalIsOpen,
  } = useDisclosure();

  const {
    open: openRecreateModal,
    close: closeRecreateModal,
    isOpen: recreateModalIsOpen,
  } = useDisclosure();

  const { mutate: mutateBatchStop, isLoading: stopIsLoading } = useBatchStopDeploymentMutation({
    onSuccess: () => {
      notify.success(t('STOP_SUCCESS_DESC'));
      refetch();
      setRecordData([]);
      closeBatchStopModal();
    },
  });

  const { mutate: mutateRecreateOpt, isLoading: recreateIsLoading } = useUpdateDeploymentMutation({
    onSuccess: () => {
      notify.success(t('RECREATE_SUCCESS_DESC'));
      refetch();
      setRecordData([]);
      closeRecreateModal();
    },
  });

  const { editBaseInfo, editYaml, del } = useCommonActions({
    store,
    params,
    callback: refetch,
  });

  const renderItemActions = useActionMenu<FormattedWorkload>({
    authKey: module,
    params: { cluster },
    actions: [
      {
        key: 'edit',
        icon: <Icon name="pen" />,
        text: t('EDIT_INFORMATION'),
        action: 'edit',
        show: record => !record.isFedManaged,
        onClick: editBaseInfo,
      },
      {
        key: 'editYaml',
        icon: <Icon name="pen" />,
        text: t('EDIT_YAML'),
        action: 'edit',
        show: record => !record.isFedManaged,
        onClick: editYaml,
      },
      {
        key: 'redeploy',
        icon: <Icon name="restart" />,
        text: t('RECREATE'),
        action: 'edit',
        show: record => !record.isFedManaged,
        onClick: record => {
          setRecordData([record]);
          openRecreateModal();
        },
      },
      {
        key: 'delete',
        icon: <Icon name="trash" />,
        text: t('DELETE'),
        action: 'delete',
        show: record => !record.isFedManaged,
        onClick: record => del({ type: WORKLOAD_TYPE, resource: [record] }),
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
        <Avatar
          record={record}
          module={module}
          description={getItemDesc(record)}
          isMultiCluster={record.isFedManaged}
          to={`/clusters/${cluster}/projects/${record.namespace}/${module}/${record.name}`}
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
      render: ns => <Link to={`/clusters/${cluster}/projects/${ns}`}>{ns}</Link>,
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
      render: (_, row) => renderItemActions(row as FormattedWorkload),
    },
  ];

  const handleRecreate = () => {
    mutateRecreateOpt({
      params: {
        cluster,
        namespace: recordData[0]?.namespace,
        name: recordData[0]?.name,
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

  const renderTableActions = useActionMenu({
    authKey,
    params,
    autoSingleButton: true,
    actions: [
      {
        key: 'create',
        text: t('Create'),
        action: 'create',
        props: {
          color: 'secondary',
          shadow: true,
          className: 'table-button',
        },
        onClick: () => {},
      },
    ],
  });

  const renderBatchActions = useActionMenu({
    authKey,
    params,
    mode: 'button',
    actions: [
      {
        key: 'delete',
        text: t('DELETE'),
        action: 'delete',
        props: {
          color: 'error',
        },
        onClick: () => {
          const selectedRows = tableRef.current?.getSelectedFlatRows() as FormattedWorkload[];
          del({ resource: selectedRows, type: WORKLOAD_TYPE });
        },
      },
      {
        key: 'stop',
        text: t('STOP'),
        action: 'edit',
        onClick: () => {
          const selectedRows = tableRef.current?.getSelectedFlatRows() as FormattedWorkload[];
          setRecordData(selectedRows);
          openBatchStopModal();
        },
      },
    ],
  });

  const table = {
    ref: tableRef,
    columns,
    disableRowSelect: (row?: Record<string, any>) => row?.isFedManaged || false,
    toolbarRight: renderTableActions({}),
    batchActions: renderBatchActions({}),
  };

  const ICON_TYPES: Record<string, string> = {
    deployments: 'backup',
    statefulsets: 'stateful-set',
    daemonsets: 'deamon-set',
    jobs: 'backup',
    cronjobs: 'backup',
  };

  const banner = {
    icon: <Icon name={get(ICON_TYPES, module, 'backup')} size={40} />,
    title: t('WORKLOAD_PL'),
    description: t('WORKLOAD_DESC'),
  };

  const tabs = [
    {
      id: 'deployments',
      value: 'deployments',
      label: t('DEPLOYMENTS'),
      navLabel: t('DEPLOYMENTS'),
    },
    {
      id: 'statefulsets',
      value: 'statefulsets',
      label: t('STATEFULSETS'),
      navLabel: t('STATEFULSETS'),
    },
    {
      id: 'daemonsets',
      value: 'daemonsets',
      label: t('DAEMONSETS'),
      navLabel: t('DAEMONSETS'),
    },
  ];

  return (
    <>
      <ListPage
        banner={banner}
        table={table}
        currentTab={module}
        tabs={tabs}
        store={store}
        hasNamespaceSelector
      />
      {batchStopModalIsOpen && (
        <StopModal
          isSubmitting={stopIsLoading}
          visible={batchStopModalIsOpen}
          resource={recordData?.map(item => item.name).join(',')}
          type={WORKLOAD_TYPE}
          onOk={() => {
            mutateBatchStop({
              data: recordData,
            });
          }}
          onCancel={() => {
            setRecordData([]);
            closeBatchStopModal();
          }}
        />
      )}
      {recreateModalIsOpen && (
        <RecreateModal
          visible={recreateModalIsOpen}
          name={recordData[0]?.name}
          type={WORKLOAD_TYPE}
          confirmLoading={recreateIsLoading}
          onOk={handleRecreate}
          onCancel={() => {
            setRecordData([]);
            closeRecreateModal();
          }}
        />
      )}
    </>
  );
};

export default Deployment;
