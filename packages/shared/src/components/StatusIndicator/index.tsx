import React, { forwardRef } from 'react';
import { isUndefined } from 'lodash';
import { StatusDot } from '@kubed/components';

import type { StatusIndicatorProps as SIProps } from './types';
import { getStatusDotColor } from './utils';

export interface StatusIndicatorProps extends SIProps {
  total?: number;
  ready?: number;
}

const motionTypes = [
  'creating',
  'working',
  'updating',
  'upgrading',
  'syncing',
  'building',
  'terminating',
  'firing',
  'deleting',
];

const StatusIndicator = (
  { type, color: colorProp, total, ready, children, motion, ...rest }: StatusIndicatorProps,
  ref?: any,
) => {
  const isMotion = motion || (type && motionTypes.includes(type?.toLowerCase()));
  const color = getStatusDotColor({ type, color: colorProp });

  return (
    <StatusDot ref={ref} color={color} motion={isMotion} {...rest}>
      {children}
      {!isUndefined(total) && !isUndefined(ready) && ` (${ready}/${total})`}
    </StatusDot>
  );
};

export default forwardRef(StatusIndicator);
