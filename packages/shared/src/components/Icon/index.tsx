/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import React, { CSSProperties, forwardRef, AllHTMLAttributes } from 'react';
import * as Icons from '@kubed/icons';
import * as LocalIcons from '../Icons';

export const toHumpName = (name: string): string => {
  return name.replace(/-(.)/g, g => g[1].toUpperCase());
};

export const toComponentName = (name: string): string => {
  const first = name.slice(0, 1).toUpperCase();
  const last = toHumpName(name.slice(1));
  return `${first}${last}`;
};

interface IconProps extends AllHTMLAttributes<SVGAElement> {
  name: string;
  color?: string;
  variant?: 'dark' | 'light' | 'coloured' | string;
  size?: number;
  style?: CSSProperties;
}

const Icon = ({ name, ...rest }: IconProps, ref?: any) => {
  // @ts-ignore
  const IconElement = Icons[toComponentName(name)] || LocalIcons[toComponentName(name)];
  if (!IconElement) {
    throw new Error(`Icon with name: ${name} was not found!`);
  }
  return <IconElement ref={ref} {...rest} />;
};

export default forwardRef(Icon);
