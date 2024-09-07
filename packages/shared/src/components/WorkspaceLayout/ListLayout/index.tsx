/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import { useModal } from '@kubed/components';
import { Enterprise } from '@kubed/icons';
import React, { useEffect, useMemo } from 'react';
import { Outlet, useLocation, useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';

import ListPageSide from '../../Layouts/ListPageSide';
import { ListPageMain } from '../../Layouts/ListPageMain';
import { FavoriteHistory } from '../../FavoriteHistory';
import { permissionStore, useGlobalStore, workspaceStore } from '../../../stores';
import { NavMenu, NavMenuItem } from '../../Layouts/NavMenu';
import NavTitle from '../../Layouts/NavTitle';

import type { FormattedWorkspace } from '../../../types';

import { sortBy } from 'lodash';
import IndexChild from '../IndexChild';
import WorkspaceSelectorModal from '../WorkspaceSelectorModal';

const { useFetchWorkspaceQuery } = workspaceStore;

const navKey = 'WORKSPACE_NAV';

const TitleWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr auto;
  & > span {
    white-space: normal;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;

const getFirstRoute = (navs: NavMenuItem[]) => {
  let newNavs = [...navs];
  let index;
  do {
    newNavs = sortBy(newNavs, 'order');
    index = newNavs[0];

    if (newNavs.length === 0 || !index?.children?.length) {
      return index?.name;
    }
    newNavs = index.children!;
  } while (Array.isArray(newNavs));
  return index?.name;
};

function ListLayout(): JSX.Element {
  const location = useLocation();
  const navigate = useNavigate();
  const params = useParams<'workspace' | 'cluster'>();
  const { workspace: workspaceName = '', cluster } = params;
  const { getNav, setNav } = useGlobalStore();
  const { getWorkspaceNavs } = permissionStore();
  let navs = getNav(`${navKey}-${workspaceName}`);
  const modal = useModal();

  const { workspaceDetail } = useFetchWorkspaceQuery({
    workspace: workspaceName,
    cluster,
    enabled: Boolean(workspaceName),
  });

  const handleSelect = (modalId: string, formattedWorkspace: FormattedWorkspace) => {
    navigate(`/workspaces/${formattedWorkspace.name}/overview`);
    modal.close(modalId);
  };

  const openWorkspaceSelector = () => {
    const modalId = modal.open({
      titleIcon: <Enterprise size={40} />,
      title: t('WORKSPACE_PL'),
      description: t('WORKSPACE_DESC'),
      footer: null,
      width: 960,
      content: (
        <WorkspaceSelectorModal
          onSelect={formattedWorkspace => handleSelect(modalId, formattedWorkspace)}
        />
      ),
    });
  };

  useEffect(() => {
    if (!navs && workspaceDetail?.clusters) {
      const clusters = workspaceDetail.clusters.map(item => item.name);
      navs = getWorkspaceNavs(workspaceName, clusters);
      setNav(`${navKey}-${workspaceName}`, navs);
    }
  }, [workspaceDetail?.clusters]);

  const title = workspaceDetail?.aliasName
    ? `${workspaceDetail?.aliasName}（${workspaceName}）`
    : workspaceName;

  const indexPath = useMemo(() => {
    const newNavs = !navs ? [] : [...navs];
    return {
      indexPath: getFirstRoute(newNavs),
    };
  }, [navs]);

  return (
    <>
      <ListPageSide>
        <NavTitle
          icon={<Enterprise variant="light" size={40} />}
          title={
            (
              <TitleWrapper>
                <span>{title}</span>
                {workspaceDetail && (
                  <FavoriteHistory
                    user={globals.user.username}
                    item={{
                      id: workspaceDetail?.uid || '',
                      name: workspaceDetail?.name || '',
                      url: `/workspaces/${workspaceDetail?.name}/overview`,
                      type: 'Workspace',
                      isHost: false,
                    }}
                    iconTheme="light"
                  />
                )}
              </TitleWrapper>
            ) as unknown as string
          }
          subtitle={workspaceDetail?.description || t('WORKSPACE')}
          style={{ marginBottom: '20px' }}
          onClick={openWorkspaceSelector}
        />
        <NavMenu navs={navs} prefix={`/workspaces/${workspaceName}`} pathname={location.pathname} />
      </ListPageSide>
      <ListPageMain>
        <Outlet context={indexPath} />
      </ListPageMain>
    </>
  );
}

ListLayout.IndexChild = IndexChild;

export default ListLayout;
