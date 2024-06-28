import React, { useState } from 'react';
import { notify } from '@kubed/components';

import type { FormattedExtension } from '../../../../../stores/extension';
import { useInstallPlanQuery, useUpdateInstallPlanMutation } from '../../../../../stores/extension';
import { updateInstallPlanConfig } from '../../actions';
import { ExtensionConfig } from '../ExtensionConfig';

import { StyledModal } from './ExtensionConfigModal.styles';

interface ExtensionConfigModalProps {
  visible: boolean;
  formattedExtension: FormattedExtension;
  onClose: () => void;
}

function ExtensionConfigModal({ visible, formattedExtension, onClose }: ExtensionConfigModalProps) {
  const extensionName = formattedExtension.name;

  const [extensionConfig, setExtensionConfig] = useState<string>('');

  const { isFetching, refetch } = useInstallPlanQuery({
    extensionName,
    extraQueryKey: ['ExtensionConfigModal'],
    enabled: !!extensionName,
    onSuccess: data => {
      const config = data?.config ?? '';
      setExtensionConfig(config);
    },
  });

  const updateInstallPlanConfigMutation = useUpdateInstallPlanMutation({
    onSuccess: () => {
      notify.success(t('SET_EXTENSION_CONFIG_SUCCESSFULLY'));
      refetch();
      onClose();
    },
  });

  return (
    <StyledModal
      visible={visible}
      title={t('EXTENSION_CONFIG')}
      width={960}
      confirmLoading={updateInstallPlanConfigMutation.isLoading}
      onOk={() =>
        updateInstallPlanConfig({
          formattedExtension,
          config: extensionConfig,
          mutate: updateInstallPlanConfigMutation.mutate,
        })
      }
      onCancel={() => onClose()}
    >
      <ExtensionConfig
        value={extensionConfig}
        isLoading={isFetching}
        readOnly={updateInstallPlanConfigMutation.isLoading}
        onChange={setExtensionConfig}
      />
    </StyledModal>
  );
}

export { ExtensionConfigModal };
