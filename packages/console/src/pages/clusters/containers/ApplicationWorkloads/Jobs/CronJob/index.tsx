/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import React, { useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Field, notify } from '@kubed/components';
import {
  Column,
  Icon,
  getDisplayName,
  getWorkloadStatus,
  useItemActions,
  formatTime,
  TableRef,
  ListPage,
  useActionMenu,
  useCommonActions,
} from '@ks-console/shared';
import { workloadStore } from '@ks-console/shared';
import JobStatus from '../../../../../../components/JobStatus';
import WorkLoadAvatar from '../../../../components/workloadAvatar';

// types
import { FormateCronJob } from '@ks-console/shared';
// stores
const WORKLOAD_TYPE = 'CRONJOB';
const module = 'cronjobs';
const store = workloadStore(module);
const { useSwitchStatusMutation } = store;

const Deployment = () => {
  const authKey = module;
  const params: Record<string, any> = useParams();
  const { cluster } = params;

  const tableRef = useRef<TableRef<FormateCronJob>>();

  const refetch = () => {
    tableRef?.current?.refetch();
  };

  const { editBaseInfo, editYaml, del } = useCommonActions({
    store,
    params,
    callback: refetch,
  });

  const { mutate: mutateSwitchStatus } = useSwitchStatusMutation({
    onSuccess: () => {
      notify.success(t('UPDATE_SUCCESSFUL'));
      refetch();
    },
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
        onClick: (_, record) => editBaseInfo(record),
      },
      {
        key: 'editYaml',
        icon: <Icon name="pen" />,
        text: t('EDIT_YAML'),
        action: 'edit',
        onClick: (_, workload) => editYaml(workload),
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
        onClick: (_, record) => del({ resource: [record], type: WORKLOAD_TYPE }),
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
      render: ns => <Link to={`/clusters/${cluster}/projects/${ns}`}>{ns}</Link>,
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

  const renderTableActions = useActionMenu({
    authKey: module,
    params,
    autoSingleButton: true,
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

  const renderBatchActions = useActionMenu({
    authKey,
    params,
    mode: 'button',
    actions: [
      {
        key: 'delete',
        text: t('DELETE'),
        action: 'delete',
        onClick: () => {
          const selectedRows = tableRef.current?.getSelectedFlatRows();
          del({ resource: selectedRows, type: WORKLOAD_TYPE });
        },
        props: {
          color: 'error',
        },
      },
    ],
  });

  const table = {
    ref: tableRef,
    columns,
    toolbarRight: renderTableActions({}),
    batchActions: renderBatchActions({}),
  };

  const banner = {
    icon: <Icon name={'backup'} size={40} />,
    title: t('JOB_PL'),
    description: t('JOB_DESC'),
  };

  const tabs = [
    {
      id: 'jobs',
      value: 'jobs',
      label: t('JOB'),
      navLabel: t('JOB'),
    },
    {
      id: 'cronjobs',
      value: 'cronjobs',
      label: t('CRONJOB'),
      navLabel: t('CRONJOB'),
    },
  ];

  return (
    <>
      <ListPage
        table={table}
        banner={banner}
        tabs={tabs}
        store={store}
        currentTab={module}
        hasNamespaceSelector
      />
    </>
  );
};

export default Deployment;
