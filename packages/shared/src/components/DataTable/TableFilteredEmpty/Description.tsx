/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import React from 'react';

import { LinkButton } from './Description.styles';

export interface DescriptionProps {
  clearAndRefetch?: false | (() => void);
  refetch?: false | (() => void);
}

export function Description({ refetch, clearAndRefetch }: DescriptionProps) {
  const isFunctionRefetch = typeof refetch === 'function';
  const isFunctionClearAndRefetch = typeof clearAndRefetch === 'function';

  if (isFunctionRefetch && isFunctionClearAndRefetch) {
    return (
      <>
        {t('You can try to')}
        <LinkButton onClick={refetch}>{t('refresh data')}</LinkButton>
        {t('or')}
        <LinkButton onClick={clearAndRefetch}>{t('clear search conditions')}</LinkButton>
      </>
    );
  }

  if (isFunctionRefetch) {
    return (
      <>
        {t('You can try to')}
        <LinkButton onClick={refetch}>{t('refresh data')}</LinkButton>
      </>
    );
  }

  if (isFunctionClearAndRefetch) {
    return (
      <>
        {t('You can try to')}
        <LinkButton onClick={clearAndRefetch}>{t('clear search conditions')}</LinkButton>
      </>
    );
  }

  return null;
}
