/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import React from 'react';
import { Exclamation, PlugCircle } from '@kubed/icons';
import { Card } from '@kubed/components';

import { StyledEmpty, LinkButton } from './ExtensionsEmpty.styles';

interface ExtensionsEmptyProps {
  hasFilters: boolean;
  onRefresh: () => void;
  onFiltersClear: () => void;
}

function ExtensionsEmpty({ hasFilters, onRefresh, onFiltersClear }: ExtensionsEmptyProps) {
  const refreshButton = <LinkButton onClick={onRefresh}>{t('REFRESH_PAGE')}</LinkButton>;
  const clearFiltersButton = (
    <LinkButton onClick={() => onFiltersClear()}>{t('CLEAR_SEARCH_CONDITIONS')}</LinkButton>
  );
  const imageSize = 48;

  let title = t('NO_EXTENSION_FOUND');
  let description = (
    <>
      {t('YOU_CAN_TRY_TO')} {refreshButton}
    </>
  );
  let image = <PlugCircle size={imageSize} />;
  let imageClassName = 'custom-empty-image';

  if (hasFilters) {
    title = t('NO_MATCHING_RESULT_FOUND');
    description = (
      <>
        {t('YOU_CAN_TRY_TO')} {refreshButton} {t('OR')} {clearFiltersButton}
      </>
    );
    image = <Exclamation size={imageSize} />;
    imageClassName = '';
  }

  return (
    <Card>
      <StyledEmpty
        title={title}
        description={description}
        image={image}
        imageClassName={imageClassName}
      />
    </Card>
  );
}

export { ExtensionsEmpty };
