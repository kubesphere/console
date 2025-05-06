/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import React, { useState, useCallback } from 'react';
import type { CSSProperties, ReactNode } from 'react';
import { useHover } from 'react-use';

import type { ButtonProps } from '@kubed/components';
import { Tooltip } from '@kubed/components';
import type { Props as IconProps } from '@kubed/icons';
import { CopyDuotone } from '@kubed/icons';

import { copyToClipboard } from '../../../../utils/dom';

import { StyledButton, Content } from './styles';

export interface CopyButtonProps extends ButtonProps {
  value: string;
  label?: ReactNode;
  timeout?: number;
  iconProps?: IconProps & { hoverVariant?: IconProps['variant'] };

  styles?: {
    icon?: CSSProperties;
  };
  hoverStyles?: {
    icon?: CSSProperties;
  };
}

export function CopyButton({
  value,
  label,
  timeout = 1500,
  iconProps,
  styles,
  hoverStyles,
  ...buttonProps
}: CopyButtonProps) {
  const [isCopied, setIsCopied] = useState(false);

  const handleClick = useCallback(() => {
    copyToClipboard(value);
    setIsCopied(true);
    setTimeout(() => {
      setIsCopied(false);
    }, timeout);
  }, [value, timeout]);

  const [element] = useHover(state => (
    <Content>
      <CopyDuotone
        size={16}
        variant={state ? iconProps?.hoverVariant : iconProps?.variant}
        style={state ? hoverStyles?.icon : styles?.icon}
      />
      {label && <div>{label}</div>}
    </Content>
  ));

  return (
    <Tooltip
      content={isCopied ? t('SHARED.COPY_BUTTON.CLICK') : t('SHARED.COPY_BUTTON.HOVER')}
      hideOnClick={false}
    >
      <StyledButton variant="link" onClick={handleClick} {...buttonProps}>
        {element}
      </StyledButton>
    </Tooltip>
  );
}
