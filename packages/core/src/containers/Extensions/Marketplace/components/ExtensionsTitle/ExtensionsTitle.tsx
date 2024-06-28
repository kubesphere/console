import React from 'react';

import { Wrapper, Title, Count } from './ExtensionsTitle.styles';

interface ExtensionsTitleProps {
  count: number;
}

function ExtensionsTitle({ count }: ExtensionsTitleProps) {
  return (
    <Wrapper>
      <Title>{t('EXTENSIONS')}</Title>
      <Count>{t('RESULTS_COUNT', { count })}</Count>
    </Wrapper>
  );
}

export { ExtensionsTitle };
