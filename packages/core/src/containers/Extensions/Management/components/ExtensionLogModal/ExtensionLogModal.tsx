/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import React, { useRef } from 'react';
import type { ModalProps } from '@kubed/components';

import type { FormattedExtension } from '../../../../../stores/extension';
import { useExtensionLogQuery } from '../../../../../stores/extension';

import { LogViewer } from '../LogViewer';
import { StyledModal } from './ExtensionLogModal.styles';

interface ExtensionLogModalProps extends Required<Pick<ModalProps, 'visible' | 'onCancel'>> {
  initialTitle: string;
  formattedExtension: FormattedExtension;
}

function ExtensionLogModal({
  visible,
  initialTitle,
  formattedExtension,
  onCancel,
}: ExtensionLogModalProps) {
  const extensionName = formattedExtension.name;
  const { data } = useExtensionLogQuery({ extensionName });

  const titleRef = useRef(initialTitle);

  return (
    <StyledModal
      visible={visible}
      title={titleRef.current}
      width={960}
      footer={null}
      onCancel={onCancel}
    >
      <LogViewer log={data.log} bodyStyle={{ height: '580px' }} />
    </StyledModal>
  );
}

export { ExtensionLogModal };
