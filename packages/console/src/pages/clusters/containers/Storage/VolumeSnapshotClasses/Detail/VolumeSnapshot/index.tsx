/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import type { Column } from '@ks-console/shared';
import {
  DataTable,
  formatTime,
  getDisplayName,
  StatusIndicator,
  TableRef,
  useDetailPage,
  VolumeSnapshotClassDetail,
  volumeSnapshotStore,
  // volumeSnapshotStore,
} from '@ks-console/shared';
import { Field } from '@kubed/components';
import { Snapshot } from '@kubed/icons';
import React, { useRef } from 'react';
import { Link, useParams } from 'react-router-dom';
import { PanelStyle } from './styles';

const { getResourceUrl, mapper: formatVolumeSnapshotData } = volumeSnapshotStore;

export default function VolumeSnapshotDetailVolumes() {
  const params = useParams();
  const tableRef = useRef<TableRef>();

  // const [detail] = useStore('detailProps');
  const { detail } = useDetailPage<VolumeSnapshotClassDetail>();

  const url = getResourceUrl({ ...params });

  const Columns: Column[] = [
    {
      title: t('NAME'),
      field: 'name',
      searchable: true,
      render: (value, row) => {
        return (
          <Field
            value={
              <Link
                to={`/clusters/${row.cluster}/projects/${row.namespace}/volume-snapshots/${value}`}
                replace={true}
              >
                {getDisplayName(row)}
              </Link>
            }
            avatar={<Snapshot size={40} />}
            label={row.snapshotClassName}
          />
        );
      },
    },
    {
      title: t('STATUS'),
      field: 'backupStatus',
      width: '20.5%',
      render: (backupStatus, row) => (
        <StatusIndicator type={row.readyToUse ? 'ready' : 'failed'}>
          {row.readyToUse ? t('READY') : t('UNREADY')}
        </StatusIndicator>
      ),
    },
    {
      title: t('CAPACITY'),
      field: 'restoreSize',
      width: '20.5%',
    },
    {
      title: t('CREATION_TIME_TCAP'),
      field: 'createTime',
      width: '20.5%',
      render: createTime => <>{formatTime(createTime)}</>,
    },
  ];

  return (
    <>
      <PanelStyle title={t('VOLUME_SNAPSHOT_PL')} className="tableContent">
        <DataTable
          ref={tableRef}
          rowKey="uid"
          columns={Columns}
          tableName="storageClassDetailList"
          url={url}
          parameters={{ volumeSnapshotClassName: detail?.name }}
          format={formatVolumeSnapshotData}
          useStorageState={false}
          placeholder={t('SEARCH_BY_NAME')}
        />
      </PanelStyle>
    </>
  );
}
