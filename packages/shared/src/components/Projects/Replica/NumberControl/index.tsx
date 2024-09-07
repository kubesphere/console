/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import React from 'react';
import styled from 'styled-components';
import { Add, Substract } from '@kubed/icons';
import { COLORS_MAP } from '../../../../constants/common';

type ColorType = {
  color: string;
  fill: string;
};

interface Props {
  className?: string;
  value: number;
  onChange?: (val: number) => void;
  color?: ColorType;
}

const Controller = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100%;

  .kubed-icon {
    padding: 2px;
    background: ${({ theme }) => theme.palette.colors.dark[2]};
    border-radius: 4px;
    &:hover {
      background-color: ${({ theme }) => theme.palette.colors.dark[1]};
      user-select: none;
    }
    &:last-child {
      margin-top: 8px;
    }
  }
`;

const defaultColor: ColorType = {
  color: COLORS_MAP.white,
  fill: COLORS_MAP.white,
};

const cursorStyle = {
  cursor: 'pointer',
};

function NumberControl({ className, value, onChange, color = defaultColor }: Props) {
  const handlePlusOne = () => {
    onChange?.(value + 1);
  };

  const handleMinusOne = () => {
    onChange?.(value - 1);
  };

  return (
    <Controller className={className}>
      <Add size={24} {...color} onClick={handlePlusOne} style={cursorStyle} />
      <Substract size={24} {...color} onClick={handleMinusOne} style={cursorStyle} />
    </Controller>
  );
}

export default NumberControl;
