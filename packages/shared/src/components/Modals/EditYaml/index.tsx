/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import React, { useEffect, useState } from 'react';
import { CodeEditor } from '@kubed/code-editor';
import { Eye, Pen } from '@kubed/icons';
import { FullScreenModal } from './styles';

interface Props {
  yaml?: string;
  detail?: Record<string, any>;
  visible?: boolean;
  onOk?: (yaml: string) => void;
  onCancel?: () => void;
  onChange?: (yaml: string) => void;
  readOnly?: boolean;
  confirmLoading?: boolean;
}

function EditYamlModal({
  visible,
  yaml,
  onOk,
  onCancel,
  onChange,
  readOnly,
  confirmLoading,
}: Props) {
  const [value, setValue] = useState<string>(yaml ?? '');

  const title = readOnly ? t('VIEW_YAML') : t('EDIT_YAML');
  const icon = readOnly ? <Eye /> : <Pen />;

  useEffect(() => {
    if (yaml) {
      setValue(yaml);
    }
  }, [yaml]);

  const handleChange = (val: string) => {
    setValue(val);
    onChange?.(val);
  };

  return (
    <FullScreenModal
      title={title}
      titleIcon={icon}
      width="calc(100vw - 40px)"
      visible={visible}
      confirmLoading={confirmLoading}
      onOk={() => onOk?.(value)}
      onCancel={onCancel}
      footer={readOnly ? null : undefined}
    >
      <CodeEditor
        mode="yaml"
        acceptFileTypes={['.yaml', '.yml']}
        fileName="config.yaml"
        readOnly={readOnly}
        value={value}
        onChange={handleChange}
      />
    </FullScreenModal>
  );
}

export default EditYamlModal;
