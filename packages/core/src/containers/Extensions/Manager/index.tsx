import React from 'react';
import { Banner } from '@kubed/components';
import { PlugCircle } from '@kubed/icons';

import { Extensions } from './components/Extensions';
import { Wrapper } from './styles';

export default function ExtensionsManager() {
  return (
    <Wrapper>
      <Banner
        icon={<PlugCircle size={48} />}
        title={t('EXTENSIONS_CENTER')}
        description={t('EXTENSIONS_CENTER_DESCRIPTION')}
        className="mb12"
      />
      <Extensions />
    </Wrapper>
  );
}
