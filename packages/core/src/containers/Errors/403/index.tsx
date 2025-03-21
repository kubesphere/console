/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import React from 'react';

import { Root, Container, Illustration, Title, Description } from './styles';

export function Forbidden() {
  return (
    <Root>
      <Container>
        <Illustration />
        <Title>{t('ERRORS.FORBIDDEN.TITLE')}</Title>
        <Description>{t('ERRORS.FORBIDDEN.DESCRIPTION')}</Description>
      </Container>
    </Root>
  );
}
