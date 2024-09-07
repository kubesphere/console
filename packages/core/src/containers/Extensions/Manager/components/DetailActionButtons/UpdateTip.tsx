/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import React from 'react';
import { Tooltip } from '@kubed/components';

import { TipButton } from './UpdateTip.styles';

function UpdateTip() {
  return (
    <Tooltip content={t('UPDATE_AVAILABLE')}>
      <TipButton size={16} />
    </Tooltip>
  );
}

export { UpdateTip };
