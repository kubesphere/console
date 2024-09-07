/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import React from 'react';
import { Home, Image } from '@kubed/icons';
import { Banner, Card, Field } from '@kubed/components';
import { Header, Content, ImageWrapper, Details } from './styles';

function PlatformBaseInfo(): JSX.Element {
  const kseLogo = globals.config.logo || globals.defaultTheme.logo;
  const logo = globals.useDefaultTheme ? kseLogo : globals.theme.logo;

  return (
    <>
      <Banner
        icon={<Home />}
        className="mb12"
        title={t('PLATFORM_INFORMATION')}
        description={t('PLATFORM_INFO_DESC')}
      />
      <Card sectionTitle={t('BASIC_INFORMATION')}>
        <Header>
          <Field
            avatar={<Image size={40} />}
            value={window.location.host}
            label={t('PLATFORM_ADDRESS')}
          />
        </Header>
        <Content>
          <ImageWrapper>
            <img src={logo} alt="" />
          </ImageWrapper>
          <Details>
            <Field value={globals.config.title} label={t('PLATFORM_TITLE')} />
            <Field
              value={globals.config.description || t('KS_DESCRIPTION')}
              label={t('PLATFORM_DESCRIPTION')}
            />
          </Details>
        </Content>
      </Card>
    </>
  );
}

export default PlatformBaseInfo;
