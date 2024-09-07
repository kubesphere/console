/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import React from 'react';
import { FormattedGateway, useDetailPage } from '@ks-console/shared';
import { Descriptions } from '@kubed/components';
import { isEmpty } from 'lodash';
import { StyledCard } from '../styles';

function AnnotationsCard() {
  const { detail } = useDetailPage<FormattedGateway>();

  if (!detail) {
    return null;
  }

  return (
    <StyledCard sectionTitle={t('ANNOTATION_PL')}>
      <Descriptions
        data={Object.entries(
          isEmpty(detail?.annotations) ? { [t('NO_DATA')]: '' } : detail?.annotations,
        ).map(([label, value]) => ({ label, value }))}
      />
    </StyledCard>
  );
}

export default AnnotationsCard;
