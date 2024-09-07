/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import React from 'react';
import type { ReactElement, CSSProperties } from 'react';
import { isFunction, isUndefined } from 'lodash';
import { Icon } from '@ks-console/shared';
import { Wrapper, StyledText } from './styles';

interface Props {
  WrapperClassName?: string;
  icon?: string | (() => ReactElement);
  iconStyle?: CSSProperties;
  title?: string | (() => ReactElement);
  description: string;
  ellipsis?: boolean;
  extra?: ReactElement;
  onClick?: () => void;
}

const Text = ({
  WrapperClassName,
  title,
  description,
  icon,
  iconStyle,
  ellipsis,
  onClick,
  extra,
}: Props) => {
  return (
    <Wrapper
      className={WrapperClassName}
      onClick={onClick}
      clickable={!!onClick}
      ellipsis={ellipsis}
    >
      {icon && (isFunction(icon) ? icon() : <Icon name={icon} style={iconStyle} size={40} />)}
      {
        <StyledText clickable={!!onClick} ellipsis={ellipsis}>
          <div>
            {isFunction(title) ? title() : isUndefined(title) || title === '' ? '-' : title}
          </div>
          <div>{description}</div>
        </StyledText>
      }
      {extra}
    </Wrapper>
  );
};

export default Text;
