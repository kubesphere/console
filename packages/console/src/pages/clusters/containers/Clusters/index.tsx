/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Cluster, Data, Pen, Refresh, Trash } from '@kubed/icons';
import {
  Banner,
  Button,
  FilterInput,
  Card,
  Empty,
  Text,
  Badge,
  Group,
  Loading,
  notify,
} from '@kubed/components';
import { useDisclosure } from '@kubed/hooks';
import {
  getActions,
  isMultiCluster,
  clusterStore,
  Pagination,
  useActionMenu,
  FormattedCluster,
  Constants,
  hasPermission,
  FavoriteHistory,
  removeDashboardHistory,
} from '@ks-console/shared';
import { isEmpty } from 'lodash';

import ClusterCard from '../../components/ClusterCard';
import AddClusterModal from './AddClusterModal';
import { useClusterAction } from '../../hooks/cluster';

import { ClustersWrapper, Toolbar, Main, ClusterList } from './styles';

const { fetchList } = clusterStore;

const Clusters = () => {
  const navigate = useNavigate();
  const { isOpen, close, open } = useDisclosure();
  const { editBaseInfo, updateKubeConfig, unbindCluster } = useClusterAction();

  useEffect(() => {
    if (!isMultiCluster()) {
      const defaultCluster = Constants.DEFAULT_CLUSTER.metadata.name;
      navigate(`/clusters/${defaultCluster}/overview`);
    }
  }, []);

  if (!isMultiCluster()) {
    return null;
  }

  const [name, setName] = useState('');
  const {
    isLoading: hostLoading,
    data: hostData = [],
    refresh: hostRefresh,
    reFetch: hostReFetch,
  } = fetchList(
    {
      labelSelector: 'cluster-role.kubesphere.io/host=',
      limit: -1,
    },
    true,
  );

  const {
    isLoading,
    data = [],
    refresh,
    total,
    reFetch,
    nextPage,
    prevPage,
  } = fetchList(
    {
      labelSelector: '!cluster-role.kubesphere.io/host,!cluster-role.kubesphere.io/edge',
    },
    true,
  );

  const enableActions = React.useMemo(() => {
    return getActions({ module: 'clusters' });
  }, []);

  const handleRefresh = () => {
    hostRefresh();
    refresh();
  };

  const handleSearch = (keyword: string) => {
    setName(keyword);
    reFetch({ name: keyword });
    hostReFetch({ name: keyword });
  };

  const editSuccessCallback = () => {
    notify.success(t('UPDATE_SUCCESSFUL'));
    handleRefresh();
  };

  const renderItemActions = useActionMenu<FormattedCluster>({
    authKey: 'clusters',
    actions: [
      {
        key: 'pen',
        action: 'global-manage-clusters',
        icon: <Pen />,
        text: t('EDIT_INFORMATION'),
        onClick: item => {
          editBaseInfo({ cluster: item, callback: editSuccessCallback });
        },
      },
      {
        key: 'data',
        icon: <Data />,
        action: 'global-manage-clusters',
        text: t('UPDATE_KUBECONFIG'),
        show: item => !item.isHost && item.connectionType !== 'proxy',
        onClick: item => {
          updateKubeConfig({ cluster: item, callback: editSuccessCallback });
        },
      },
      {
        key: 'trash',
        icon: <Trash />,
        action: 'global-manage-clusters',
        text: t('REMOVE_CLUSTER'),
        show: item => !item.isHost,
        onClick: item => {
          unbindCluster({ cluster: item, callback: editSuccessCallback });
          removeDashboardHistory(globals.user.username, item.uid);
        },
      },
    ],
  });

  const renderToolbar = () => {
    return (
      <Toolbar>
        <FilterInput
          className="mr12 search-bar"
          placeholder={t('SEARCH_BY_NAME')}
          onChange={handleSearch}
          onInputChange={keyword => !keyword && handleSearch(keyword)}
          simpleMode
        />
        <Button variant="text" onClick={handleRefresh}>
          <Refresh />
        </Button>
        {enableActions.includes('create') ? (
          <Button color="secondary" shadow className="ml12 btn-add" onClick={open}>
            {t('ADD_CLUSTER')}
          </Button>
        ) : null}
      </Toolbar>
    );
  };

  const noResultTitle = (
    <Group spacing="sm">
      <Text weight={600} size={14}>
        {t('Cluster List')}
      </Text>
      <Badge color="#abb4be">{total}</Badge>
    </Group>
  );

  const renderHost = () =>
    !isEmpty(hostData) && (
      <ClusterList className="mb12">
        <div className="cluster-title">
          {hostData.length === 1 ? t('HOST_CLUSTER_TCAP') : t('HOST_CLUSTER_PL_TCAP')}
        </div>
        {hostData.map((item: any) => (
          <ClusterCard
            key={item.name}
            data={item}
            actions={renderItemActions(item)}
            favorite={
              <FavoriteHistory
                item={{
                  id: item.uid,
                  name: item.name,
                  url: `/clusters/${item.name}/overview`,
                  type: 'Cluster',
                  isHost: true,
                }}
                user={globals.user.username}
              />
            }
          />
        ))}
      </ClusterList>
    );

  const renderClusters = () =>
    !isEmpty(data) && (
      <ClusterList>
        <Group spacing="sm" className="mb8">
          <Text weight={600} size={14}>
            {t('MEMBER_CLUSTER')}
          </Text>
          <Badge color="#abb4be">{total}</Badge>
        </Group>
        {data.map((item: any) => (
          <ClusterCard
            key={item.name}
            data={item}
            actions={renderItemActions(item)}
            className="mb12"
            favorite={
              <FavoriteHistory
                item={{
                  id: item.uid,
                  name: item.name,
                  url: `/clusters/${item.name}/overview`,
                  type: 'Cluster',
                  isHost: false,
                }}
                user={globals.user.username}
              />
            }
          />
        ))}
      </ClusterList>
    );

  const renderList = () => {
    if (isLoading || hostLoading) {
      return <Loading className="page-loading" />;
    }

    if (!isLoading && !hostLoading && !name && isEmpty(data) && isEmpty(hostData)) {
      return (
        <Card padding={32}>
          <Empty
            title={t('NO_CLUSTER_TIP')}
            description={t('NO_CLUSTER_TIP_DESC')}
            image={<Cluster size={48} />}
            imageClassName="empty-icon"
          >
            {hasPermission({ module: 'clusters', action: 'create' }) && (
              <Button color="secondary" shadow className="btn-add" style={{ marginTop: '20px' }}>
                {t('ADD_CLUSTER')}
              </Button>
            )}
          </Empty>
        </Card>
      );
    }

    if (!isLoading && !hostLoading && isEmpty(data) && isEmpty(hostData)) {
      return (
        <Card className="mt12" padding={32} sectionTitle={noResultTitle}>
          <Empty
            title={t('NO_RESOURCE_FOUND')}
            image={<img src="/assets/empty-card.svg" />}
            imageStyle={{ width: '100%', height: '100%', background: 'none' }}
          />
        </Card>
      );
    }

    return (
      <>
        {renderHost()}
        {renderClusters()}
      </>
    );
  };

  return (
    <ClustersWrapper>
      <Banner
        className="cluster-banner"
        icon={<Cluster />}
        title={t('CLUSTER_MANAGEMENT')}
        description={t('CLUSTER_DESC')}
      >
        {renderToolbar()}
      </Banner>
      <Main>
        {renderList()}
        <Pagination
          totalCount={total}
          showTotal={false}
          onNextPage={nextPage}
          onPreviousPage={prevPage}
        />
      </Main>
      <AddClusterModal onRefresh={handleRefresh} visible={isOpen} onCancel={close} />
    </ClustersWrapper>
  );
};

export default Clusters;
