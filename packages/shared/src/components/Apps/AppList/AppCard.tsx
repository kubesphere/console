/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import React from 'react';

import {
  getAnnotationsDescription,
  getDisplayName,
  getAnnotationsName,
  getUserAliasName,
} from '../../../utils';
import Image from '../../Image';
import { AppDetail } from '../../../types/app';

import { AppBaseInfo, AppCardWrapper, StyledField, Vendor, Version } from './styles';

type Props = {
  app: AppDetail;
};

function AppCard({ app }: Props): JSX.Element {
  function getVendor(): string {
    // TODO 接口没有 latest_app_version.maintainers
    const hasMaintainer = getAnnotationsName(app, 'application.kubesphere.io/app-maintainers');

    if (hasMaintainer) {
      return `${t('DEVELOPER')}：${getUserAliasName(hasMaintainer)}`;
    }
    return `${t('DEVELOPER')}：-`;
  }

  const versionName = app.metadata?.annotations?.['application.kubesphere.io/latest-app-version'];
  return (
    <AppCardWrapper>
      <StyledField
        avatar={
          <Image
            iconSize={48}
            src={app.spec.icon}
            isBase64Str={!!app.spec.icon}
            iconLetter={getDisplayName(app)}
            alt=""
          />
        }
        // TODO 是否对
        label={getAnnotationsDescription(app) || '-'}
        value={getDisplayName(app)}
      />
      <AppBaseInfo>
        <Vendor title={getVendor()}>{getVendor()}</Vendor>
        <Version title={versionName}>{t('LATEST_VALUE', { value: versionName || '-' })}</Version>
      </AppBaseInfo>
    </AppCardWrapper>
  );
}

export default AppCard;
