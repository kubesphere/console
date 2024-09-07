/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import React from 'react';

import { Icon } from '@ks-console/shared';

import { StyledButton } from './Arrow.styles';

interface ArrowProps {
  className: string;
  direction: 'left' | 'right';
  disabled: boolean;
  onClick: () => void;
}

function Arrow({ className, direction, disabled, onClick }: ArrowProps) {
  return (
    <StyledButton className={className} type="text" disabled={disabled} onClick={onClick}>
      <Icon name={`chevron-${direction}`} size={24} />
    </StyledButton>
  );
}

export { Arrow };
