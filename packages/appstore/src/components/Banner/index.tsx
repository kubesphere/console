/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import React from 'react';
import { isEmpty } from 'lodash';
import { Return } from '@kubed/icons';
import { useCacheStore as useStore } from '@ks-console/shared';

import { AppDetail, Image, getAnnotationsDescription, getDisplayName } from '@ks-console/shared';

import { isAppsPageExact } from '../../utils';

import {
  Inner,
  Shape1,
  Shape2,
  Shape3,
  Shape4,
  Content,
  BackLink,
  LeftShape1,
  LeftShape2,
  AppOutLine,
  BannerWrapper,
  WhiteField,
} from './styles';

type Props = {
  onBack: () => void;
};

function Banner({ onBack }: Props): JSX.Element {
  const isAppsPage = isAppsPageExact();
  const [appDetail] = useStore<AppDetail>('appDetail');

  return (
    <BannerWrapper>
      <Inner>
        <Content>
          <Shape1 />
          <Shape2 />
          <Shape3 />
          {isAppsPage ? (
            <>
              <LeftShape1 className="leftShape_1" />
              <LeftShape2 className="leftShape_2" />
            </>
          ) : (
            <>
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
                        iconLetter={appDetail.metadata.name}
                        alt=""
                      />
                    }
                    label={getAnnotationsDescription(appDetail) || '-'}
                    value={getDisplayName(appDetail)}
                  />
                )}
              </AppOutLine>
            </>
          )}
        </Content>
      </Inner>
    </BannerWrapper>
  );
}

export default Banner;
