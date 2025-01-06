import React from 'react';

import type { ConfirmModalProps } from './ConfirmModal.types';
import { renderTitleIcon } from './ConfirmModal.helpers';
import { StyledModal, Header, Title, Description } from './ConfirmModal.styles';

export function ConfirmModal({
  titleIconProps,
  titleIcon,
  title,
  description,
  ...rest
}: ConfirmModalProps) {
  const hasHeader = title || titleIcon || titleIconProps;

  return (
    <StyledModal header={null} closable={false} {...rest}>
      {hasHeader && (
        <Header>
          {renderTitleIcon({ titleIconProps, titleIcon })}
          {title && <Title>{title}</Title>}
        </Header>
      )}
      {description && <Description>{description}</Description>}
    </StyledModal>
  );
}
