/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

interface IconProps {
  fill?: string;
  filled?: boolean;
  size?: number;
  height?: number;
  width?: number;
  label?: string;
  primary?: string;
  secondary?: string;
  color?: string;
  theme?: 'dark' | 'light';
  variant?: 'dark' | 'light' | 'coloured' | string;
  [key: string]: unknown;
}

export type { IconProps };
