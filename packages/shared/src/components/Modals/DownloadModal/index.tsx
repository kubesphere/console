/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import * as React from 'react';
import { ModalBody, ModalTitle, InputWrapper, ModalWrapper } from './index.styles';
import { Alert, Form, FormItem, ModalProps, notify, useForm } from '@kubed/components';

interface DownloadModalProps extends ModalProps {
  visible: boolean;
  title?: React.ReactNode;
  downloadUrl: string;
}

const DownloadModal = (props: DownloadModalProps) => {
  const { title, visible, downloadUrl, ...rest } = props;
  const [formRef] = useForm();
  const handleOk = () => {
    formRef.submit();
  };

  const handleSubmit = (values: any) => {
    const url = downloadUrl.includes('?')
      ? `${downloadUrl}&path=${values.path}`
      : `${downloadUrl}?path=${values.path}`;
    const a = document.createElement('a');
    a.href = url;
    const fileName = url.split('/').pop();
    a.rel = 'noopener noreferrer';
    a.style.display = 'none';
    a.download = fileName || 'file';
    document.body.appendChild(a);
    notify(t('PLEASE_SELECT_FILE_SAVE_PATH_AND_NAME'));
    a.click();
    document.body.removeChild(a);
    rest.onCancel?.({} as any);
  };

  return (
    <ModalWrapper visible={visible} header={null} headerExtra={null} onOk={handleOk} {...rest}>
      <ModalBody>
        <ModalTitle>{title || t('DOWNLOAD')}</ModalTitle>
        <Alert>{t('DOWN_NEED_TAR')}</Alert>
        <Form initialValues={{}} form={formRef} onFinish={handleSubmit}>
          <FormItem
            name="path"
            label={t('FILE_DIRECTORY')}
            rules={[
              {
                required: true,
                message: t('PLEASE_ENTER_FILE_DIRECTORY'),
              },
            ]}
          >
            <InputWrapper placeholder={t('PLEASE_ENTER_FILE_DIRECTORY')} />
          </FormItem>
        </Form>
      </ModalBody>
    </ModalWrapper>
  );
};

export default DownloadModal;
