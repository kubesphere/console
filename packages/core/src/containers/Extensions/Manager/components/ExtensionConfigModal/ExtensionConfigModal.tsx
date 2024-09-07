/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import React, { useState } from 'react';
import { Loading, notify } from '@kubed/components';

import type { FormattedExtension } from '../../../../../stores/extension';
import {
  useInstallPlanQuery,
  useExtensionVersionFilesQuery,
  useUpdateInstallPlanMutation,
} from '../../../../../stores/extension';
import { updateInstallPlanConfig } from '../../actions';
import { ResetDefaultConfigTip } from '../ResetDefaultConfigTip';
import { ExtensionConfig } from '../ExtensionConfig';

import { StyledModal } from './ExtensionConfigModal.styles';

interface ExtensionConfigModalProps {
  visible: boolean;
  formattedExtension: FormattedExtension;
  onClose: () => void;
}

function ExtensionConfigModal({ visible, formattedExtension, onClose }: ExtensionConfigModalProps) {
  const extensionName = formattedExtension.name;
  const installedVersion = formattedExtension.installedVersion;

  const [extensionConfig, setExtensionConfig] = useState<string>('');

  const { isFetching: isInstallPlanQueryFetching, refetch } = useInstallPlanQuery({
    enabled: Boolean(extensionName),
    extraQueryKey: ['ExtensionConfigModal'],
    extensionName,
    onSuccess: data => {
      const config = data?.config ?? '';
      setExtensionConfig(config);
    },
  });

  const { isLoading: isExtensionVersionFilesQueryLoading, extensionVersionConfig } =
    useExtensionVersionFilesQuery({
      enabled: Boolean(extensionName && installedVersion),
      extensionName,
      version: installedVersion ?? '',
    });

  const isLoading = isInstallPlanQueryFetching || isExtensionVersionFilesQueryLoading;

  const updateInstallPlanConfigMutation = useUpdateInstallPlanMutation({
    onSuccess: () => {
      notify.success(t('SET_EXTENSION_CONFIG_SUCCESSFULLY'));
      refetch();
      onClose();
    },
  });

  const renderContent = () => {
    if (isLoading) {
      return <Loading className="page-loading" />;
    }

    return (
      <>
        <ResetDefaultConfigTip
          hasMarginBottom
          onConfirmResetDefaultConfig={() => setExtensionConfig(extensionVersionConfig)}
        />
        <ExtensionConfig
          value={extensionConfig}
          readOnly={updateInstallPlanConfigMutation.isLoading}
          onChange={setExtensionConfig}
        />
      </>
    );
  };

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
      {renderContent()}
    </StyledModal>
  );
}

export { ExtensionConfigModal };
