/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import React from 'react';

import { useUrl } from '@ks-console/shared';
import { useMarketplaceConfigQuery } from '../../../stores/marketplace';
import {
  Root,
  Header,
  Link,
  Container,
  Content,
  Title,
  Description,
  Features,
  Feature,
  FeatureTitle,
  Background,
} from './KubeSphereEnterprise.styles';

const { getConfigSupportLink } = useUrl({ module: '' });

const KSE_FEATURES = [
  {
    key: 1,
    icon: '/assets/support-kse-light.svg',
    localeKey: 'KSE_FEATURE_1',
  },
  {
    key: 2,
    icon: '/assets/support-kse-cluster.svg',
    localeKey: 'KSE_FEATURE_2',
  },
  {
    key: 3,
    icon: '/assets/support-kse-security.svg',
    localeKey: 'KSE_FEATURE_3',
  },
];

export function KubeSphereEnterprise() {
  const { isOnline } = useMarketplaceConfigQuery({
    isIgnoreErrorNotify: true,
  });

  return (
    <Root>
      <Header>
        <img src="/assets/about-kse-logo.svg" alt="logo" />
        {isOnline && (
          <Link href={getConfigSupportLink('kse')} target="_blank" rel="noopener noreferrer">
            {t('LEARN_MORE')}
          </Link>
        )}
      </Header>
      <Container>
        <Content>
          <Title>{t('KUBESPHERE_ENTERPRISE_CAPTION')}</Title>
          <Description>{t('KUBE_SPHERE_ENTERPRISE_DESC')}</Description>
          <Features>
            {KSE_FEATURES.map(({ key, icon, localeKey }) => (
              <Feature key={key}>
                <img src={icon} alt={t(localeKey)} />
                <FeatureTitle>{t(localeKey)}</FeatureTitle>
              </Feature>
            ))}
          </Features>
        </Content>
        <Background />
      </Container>
    </Root>
  );
}
