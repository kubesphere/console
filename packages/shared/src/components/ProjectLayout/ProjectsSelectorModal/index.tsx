/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import React, { useMemo, useRef, useState } from 'react';
import { Refresh } from '@kubed/icons';
import { Button, FilterInput, NavItem, Navs, notify } from '@kubed/components';

import { hasKSModule, isMultiCluster } from '../../../utils';
import { projectNewStore } from '../../../stores';
import ListContent from './ListContent';
import { FormattedTypeProject } from './hooks';
import type { ListContentRefType } from './ListContent';

import { Toolbar, FilterInputWrapper, ButtonsWrapper, ListWrapper, ListContainer } from './styles';
import { useProjectCreateModal } from '../useProjectCreateModal';
import { withModalProvider } from '../useModal';

type Props = {
  cluster: string;
  workspace: string;
  enableActions: Record<string, string[]>;
  onSelect: (url?: string) => void;
};

function ProjectsSelectorModal({
  cluster,
  workspace,
  enableActions,
  onSelect,
}: Props): JSX.Element {
  const listContentRef = useRef<ListContentRefType>(null);
  const [search, setSearch] = useState<string>('');
  const [clusterSelected] = useState<string>(cluster);
  const [currentType, setCurrentType] = useState<string>('projects');
  const enabledCreate = useMemo(() => enableActions[currentType].includes('manage'), [currentType]);
  const showClusterSelect = useMemo(
    () => isMultiCluster() && currentType !== 'federatedprojects',
    [currentType],
  );

  const { open: openCreateModal, close: closeCreateModal } = useProjectCreateModal();

  const navs: NavItem[] = useMemo(() => {
    const items = [
      {
        value: 'projects',
        label: t('PROJECT_PL'),
      },
    ];

    if (isMultiCluster() && hasKSModule('kubefed')) {
      items.push({
        value: 'federatedprojects',
        label: t('MULTI_CLUSTER_PROJECT_PL'),
      });
    }

    if (hasKSModule('devops')) {
      items.push({
        value: 'devops',
        label: t('DEVOPS_PROJECT_PL'),
      });
    }

    return items;
  }, []);

  function handleTypeChange(type: string): void {
    setCurrentType(type);
  }

  function handleFilterChange(value: string): void {
    setSearch(value);
  }

  function handleRefresh(): void {
    listContentRef.current?.fetchData();
  }

  function handleProjectCreate(): void {
    openCreateModal(
      {
        store: projectNewStore,
      },
      {
        params: { cluster, workspace },
        onSuccess: () => {
          closeCreateModal();
          notify.success(t('CREATE_SUCCESSFUL'));
          handleRefresh();
        },
      },
    );
  }

  const getUrl = ({ name, namespace }: { name: string; namespace?: string }) => {
    const urlMap: Record<string, string | undefined> = {
      projects: `/${workspace}/clusters/${clusterSelected}/projects/${name}`,
      federatedprojects: `/${workspace}/federatedprojects/${name}`,
      devops:
        namespace && clusterSelected
          ? `/${workspace}/clusters/${clusterSelected}/devops/${namespace}`
          : undefined,
    };
    return urlMap[currentType];
  };

  function handleProjectSelected({ name, namespace }: FormattedTypeProject): void {
    onSelect(getUrl({ name, namespace }));
  }

  return (
    <>
      <Toolbar>
        <Navs value={currentType} data={navs} onChange={handleTypeChange} />
        <FilterInputWrapper>
          {showClusterSelect && (
            // TODO: render cluster selector component
            // <ClusterSelect
            //   className="cluster"
            //   options={clusters}
            //   value={cluster}
            //   onChange={handleClusterChange}
            // />
            <></>
          )}
          <FilterInput
            simpleMode
            placeholder={t('SEARCH_BY_NAME')}
            onChange={handleFilterChange}
            onClear={() => setSearch('')}
          />
        </FilterInputWrapper>
        <ButtonsWrapper>
          <Button variant="text" onClick={handleRefresh}>
            <Refresh size={16} />
          </Button>
          {enabledCreate && (
            // TODO: missing action
            <Button color="secondary" shadow onClick={handleProjectCreate}>
              {t('CREATE_PROJECT')}
            </Button>
          )}
        </ButtonsWrapper>
      </Toolbar>
      <ListWrapper>
        <ListContainer>
          <ListContent
            ref={listContentRef}
            type={currentType}
            cluster={clusterSelected}
            workspace={workspace}
            onSelect={handleProjectSelected}
            search={search}
            getUrl={getUrl}
          />
        </ListContainer>
      </ListWrapper>
    </>
  );
}

export default withModalProvider(ProjectsSelectorModal);
