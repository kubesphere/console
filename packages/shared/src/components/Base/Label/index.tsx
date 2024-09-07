/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import React, { memo } from 'react';

import { LabelStyle, NameStyle } from './styles';

interface IDetailLabelProps {
  className?: string;
  name: string;
  value: string;
}
function DetailLabel({ className, name, value }: IDetailLabelProps) {
  return (
    <LabelStyle className={className}>
      <NameStyle>{name}</NameStyle>
      {value}
    </LabelStyle>
  );
}

export default memo(DetailLabel);
