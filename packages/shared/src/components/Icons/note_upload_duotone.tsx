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
      <path
        fill-rule="evenodd"
        clipRule="evenodd"
        d="M8 6C8 4.89543 8.89543 4 10 4H30V14H40V42C40 43.1046 39.1046 44 38 44H10C8.89543 44 8 43.1046 8 42V6ZM22 32V38H26V32H31L24 24L17 32H22Z"
      />
      <path d="M30 14H40L30 4V14Z" fill="currentColor" />
      <path d="M22 38V32H17L24 24L31 32H26V38H22Z" fill="currentColor" />
    </svg>
  );
}
