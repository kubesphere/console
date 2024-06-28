import React from 'react';
import { useNavigate } from 'react-router-dom';
import { PlugCircle } from '@kubed/icons';

import { EXTENSIONS_PAGE_PATHS } from '../../../../../constants/extension';
import { StyledEmpty, EmptyButton } from './ExtensionsEmpty.styles';

function ExtensionsEmpty() {
  const navigate = useNavigate();

  return (
    <StyledEmpty
      image={<PlugCircle size={48} />}
      title={t('SUBSCRIPTION_EXTENSION_NOT_FOUND')}
      description={t('SUBSCRIPTION_EXTENSION_NOT_FOUND_DESCRIPTION')}
    >
      <EmptyButton onClick={() => navigate(EXTENSIONS_PAGE_PATHS.marketplace.index)}>
        {t('DISCOVER_EXTENSIONS')}
      </EmptyButton>
    </StyledEmpty>
  );
}

export { ExtensionsEmpty };
