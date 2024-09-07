/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import React, { useState } from 'react';
import { isEmpty } from 'lodash';
import { FilterInput, Button, Tag, notify } from '@kubed/components';
import { useDisclosure } from '@kubed/hooks';
import { Refresh, Enterprise } from '@kubed/icons';

import type { FormattedWorkspace } from '@ks-console/shared';
import {
  formatTime,
  getActions,
  clusterStore,
  workspaceStore,
  InfiniteScroll,
  ClusterWrapper,
  WorkspaceFormValues,
  FavoriteHistory,
} from '@ks-console/shared';
import { CreateWorkspacesModal } from '../CreateWorkspaceModal';
import {
  Toolbar,
  FilterInputWrapper,
  ButtonsWrapper,
  ListWrapper,
  StyledEntity,
  StyledField,
  ListContainer,
} from './styles';

const { useClusterList } = clusterStore;
const { useFetchWorkspacesInfiniteQuery, usePostMutation } = workspaceStore;

interface WorkspaceSelectorModalProps {
  onSelect: (formattedWorkspace: FormattedWorkspace) => void;
}

export default function WorkspaceSelectorModal({ onSelect }: WorkspaceSelectorModalProps) {
  const enabledCreate =
    getActions({ module: 'workspaces' }).includes('global-manager-workspaces') ||
    getActions({ module: 'workspaces' }).includes('global-create-workspaces');
  const createWorkspaceModal = useDisclosure();

  const [filteredWorkspaceName, setFilteredWorkspaceName] = useState('');
  const params = filteredWorkspaceName
    ? {
        name: filteredWorkspaceName,
      }
    : undefined;

  const { formattedClusters } = useClusterList({ params: { limit: -1 } });
  const {
    isLoading,
    isRefetching,
    isFetchingNextPage,
    hasNextPage,
    formattedWorkspaces,
    fetchNextPage,
    refetch,
  } = useFetchWorkspacesInfiniteQuery({ params });

  const handleChange = (value: string) => {
    setFilteredWorkspaceName(value);
  };

  const refresh = () => {
    refetch({ refetchPage: (page, index) => index === 0 });
  };

  const createWorkspaceMutation = usePostMutation(undefined, {
    onSuccess: () => {
      refresh();
      notify.success(t('CREATE_SUCCESSFUL'));
      createWorkspaceModal.close();
    },
  });

  const handleCreate = (values: WorkspaceFormValues) => {
    createWorkspaceMutation.mutate({ data: values });
  };

  const workspaces = formattedWorkspaces.map(formattedWorkspace => {
    const { name, description, clusters, createTime } = formattedWorkspace;
    const fields = [
      {
        className: 'field-main-title',
        avatar: <Enterprise size={40} />,
        value: name,
        label: description ?? '-',
      },
      {
        value:
          name === 'system-workspace' ? (
            <Tag type="secondary">{t('ALL_CLUSTERS')}</Tag>
          ) : isEmpty(clusters) ? (
            '-'
          ) : (
            <ClusterWrapper clusters={clusters} clustersDetail={formattedClusters} />
          ),
      },
      {
        value: createTime ? formatTime(createTime) : '-',
        label: t('CREATION_TIME_TCAP'),
      },
    ];

    return (
      <StyledEntity key={name} hoverable onClick={() => onSelect(formattedWorkspace)}>
        {fields.map((props, index) => (
          <StyledField key={index} {...props} />
        ))}
        <FavoriteHistory
          user={globals.user.username}
          item={{
            id: formattedWorkspace.uid,
            name: formattedWorkspace.name,
            url: `/workspaces/${formattedWorkspace.name}/overview`,
            type: 'Workspace',
            isHost: false,
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
              if (filteredWorkspaceName !== value) {
                handleChange(value);
              }
            }}
            onClear={() => handleChange('')}
          />
        </FilterInputWrapper>
        <ButtonsWrapper>
          <Button variant="text" onClick={refresh}>
            <Refresh size={16} />
          </Button>
          {enabledCreate && (
            <Button color="secondary" shadow onClick={createWorkspaceModal.open}>
              {t('CREATE_WORKSPACE')}
            </Button>
          )}
        </ButtonsWrapper>
      </Toolbar>
      <ListWrapper>
        <ListContainer>
          <InfiniteScroll
            isLoading={isLoading}
            isRefreshing={isRefetching && !isFetchingNextPage}
            hasNextPage={Boolean(hasNextPage)}
            isEmpty={formattedWorkspaces.length === 0}
            classNames={{
              container: 'ks-InfiniteScroll-container',
              content: 'ks-InfiniteScroll-content',
            }}
            onLoadMore={fetchNextPage}
          >
            {workspaces}
          </InfiniteScroll>
        </ListContainer>
      </ListWrapper>
      {createWorkspaceModal.isOpen && (
        <CreateWorkspacesModal
          visible={createWorkspaceModal.isOpen}
          width={961}
          confirmLoading={createWorkspaceMutation.isLoading}
          onOk={handleCreate}
          onCancel={createWorkspaceModal.close}
        />
      )}
    </>
  );
}
