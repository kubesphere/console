/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import React from 'react';
import dayjs from 'dayjs';
import { isEmpty } from 'lodash';
import { useCacheStore as useStore } from '../../../index';

import { LabelText } from '../AppInformation';
import type { AppDetail } from '../../../types';
import { getAnnotationsName, getDetailMetadataCategory, getUserAliasName } from '../../../utils';

import { AppBaseWrapper, BaseItem, ItemLabel, ItemValue } from './styles';

type Props = {
  app: AppDetail;
  className?: string;
};

export function AppBase({ app, className }: Props): JSX.Element {
  const maintainers = getUserAliasName(
    getAnnotationsName(app, 'application.kubesphere.io/app-maintainers'),
  );
  const [appCategories = {}] = useStore<Record<string, string>>('appCategories');

  // const sources = parser.safeParseJSON(get(app, 'latest_app_version.sources', ''), []);
  const sources: unknown[] = [];

  return (
    <AppBaseWrapper className={className}>
      <LabelText>{t('BASIC_INFORMATION')}</LabelText>
      <BaseItem>
        <ItemLabel>{t('CATEGORY_COLON')}</ItemLabel>
        <ItemValue>
          {appCategories[getDetailMetadataCategory(app)] || getDetailMetadataCategory(app)}
        </ItemValue>
      </BaseItem>
      <BaseItem>
        <ItemLabel>{t('HOMEPAGE_COLON')}</ItemLabel>
        <ItemValue>{app?.spec.appHome || '-'}</ItemValue>
      </BaseItem>
      <BaseItem>
        <ItemLabel>{t('RELEASE_DATE_COLON')}</ItemLabel>
        <ItemValue>{dayjs(app?.status.updateTime).format('YYYY-MM-DD')}</ItemValue>
      </BaseItem>
      <BaseItem>
        <ItemLabel>{t('APP_ID_COLON')}</ItemLabel>
        <ItemValue>{app?.metadata.name || '-'}</ItemValue>
      </BaseItem>
      {!isEmpty(maintainers) && (
        <BaseItem>
          <ItemLabel>{t('DEVELOPER')}:</ItemLabel>
          <ItemValue>{maintainers}</ItemValue>
        </BaseItem>
      )}
      {!isEmpty(sources) && (
        <BaseItem>
          <ItemLabel>{t('SOURCE_CODE_ADDRESS_COLON')}</ItemLabel>
          <div>
            {sources.map((item: any) => (
              <ItemValue key={item}>{item}</ItemValue>
            ))}
          </div>
        </BaseItem>
      )}
    </AppBaseWrapper>
  );
}
