import React, { useState, useEffect, useMemo } from 'react';
import { cloneDeep, get } from 'lodash';
import {
  FormItem,
  Select,
  Input,
  InputPassword,
  InputNumber,
  Textarea,
  Modal,
  Row,
  useForm,
} from '@kubed/components';
import { Add } from '@kubed/icons';
import { generateId, Pattern } from '@ks-console/shared';
import { StyledForm, StyleCol, FormItemWapper, LabelWapper, HelpWapper } from './styles';

export interface EditFormValue {
  name: string;
  roles: string[];
  internalAddress: string;
  address: string;
  port: number | string;
  user?: string;
  password?: string;
  privateKey?: string;
}
export interface Props {
  visible: boolean;
  addAfterCreate?: boolean;
  data?: Record<string, any>;
  confirmLoading?: boolean;
  onOk: (data: any) => void;
  onCancel: () => void;
}

function AddNode({ visible, data, addAfterCreate = true, confirmLoading, onCancel, onOk }: Props) {
  const [formData, setFormData] = useState(cloneDeep(data || {}));
  const [authMode, setAuthMode] = useState(
    get(data || {}, 'privateKey', '') ? 'secret' : 'password',
  );
  const [form] = useForm<EditFormValue>();
  const nodeRoles = addAfterCreate
    ? [{ label: t('WORKER'), value: 'worker' }]
    : [
        { label: t('CONTROL_PLANE'), value: 'master' },
        { label: t('WORKER'), value: 'worker' },
      ];
  const authModes = [
    {
      label: t('USERNAME_AND_PASSWORD'),
      value: 'password',
    },
    {
      label: t('SSH_KEY_SCAP'),
      value: 'secret',
    },
  ];
  const defaultRoles = addAfterCreate ? ['worker'] : undefined;
  useEffect(() => {
    setFormData(cloneDeep(data || {}));
  }, [visible]);
  const handleAuthModeChange = (key: string) => {
    setAuthMode(key);
  };
  const renderAuthentication = useMemo(() => {
    if (authMode === 'password') {
      return (
        <>
          <FormItem
            initialValue="root"
            name="user"
            label={t('USERNAME')}
            help={t('NODE_USERNAME_DESC')}
          >
            <Input autoComplete="off" />
          </FormItem>
          <FormItem name="password" label={t('PASSWORD')} help={t('NODE_PASSWORD_DESC')}>
            <InputPassword autoComplete="off" />
          </FormItem>
        </>
      );
    }
    return (
      <>
        <FormItem name="privateKey" label={t('SSH_KEY_TCAP')}>
          <Textarea autoresize />
        </FormItem>
      </>
    );
  }, [authMode]);
  return (
    <Modal
      width={800}
      visible={visible}
      titleIcon={<Add size={20} />}
      title={t('ADD_NODE')}
      confirmLoading={confirmLoading}
      onCancel={onCancel}
      onOk={form.submit}
    >
      <StyledForm
        form={form}
        initialValues={formData}
        onFinish={(formValues: EditFormValue) => {
          onOk?.(formValues);
        }}
      >
        <FormItem
          label={t('NAME')}
          name="name"
          initialValue={`node-${generateId(4)}`}
          rules={[
            {
              required: true,
              message: t('NODE_NAME_EMPTY_DESC'),
            },
          ]}
        >
          <Input />
        </FormItem>
        <FormItem
          name="roles"
          label={t('ROLE')}
          help={t('NODE_ROLE_DESC')}
          rules={[
            {
              required: true,
              message: t('NODE_ROLE_EMPTY_DESC'),
            },
          ]}
          initialValue={defaultRoles}
        >
          <Select options={nodeRoles} mode="multiple" />
        </FormItem>
        <FormItem
          name="internalAddress"
          label={t('INTERNAL_IP_ADDRESS')}
          help={t('NODE_INTERNAL_IP_DESC')}
          rules={[
            {
              required: true,
              message: t('NODE_INTERNAL_IP_EMPTY_DESC'),
            },
            {
              pattern: Pattern.PATTERN_IP,
              message: t('INVALID_IP_DESC'),
            },
          ]}
        >
          <Input placeholder="0.0.0.0" autoComplete="off" />
        </FormItem>
        <Row>
          <StyleCol span={6}>
            <FormItem
              name="address"
              label={t('EXTERNAL_IP_ADDRESS')}
              help={t('NODE_EXTERNAL_IP_DESC')}
              rules={[
                {
                  required: true,
                  message: t('NODE_EXTERNAL_IP_EMPTY_DESC'),
                },
                {
                  pattern: Pattern.PATTERN_IP,
                  message: t('INVALID_IP_DESC'),
                },
              ]}
            >
              <Input name="address" placeholder="0.0.0.0" autoComplete="off" />
            </FormItem>
          </StyleCol>
          <StyleCol span={6}>
            <FormItem
              name="port"
              label={t('PORT')}
              initialValue={22}
              rules={[
                {
                  pattern: Pattern.PATTERN_INTEGER_NUMBER,
                  message: t('SYNC_INTERVAL_INVALID'),
                },
              ]}
            >
              <InputNumber max={65535} min={0} />
            </FormItem>
          </StyleCol>
        </Row>
        <FormItemWapper>
          <LabelWapper>{t('SSH_AUTH_MODE')}</LabelWapper>
          <Select value={authMode} options={authModes} onChange={handleAuthModeChange} />
          <HelpWapper>{t('SSH_AUTH_MODE_DESC')}</HelpWapper>
        </FormItemWapper>
        {renderAuthentication}
      </StyledForm>
    </Modal>
  );
}
export default AddNode;
