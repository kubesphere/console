/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import * as React from 'react';
import {
  InputWrapper,
  ModalBody,
  ModalTitle,
  ModalWrapper,
  UploadFile,
  UploadWrapper,
} from './index.styles';
import { NoteUploadDuotone } from '../../Icons/index';
import { Close } from '@kubed/icons';
import { Alert, Form, FormItem, ModalProps, notify, useForm } from '@kubed/components';
import { request } from '../../../utils';

interface UploadModalProps extends ModalProps {
  visible: boolean;
  title?: React.ReactNode;
  uploadUrl: string;
}

const Upload = (props: { value?: File[]; onChange?: (value: File[]) => void }) => {
  const { value: valueProp = [], onChange: onChangeProp } = props;
  const [value, setValue] = React.useState(valueProp);
  const ref = React.useRef<HTMLInputElement>(null);
  const handleAdd = (file: File) => {
    setValue([...value, file]);
    onChangeProp?.([...value, file]);
  };
  const handleRemove = (index: number) => {
    const newValue = [...value];
    newValue.splice(index, 1);
    setValue(newValue);
    onChangeProp?.(newValue);
  };

  const handleUploadClick = () => {
    ref.current?.click();
  };

  return (
    <>
      <input
        ref={ref}
        type="file"
        style={{ display: 'none' }}
        onChange={e => {
          const files = e.target.files;
          if (!files || files?.length === 0) return;
          const file = files[0];

          if (file.size > 1024 * 1024 * 1024) {
            notify.error(t('FILE_SIZE_CANNOT_EXCEED_1G'));
            return;
          }
          handleAdd(file);
        }}
      />
      <UploadWrapper onClick={handleUploadClick}>
        <div>
          <NoteUploadDuotone size={40} />
        </div>
        <div>{t('PLEASE_SELECT_FILE')}</div>
        <div>{t('ONLY_SUPPORT_UPLOAD_FILE')}</div>
      </UploadWrapper>
      {value.map((file, index) => (
        <UploadFile key={index}>
          <span>{file.name}</span>
          <Close
            size={16}
            className="icon-clickable"
            onClick={() => {
              handleRemove(index);
            }}
          />
        </UploadFile>
      ))}
    </>
  );
};

const UploadModal = (props: UploadModalProps) => {
  const { title, visible, uploadUrl, ...rest } = props;
  const [formRef] = useForm();

  const handleSubmit = (values: { files: File[]; path: string }) => {
    const { files, path } = values;
    const url = uploadUrl.includes('?') ? `${uploadUrl}&path=${path}` : `${uploadUrl}?path=${path}`;
    const formData = new FormData();
    files.forEach(file => {
      formData.append(file.name, file);
    });
    request
      .post(url, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then(() => {
        notify.success(t('UPLOAD_SUCCESSFUL'));
        props.onCancel?.({} as any);
      });
  };

  const handleOk = () => {
    formRef.submit();
  };
  return (
    <ModalWrapper
      title={title}
      visible={visible}
      header={null}
      onOk={handleOk}
      onCancel={props.onCancel}
      headerExtra={null}
      {...rest}
    >
      <ModalBody>
        <ModalTitle>{t('UPLOAD')}</ModalTitle>
        <Alert className="mb-12">{t('UP_NEED_TAR')}</Alert>
        <Form initialValues={{ files: [], path: '' }} form={formRef} onFinish={handleSubmit}>
          <FormItem
            label={null}
            name="files"
            rules={[
              {
                required: true,
                message: t('PLEASE_SELECT_FILE'),
              },
            ]}
          >
            <Upload />
          </FormItem>
          <FormItem
            label={t('FILE_DIRECTORY')}
            name="path"
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

export default UploadModal;
