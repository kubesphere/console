/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import React from 'react';

import { Footer, Tips } from './ToolsFooter.styles';

export function ToolsFooter() {
  return (
    <Footer>
      <Tips>{t('TOOLBOX_SHIFT_TIPS')}</Tips>
    </Footer>
  );
}
