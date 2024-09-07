/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import React from 'react';

import { Header, Content, Icon, TextContainer, Title, Description } from './ToolsHeader.styles';

export function ToolsHeader() {
  return (
    <Header>
      <Content>
        <Icon />
        <TextContainer>
          <Title as="h6">{t('TOOLBOX')}</Title>
          <Description>{t('TOOLBOX_DESC')}</Description>
        </TextContainer>
      </Content>
    </Header>
  );
}
