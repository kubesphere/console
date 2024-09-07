/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import React from 'react';
import { isEmpty } from 'lodash';
import { FormattedGateway, useDetailPage } from '@ks-console/shared';
import { Descriptions } from '@kubed/components';
import { StyledCard } from '../styles';
function GatewayConfig() {
  const { detail } = useDetailPage<FormattedGateway>();

  if (!detail) {
    return null;
  }

  return (
    <StyledCard sectionTitle={t('CONFIGURATION_OPTIONS')}>
      <Descriptions
        data={Object.entries(isEmpty(detail?.config) ? { [t('NO_DATA')]: '' } : detail?.config).map(
          ([label, value]) => ({ label, value }),
        )}
      />
    </StyledCard>
  );
}

export default GatewayConfig;
