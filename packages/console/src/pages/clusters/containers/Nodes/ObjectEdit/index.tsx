/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import React, { useEffect, useState } from 'react';
import { isEmpty } from 'lodash';
import { Modal } from '@kubed/components';
import { Pen } from '@kubed/icons';
import { PropertiesInput } from '@ks-console/shared';
import { Content, Title, Wrapper } from './styles';

export interface Props {
  visible: boolean;
  title: string;
  detail: Record<string, any>;
  confirmLoading?: boolean;
  onOk: (data: any) => void;
  onCancel: () => void;
}
function ObjectEdit({ visible, title, detail = {}, confirmLoading, onCancel, onOk }: Props) {
  const [selfValue, setSelfValue] = useState(detail?.labels || {});
  const [enableSave, setEnableSave] = useState<boolean>(true);
  useEffect(() => {
    setSelfValue(detail?.labels || {});
  }, [visible]);
  const handleChange = (key: Record<string, any>) => {
    setSelfValue(key);
  };
  const handleError = (error: any) => {
    setEnableSave(isEmpty(error));
  };
  return (
    <Modal
      width={1162}
      visible={visible}
      titleIcon={<Pen size={20} />}
      title={t('EDIT_TITLE', { title })}
      confirmLoading={confirmLoading}
      onCancel={onCancel}
      okButtonProps={{ disabled: !enableSave }}
      onOk={() => {
        onOk(selfValue);
      }}
    >
      <Wrapper>
        <Title>{t(title)}</Title>
        <Content>
          <PropertiesInput
            addText={t('ADD')}
            value={selfValue}
            onChange={handleChange}
            onError={handleError}
          />
        </Content>
      </Wrapper>
    </Modal>
  );
}
export default ObjectEdit;
