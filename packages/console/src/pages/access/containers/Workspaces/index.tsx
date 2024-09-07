/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Banner, Field, notify, Empty, Card } from '@kubed/components';
import { Enterprise, Trash, Pen } from '@kubed/icons';
import {
  DataTable,
  Column,
  formatTime,
  isMultiCluster,
  getDisplayName,
  useBatchActions,
  useItemActions,
  useTableActions,
  clusterStore,
  workspaceStore,
  ClusterWrapper,
  useCommonActions,
  FavoriteHistory,
  removeDashboardHistory,
  getUserAliasName,
} from '@ks-console/shared';

import { Tag } from '@kubed/components';
import { get } from 'lodash';

import { CreateWorkspacesModal } from '../../../workspaces/components/Modals';

import type { FormattedWorkspace, WorkspaceFormValues } from '@ks-console/shared';

import { FieldLabel, Wrapper } from './styles';

const { fetchList } = clusterStore;
const { getListUrl, mapper: workspaceMapper, usePostMutation } = workspaceStore;

export default function Workspaces(): JSX.Element {
  const url = getListUrl({});
  const tableRef = useRef<any>();
  const [createVisible, setCreateVisible] = useState<boolean>(false);

  const refetch = () => {
    tableRef?.current?.refetch();
  };

  const { editBaseInfo, del } = useCommonActions({
    store: workspaceStore,
    params: {},
    callback: refetch,
  });

  const { mutate: mutateWorkspaceCreate, isLoading: isCreateLoading } = usePostMutation(undefined, {
    onSuccess: () => {
      refetch();
      notify.success(t('CREATE_SUCCESSFUL'));
      setCreateVisible(false);
    },
  });

  const { data: clustersData = [] } = fetchList({ limit: -1 });

  const isSystemWorkspaces = (row?: Record<string, FormattedWorkspace>) =>
    get(row, 'name') === globals.config.systemWorkspace;

  const handleCreate = async (values: WorkspaceFormValues) => {
    mutateWorkspaceCreate({ data: values });
  };

  const renderBatchActions = useBatchActions({
    authKey: 'workspaces',
    actions: [
      {
        key: 'delete',
        text: t('DELETE'),
        action: 'delete',
        onClick: () => {
          const selectedRows = tableRef.current?.getSelectedFlatRows() || [];
          del({ resource: selectedRows, type: 'WORKSPACE' });
          removeDashboardHistory(
            globals.user.username,
            selectedRows.map((r: { uid: string }) => r.uid),
          );
        },
        props: {
          color: 'error',
        },
      },
    ],
  });
  const renderItemActions = useItemActions({
    authKey: 'workspaces',
    actions: [
      {
        key: 'edit',
        icon: <Pen />,
        text: t('EDIT_INFORMATION'),
        action: 'edit',
        show: row => !isSystemWorkspaces(row),
        onClick: (_, record) => {
          editBaseInfo(record);
        },
      },
      {
        key: 'delete',
        icon: <Trash />,
        text: t('DELETE'),
        action: 'delete',
        show: row => !isSystemWorkspaces(row),
        onClick: (_, record) => {
          del({ type: 'WORKSPACE', resource: [record] });
          removeDashboardHistory(globals.user.username, record.uid);
        },
      },
    ],
  });

  const renderTableActions = useTableActions({
    authKey: 'workspaces',
    actions: [
      {
        key: 'create',
        text: t('CREATE'),
        action: 'create',
        onClick: () => {
          setCreateVisible(true);
        },
        props: {
          color: 'secondary',
          shadow: true,
        },
      },
    ],
  });

  const columns: Column[] = [
    {
      title: t('NAME'),
      field: 'name',
      sortable: true,
      searchable: true,
      render: (value, row) => {
        return (
          <Field
            value={<Link to={`/workspaces/${value}`}>{getDisplayName(row)}</Link>}
            avatar={<Enterprise size={40} />}
            label={<FieldLabel>{row.description || '-'}</FieldLabel>}
          />
        );
      },
    },

    {
      title: t('ADMINISTRATOR'),
      field: 'spec.template.spec.manager',
      width: 250,
      render: name => {
        return name ? getUserAliasName(name) : '-';
      },
    },
    {
      title: t('CREATION_TIME_TCAP'),
      field: 'createTime',
      sortable: true,
      canHide: true,
      width: 250,
      render: time => formatTime(time),
    },
    {
      id: 'favorite',
      title: '',
      width: 20,
      render: (_, record) => {
        return (
          <FavoriteHistory
            user={globals.user.username}
            item={{
              id: record.uid,
              name: record.name,
              url: `/workspaces/${record.name}`,
              type: 'Workspace',
              isHost: false,
            }}
          />
        );
      },
    },
    {
      id: 'more',
      title: '',
      width: 20,
      render: renderItemActions,
    },
  ];

  if (isMultiCluster()) {
    columns.splice(1, 0, {
      title: t('CLUSTER_PL'),
      field: 'clusters',
      width: '30%',
      render: (clusters, { name: clusterName }) =>
        clusterName === 'system-workspace' ? (
          <Tag color="secondary">{t('ALL_CLUSTERS')}</Tag>
        ) : (
          <ClusterWrapper clusters={clusters} clustersDetail={clustersData} />
        ),
    });
  }

  return (
    <Wrapper>
      <Banner
        icon={<Enterprise />}
        title={t('WORKSPACE_PL')}
        description={t('WORKSPACE_DESC')}
        className="mb12"
      />
      <DataTable
        columns={columns}
        tableName="workspaces"
        rowKey="name"
        url={url}
        format={workspaceMapper}
        batchActions={renderBatchActions()}
        useStorageState={false}
        placeholder={t('SEARCH_BY_NAME')}
        toolbarRight={renderTableActions()}
        disableRowSelect={isSystemWorkspaces}
        ref={tableRef}
        emptyOptions={{
          element: (
            <Card padding={32}>
              <Empty
                title={t('USER_DASHBOARD_EMPTY_TITLE')}
                description={t('USER_DASHBOARD_EMPTY_DESC')}
              ></Empty>
            </Card>
          ),
        }}
      />
      {createVisible && (
        <CreateWorkspacesModal
          visible={createVisible}
          confirmLoading={isCreateLoading}
          onOk={handleCreate}
          onCancel={() => setCreateVisible(false)}
        />
      )}
    </Wrapper>
  );
}
