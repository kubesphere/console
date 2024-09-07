/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import React, { useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { noop } from 'lodash';
import { Loading } from '@kubed/components';
import { Pen, Trash } from '@kubed/icons';
import { useDisclosure } from '@kubed/hooks';

import {
  DetailPage,
  PutUserPasswordRequestData,
  userStore,
  FormattedUser,
  useCommonActions,
} from '@ks-console/shared';

import { USERS_TABLE_NAME } from '../constants';
import UserEditModal from '../components/UserEditModal';
import UserModifyPasswordModal from '../components/UserModifyPasswordModal';
import { modifyUserPassword } from '../actions';

const PATH = '/access/accounts/:name';

const {
  getDetailDescription,
  useGetMutation: useUserQuery,
  useModifyUserPasswordMutation,
} = userStore;

export default function AccountDetail() {
  const params = useParams<'name'>();
  const navigate = useNavigate();
  const ref = useRef<{ detail: FormattedUser; refetch: () => void }>(null);

  const { isOpen: isEditOpen, open: openEdit, close: closeEdit } = useDisclosure(false);
  const { isOpen: isPasswordOpen, open: openPassword, close: closePassword } = useDisclosure(false);

  const { del } = useCommonActions({
    store: userStore,
    callback: () => {
      navigate('/access/accounts', { replace: true });
    },
  });

  const { isLoading, data: formattedUser } = useUserQuery(params);

  const modifyUserPasswordMutation = useModifyUserPasswordMutation({
    name: formattedUser?.name ?? '',
  });

  const handleUserPasswordModify = (modifyUserPasswordParams: PutUserPasswordRequestData) => {
    modifyUserPassword({
      params: modifyUserPasswordParams,
      mutate: modifyUserPasswordMutation.mutate,
      onSuccess: closePassword,
    });
  };

  if (isLoading) {
    return <Loading className="page-loading" />;
  }

  const name = formattedUser?.name;
  const username = formattedUser?.username;
  const detailDesc = formattedUser ? getDetailDescription(formattedUser) : '';

  const attrs = (data: FormattedUser) => [
    {
      label: t('PLATFORM_ROLE'),
      value: data.globalrole ?? '',
    },
    {
      label: t('EMAIL'),
      value: data.email ?? '',
    },
    {
      label: t('LAST_LOGIN'),
      value: data.displayLastLoginTime ?? '',
    },
  ];

  const showAction = !globals.config?.presetUsers.includes(name);

  const actions = [
    {
      key: 'edit',
      icon: <Pen />,
      text: t('EDIT'),
      action: 'edit',
      show: showAction,
      onClick: openEdit,
    },
    {
      key: 'modifyPassword',
      icon: <Pen />,
      text: t('CHANGE_PASSWORD'),
      action: 'edit',
      show: showAction,
      onClick: openPassword,
    },
    {
      key: 'delete',
      icon: <Trash />,
      text: t('DELETE'),
      action: 'delete',
      show: showAction,
      onClick: () =>
        del({
          type: 'USER',
          resource: [{ name: formattedUser?.username }],
        }),
    },
  ];

  const sideProps = {
    title: username,
    description: detailDesc,
    attrs,
    breadcrumbs: {
      label: t('USER_PL'),
      url: '/access/accounts',
      listName: USERS_TABLE_NAME,
    },
    actions,
  };

  return (
    <>
      <DetailPage
        ref={ref}
        store={userStore}
        authKey="users"
        sideProps={sideProps}
        tabs={[
          {
            path: `${PATH}/login-history`,
            title: t('LOGIN_HISTORY'),
          },
        ]}
      />
      {formattedUser && (
        <UserEditModal
          visible={isEditOpen}
          formattedUser={formattedUser}
          onSuccess={ref?.current?.refetch || noop}
          onCancel={closeEdit}
        />
      )}
      {formattedUser && (
        <UserModifyPasswordModal
          visible={isPasswordOpen}
          formattedUser={formattedUser}
          confirmLoading={modifyUserPasswordMutation.isLoading}
          onOk={handleUserPasswordModify}
          onCancel={closePassword}
        />
      )}
    </>
  );
}
