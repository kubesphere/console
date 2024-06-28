import React from 'react';

import { Community, KubeSphereEnterprise, Footer } from './components';
import { Root, Wrapper } from './Support.styles';

export function Support() {
  return (
    <Root>
      <Wrapper>
        <Community />
        <KubeSphereEnterprise />
        <Footer />
      </Wrapper>
    </Root>
  );
}
