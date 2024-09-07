/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { get, isEmpty } from 'lodash';

import { Loading, Tooltip } from '@kubed/components';

import {
  Panel,
  formatTime,
  mapAccessModes,
  Icon,
  pvcStore,
  useDetailPage,
  VolumeDetail,
} from '@ks-console/shared';
import { Storage, Question, Database } from '@kubed/icons';

import { ItemBoxStyle, TitleStyle, DescStyle, IconLineStyle } from './styles';
const { fetchDetail: fetchPVCDetail } = pvcStore;

export default function ResourceStatus() {
  const { detail } = useDetailPage<VolumeDetail>();

  const [pvcDetail, setPvcDetail] = useState<VolumeDetail>({} as VolumeDetail);
  const [isLoading, setIsLoading] = useState(true);
  const { cluster } = useParams();

  const renderModeTip = (
    <div>
      <div>{t('RWO_DESC')}</div>
      <div>{t('ROX_DESC')}</div>
      <div>{t('RWX_DESC')}</div>
    </div>
  );

  const renderAccessTitle = () => {
    return (
      <div>
        {t('ACCESS_MODE')}
        <Tooltip content={renderModeTip}>
          <Question size={16} className="toolTip"></Question>
        </Tooltip>
      </div>
    );
  };

  const mapperAccessMode = (accessModes: string[]) => {
    const modes = mapAccessModes(accessModes);
    return (
      <>
        <span>{modes.join(',')}</span>
      </>
    );
  };
  const initData = async () => {
    if (!detail) {
      return;
    }
    const { phase } = detail;

    if (phase !== 'Bound') {
      setIsLoading(false);
    } else {
      const claimRef = get(detail, '_originData.spec.claimRef', {});
      const data = await fetchPVCDetail({
        cluster,
        ...claimRef,
      });
      setIsLoading(false);
      setPvcDetail(data);
    }
  };

  useEffect(() => {
    initData();
  }, [detail]);

  const renderItem = () => {
    return (
      <div>
        <ItemBoxStyle>
          <div className="leftBox">
            <Storage size="40"></Storage>
            <div className="rightBox">
              <TitleStyle>{pvcDetail.name}</TitleStyle>
              <DescStyle>
                {t('STORAGE_CLASS_VALUE', { value: pvcDetail.storageClassName })}
              </DescStyle>
            </div>
          </div>
          <div className="titleBox">
            <TitleStyle>{formatTime(pvcDetail.createTime)}</TitleStyle>
            <DescStyle>{t('CREATION_TIME')}</DescStyle>
          </div>
        </ItemBoxStyle>
        <IconLineStyle>
          <div className="cardBox">
            <Icon name="bm" size={30}></Icon>
            <div className="text">
              <TitleStyle>{pvcDetail.storageProvisioner}</TitleStyle>
              <DescStyle>{t('PROVISIONER')}</DescStyle>
            </div>
          </div>
          <div className="cardBox">
            <img src="/assets/Accessmodes.svg" />
            <div className="text">
              <TitleStyle>{mapperAccessMode(pvcDetail.accessModes || [])}</TitleStyle>
              <DescStyle>{renderAccessTitle()}</DescStyle>
            </div>
          </div>
          <div className="cardBox">
            <Database size={30}></Database>
            <div className="text">
              <TitleStyle>{pvcDetail.capacity}</TitleStyle>
              <DescStyle>{t('CAPACITY')}</DescStyle>
            </div>
          </div>
        </IconLineStyle>
      </div>
    );
  };

  return (
    <Panel title={t('PERSISTENT_VOLUME_CLAIM')}>
      {!isEmpty(detail) && isLoading ? <Loading spinning={isLoading}></Loading> : renderItem()}
    </Panel>
  );
}
