/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import React from 'react';
import type { StatusIndicatorProps } from '../../../../StatusIndicator';
import { getAppStatusStateInfo, typeProps } from './status';
import {
  Wrapper,
  Title,
  Container,
  ButtonsWrapper,
  IconWrapper,
  StatusText,
  ViewLogButton,
} from './PropverContent.styled';

export interface PopoverContentProps {
  statusStr: string;
  type: typeProps;
  onViewLogButtonClick: () => void;
}

interface RenderItemProps extends StatusIndicatorProps {
  icon: React.ReactNode;
  text: any;
  hasViewLogButton: boolean;
  textKey: string;
  onClick: () => void;
}

export function PopoverContent({ type, statusStr, onViewLogButtonClick }: PopoverContentProps) {
  const statusInfo = getAppStatusStateInfo(type);
  const renderItem = (item: RenderItemProps) => {
    const { icon, textKey, text, hasViewLogButton, onClick } = item;

    return (
      <>
        <IconWrapper>{icon}</IconWrapper>
        <StatusText>{t(textKey, { suffix: text })}</StatusText>
        <ButtonsWrapper>
          {hasViewLogButton && <ViewLogButton onClick={onClick}>{t('VIEW_LOG')}</ViewLogButton>}
        </ButtonsWrapper>
      </>
    );
  };

  return (
    <Wrapper>
      <Title>{t('APP_DEPLOY_STATUS')}</Title>
      <Container>
        {renderItem({
          ...statusInfo,
          text: statusStr,
          textKey: 'APP_STATUS_WITH_SUFFIX',
          onClick: onViewLogButtonClick,
        })}
      </Container>
    </Wrapper>
  );
}
