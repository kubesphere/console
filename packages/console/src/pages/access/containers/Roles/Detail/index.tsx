/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import React, { useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { assign } from 'lodash';
import {
  formatTime,
  roleStore,
  RoleAuthorization,
  useCommonActions,
  DetailPage,
  RoleDeleteModal,
} from '@ks-console/shared';
import { Pen, Role, Trash } from '@kubed/icons';
import { notify } from '@kubed/components';
import { MODULE, AUTH_KEY, ROLE_TEMPLATE, ROLE_KEY } from '../constants';
import type { FormattedRole, RoleModule } from '@ks-console/shared';
import { useDisclosure } from '@kubed/hooks';
import { useQuery } from 'react-query';

const PATH = '/access/roles/:name';
const store = roleStore(MODULE);
const { usePutMutation, getTemplates, getTemplatesCategory, useDeleteMutation, useGetMutation } =
  store;

export default function RoleDetail() {
  const { name } = useParams();
  const navigate = useNavigate();
  const ref = useRef<{ detail: FormattedRole; refetch: () => void }>(null);

  const isPresetGlobalRoles = globals.config.presetGlobalRoles.includes(name);

  const { isOpen, open, close } = useDisclosure(false);
  const { isOpen: isDeleteOpen, open: openDelete, close: closeDelete } = useDisclosure(false);

  const { data: detail } = useGetMutation({ name });

  const { mutate: mutateRoleEdit, isLoading: isEditLoading } = usePutMutation(
    {
      name,
    },
    {
      onSuccess: () => {
        close();
        notify.success(t('UPDATE_SUCCESSFUL'));
        ref.current?.refetch?.();
      },
    },
  );

  const { mutate: mutateRoleDelete, isLoading: isDeleteLoading } = useDeleteMutation({
    onSuccess: () => {
      closeDelete();
      notify.success(t('DELETED_SUCCESSFULLY'));
      navigate('/access/roles');
    },
  });

  const handleEditAuthorization = (roles: string[]) => {
    const data = assign(ROLE_TEMPLATE, detail?._originData, {
      aggregationRoleTemplates: {
        templateNames: roles,
      },
    });

    mutateRoleEdit({
      params: {
        name: detail?.name,
      },
      data,
    });
    close();
  };

  const { editBaseInfo } = useCommonActions({
    params: {
      name,
    },
    store,
    callback: () => {
      ref.current?.refetch?.();
    },
  });

  const actions = [
    {
      key: 'edit',
      icon: <Pen />,
      text: t('EDIT_INFORMATION'),
      action: 'edit',
      show: !isPresetGlobalRoles,
      onClick: editBaseInfo,
    },
    {
      key: 'editRole',
      icon: <Pen />,
      text: t('EDIT_PERMISSIONS'),
      action: 'edit',
      show: !isPresetGlobalRoles,
      onClick: open,
    },
    {
      key: 'delete',
      icon: <Trash />,
      text: t('DELETE'),
      action: 'delete',
      type: 'danger',
      show: !isPresetGlobalRoles,
      onClick: openDelete,
    },
  ];

  const { data: roleTemplates = [] } = useQuery<FormattedRole[]>(['globalroles'], async () => {
    const res = await getTemplates('global', true);
    return res;
  });

  const { data: roleModules = [] } = useQuery<RoleModule[]>(['globalsCategory'], async () => {
    const res = await getTemplatesCategory('global');
    return res;
  });

  const attrs = (data: FormattedRole) => [
    {
      label: t('CREATION_TIME_TCAP'),
      value: data?.createTime ? formatTime(data?.createTime) : '',
    },
    {
      label: t('CREATOR'),
      value: data?.creator || '',
    },
  ];

  const tabs = [
    { path: `${PATH}/authorizations`, title: t('PERMISSION_PL') },
    { path: `${PATH}/users`, title: t('AUTHORIZED_USER_PL') },
  ];

  const handleDelete = () => {
    if (detail?.name) {
      mutateRoleDelete(detail);
    }
  };

  return (
    <>
      <DetailPage
        tabs={tabs}
        store={store}
        authKey={AUTH_KEY}
        ref={ref}
        sideProps={{
          actions,
          attrs,
          icon: <Role size={28} />,
          breadcrumbs: {
            label: t('PLATFORM_ROLE_PL'),
            url: '/access/roles',
          },
        }}
      />
      {isOpen && (
        <RoleAuthorization
          roleTemplates={roleTemplates}
          aggregationRoles={detail?.roleTemplates || []}
          onOk={handleEditAuthorization}
          roleModules={roleModules}
          onCancel={close}
          visible={isOpen}
          module={MODULE}
          confirmLoading={isEditLoading}
        />
      )}
      {isDeleteOpen && (
        <RoleDeleteModal
          visible={isDeleteOpen}
          roleKey={ROLE_KEY}
          record={detail as FormattedRole}
          onOk={handleDelete}
          onCancel={closeDelete}
          confirmLoading={isDeleteLoading}
        />
      )}
    </>
  );
}
