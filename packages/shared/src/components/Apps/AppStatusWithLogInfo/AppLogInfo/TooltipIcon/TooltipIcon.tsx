import type { PopoverInstance } from '@kubed/components';
import { StyledPopover, Icon, StyledButton } from './TooltipIcon.styles';
import React, { useRef } from 'react';
import { PopoverContent, typeProps } from '../PopoverContent';

export interface IconTooltipProps {
  statusStr: string;
  type: typeProps;
  onClick: () => void;
}

export function TooltipIcon({ onClick, ...rest }: IconTooltipProps) {
  const popoverRef = useRef<PopoverInstance>(null);

  return (
    <StyledPopover
      maxWidth="unset"
      content={<PopoverContent {...rest} onViewLogButtonClick={onClick} />}
      onMount={instance => {
        // @ts-ignore
        popoverRef.current = instance;
      }}
    >
      <StyledButton>
        <Icon />
      </StyledButton>
    </StyledPopover>
  );
}
