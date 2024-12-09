/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import React from 'react';
import { merge, get } from 'lodash';
import styled from 'styled-components';
import { getBrowserLang, useCacheStore as useStore } from '@ks-console/shared';
import { Form, FormItem, Input, Select, FormInstance } from '@kubed/components';
import { cookie } from '@ks-console/shared';
import { useUpdate } from '../../../../../stores/user';

interface WrapperProps {
  $visible: boolean;
}

const BasicInfoWrapper = styled('div')<WrapperProps>`
  display: ${({ $visible }) => ($visible ? 'flex' : 'none')};
  flex-direction: column;
`;

interface BasicInfoProps {
  visible: boolean;
  formData: any;
  form: FormInstance;
}

const BasicInfo = ({ visible, formData, form }: BasicInfoProps) => {
  const [, setBasicInfoChanged] = useStore('BasicInfoChanged');
  const { mutate } = useUpdate({ name: globals.user.username }, (data: any) => {
    const lang = get(data, 'spec.lang');
    if (lang && data.lang !== cookie('lang')) {
      window.location.reload();
    }
  });

  const onFinish = (data: any) => {
    mutate(merge(formData, data));
  };

  const onChange = () => {
    setBasicInfoChanged(true);
  };

  return (
    <BasicInfoWrapper $visible={visible}>
      <div className="form-title">{t('BASIC_INFORMATION')}</div>
      <Form
        className="setting-form"
        form={form}
        initialValues={formData}
        onFinish={onFinish}
        onFieldsChange={onChange}
        key={formData?.metadata?.name}
      >
        <FormItem label={t('USERNAME')} name={['metadata', 'name']}>
          <Input disabled />
        </FormItem>
        <FormItem
          label={t('EMAIL')}
          name={['spec', 'email']}
          help={t('USER_SETTING_EMAIL_DESC')}
          rules={[
            { required: true, message: t('INPUT_EMAIL_TIP') },
            { type: 'email', message: t('INVALID_EMAIL') },
          ]}
        >
          <Input placeholder="user@example.com" />
        </FormItem>
        {globals.config.supportLangs && (
          <FormItem label={t('LANGUAGE')} name={['spec', 'lang']}>
            <Select
              options={globals.config.supportLangs}
              defaultValue={cookie('lang') || getBrowserLang()}
            />
          </FormItem>
        )}
      </Form>
    </BasicInfoWrapper>
  );
};

export default BasicInfo;
