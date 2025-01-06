/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import React from 'react';

import type { FormattedExtension, FormattedInstallPlan } from '../../../../../stores/extension';
import type { StatusStateInfo } from '../../utils/status';
import { getExtensionStatusStateInfo, getClustersOverallStatusStateInfo } from '../../utils/status';
import {
  Wrapper,
  Title,
  Container,
  IconWrapper,
  StatusText,
  ButtonsWrapper,
  ViewLogButton,
} from './PopoverContent.styles';

interface PopoverContentProps {
  formattedExtension: FormattedExtension;
  formattedInstallPlan: FormattedInstallPlan | undefined;
  onExtensionViewLogButtonClick: () => void;
  onClusterSchedulingViewLogButtonClick: () => void;
}

interface RenderItemProps extends StatusStateInfo {
  textKey: string;
  onClick: () => void;
}

function PopoverContent({
  formattedExtension,
  formattedInstallPlan,
  onExtensionViewLogButtonClick,
  onClusterSchedulingViewLogButtonClick,
}: PopoverContentProps) {
  const extensionStatusStateInfo = getExtensionStatusStateInfo(formattedExtension);
  const clustersOverallStatusStateInfo = getClustersOverallStatusStateInfo(formattedInstallPlan);

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
      <Title>{t('COMPONENT_INSTALLATION_STATUS')}</Title>
      <Container>
        {extensionStatusStateInfo &&
          renderItem({
            ...extensionStatusStateInfo,
            textKey: 'EXTENSION_WITH_SUFFIX',
            onClick: onExtensionViewLogButtonClick,
          })}
        {clustersOverallStatusStateInfo &&
          renderItem({
            ...clustersOverallStatusStateInfo,
            textKey: 'CLUSTER_AGENT_WITH_SUFFIX',
            onClick: onClusterSchedulingViewLogButtonClick,
          })}
      </Container>
    </Wrapper>
  );
}

export { PopoverContent };
