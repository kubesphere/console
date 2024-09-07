/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import React from 'react';
import type { CSSProperties } from 'react';
import { useDisclosure } from '@kubed/hooks';

import type { ExtensionFilesViewerContainerProps } from '../ExtensionFilesViewer';
import { ExtensionFilesViewerModal } from '../ExtensionFilesViewerModal';
import { StyledButton } from './ExtensionFilesViewerButton.styles';

interface ExtensionFilesViewerButtonProps extends ExtensionFilesViewerContainerProps {
  style?: CSSProperties;
}

function ExtensionFilesViewerButton({
  extensionName,
  version,
  style,
}: ExtensionFilesViewerButtonProps) {
  const { isOpen, open, close } = useDisclosure();

  return (
    <>
      <StyledButton style={style} onClick={open}>
        {t('VIEW_EXTENSION_FILES')}
      </StyledButton>
      <ExtensionFilesViewerModal
        visible={isOpen}
        extensionName={extensionName}
        version={version}
        onCancel={close}
      />
    </>
  );
}

export { ExtensionFilesViewerButton };
