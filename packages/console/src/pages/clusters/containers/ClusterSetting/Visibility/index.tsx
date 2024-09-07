/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import { get, isEmpty, set } from 'lodash';
import React, { useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  ClusterDetail,
  Column,
  DataTable,
  formatTime,
  getDisplayName,
  isMultiCluster,
  workspaceStore,
  clusterStore,
  request,
  TableRef,
  hasPermission,
} from '@ks-console/shared';
import { Banner, BannerTip, Button, Card, Field, notify } from '@kubed/components';
import { Cluster, Enterprise, Eye, EyeClosed } from '@kubed/icons';
import { useCacheStore as useStore } from '@ks-console/shared';

import ClusterVisibility, {
  ClusterAuthWorkspacePayload,
} from '../../../components/ClusterVisibility';
import { CardHeader } from './styles';

const { getListUrl, mapper: workspaceMapper } = workspaceStore;
const { patchCluster, fetchDetail } = clusterStore;

function Visibility() {
  const { cluster } = useParams();
  const url = getListUrl({ cluster });
  const [currentCluster, setCluster] = useStore<ClusterDetail>('cluster');
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const isClusterPublicVisible = currentCluster.visibility === 'public';

  const isClusterManager = hasPermission({
    module: 'cluster-settings',
    cluster,
    action: 'cluster-manage-cluster-settings',
  });

  const tableRef = useRef<TableRef<any>>(null);

  const columns: Column[] = [
    {
      title: t('NAME'),
      field: 'name',
      sortable: true,
      searchable: true,
      render: (value, row) => {
        return (
          <Field
            value={getDisplayName(row)}
            avatar={<Enterprise size={40} />}
            label={row.description || '-'}
          />
        );
      },
    },
    {
      title: t('ADMINISTRATOR'),
      field: 'manager',
    },
    {
      title: t('CREATION_TIME_TCAP'),
      field: 'createTime',
      sortable: true,
      canHide: true,
      width: 250,
      render: time => formatTime(time),
    },
  ];

  const handleEditClusterVisibility = async (data: ClusterAuthWorkspacePayload) => {
    if (!data) {
      setModalVisible(false);
    }

    if (hasPermission({ module: 'clusters', action: 'global-manage-clusters' })) {
      await patchCluster(
        { name: currentCluster.name },
        {
          metadata: {
            labels: {
              'cluster.kubesphere.io/visibility': data.public ? 'public' : 'private',
            },
          },
        },
      );
    }

    const allRequests: any[] = [];

    if (data.addWorkspaces) {
      data.addWorkspaces.forEach(workspace => {
        allRequests.push({
          op: 'add',
          workspace: workspace.name,
        });
      });
    }

    if (data.deleteWorkspaces) {
      data.deleteWorkspaces.forEach(workspace => {
        allRequests.push({
          op: 'remove',
          workspace: workspace.name,
        });
      });
    }

    if (allRequests.length) {
      await request.post(
        `kapis/cluster.kubesphere.io/v1alpha1/clusters/${cluster}/grantrequests`,
        allRequests,
      );
    }

    setModalVisible(false);
    notify.success(t('UPDATE_SUCCESSFUL'));
    tableRef.current?.refetch();
    const clusterDetail = await fetchDetail({ name: cluster });
    setCluster(clusterDetail);
    set(globals, `clusterConfig.${cluster}`, clusterDetail.configz);
  };

  return (
    <>
      <Banner
        icon={<Cluster />}
        title={t('CLUSTER_VISIBILITY')}
        description={t('CLUSTER_VISIBILITY_DESC')}
        className="mb12"
      >
        <BannerTip key="cluster_visibility" title={t('CLUSTER_VISIBILITY_Q1')}>
          {t('CLUSTER_VISIBILITY_A1')}
        </BannerTip>
      </Banner>
      <Card padding={0}>
        <CardHeader>
          <Field
            avatar={isClusterPublicVisible ? <Eye size={40} /> : <EyeClosed size={40} />}
            value={isClusterPublicVisible ? t('VISIBILITY_PUBLIC') : t('VISIBILITY_PARTIAL')}
            label={t('CLUSTER_VISIBILITY_SCAP')}
          />
          {isMultiCluster() && isClusterManager && (
            <Button onClick={() => setModalVisible(true)}>{t('EDIT_VISIBILITY')}</Button>
          )}
        </CardHeader>
        <DataTable
          ref={tableRef}
          url={url}
          columns={columns}
          tableName="workspaceVisibility"
          rowKey="name"
          format={workspaceMapper}
        />
      </Card>
      {modalVisible && (
        <ClusterVisibility
          visible={modalVisible}
          onCancel={() => setModalVisible(false)}
          onOk={handleEditClusterVisibility}
        />
      )}
    </>
  );
}

export default Visibility;
