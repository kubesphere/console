/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

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
