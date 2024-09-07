/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import React from 'react';
import { get } from 'lodash';
import { Badge } from '@kubed/components';

import * as Constants from '../../../constants/common';
import Icon from '../../Icon';

import { StyledBadgeAnchor } from './styles';

const { CLUSTER_PROVIDER_ICON } = Constants;

export interface ClusterIconProps {
  cluster: any;
  noStatus?: boolean;
  size?: number;
  theme?: 'dark' | 'light';
}

export default function ClusterIcon({
  cluster,
  noStatus,
  size = 40,
  theme = 'dark',
}: ClusterIconProps) {
  if (!cluster) {
    return null;
  }

  const isReady = get(cluster.conditions, 'Ready.status') === 'True';

  return (
    <StyledBadgeAnchor offset={[6, 6]}>
      {!noStatus && isReady && <Badge color="success" dot />}
      <Icon
        name={CLUSTER_PROVIDER_ICON[cluster.provider] || 'kubernetes'}
        size={size}
        variant={theme}
      />
    </StyledBadgeAnchor>
  );
}
