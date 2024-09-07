/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import React, { useRef, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Pen, Role, Trash } from '@kubed/icons';
import { Field, notify } from '@kubed/components';
import {
  Column,
  formatTime,
  TableRef,
  RoleDeleteModal,
  roleStore,
  useCommonActions,
  useActionMenu,
  ListPage,
} from '@ks-console/shared';
import type { FormattedRole } from '@ks-console/shared';
import { MODULE, AUTH_KEY, ROLE_KEY } from './constants';

import { FieldLabel } from './styles';
import { useDisclosure } from '@kubed/hooks';

const store = roleStore(MODULE);

const { useDeleteMutation } = store;

export default function ClusterRoles() {
  const params = useParams();
  const tableRef = useRef<TableRef<any>>(null);
  const [activeRecord, setActiveRecord] = useState<FormattedRole | null>();
  const isPresetClusterRoles = (row?: Record<string, any>): boolean =>
    globals.config.presetClusterRoles.includes(row?.name);
  const tableParameters = {
    annotation: 'kubesphere.io/creator',
  };
  const { isOpen: isDeleteOpen, open: openDelete, close: closeDelete } = useDisclosure(false);

  const { editBaseInfo } = useCommonActions({
    params,
    store,
    callback: () => {
      tableRef.current?.refetch();
    },
  });

  const { mutate: mutateRoleDelete, isLoading: isDeleteLoading } = useDeleteMutation({
    onSuccess: () => {
      closeDelete();
      setActiveRecord(null);
      notify.success(t('DELETED_SUCCESSFULLY'));
      tableRef?.current?.refetch();
    },
  });

  const renderItemActions = useActionMenu<FormattedRole>({
    authKey: AUTH_KEY,
    params,
    actions: [
      {
        key: 'edit',
        icon: <Pen />,
        text: t('EDIT_INFORMATION'),
        action: 'edit',
        show: row => !isPresetClusterRoles(row),
        onClick: editBaseInfo,
      },
      {
        key: 'delete',
        icon: <Trash />,
        text: t('DELETE'),
        action: 'delete',
        show: row => !isPresetClusterRoles(row),
        onClick: record => {
          setActiveRecord(record as FormattedRole);
          openDelete();
        },
      },
    ],
  });
  const columns: Column[] = [
    {
      title: t('NAME'),
      field: 'name',
      searchable: true,
      width: '25%',
      render: (value, row) => {
        return (
          <Field
            value={<Link to={value}>{value}</Link>}
            avatar={<Role size={40} />}
            label={<FieldLabel>{row.aliasName}</FieldLabel>}
          />
        );
      },
    },
    {
      title: t('DESCRIPTION'),
      field: 'description',
      canHide: true,
      width: '55%',
    },
    {
      title: t('CREATION_TIME_TCAP'),
      field: 'createTime',
      sortable: true,
      canHide: true,
      width: '19%',
      render: time => formatTime(time),
    },
    {
      id: 'more',
      title: '',
      width: 20,
      render: (_, record) => renderItemActions(record as FormattedRole),
    },
  ];

  const handleDelete = () => {
    if (activeRecord?.name) {
      mutateRoleDelete({
        ...params,
        name: activeRecord?.name,
      });
    }
  };

  const table = {
    columns: columns,
    rowKey: 'name',
    useStorageState: false,
    placeholder: t('SEARCH_BY_NAME'),
    ref: tableRef,
    parameters: tableParameters,
  };

  const banner = {
    icon: <Role />,
    title: t('CLUSTER_ROLE'),
    description: t('CLUSTER_ROLE_DESC'),
  };

  return (
    <>
      <ListPage banner={banner} table={table} store={store} />
      {activeRecord && (
        <RoleDeleteModal
          roleKey={ROLE_KEY}
          visible={isDeleteOpen}
          record={activeRecord}
          onCancel={() => {
            closeDelete();
            setActiveRecord(null);
          }}
          onOk={handleDelete}
          confirmLoading={isDeleteLoading}
          cluster={params?.cluster}
        />
      )}
    </>
  );
}
