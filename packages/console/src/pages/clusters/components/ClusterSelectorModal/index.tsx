/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import React, { useState } from 'react';
import { FilterInput, Button } from '@kubed/components';
import { Refresh } from '@kubed/icons';

import type { FormattedCluster } from '@ks-console/shared';
import {
  formatTime,
  clusterStore,
  InfiniteScroll,
  ClusterTitle,
  FavoriteHistory,
} from '@ks-console/shared';

import {
  Toolbar,
  FilterInputWrapper,
  ButtonsWrapper,
  ListWrapper,
  StyledEntity,
  StyledField,
  ListContainer,
} from './styles';

const { useFetchClustersInfiniteQuery } = clusterStore;

interface ClusterSelectorModalProps {
  onSelect: (cluster: FormattedCluster) => void;
}

export default function ClusterSelectorModal({ onSelect }: ClusterSelectorModalProps) {
  const [filteredClusterName, setFilteredClusterName] = useState('');
  const params = filteredClusterName
    ? {
        name: filteredClusterName,
      }
    : undefined;

  const {
    isLoading,
    isRefetching,
    isFetchingNextPage,
    hasNextPage,
    formattedClusters,
    fetchNextPage,
    refetch,
  } = useFetchClustersInfiniteQuery({
    params: {
      ...params,
      labelSelector: '!cluster-role.kubesphere.io/edge',
    },
  });

  const handleChange = (value: string) => {
    setFilteredClusterName(value);
  };

  const refresh = () => {
    refetch({ refetchPage: (page, index) => index === 0 });
  };

  const clusters = formattedClusters.map(cluster => {
    const { name, nodeCount, kubernetesVersion, provider, createTime } = cluster;
    const fields = [
      {
        value: nodeCount ?? '-',
        label: t('NODE_COUNT'),
      },
      {
        value: kubernetesVersion ?? '-',
        label: t('KUBERNETES_VERSION'),
      },
      {
        value: provider ?? '-',
        label: t('PROVIDER'),
        className: 'field-provider',
      },
      {
        value: createTime ? formatTime(createTime) : '-',
        label: t('CREATION_TIME'),
      },
    ];

    return (
      <StyledEntity key={name} hoverable onClick={() => onSelect(cluster)}>
        <ClusterTitle className="field-main-title" cluster={cluster} />
        {fields.map((props, index) => (
          <StyledField key={index} {...props} />
        ))}
        <FavoriteHistory
          user={globals.user.username}
          item={{
            id: cluster.uid,
            name: cluster.name,
            url: `/clusters/${cluster.name}/overview`,
            type: 'Cluster',
            isHost: cluster.isHost,
          }}
        />
      </StyledEntity>
    );
  });

  return (
    <>
      <Toolbar>
        <FilterInputWrapper>
          <FilterInput
            simpleMode
            placeholder={t('SEARCH_BY_NAME')}
            onChange={value => {
              if (filteredClusterName !== value) {
                handleChange(value);
              }
            }}
            onClear={() => {
              handleChange('');
            }}
          />
        </FilterInputWrapper>
        <ButtonsWrapper>
          <Button
            variant="text"
            onClick={() => {
              refresh();
            }}
          >
            <Refresh size={16} />
          </Button>
        </ButtonsWrapper>
      </Toolbar>
      <ListWrapper>
        <ListContainer>
          <InfiniteScroll
            isLoading={isLoading}
            isRefreshing={isRefetching && !isFetchingNextPage}
            hasNextPage={Boolean(hasNextPage)}
            isEmpty={formattedClusters.length === 0}
            classNames={{
              container: 'ks-InfiniteScroll-container',
              content: 'ks-InfiniteScroll-content',
            }}
            onLoadMore={fetchNextPage}
          >
            {clusters}
          </InfiniteScroll>
        </ListContainer>
      </ListWrapper>
    </>
  );
}
