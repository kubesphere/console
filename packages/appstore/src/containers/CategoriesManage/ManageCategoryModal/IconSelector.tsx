/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import React from 'react';
import cx from 'classnames';
import styled from 'styled-components';

import { Icon, openpitrixStore } from '@ks-console/shared';

const { CATEGORY_ICONS } = openpitrixStore;

const Icons = styled.div`
  margin: 0 30px 0 -6px;

  svg {
    &.active,
    &:hover {
      opacity: 1;
      border-radius: 4px;
      border-color: ${({ theme }) => theme.palette.accents_5};
      box-shadow: 0 4px 8px 0 rgba(36, 46, 66, 0.06);
    }
  }
`;

const StyledIcon = styled(Icon)`
  display: inline-block;
  margin: 0 4px 4px 0;
  width: 32px;
  height: 32px;
  padding: 4px;
  line-height: 28px;
  text-align: center;
  border: 1px solid transparent;
  cursor: pointer;
  opacity: 0.4;
`;

type Props = {
  value?: string;
  onChange?: (value: string) => void;
};

function IconSelector({ value, onChange }: Props): JSX.Element {
  function changeIcon(icon: string): void {
    onChange?.(icon);
  }

  return (
    <Icons>
      {CATEGORY_ICONS.map(icon => (
        <StyledIcon
          key={icon}
          className={cx({ active: icon === value })}
          name={icon}
          size={20}
          onClick={() => changeIcon(icon)}
        />
      ))}
    </Icons>
  );
}

export default IconSelector;
