/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import * as React from 'react';
import { BarItem, BarWrapper, RightText, Text } from './BarStyles';

export interface IBarProps {
  value: number;
  text?: string;
  rightText?: string;
  className?: string;
}
const Bar = (props: IBarProps) => {
  const { value, className, text, rightText } = props;
  const style = {
    width: `${value * 100}%`,
  };

  let type = 'default';
  if (value >= 0.8) {
    type = 'warning';
  }
  if (value >= 0.95) {
    type = 'danger';
  }

  const textStyle = {
    left: value > 0.35 ? `${(value / 2) * 100}%` : `${(value + 0.01) * 100}%`,
    transform: value > 0.35 ? 'translateX(-50%)' : '',
    color: value > 0.35 ? '#fff' : '#79879c',
  };
  return (
    <BarWrapper className={className}>
      <BarItem type={type as 'default'} style={style} />
      {text && !!value && <Text style={textStyle}>{text}</Text>}
      {rightText && <RightText>{rightText}</RightText>}
    </BarWrapper>
  );
};

export default Bar;
