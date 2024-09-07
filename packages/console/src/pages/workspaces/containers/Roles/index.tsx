/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import React, { useRef, useState } from 'react';
import { get, merge, set, uniq } from 'lodash';
import { Link, useParams } from 'react-router-dom';
import { Pen, Role, Trash } from '@kubed/icons';
import { Field, notify } from '@kubed/components';
import {
  Column,
  formatTime,
  TableRef,
  RoleCreateModal,
  RoleAuthorization,
  RoleDeleteModal,
  useCommonActions,
  useActionMenu,
  ListPage,
  roleStore,
} from '@ks-console/shared';
import { MODULE, AUTH_KEY, ROLE_KEY, ROLE_TEMPLATE } from './constants';
import { useDisclosure } from '@kubed/hooks';
import type { FormattedRole, RoleBaseInformationFormValues, RoleModule } from '@ks-console/shared';

import { FieldLabel } from './styles';
import { useQuery } from 'react-query';

const store = roleStore(MODULE);

const {
  usePutMutation,
  usePostMutation,
  useDeleteMutation,
  getTemplates,
  getTemplatesCategory,
  getResourceUrl,
} = store;

export default function WorkspaceRoles() {
  const params = useParams();
  const { workspace } = params;
  const tableRef = useRef<TableRef<any>>(null);
  const [activeRecord, setActiveRecord] = useState<FormattedRole | null>();
  const [baseInfo, setBaseInfo] = useState<RoleBaseInformationFormValues>();
  const { isOpen: isCreateOpen, open: openCreate, close: closeCreate } = useDisclosure(false);
  const { isOpen: isAuthOpen, open: openAuth, close: closeAuth } = useDisclosure(false);
  const { isOpen: isDeleteOpen, open: openDelete, close: closeDelete } = useDisclosure(false);
  const isPresetWorkspaceRoles = (row: Record<string, any>): boolean =>
    globals.config.presetWorkspaceRoles.includes(row.name.slice((workspace || '').length + 1));
  const tableParameters = {
    annotation: 'kubesphere.io/creator',
  };

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

  const { mutate: mutateRoleCreate, isLoading: isCreateLoading } = usePostMutation(params, {
    onSuccess: () => {
      closeCreate();
      closeAuth();
      notify.success(t('CREATE_SUCCESSFUL'));
      tableRef?.current?.refetch();
    },
  });

  const { mutate: mutateRoleEdit, isLoading: isEditLoading } = usePutMutation(params, {
    onSuccess: () => {
      setActiveRecord(null);
      closeAuth();
      notify.success(t('UPDATE_SUCCESSFUL'));
      tableRef?.current?.refetch();
    },
  });

  const { data: roleTemplates = [] } = useQuery<FormattedRole[]>(['workspaceroles'], async () => {
    const res = await getTemplates('workspace', true);
    return res;
  });

  const { data: basicRoleTemplates = [] } = useQuery<FormattedRole[]>(
    ['workspacebasicroles'],
    async () => {
      const res = await getTemplates(
        'workspace',
        true,
        'iam.kubesphere.io/scope=workspace,iam.kubesphere.io/basic-role-template=true,kubesphere.io/managed=true',
      );
      return res;
    },
  );

  const { data: roleModules = [] } = useQuery<RoleModule[]>(['workspacesCategory'], async () => {
    const res = await getTemplatesCategory('workspace');
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
        show: row => !isPresetWorkspaceRoles(row),
        onClick: editBaseInfo,
      },
      {
        key: 'editRole',
        icon: <Pen />,
        text: t('EDIT_PERMISSIONS'),
        action: 'edit',
        show: row => !isPresetWorkspaceRoles(row),
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
        show: row => !isPresetWorkspaceRoles(row),
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
    params,
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
    const basicRoleTemplatesList = basicRoleTemplates?.map(item => item.name) ?? [];

    const data = merge(ROLE_TEMPLATE, baseInfo, {
      aggregationRoleTemplates: {
        templateNames: uniq([...auth, ...basicRoleTemplatesList]),
      },
    });

    mutateRoleCreate({
      data,
    });
  };

  const handleEditAuthorization = (roles: string[]) => {
    const data = merge(ROLE_TEMPLATE, activeRecord?._originData);
    set(data, 'aggregationRoleTemplates.templateNames', uniq(roles));

    mutateRoleEdit({
      params: {
        name: activeRecord?.name,
      },
      data,
    });
  };

  const handleDelete = () => {
    if (activeRecord?.name) {
      mutateRoleDelete({
        ...params,
        ...activeRecord,
      });
    }
  };

  const table = {
    url: getResourceUrl(params),
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
    title: t('WORKSPACE_ROLE_PL'),
    description: t('WORKSPACE_ROLE_DESC'),
  };

  return (
    <>
      <ListPage banner={banner} table={table} store={store} />
      {isCreateOpen && (
        <RoleCreateModal
          module={MODULE}
          params={params}
          visible={isCreateOpen}
          title={t('CREATE_PLATFORM_ROLE')}
          onOk={handleBaseInfo}
          onCancel={closeCreate}
        />
      )}

      {isDeleteOpen && activeRecord && (
        <RoleDeleteModal
          key={activeRecord.name}
          roleKey={ROLE_KEY}
          visible={isDeleteOpen}
          record={activeRecord}
          onCancel={() => {
            closeDelete();
            setActiveRecord(null);
          }}
          workspace={workspace}
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
