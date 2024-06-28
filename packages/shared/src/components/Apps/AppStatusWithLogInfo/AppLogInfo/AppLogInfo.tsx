import React from 'react';
import { useDisclosure } from '@kubed/hooks';
import { AppLogModal } from '../../../Modals/AppLogModal';
import { TooltipIcon } from './TooltipIcon';
import { typeProps } from './PopoverContent';
import { StatusIndicatorProps } from '@ks-console/shared';
import { getStatusDotColor } from '../../../StatusIndicator/utils';

export interface LogButtonProps extends Pick<StatusIndicatorProps, 'type'> {
  LogModalTitle?: string;
  statusStr: string;
  cluster: string;
  namespace: string;
  jobName: string;
}

export function AppLogInfo({
  LogModalTitle,
  cluster,
  namespace,
  jobName,
  type,
  statusStr,
}: LogButtonProps) {
  const ModalLogModalTitle = LogModalTitle || t('APP_DEPLOY_LOGS');
  const LogModal = useDisclosure();

  const colorType = getStatusDotColor({ type }) as typeProps;

  const showTip = colorType !== 'success';

  const renderLogModal = () => {
    if (!LogModal.isOpen) {
      return null;
    }

    return (
      <AppLogModal
        cluster={cluster}
        namespace={namespace}
        jobName={jobName}
        visible={LogModal.isOpen}
        initialTitle={ModalLogModalTitle}
        onCancel={LogModal.close}
      />
    );
  };

  return (
    <div>
      {showTip && <TooltipIcon onClick={LogModal.open} type={colorType} statusStr={statusStr} />}
      {renderLogModal()}
    </div>
  );
}
