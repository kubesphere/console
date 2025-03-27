/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import React from 'react';

import { ErrorLayout } from '../components/ErrorLayout';

export function NotFound() {
  return (
    <ErrorLayout
      title={t('ERRORS.NOT_FOUND.TITLE')}
      description={t('ERRORS.NOT_FOUND.DESCRIPTION')}
      backgroundImagePath="/assets/404.svg"
    />
  );
}
