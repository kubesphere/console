/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import React, { useEffect, useState } from 'react';
import { Loading, Tooltip } from '@kubed/components';

import { isEmpty, isFunction } from 'lodash';
import {
  formatTime,
  pvcStore,
  Panel,
  VolumeDetail,
  mapAccessModes,
  Icon,
  useDetailPage,
  VolumeSnapshotDetail,
} from '@ks-console/shared';
import { useParams } from 'react-router-dom';
import { TitleStyle, DesStyle, ItemBoxStyle, IconLineStyle, IconToolTip } from './styles';
import {} from '@kubed/icons';

function CardBox({
  icon,
  size,
  title,
  value,
}: {
  icon: Function | string;
  size: number;
  title: Function | string;
  value: Function | string | undefined;
}) {
  return (
    <div className="cardBox">
      {isFunction(icon) ? icon() : <Icon name={icon as string} size={size}></Icon>}
      <div className="text">
        <TitleStyle>{isFunction(value) ? value() : value}</TitleStyle>
        <DesStyle>{isFunction(title) ? title() : t(`${title}`)}</DesStyle>
      </div>
    </div>
  );
}

export default function VolumeSnapshotSource() {
  const { detail = {} as VolumeSnapshotDetail } = useDetailPage<VolumeSnapshotDetail>();
  const params = useParams();
  const [volumeDetail, setVolumeDetail] = useState<VolumeDetail>({} as VolumeDetail);
  const [isLoading, setLoading] = useState(true);
  const [isFirst, setFirst] = useState(true);

  const initData = async () => {
    const { backupStatus, snapshotSourceName } = detail;
    if (backupStatus !== 'success') {
      setLoading(false);
    } else {
      const { cluster, namespace } = params;
      const newVolumeDetail = await pvcStore.fetchDetail({
        cluster,
        namespace,
        name: snapshotSourceName,
      });
      setLoading(false);
      setVolumeDetail(newVolumeDetail);
    }
  };

  const renderModeTip = (
    <div>
      <div>{t('RWO_DESC')}</div>
      <div>{t('ROX_DESC')}</div>
      <div>{t('RWX_DESC')}</div>
    </div>
  );

  useEffect(() => {
    if (!isEmpty(detail) && isFirst) {
      initData();
      setFirst(false);
    }
  }, [detail]);

  const renderAccessTitle = () => {
    return (
      <div className="mode_title">
        {t('ACCESS_MODE_TCAP')}
        <Tooltip content={renderModeTip}>
          <IconToolTip name="question" size={16}></IconToolTip>
        </Tooltip>
      </div>
    );
  };

  const mapperAccessMode = (accessModes: string[] = []) => {
    const modes = mapAccessModes(accessModes);
    return (
      <>
        <span>{modes.join(',')}</span>
      </>
    );
  };

  const renderItem = () => {
    return (
      <div>
        <ItemBoxStyle>
          <div className="leftBox">
            <Icon name="storage" size={40}></Icon>
            <div className="rightBox">
              <TitleStyle>{volumeDetail.name}</TitleStyle>
              <DesStyle>
                {t('STORAGE_CLASS_VALUE', { value: volumeDetail.storageClassName })}
              </DesStyle>
            </div>
          </div>
          <div className="titleBox">
            <TitleStyle>{formatTime(volumeDetail.createTime)}</TitleStyle>
            <DesStyle>{t('CREATION_TIME_TCAP')}</DesStyle>
          </div>
        </ItemBoxStyle>
        <IconLineStyle>
          <CardBox
            icon="bm"
            size={30}
            title={'PROVISIONER'}
            value={volumeDetail.storageProvisioner}
          />
          <CardBox
            icon={() => <img src="/assets/Accessmodes.svg" />}
            size={48}
            title={() => renderAccessTitle()}
            value={() => mapperAccessMode(volumeDetail.accessModes)}
          />
          <CardBox icon="database" size={30} title={'CAPACITY'} value={volumeDetail.capacity} />
        </IconLineStyle>
      </div>
    );
  };

  return (
    <Panel title={t('PERSISTENT_VOLUME_CLAIM_PL')}>
      {renderItem()}
      {isLoading ? (
        <Loading className="page-loading"></Loading>
      ) : (
        !isEmpty(volumeDetail) && renderItem()
      )}
    </Panel>
  );
}
