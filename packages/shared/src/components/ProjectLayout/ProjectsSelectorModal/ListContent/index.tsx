/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import React, { Ref, forwardRef, useImperativeHandle } from 'react';

import { formatTime } from '../../../../utils';
import Icon from '../../../Icon';
import { FavoriteHistory } from '../../../FavoriteHistory';
import { FormattedTypeProject, useFetchProjectsByTypeInfiniteQuery } from '../hooks';
import { InfiniteScroll } from '../../../InfiniteScroll';
import { StyledEntity, StyledField } from './styles';

export type ListContentRefType = {
  fetchData: () => void;
};

type Props = {
  type: string;
  cluster: string;
  workspace: string;
  onSelect: (item: FormattedTypeProject) => void;
  search?: string;
  getUrl: (_: { name: string; namespace?: string }) => string | undefined;
};

function ListContent(
  { type, cluster, workspace, onSelect, search, getUrl }: Props,
  ref: Ref<ListContentRefType>,
): JSX.Element {
  const {
    formattedData,
    isLoading,
    isFetchingNextPage,
    isRefetching,
    hasNextPage,
    fetchNextPage,
    refetch,
  } = useFetchProjectsByTypeInfiniteQuery({ type, cluster, workspace, params: { name: search } });

  const InnerContent = formattedData?.map(item => {
    const { name, aliasName, description, createTime, creator } = item;
    const iconName = type === 'devops' ? 'strategy-group' : 'project';
    const fields = [
      {
        className: 'field-main-title',
        avatar: <Icon name={iconName} size={40} />,
        value: aliasName ? `${aliasName}（${name}）` : name,
        label: description ?? '-',
      },
      { value: creator || '-', label: t('CREATOR') },
      {
        value: createTime ? formatTime(createTime) : '-',
        label: t('CREATION_TIME_TCAP'),
      },
    ];

    return (
      <StyledEntity key={name} hoverable onClick={() => onSelect(item)}>
        {fields.map((props, index) => (
          <StyledField key={index} {...props} />
        ))}
        <FavoriteHistory
          user={globals.user.username}
          item={{
            id: item.uid,
            name,
            url: getUrl(item) || '',
            type: 'Project',
            isHost: false,
          }}
        />
      </StyledEntity>
    );
  });

  useImperativeHandle(ref, () => ({ fetchData: refetch }));

  return (
    <InfiniteScroll
      isLoading={isLoading}
      isRefreshing={isRefetching && !isFetchingNextPage}
      hasNextPage={Boolean(hasNextPage)}
      isEmpty={formattedData?.length === 0}
      classNames={{
        container: 'ks-InfiniteScroll-container',
        content: 'ks-InfiniteScroll-content',
      }}
      onLoadMore={fetchNextPage}
    >
      {InnerContent}
    </InfiniteScroll>
  );
}

export default forwardRef(ListContent);
