/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import React from 'react';
import type { ModalProps } from '@kubed/components';

import { FullScreenModal } from '@ks-console/shared';

import type { ExtensionFilesViewerContainerProps } from '../ExtensionFilesViewer';
import { ExtensionFilesViewerContainer } from '../ExtensionFilesViewer';

type ExtensionFilesViewerModalProps = Required<Pick<ModalProps, 'visible' | 'onCancel'>> &
  ExtensionFilesViewerContainerProps;

function ExtensionFilesViewerModal({
  visible,
  extensionName,
  version,
  onCancel,
}: ExtensionFilesViewerModalProps) {
  return (
    <FullScreenModal
      visible={visible}
      title={t('VIEW_EXTENSION_FILES')}
      footer={null}
      onCancel={onCancel}
    >
      <ExtensionFilesViewerContainer extensionName={extensionName} version={version} />
    </FullScreenModal>
  );
}

export { ExtensionFilesViewerModal };
