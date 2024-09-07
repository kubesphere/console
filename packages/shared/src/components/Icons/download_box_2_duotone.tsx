/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import React from 'react';
import type { IconProps } from './interfaces';
import { mapProps } from './utils';

const defaultSize = 48;

export default function Icon(properties: IconProps) {
  const props = mapProps(properties, defaultSize);
  return (
    <svg {...props}>
      <path d="M10 30V38H18V42H8C6.89543 42 6 41.1046 6 40V30H10Z" />
      <path d="M30 42H40C41.1046 42 42 41.1046 42 40V30H38V38H30V42Z" />
      <path d="M42 8V18H38V10H30V6H40C41.1046 6 42 6.89543 42 8Z" />
      <path d="M10 18V10H18V6H8C6.89543 6 6 6.89543 6 8V18H10Z" />
      <path d="M6 22H42V26H6V22Z" fill="currentColor" />
    </svg>
  );
}
