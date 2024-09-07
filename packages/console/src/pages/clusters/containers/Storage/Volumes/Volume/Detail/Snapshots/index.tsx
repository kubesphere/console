/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import { VolumeSnapshotDetail, useDetailPage, volumeSnapshotStore } from '@ks-console/shared';

import { Card } from '@kubed/components';
import { Snapshot } from '@kubed/icons';

import dayjs from 'dayjs';
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Item, ItemAttrs, SnapshotList, Title } from './styles';

const { fetchList } = volumeSnapshotStore;

type ListType = {
  total: number;
  page: number;
  limit: number;
  data: VolumeSnapshotDetail[];
};

export default function PVCSnapshots() {
  const { detail } = useDetailPage<Record<string, any>>();

  const { cluster, namespace, name } = detail ?? {};
  const { workspace } = useParams();
  const [list, setData] = useState<ListType>({} as ListType);

  const fetchData = async (params?: Record<string, any>) => {
    const result = await fetchList({
      cluster,
      namespace,
      persistentVolumeClaimName: name,
      ...params,
    } as Record<string, any>);

    setData(result as unknown as ListType);
  };

  useEffect(() => {
    fetchData();
  }, [detail]);

  //   const handlePagination = (page: number) => {
  //     fetchData({ page });
  //   };

  const renderSnapshot = (snapshot: VolumeSnapshotDetail) => {
    const {
      name: snapshotName,
      snapshotClassName,
      backupStatus,
      createTime,
      restoreSize,
      uid,
      namespace: snapshotNamespace,
    } = snapshot;

    const status = t(`CREATE_STATUS_${backupStatus.toUpperCase()}`);

    return (
      <Item key={uid}>
        <Snapshot size={40} />
        <ItemAttrs>
          <h3>
            <Link
              to={`${
                workspace ? `/${workspace}` : ''
              }/clusters/${cluster}/projects/${snapshotNamespace}/volume-snapshots/${snapshotName}`}
            >
              {name}
            </Link>
          </h3>
          <p>{snapshotClassName}</p>
        </ItemAttrs>
        <ItemAttrs>
          <h3>{status}</h3>
          <p>{t('STATUS')}</p>
        </ItemAttrs>
        <ItemAttrs>
          <h3>{restoreSize || '-'}</h3>
          <p>{t('CAPACITY')}</p>
        </ItemAttrs>
        <ItemAttrs>
          <h3>{dayjs(createTime).format('YYYY-MM-DD HH:mm:ss')}</h3>
          <p>{t('CREATION_TIME_TCAP')}</p>
        </ItemAttrs>
      </Item>
    );
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { total = 0, page = 1, limit = 10, data = [] } = list;

  return (
    <Card>
      <Title>{t('SNAPSHOT_PL')}</Title>
      <SnapshotList>
        {total === 0 ? (
          <div>{t('EMPTY_WRAPPER', { resource: t('VOLUME_SNAPSHOT') })}</div>
        ) : (
          data.map(renderSnapshot)
        )}
      </SnapshotList>
      {/* {total > limit && (
        <Level className="margin-t12">
          <LevelLeft />
          <LevelRight>
            <Pagination page={page} total={total} limit={limit} onChange={handlePagination} />
          </LevelRight>
        </Level>
      )} */}
    </Card>
  );
}
