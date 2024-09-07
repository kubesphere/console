/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import React, { useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { merge } from 'lodash';
import {
  DetailPage,
  formatTime,
  RoleAuthorization,
  RoleDeleteModal,
  roleStore,
  useCommonActions,
} from '@ks-console/shared';
import { Pen, Role, Trash } from '@kubed/icons';
import { notify } from '@kubed/components';
import { MODULE, AUTH_KEY, ROLE_KEY, ROLE_TEMPLATE } from '../constants';
import type { FormattedRole, RoleModule } from '@ks-console/shared';
import { useDisclosure } from '@kubed/hooks';
import { useQuery } from 'react-query';

const PATH = '/clusters/:cluster/roles/:name';
const store = roleStore(MODULE);
const { usePutMutation, getTemplates, getTemplatesCategory, useDeleteMutation, useGetMutation } =
  store;

export default function RoleDetail() {
  const { cluster, name } = useParams();
  const navigate = useNavigate();
  const ref = useRef<{ detail: FormattedRole; refetch: () => void }>(null);
  const isPresetClusterRole = globals.config.presetClusterRoles.includes(name);
  const { isOpen, open, close } = useDisclosure(false);
  const { isOpen: isDeleteOpen, open: openDelete, close: closeDelete } = useDisclosure(false);

  const { data: detail } = useGetMutation({ cluster, name });

  const { mutate: mutateRoleEdit, isLoading: isEditLoading } = usePutMutation(
    {
      cluster,
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
    const data = merge(ROLE_TEMPLATE, detail?._originData, {
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
      cluster,
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
      show: !isPresetClusterRole,
      onClick: editBaseInfo,
    },
    {
      key: 'editRole',
      icon: <Pen />,
      text: t('EDIT_PERMISSIONS'),
      action: 'edit',
      show: !isPresetClusterRole,
      onClick: open,
    },
    {
      key: 'delete',
      icon: <Trash />,
      text: t('DELETE'),
      action: 'delete',
      type: 'danger',
      show: !isPresetClusterRole,
      onClick: openDelete,
    },
  ];

  const { data: roleTemplates = [] } = useQuery<FormattedRole[]>(['clusterroles'], async () => {
    const res = await getTemplates('cluster', true);
    return res;
  });

  const { data: roleModules = [] } = useQuery<RoleModule[]>(['clusterCategory'], async () => {
    const res = await getTemplatesCategory('cluster');
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
    if (ref.current?.detail?.name) {
      mutateRoleDelete({
        cluster,
        name: ref.current.detail.name,
      });
    }
  };

  return (
    <>
      <DetailPage
        tabs={tabs}
        ref={ref}
        store={store}
        authKey={AUTH_KEY}
        sideProps={{
          actions,
          attrs,
          icon: <Role size={28} />,
          breadcrumbs: {
            label: t('CLUSTER_ROLE'),
            url: `/clusters/${cluster}/roles`,
          },
        }}
      />
      <RoleAuthorization
        roleTemplates={roleTemplates}
        roleModules={roleModules}
        aggregationRoles={detail?.roleTemplates || []}
        onOk={handleEditAuthorization}
        onCancel={close}
        visible={isOpen}
        module={MODULE}
        confirmLoading={isEditLoading}
      />
      <RoleDeleteModal
        visible={isDeleteOpen}
        roleKey={ROLE_KEY}
        record={detail}
        onOk={handleDelete}
        onCancel={closeDelete}
        confirmLoading={isDeleteLoading}
        cluster={cluster}
      />
    </>
  );
}
