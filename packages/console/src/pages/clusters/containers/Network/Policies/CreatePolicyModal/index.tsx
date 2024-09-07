/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import React, { createRef } from 'react';

import { isUndefined } from 'lodash';
import { Modal } from '@kubed/components';
import { Firewall } from '@kubed/icons';
import { CodeEditor, CodeEditorRef } from '@kubed/code-editor';
import { yaml } from '@ks-console/shared';

interface CreatePolicyModalProps {
  visible: boolean;
  onOk?: (yaml: string) => void;
  onCancel?: () => void;
  isSubmitting: boolean;
  readOnly?: boolean;
}

function CreatePolicyModal({
  visible,
  isSubmitting,
  readOnly,
  onOk,
  onCancel,
}: CreatePolicyModalProps) {
  const editor = createRef<CodeEditorRef>();
  const defaultValue = {
    kind: 'NetworkPolicy',
    apiVersion: 'networking.k8s.io/v1',
    metadata: {
      name: '',
      namespace: '',
    },
    spec: {
      podSelector: {},
    },
  };

  const handleOk = () => {
    // @ts-ignore
    const value = editor.current?.getValue() || '';
    if (isUndefined(value)) {
      onCancel?.();
    } else {
      onOk?.(value);
    }
  };

  return (
    <Modal
      titleIcon={<Firewall size={40} />}
      title={t('CREATE_NETWORK_POLICY_TCAP')}
      description={t('CREATE_NETWORK_POLICY_DESC')}
      onOk={handleOk}
      className="modal-pd"
      onCancel={onCancel}
      visible={visible}
      confirmLoading={isSubmitting}
      width={960}
    >
      <CodeEditor
        ref={editor}
        value={yaml.getValue(defaultValue)}
        readOnly={readOnly}
        mode="yaml"
        acceptFileTypes={['.yaml', '.yml']}
        fileName="config.yaml"
      />
    </Modal>
  );
}

export default CreatePolicyModal;
