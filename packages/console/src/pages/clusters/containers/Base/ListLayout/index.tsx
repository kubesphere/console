/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import React, { useEffect } from 'react';
import styled from 'styled-components';
import { Cluster } from '@kubed/icons';
import { useCacheStore as useStore } from '@ks-console/shared';
import { useModal } from '@kubed/components';
import { Outlet, useParams, useLocation, useNavigate } from 'react-router-dom';
import {
  ListPageSide,
  ListPageMain,
  NavMenu,
  NavTitle,
  ClusterDetail,
  useGlobalStore,
  isMultiCluster,
  permissionStore,
  FavoriteHistory,
} from '@ks-console/shared';

import ClusterSelectorModal from '../../../components/ClusterSelectorModal';
import { TitleWrapper } from './index.styles';

const PageMain = styled(ListPageMain)`
  position: relative;
  z-index: 100;
`;

const navKey = 'CLUSTER_NAV';

const ListLayout = () => {
  const { cluster: clusterName } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [cluster] = useStore<ClusterDetail>('cluster');
  const { getNav, setNav } = useGlobalStore();
  const { getClusterNavs } = permissionStore();
  let navs = getNav(`${navKey}-${clusterName}`);
  const modal = useModal();

  useEffect(() => {
    if (!navs) {
      navs = getClusterNavs(clusterName);
      setNav(`${navKey}-${clusterName}`, navs);
    }
  }, []);

  const handleSelect = (modalId: string, selectedCluster: ClusterDetail) => {
    navigate(`/clusters/${selectedCluster.name}/overview`);
    modal.close(modalId);
  };

  const openClusterSelector = () => {
    if (isMultiCluster()) {
      const modalId = modal.open({
        title: t('CLUSTER_PL'),
        description: t('CLUSTER_DESC'),
        footer: null,
        titleIcon: <Cluster size={40} />,
        width: 1000,
        content: (
          <ClusterSelectorModal
            onSelect={selectedCluster => handleSelect(modalId, selectedCluster)}
          />
        ),
      });
    }
  };

  return (
    <>
      <ListPageSide>
        <NavTitle
          icon={<Cluster variant="light" size={40} />}
          title={
            (
              <TitleWrapper>
                <span>{cluster.name}</span>
                {cluster && (
                  <FavoriteHistory
                    iconTheme="light"
                    user={globals.user.username}
                    item={{
                      id: cluster.uid,
                      name: cluster.name,
                      url: `/clusters/${cluster.name}/overview`,
                      type: 'Cluster',
                      isHost: cluster.isHost,
                    }}
                  />
                )}
              </TitleWrapper>
            ) as unknown as string
          }
          subtitle={t('CLUSTER')}
          style={{ marginBottom: '20px' }}
          onClick={openClusterSelector}
        />
        <NavMenu
          navs={navs}
          disabled={!cluster.isReady}
          prefix={`/clusters/${clusterName}`}
          pathname={location.pathname}
        />
      </ListPageSide>
      <PageMain>
        <Outlet />
      </PageMain>
    </>
  );
};

export default ListLayout;
