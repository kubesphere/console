import React from 'react';

import { Footer, Tips } from './ToolsFooter.styles';

export function ToolsFooter() {
  return (
    <Footer>
      <Tips>{t('TOOLBOX_SHIFT_TIPS')}</Tips>
    </Footer>
  );
}
