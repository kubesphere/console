/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import {
  Icon,
  Panel,
  useDetailPage,
  VolumeSnapshotContentDetail,
  VolumeSnapshotDetail,
  volumeSnapshotStore,
} from '@ks-console/shared';

import { Loading } from '@kubed/components';
import { isEmpty } from 'lodash';
import React from 'react';
import { ItemBoxStyle, ItemStyle } from './styles';

const { useQueryDetail } = volumeSnapshotStore;

export default function VolumeSnapshotContentStatus() {
  const { detail = {} as VolumeSnapshotContentDetail & { cluster: string } } = useDetailPage<
    VolumeSnapshotContentDetail & { cluster: string }
  >();
  const { volumeSnapshot, namespace, cluster } = detail ?? {};
  const { data: volumeDetail = {} as VolumeSnapshotDetail, isLoading } =
    useQueryDetail<VolumeSnapshotDetail>({
      cluster,
      name: volumeSnapshot,
      namespace,
    });

  const renderItem = () => {
    return (
      <div>
        <ItemBoxStyle>
          <div className="leftBox">
            <Icon name="snapshot" size={40}></Icon>
            <ItemStyle className="rightBox">
              <span className="title">{volumeDetail.name}</span>
              <span className="des">{t('NAME')}</span>
            </ItemStyle>
          </div>
          <ItemStyle className="titleBox">
            <span className="title">{volumeDetail.snapshotClassName}</span>
            <span className="des">{t('VOLUME_SNAPSHOT_CLASS')}</span>
          </ItemStyle>
        </ItemBoxStyle>
      </div>
    );
  };

  return (
    <Panel title={t('VOLUME_SNAPSHOT_PL')}>
      {isEmpty(volumeDetail) || isLoading ? (
        <Loading className="page-loading"></Loading>
      ) : (
        renderItem()
      )}
    </Panel>
  );
}
