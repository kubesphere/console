/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import React from 'react';
import { Return } from '@kubed/icons';

import type { ExtensionDetailProps } from './ExtensionDetail';
import { Wrapper, BackButton } from './Header.styles';

type HeaderProps = Pick<ExtensionDetailProps, 'onBackButtonClick'>;

function Header({ onBackButtonClick }: HeaderProps) {
  return (
    <Wrapper>
      <BackButton onClick={onBackButtonClick}>
        <Return size={20} />
        {t('BACK')}
      </BackButton>
    </Wrapper>
  );
}

export { Header };
