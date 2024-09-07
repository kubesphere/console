/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import React from 'react';
import styled from 'styled-components';

import { Modal } from '@kubed/components';
import { userStore, groupStore } from '../../../stores';
import { FormattedRole, PathParams } from '../../../types';
import { useQuery } from 'react-query';

interface Props {
  visible: boolean;
  record?: FormattedRole & PathParams;
  cluster?: string;
  workspace?: string;
  namespace?: string;
  onOk?: () => void;
  onCancel?: () => void;
  confirmLoading?: boolean;
  roleKey: string;
}

const { fetchList } = userStore;
const { useGetWorkspaceRoleBinding } = groupStore;

const Text = styled.p`
  padding: 20px;
  color: ${({ theme }) => theme.palette.colors.dark[1]};
`;

function RoleDeleteModal({
  visible,
  record,
  cluster,
  workspace,
  namespace,
  roleKey,
  confirmLoading,
  onOk,
  onCancel,
}: Props) {
  const { data: users = [], isLoading: isUserLoading } = useQuery([], async () => {
    const res = await fetchList({
      [roleKey]: record?.name,
      cluster,
      workspace,
      namespace,
    });
    return res.data;
  });
  const { data: groups = {}, isLoading: isGroupLoading } = useGetWorkspaceRoleBinding('', {
    cluster,
    workspace,
    namespace,
    labelSelector: `iam.kubesphere.io/role-ref=${record?.name}`,
  });
  const isLoading = isUserLoading || isGroupLoading;

  let text = t('DELETE_ROLE_TIP', { resource: record?.name });

  if (!isLoading && users.length) {
    text = t(`DELETE_ROLE_USER_TIP${users.length === 1 ? '' : '_PL'}`, {
      count: users.length,
    });
  } else if (groups.totalItems) {
    text = t(`DELETE_ROLE_DEPARTMENT_TIP${groups.totalItems === 1 ? '' : '_PL'}`, {
      count: groups.totalItems,
    });
  }

  const allowDelete = !(isLoading || users.length || groups.totalItems);

  return (
    <Modal
      width={504}
      onOk={allowDelete ? onOk : undefined}
      onCancel={onCancel}
      visible={visible}
      title={t('DELETE_ROLE')}
      confirmLoading={confirmLoading}
      okButtonProps={{ color: 'error', style: allowDelete ? undefined : { display: 'none' } }}
    >
      <Text dangerouslySetInnerHTML={{ __html: text }}></Text>
    </Modal>
  );
}

export default RoleDeleteModal;
