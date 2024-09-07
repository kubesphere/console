/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import React from 'react';
import { isEmpty } from 'lodash';

import { useParams, useNavigate } from 'react-router-dom';
import { Return } from '@kubed/icons';

import { useCacheStore as useStore } from '../../../../index';
import Image from '../../../Image';
import { getAnnotationsDescription, getDisplayName } from '../../../../utils';
import type { AppDetail } from '../../../../types';

import {
  AppOutLine,
  BackLink,
  Content,
  Inner,
  Shape1,
  Shape2,
  Shape3,
  Shape4,
  WhiteField,
  BannerWrapper1,
  BannerWrapper,
  ImageBanner,
} from './styles';

function Banner(): JSX.Element {
  const [appDetail] = useStore<AppDetail>('appDetail');
  const { appName } = useParams();
  const navigate = useNavigate();
  function onBack() {
    navigate(location.pathname.replace(`/${appName}`, ''));
  }
  return appName ? (
    <BannerWrapper>
      <Inner>
        <Content>
          <Shape1 />
          <Shape2 />
          <Shape3 />
          <Shape4 />
          <AppOutLine>
            <BackLink onClick={onBack}>
              <Return size={20} className="mr12" color="white" />
              {t('BACK')}
            </BackLink>
            {!isEmpty(appDetail) && (
              <WhiteField
                avatar={
                  <Image
                    iconSize={48}
                    src={appDetail.spec.icon}
                    isBase64Str={!!appDetail.spec.icon}
                    iconLetter={getDisplayName(appDetail)}
                    alt=""
                  />
                }
                label={getAnnotationsDescription(appDetail) || '-'}
                value={getDisplayName(appDetail)}
              />
            )}
          </AppOutLine>
        </Content>
      </Inner>
    </BannerWrapper>
  ) : (
    <BannerWrapper1>
      <ImageBanner />
    </BannerWrapper1>
  );
}

export default Banner;
