import React from 'react';

import { useUrl } from '@ks-console/shared';
import { Root } from './Footer.styles';

export function Footer() {
  const { getConfigSupportLink } = useUrl({ module: '' });
  const contactUsLink = getConfigSupportLink('contactUs');

  return (
    <Root dangerouslySetInnerHTML={{ __html: t('LEARN_MORE_CONTACT_US', { contactUsLink }) }} />
  );
}
