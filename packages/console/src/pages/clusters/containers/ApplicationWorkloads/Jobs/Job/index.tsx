/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import React, { useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Field, notify } from '@kubed/components';
import {
  Icon,
  Column,
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
import { FormateJob } from '@ks-console/shared';
// stores
const module = 'jobs';
const WORKLOAD_TYPE = 'JOB';
const store = workloadStore(module);
const { useReRunMutation } = store;

const Deployment = () => {
  const authKey = module;
  const params: Record<string, any> = useParams();
  const { cluster } = params;

  const tableRef = useRef<TableRef<FormateJob>>();

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
    onError: callback('error'),
  });

  const { editBaseInfo, del } = useCommonActions({
    store,
    params,
    callback: refetch,
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
        onClick: (_, record) => del({ resource: [record], type: WORKLOAD_TYPE }),
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
      render: ns => <Link to={`/clusters/${cluster}/projects/${ns}`}>{ns}</Link>,
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
    authKey: module,
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
          const selectedRows = tableRef.current?.getSelectedFlatRows() as FormateJob[];
          del({ type: WORKLOAD_TYPE, resource: selectedRows });
        },
      },
    ],
  });

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

  const table = {
    ref: tableRef,
    columns,
    disableRowSelect: (row?: Record<string, any>) => row?.isFedManaged || false,
    toolbarRight: renderTableActions({}),
    batchActions: renderBatchActions({}),
  };

  return (
    <>
      <ListPage
        tabs={tabs}
        store={store}
        table={table}
        banner={banner}
        currentTab={module}
        hasNamespaceSelector
      />
    </>
  );
};

export default Deployment;
