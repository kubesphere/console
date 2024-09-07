/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import React, { useRef } from 'react';
import { get } from 'lodash';
import { useParams } from 'react-router-dom';
import { Select } from '@kubed/icons';
import {
  Column,
  formatTime,
  TableRef,
  crdStore,
  useActionMenu,
  useCommonActions,
  Avatar,
  ListPage,
} from '@ks-console/shared';

const { module } = crdStore;

const CustomResources = () => {
  const tableRef = useRef<TableRef>();

  const params = useParams();
  const { cluster } = params;

  const callback = () => {
    tableRef?.current?.refetch();
  };

  const { del } = useCommonActions({
    store: crdStore,
    params: { cluster },
    callback,
  });

  const renderBatchActions = useActionMenu({
    authKey: module,
    params: { cluster: cluster },
    autoSingleButton: true,
    actions: [
      {
        key: 'delete',
        text: t('DELETE'),
        action: 'delete',
        onClick: () => {
          del(tableRef?.current?.getSelectedFlatRows() || []);
        },
        props: {
          color: 'error',
        },
      },
    ],
  });

  const columns: Column[] = [
    {
      title: t('KIND_TCAP'),
      field: 'kind',
      render: (value, record) => (
        <Avatar
          title={value}
          description={`${record.group}/${record.latestVersion}`}
          module={module}
          to={`/clusters/${cluster}/customresources/${record.name}`}
        />
      ),
    },
    {
      title: t('NAME'),
      field: 'name',
      searchable: true,
      id: 'name',
    },
    {
      title: t('SCOPE_TCAP'),
      field: 'scope',
      canHide: true,
    },
    {
      title: t('CREATION_TIME_TCAP'),
      field: 'createTime',
      id: 'createTime',
      sortable: true,
      canHide: true,
      width: '19%',
      render: time => formatTime(time),
    },
  ];

  const disableRowSelect = (row: any) => {
    return get(row, 'metadata.name') === 'jvmchaos.chaos-mesh.org';
  };

  const banner = {
    icon: <Select />,
    title: t('CRD'),
    description: t('CRD_DESC'),
  };

  const table = {
    ref: tableRef,
    columns,
    disableRowSelect,
    batchActions: renderBatchActions({}),
    rowKey: 'name',
  };

  return <ListPage banner={banner} table={table} store={crdStore} />;
};

export default CustomResources;
