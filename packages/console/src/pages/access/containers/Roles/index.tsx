/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import React, { useRef, useState } from 'react';
import { get, merge, set } from 'lodash';
import { Link } from 'react-router-dom';
import { useQuery } from 'react-query';
import {
  Column,
  formatTime,
  TableRef,
  RoleAuthorization,
  roleStore,
  RoleCreateModal,
  useCommonActions,
  useActionMenu,
  ListPage,
  RoleDeleteModal,
  RoleModule,
} from '@ks-console/shared';
import { Pen, Role, Trash } from '@kubed/icons';
import { Field, notify } from '@kubed/components';
import { useDisclosure } from '@kubed/hooks';
import type { FormattedRole, RoleBaseInformationFormValues } from '@ks-console/shared';
import { MODULE, AUTH_KEY, ROLE_TEMPLATE, ROLE_KEY } from './constants';

import { FieldLabel } from './styles';

const store = roleStore(MODULE);

const { usePutMutation, usePostMutation, useDeleteMutation, getTemplates, getTemplatesCategory } =
  store;

export default function GlobalRoles() {
  const tableRef = useRef<TableRef<any>>(null);
  const [activeRecord, setActiveRecord] = useState<FormattedRole | null>(null);

  const isPresetGlobalRoles = (row?: Record<string, any>): boolean =>
    globals.config.presetGlobalRoles.includes(row?.name);

  const tableParameters = {
    annotation: 'kubesphere.io/creator',
  };

  const [baseInfo, setBaseInfo] = useState<RoleBaseInformationFormValues>();

  const { isOpen: isCreateOpen, open: openCreate, close: closeCreate } = useDisclosure(false);
  const { isOpen: isAuthOpen, open: openAuth, close: closeAuth } = useDisclosure(false);
  const { isOpen: isDeleteOpen, open: openDelete, close: closeDelete } = useDisclosure(false);

  const { editBaseInfo } = useCommonActions({
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

  const { mutate: mutateRoleCreate, isLoading: isCreateLoading } = usePostMutation(
    {},
    {
      onSuccess: () => {
        closeCreate();
        closeAuth();
        notify.success(t('CREATE_SUCCESSFUL'));
        tableRef?.current?.refetch();
      },
    },
  );

  const { mutate: mutateRoleEdit, isLoading: isEditLoading } = usePutMutation(
    {},
    {
      onSuccess: () => {
        setActiveRecord(null);
        closeAuth();
        notify.success(t('UPDATE_SUCCESSFUL'));
        tableRef?.current?.refetch();
      },
    },
  );

  const { data: roleTemplates = [] } = useQuery<FormattedRole[]>(['globalroles'], async () => {
    const res = await getTemplates('global', true);
    return res;
  });

  const { data: roleModules = [] } = useQuery<RoleModule[]>(['globalsCategory'], async () => {
    const res = await getTemplatesCategory('global');
    return res;
  });

  const renderItemActions = useActionMenu<FormattedRole>({
    authKey: AUTH_KEY,
    actions: [
      {
        key: 'edit',
        icon: <Pen />,
        text: t('EDIT_INFORMATION'),
        action: 'edit',
        show: row => !isPresetGlobalRoles(row),
        onClick: editBaseInfo,
      },
      {
        key: 'editRole',
        icon: <Pen />,
        text: t('EDIT_PERMISSIONS'),
        action: 'edit',
        show: row => !isPresetGlobalRoles(row),
        onClick: record => {
          setActiveRecord(record as FormattedRole);
          openAuth();
        },
      },
      {
        key: 'delete',
        icon: <Trash />,
        text: t('DELETE'),
        action: 'delete',
        show: row => !isPresetGlobalRoles(row),
        onClick: record => {
          setActiveRecord(record as FormattedRole);
          openDelete();
        },
      },
    ],
  });
  const renderTableActions = useActionMenu({
    autoSingleButton: true,
    authKey: AUTH_KEY,
    actions: [
      {
        key: 'create',
        text: t('CREATE'),
        action: 'create',
        onClick: openCreate,
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

  const handleBaseInfo = (data: RoleBaseInformationFormValues) => {
    setBaseInfo(data);
    openAuth();
  };

  const handleCreateAuthorization = (auth: string[]) => {
    const data = merge(ROLE_TEMPLATE, baseInfo, {
      aggregationRoleTemplates: {
        templateNames: auth,
      },
    });
    mutateRoleCreate({
      data,
    });
  };
  const handleEditAuthorization = (roles: string[]) => {
    const data = merge(ROLE_TEMPLATE, activeRecord?._originData);
    set(data, 'aggregationRoleTemplates.templateNames', roles);
    set(data, 'rules', []);

    if (data?.metadata?.annotations) {
      delete data.metadata.annotations['iam.kubesphere.io/rego-override'];
    }

    mutateRoleEdit({
      params: {
        name: activeRecord?.name,
      },
      data,
    });
  };

  const handleDelete = () => {
    if (activeRecord?.name) {
      mutateRoleDelete(activeRecord);
    }
  };

  const table = {
    columns: columns,
    rowKey: 'name',
    useStorageState: false,
    toolbarRight: renderTableActions({}),
    placeholder: t('SEARCH_BY_NAME'),
    ref: tableRef,
    parameters: tableParameters,
  };

  const banner = {
    icon: <Role />,
    title: t('PLATFORM_ROLE_PL'),
    description: t('PLATFORM_ROLE_DESC'),
  };

  return (
    <>
      <ListPage banner={banner} table={table} store={store} />
      <RoleCreateModal
        module={MODULE}
        visible={isCreateOpen}
        title={t('CREATE_PLATFORM_ROLE')}
        onOk={handleBaseInfo}
        onCancel={closeCreate}
      />
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
        />
      )}

      {isAuthOpen && (
        <RoleAuthorization
          module={MODULE}
          roleModules={roleModules}
          roleTemplates={roleTemplates}
          visible={isAuthOpen}
          onOk={activeRecord ? handleEditAuthorization : handleCreateAuthorization}
          aggregationRoles={get(activeRecord, 'roleTemplates', [])}
          confirmLoading={activeRecord ? isCreateLoading : isEditLoading}
          onCancel={() => {
            setActiveRecord(null);
            closeAuth();
          }}
        />
      )}
    </>
  );
}
