/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import React from 'react';
import { Modal } from '@kubed/components';
import WujieReact from 'wujie-react';

interface ToolsModalProps {
  visible: boolean;
  path: string;
  title: string;
  icon: React.ReactNode;
  onCancel?: (e: React.MouseEvent<HTMLElement>) => void;
}

const ToolsModal = ({ visible, title, icon, onCancel, path }: ToolsModalProps) => {
  const url = `//${window.location.host}/consolev3/${path}`;
  return (
    <Modal
      visible={visible}
      title={title}
      titleIcon={icon}
      onCancel={onCancel}
      footer={null}
      width="100vw"
      style={{ padding: 0 }}
      bodyStyle={{ height: 'calc(100vh - 101px)' }}
    >
      <WujieReact width="100%" height="100%" name={`consolev3_tool_${path}`} url={url} />
    </Modal>
  );
};

export default ToolsModal;
