/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import React, { useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  Column,
  FormattedUser,
  formatTime,
  hasPermission,
  StatusIndicator,
  TableRef,
  roleStore,
  userStore,
  MemberInviteModal,
  MemberModifyModal,
  InviteMemberPayload,
  EditMemberRoleValue,
  FormattedRole,
  useActionMenu,
  ListPage,
  useCommonActions,
  clusterStore,
  getCurrentDateTimeRFC3339,
} from '@ks-console/shared';
import { Field, notify } from '@kubed/components';
import { Human, Pen, Trash } from '@kubed/icons';

import { Avatar } from './styles';
import { useQuery } from 'react-query';
import { useDisclosure } from '@kubed/hooks';

const authKey = 'members';
const {
  usePostMutation: useCreateUserMutation,
  usePutMutation: useEditUserMutation,
  useAllUserListQuery,
  combineUserList,
} = userStore;

const { patchCluster } = clusterStore;

const { fetchList } = roleStore('clusterroles');

function Members() {
  const tableRef = useRef<TableRef>();
  const params: Record<string, any> = useParams();
  const [editUser, setEditUser] = useState<FormattedUser>();

  const { isOpen: isCreateOpen, open: openCreate, close: closeCreate } = useDisclosure(false);
  const { isOpen: isEditOpen, open: openEdit, close: closeEdit } = useDisclosure(false);
  const { data: allUserList } = useAllUserListQuery();

  const { del } = useCommonActions({
    store: userStore,
    params,
    callback: async () => {
      await patchCluster(
        { name: params.cluster },
        {
          metadata: {
            annotations: {
              'kubesphere.io/syncAt': getCurrentDateTimeRFC3339(),
            },
          },
        },
      );
      tableRef?.current?.refetch();
    },
  });

  const isCurrentUser = (record: any) => globals.user.username === record.name;
  const allowViewRoles = hasPermission({
    cluster: params.cluster,
    module: 'roles',
    action: 'view',
  });

  const { data: roles = [] } = useQuery<FormattedRole[]>(['clusterroles'], async () => {
    const res = await fetchList({
      ...params,
      limit: -1,
      annotation: 'kubesphere.io/creator',
    } as any);
    return res.data;
  });

  const { mutate: mutateEditUser, isLoading: isEditLoading } = useEditUserMutation(
    {
      ...editUser,
      ...params,
    },
    {
      onSuccess: () => {
        tableRef?.current?.refetch();
        closeEdit();
        notify.success(t('UPDATE_SUCCESSFUL'));
      },
      noGetDetail: true,
    },
  );

  const { mutate: mutateInviteUser, isLoading: isInviteLoading } = useCreateUserMutation(params, {
    onSuccess: async () => {
      await patchCluster(
        { name: params.cluster },
        {
          metadata: {
            annotations: {
              'kubesphere.io/syncAt': getCurrentDateTimeRFC3339(),
            },
          },
        },
      );
      tableRef?.current?.refetch();
      closeCreate();
      notify.success(t('INVITED_SUCCESSFULLY'));
    },
  });

  const renderItemAction = useActionMenu({
    authKey,
    params,
    actions: [
      {
        key: 'modify',
        icon: <Pen />,
        text: t('CHANGE_ROLE'),
        action: 'edit',
        show: record => !isCurrentUser(record),
        onClick: user => {
          setEditUser(user as FormattedUser);
          openEdit();
        },
      },
      {
        key: 'delete',
        icon: <Trash />,
        text: t('REMOVE'),
        action: 'delete',
        show: record => !isCurrentUser(record),
        onClick: user => {
          del({
            type: 'USER',
            title: t('REMOVE_MEMBER'),
            resource: [user],
          });
        },
      },
    ],
  });

  const renderTableAction = useActionMenu({
    autoSingleButton: true,
    authKey,
    params,
    actions: [
      {
        key: 'invite',
        text: t('INVITE'),
        action: 'create',
        props: {
          color: 'secondary',
          shadow: true,
        },
        onClick: openCreate,
      },
    ],
  });

  const renderBatchAction = useActionMenu({
    autoSingleButton: true,
    authKey,
    params,
    actions: [
      {
        key: 'delete',
        text: t('REMOVE'),
        action: 'delete',
        props: {
          color: 'error',
        },
        onClick: () => {
          const selectedFlatRows = tableRef?.current?.getSelectedFlatRows() || [];
          del({
            type: 'USER',
            title:
              selectedFlatRows.length === 1 ? t('REMOVE_MEMBER') : t('REMOVE_MULTIPLE_MEMBERS'),
            resource: selectedFlatRows,
          });
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
      render: (value, row) => (
        <Field
          value={value}
          label={row.email}
          avatar={<Avatar src={row.avatar_url || '/assets/default-user.svg'} alt={value} />}
        />
      ),
    },
    {
      title: t('STATUS'),
      field: 'status',
      canHide: true,
      width: '19%',
      render: value => (
        <StatusIndicator type={value}>{t(`USER_${value.toUpperCase()}`)}</StatusIndicator>
      ),
    },
    {
      title: t('ROLE'),
      field: 'clusterrole',
      canHide: true,
      width: '19%',
      render: value => value || '-',
    },
    {
      title: t('LAST_LOGIN'),
      field: 'lastLoginTime',
      canHide: true,
      width: 150,
      render: value => (value ? formatTime(value) : t('NOT_LOGIN_YET')),
    },
    {
      id: 'more',
      title: ' ',
      width: 20,
      render: (value, row) => renderItemAction(row),
    },
  ];

  function serverDataFormatter(serverData: any) {
    const mergeData = combineUserList(serverData, allUserList as any);
    return {
      ...mergeData,
      totalItems: mergeData.totalItems,
    };
  }

  const banner = {
    icon: <Human />,
    title: t('CLUSTER_MEMBER_PL'),
    description: t('INVITE_CLUSTER_MEMBER_DESC'),
  };

  const table = {
    ref: tableRef,
    columns: columns,
    tableName: 'members',
    rowKey: 'name',
    placeholder: t('SEARCH_BY_NAME'),
    batchActions: renderBatchAction({}),
    disableRowSelect: (row: any) => isCurrentUser(row),
    toolbarRight: renderTableAction({}),
    serverDataFormat: serverDataFormatter,
  };

  return (
    <>
      <ListPage store={userStore} banner={banner} table={table} />
      {isCreateOpen && (
        <MemberInviteModal
          title={t('INVITE_MEMBER')}
          desc={t('INVITE_CLUSTER_MEMBER_DESC')}
          roles={allowViewRoles ? roles : []}
          visible={isCreateOpen}
          confirmLoading={isInviteLoading}
          onCancel={closeCreate}
          onOK={(value: InviteMemberPayload[]) =>
            mutateInviteUser({
              data: value,
            })
          }
          {...params}
        />
      )}
      {editUser && (
        <MemberModifyModal
          visible={isEditOpen}
          roles={roles}
          onCancel={closeEdit}
          initialValue={{
            roleRef: editUser?.clusterrole,
          }}
          confirmLoading={isEditLoading}
          onOk={(value: EditMemberRoleValue) => {
            mutateEditUser({
              data: {
                username: editUser.username,
                ...value,
              },
            });
          }}
        ></MemberModifyModal>
      )}
    </>
  );
}

export default Members;
