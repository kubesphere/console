/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import React, { useState, useRef } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { noop } from 'lodash';
import { Field } from '@kubed/components';
import { Human, Pen, Stop, Start, Trash } from '@kubed/icons';
import { Column, TableRef, useActionMenu, ListPage, useCommonActions } from '@ks-console/shared';
import { useUrl, StatusIndicator, userStore, getPlatformRolesAliasName } from '@ks-console/shared';
import type { FormattedUser, UserStatusMutationType } from '@ks-console/shared';
import { USERS_TABLE_NAME } from './constants';
import { modifyUserStatus, modifyUsersStatus } from './actions';
import UserCreateModal from './components/UserCreateModal';
import UserEditModal from './components/UserEditModal';
import { Avatar } from './styles';
import { useDisclosure } from '@kubed/hooks';

const { module, useUserStatusMutation, useUsersStatusMutation, showAction } = userStore;

export default function Accounts() {
  const [searchParams] = useSearchParams();
  const initialName = searchParams.get('name');
  const initialParameters = initialName ? { name: initialName.trim() } : undefined;
  const [parameters, setParameters] = useState<{ name: string } | undefined>(initialParameters);
  const [selectFlatRows, setSelectFlatRows] = useState<FormattedUser[]>([]);

  const { isOpen: isCreateOpen, open: openCreate, close: closeCreate } = useDisclosure(false);
  const { isOpen: isEditOpen, open: openEdit, close: closeEdit } = useDisclosure(false);

  const [currentFormattedUser, setCurrentFormattedUser] = useState<FormattedUser>();
  const tableRef = useRef<TableRef<FormattedUser>>(null);
  const refetchUsers = tableRef.current?.refetch ?? noop;
  const { getWatchListUrl } = useUrl({ module });

  const { del } = useCommonActions({
    store: userStore,
    callback: () => {
      refetchUsers();
    },
  });

  const userStatusMutation = useUserStatusMutation();

  const handleUserStatus = (formattedUser: FormattedUser) => {
    modifyUserStatus({
      formattedUser,
      mutate: userStatusMutation.mutate,
      onSuccess: refetchUsers,
    });
  };

  const usersStatusMutation = useUsersStatusMutation();

  const handleUsersStatus = (type: UserStatusMutationType) => {
    const items = tableRef.current?.getSelectedFlatRows();
    if (items) {
      modifyUsersStatus({
        formattedUsers: items,
        type,
        mutate: usersStatusMutation.mutate,
        onSuccess: refetchUsers,
      });
    }
  };

  // TODO: Batch actions styles
  const buttonStyle = {
    minWidth: '96px',
    marginRight: '12px',
  };

  const renderBatchAction = useActionMenu({
    mode: 'button',
    authKey: module,
    actions: [
      {
        key: 'delete',
        action: 'delete',
        text: t('DELETE'),
        props: {
          color: 'error',
          style: buttonStyle,
        },
        onClick: () => {
          if (selectFlatRows.length) {
            const usernames = selectFlatRows.map(({ username }) => ({
              name: username,
            }));
            if (selectFlatRows.length === 1) {
              setCurrentFormattedUser(selectFlatRows[0]);
            }
            del({
              type: 'USER',
              resource: usernames,
            });
          }
        },
      },
      {
        key: 'active',
        action: 'edit',
        text: t('ENABLE'),
        props: {
          style: buttonStyle,
        },
        disabled: () => selectFlatRows.every(item => item.status === 'Active'),
        onClick: () => handleUsersStatus('active'),
      },
      {
        key: 'disabled',
        action: 'edit',
        text: t('DISABLE'),
        props: {
          style: buttonStyle,
        },
        disabled: () => selectFlatRows.every(item => item.status === 'Disabled'),
        onClick: () => handleUsersStatus('disabled'),
      },
    ],
  });

  const renderItemAction = useActionMenu({
    authKey: module,
    actions: [
      {
        key: 'edit',
        action: 'edit',
        icon: <Pen />,
        text: t('EDIT'),
        show: showAction,
        onClick: item => {
          setCurrentFormattedUser(item);
          openEdit();
        },
      },
      {
        key: 'status',
        action: 'edit',
        icon: item => (item.status === 'Active' ? <Stop /> : <Start />),
        text: item => (item.status === 'Active' ? t('DISABLE') : t('ENABLE')),
        show: showAction,
        onClick: item => handleUserStatus(item),
      },
      {
        key: 'delete',
        action: 'delete',
        icon: <Trash />,
        text: t('DELETE'),
        show: showAction,
        onClick: item => {
          setCurrentFormattedUser(item);
          del({
            type: 'USER',
            resource: [
              {
                name: item.username,
              },
            ],
          });
        },
      },
    ],
  });

  const renderTableAction = useActionMenu({
    autoSingleButton: true,
    authKey: module,
    actions: [
      {
        key: 'create',
        action: 'create',
        text: t('CREATE'),
        props: {
          color: 'secondary',
          shadow: true,
        },
        onClick: openCreate,
      },
    ],
  });

  const columns: Column[] = [
    {
      title: t('NAME'),
      field: 'username',
      render: (value, row) => (
        <Field
          value={<Link to={value}>{row.aliasName ? `${row.aliasName} (${value})` : value}</Link>}
          label={row.email}
          avatar={<Avatar src={row.avatar_url || '/assets/default-user.svg'} alt={value} />}
        />
      ),
    },
    {
      title: t('STATUS'),
      field: 'status',
      canHide: true,
      width: '20%',
      render: value => (
        <StatusIndicator type={value}>{t(`USER_${value.toUpperCase()}`)}</StatusIndicator>
      ),
    },
    {
      title: t('PLATFORM_ROLE'),
      field: 'globalrole',
      canHide: true,
      width: '20%',
      render: value => getPlatformRolesAliasName(value) || '-',
    },
    {
      title: t('LAST_LOGIN'),
      field: 'displayLastLoginTime',
      canHide: true,
      width: '20%',
    },
    {
      id: 'more',
      title: ' ',
      render: (value, row) => renderItemAction(row as FormattedUser),
    },
  ];

  const watchListUrl = getWatchListUrl();

  const handleFilterInputChange = (value: string) => {
    const name = value.trim();
    if (name) {
      setParameters({ name });
    } else {
      setParameters(undefined);
    }
  };

  const banner = {
    icon: <Human />,
    title: t('USER_PL'),
    description: t('USER_DESC'),
  };

  const table = {
    ref: tableRef,
    tableName: USERS_TABLE_NAME,
    columns,
    rowKey: 'name',
    placeholder: t('SEARCH_BY_NAME'),
    enableQueryString: true,
    simpleSearch: true,
    parameters: parameters,
    batchActions: renderBatchAction({}),
    // TODO: type
    onSelect: (id: any, flat: any[]) => setSelectFlatRows(flat),
    disableRowSelect: (row: any) => !showAction(row),
    toolbarRight: renderTableAction({}),
    watchOptions: { enabled: true, url: watchListUrl, module },
    emptyOptions: {
      createButton: true,
      clickCreateButtonFn: openCreate,
    },
    onFilterInputChange: handleFilterInputChange,
  };

  return (
    <>
      <ListPage banner={banner} store={userStore} table={table} />
      {isCreateOpen && (
        <UserCreateModal visible={isCreateOpen} onSuccess={refetchUsers} onCancel={closeCreate} />
      )}
      {currentFormattedUser && (
        <UserEditModal
          visible={isEditOpen}
          formattedUser={currentFormattedUser}
          onSuccess={refetchUsers}
          onCancel={closeEdit}
        />
      )}
    </>
  );
}
