/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import cx from 'classnames';
import type { IconProps } from './interfaces';

export function getClassNames(properties: IconProps) {
  const {
    primary,
    secondary,
    theme: themeProp,
    variant,
    className: classNameProperty,
    color,
    fill,
  } = properties;

  const theme = (themeProp ?? variant ?? 'dark') as 'dark' | 'light';
  const className = cx(classNameProperty as string, 'icon', 'kubed-icon', `kubed-icon__${theme}`, {
    'kubed-icon-dark': theme === 'dark',
    'kubed-icon-light': theme === 'light',
  });
  const themeColors = {
    light: {
      fill: '#ffffff66',
      color: 'rgba(255,255,255,0.9)',
    },
    dark: {
      fill: '#B6C2CD',
      color: '#242E42',
    },
  };
  const colorProps = {
    fill: secondary ?? fill ?? themeColors[theme]?.fill,
    color: primary ?? color ?? themeColors[theme]?.color,
  };
  return { className, colorProps };
}

export const mapProps = (props: IconProps, defaultSize = 24) => {
  const { className, colorProps } = getClassNames(props);
  const { size, width, height, primary, secondary, variant, ...rest } = props;
  return {
    width: size ?? width ?? defaultSize,
    height: size ?? height ?? defaultSize,
    viewBox: `0 0 ${defaultSize} ${defaultSize}`,
    xmlns: 'http://www.w3.org/2000/svg',
    ...rest,
    ...colorProps,
    className,
  };
};
