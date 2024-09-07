/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import React from 'react';

import {
  Wrapper,
  TitleRowBrand,
  Title,
  TitleImageBrand,
  TitleRowMarketplace,
  TitleImageMarketplace,
} from './Header.styles';

function Header() {
  return (
    <Wrapper>
      <TitleRowBrand>
        <Title>{t('BRAND')}</Title>
        <TitleImageBrand />
      </TitleRowBrand>
      <TitleRowMarketplace>
        <TitleImageMarketplace />
        <Title>{t('MARKETPLACE_EN')}</Title>
      </TitleRowMarketplace>
    </Wrapper>
  );
}

export { Header };
