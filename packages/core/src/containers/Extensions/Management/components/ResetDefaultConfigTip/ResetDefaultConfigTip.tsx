/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import React from 'react';
import { useModal } from '@kubed/components';
import { useDisclosure } from '@kubed/hooks';
import { Information } from '@kubed/icons';

import { ResetDefaultConfigConfirmModal } from './ResetDefaultConfigConfirmModal';
import { StyledAlert, Container, Description, StyledButton } from './ResetDefaultConfigTip.styles';

interface ResetDefaultConfigTipProps {
  hasMarginBottom?: boolean;
  confirmLoading?: boolean;
  onConfirmResetDefaultConfig: () => void;
}

export function ResetDefaultConfigTip({
  hasMarginBottom,
  confirmLoading,
  onConfirmResetDefaultConfig,
}: ResetDefaultConfigTipProps) {
  const marginBottom = hasMarginBottom ? 12 : 0;

  const modal = useDisclosure();

  const handleClick = () => modal.open();

  const handleOk = () => {
    onConfirmResetDefaultConfig();
    modal.close();
  };

  return (
    <>
      <StyledAlert $marginBottom={marginBottom} icon={<Information />} type="info">
        <Container>
          <Description>{t('RESET_DEFAULT_CONFIGURATION_DESCRIPTION')}</Description>
          <div>
            <StyledButton variant="text" onClick={handleClick}>
              {t('RESET_DEFAULT_CONFIGURATION_TITLE')}
            </StyledButton>
          </div>
        </Container>
      </StyledAlert>
      <ResetDefaultConfigConfirmModal
        visible={modal.isOpen}
        confirmLoading={confirmLoading}
        onCancel={modal.close}
        onOk={handleOk}
      />
    </>
  );
}
