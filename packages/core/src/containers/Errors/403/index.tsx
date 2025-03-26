/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import React from 'react';

import { ErrorLayout } from '../components/ErrorLayout';

export function Forbidden() {
  return (
    <ErrorLayout
      title={t('ERRORS.FORBIDDEN.TITLE')}
      description={t('ERRORS.FORBIDDEN.DESCRIPTION')}
      backgroundImagePath="/assets/403.svg"
    />
  );
}
