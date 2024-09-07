/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import React, { ReactNode, useState } from 'react';
import { debounce, isEmpty } from 'lodash';

import { FilterInput } from '@kubed/components';
import { userStore } from '../../../stores';
import { InfiniteScroll } from '../../InfiniteScroll';
import User from './user';

import type {
  PathParams,
  FormattedRole,
  FormattedUser,
  InviteMemberPayload,
  InviteMemberValue,
} from '../../../types';
import {
  ModalWrapper,
  ModalHeader,
  ModalTitle,
  ModalWithoutHeader,
  ModalDesc,
  ModalContent,
  ResultsWrapper,
} from './style';
import { useQuery } from 'react-query';

interface Props extends PathParams {
  visible: boolean;
  roles: FormattedRole[];
  title?: ReactNode;
  desc?: ReactNode;
  searchPlaceholder?: string;
  confirmLoading?: boolean;
  onOK?: (value: InviteMemberPayload[]) => void;
  onCancel?: () => void;
}

const { useInfiniteUserList, fetchList } = userStore;

export default function MemberInviteModal({
  visible,
  title,
  roles,
  desc,
  searchPlaceholder,
  namespace,
  devops,
  workspace,
  cluster,
  onCancel,
  onOK,
}: Props) {
  const [clusterMembers, setClusterMembers] = useState<InviteMemberValue[]>([]);
  const [requestParams, setRequestParams] = useState({
    name: '',
    limit: 10,
    workspace: namespace || devops ? workspace : undefined,
  });

  const {
    data: users = [],
    fetchNextPage: userNextPage,
    isLoading: isUserLoading,
    hasNextPage,
    refetch,
  } = useInfiniteUserList(requestParams);

  const { data: members = [] } = useQuery<FormattedUser[]>(
    ['fetchUserList', cluster, workspace, namespace, devops],
    async () => {
      const res = await fetchList({
        limit: -1,
        cluster,
        workspace,
        namespace,
        devops,
      });
      return res.data;
    },
  );

  const handleSelect = (user: FormattedUser, roleRef: string) => {
    setClusterMembers([
      ...clusterMembers,
      {
        user,
        roleRef,
      },
    ]);
  };

  const handleOk = () => {
    onOK?.(
      clusterMembers.map(t => ({
        username: t.user.username,
        roleRef: t.roleRef,
      })),
    );
  };

  const onFilterInputChange = debounce((val: string) => {
    setRequestParams({
      ...requestParams,
      name: val,
    });
    refetch();
  }, 500);

  return (
    <ModalWithoutHeader width={691} visible={visible} onOk={handleOk} onCancel={onCancel}>
      <ModalWrapper>
        <ModalHeader>
          <ModalTitle>{title || t('INVITE_MEMBER')}</ModalTitle>
          <ModalDesc>{desc || t('INVITE_MEMBER_DESC')}</ModalDesc>
        </ModalHeader>
        <ModalContent>
          <FilterInput
            onChange={onFilterInputChange}
            onInputChange={(val: string) => {
              if (isEmpty(val)) {
                onFilterInputChange(val);
              }
            }}
            simpleMode={true}
            placeholder={searchPlaceholder || t('INVITE_MEMBER_SEARCH_PLACEHOLDER')}
          />
          <ResultsWrapper>
            <InfiniteScroll
              isLoading={isUserLoading}
              isEmpty={users.length === 0}
              hasNextPage={!!hasNextPage}
              classNames={{
                container: 'ks-InfiniteScroll-container',
              }}
              onLoadMore={userNextPage}
            >
              {users.map(user => (
                <User
                  key={user.name}
                  user={user}
                  roles={roles}
                  selected={[...members, ...clusterMembers.map(t => t.user)]
                    .map(t => t.name)
                    .includes(user.name)}
                  onSelect={handleSelect}
                />
              ))}
            </InfiniteScroll>
          </ResultsWrapper>
        </ModalContent>
      </ModalWrapper>
    </ModalWithoutHeader>
  );
}
