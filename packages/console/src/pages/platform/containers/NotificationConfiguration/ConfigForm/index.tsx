/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import React, { ReactElement, useEffect, useState } from 'react';
import { useCacheStore as useStore } from '@ks-console/shared';
import type { RuleObject } from 'rc-field-form/lib/interface';
import { cloneDeep, get, isEmpty, mergeWith, set, unset } from 'lodash';
import { Form, Button, Loading, useForm, FormItem, notify } from '@kubed/components';

import { NavMenuItemTab } from '@ks-console/shared';

import FooterBtn from './components/FooterBtn';
import EnableService from './components/EnableService';
import type { ConfigFormData, ConfigFormsStore } from './types';
import type { Condition } from './components/ControlSetting/types';
import { checkInfo, fetchDataByFormId, submitForm } from './store';
import ControlSetting, { AlertSelectorValue } from './components/ControlSetting';
import {
  isNotValid,
  notifyError,
  customMerge,
  transformFormId,
  specialVerifyMap,
  verifyTemplatesMap,
  checkConditionValid,
  getInitFormDataByFormId,
  getNotificationVerifyTemplate,
} from './utils';

import Email from './Email';
import WeCom from './WeCom';
import Slack from './Slack';
import FeiShu from './FeiShu';
import Webhook from './Webhook';
import DingTalk from './DingTalk';

import { Block, HorizonBlock } from './styles';

type Props = {
  user?: string;
  tabs: NavMenuItemTab[];
  currentTab: string;
};

function ConfigForm({ currentTab, tabs, user }: Props): JSX.Element {
  const [form] = useForm();
  const formId = transformFormId(currentTab);
  const [isFormLoading, setFormLoading] = useState<boolean>(false);
  const [isSubmitLoading, setIsSubmitLoading] = useState<boolean>(false);
  const [isVerifying, setIsVerifying] = useState<boolean>(false);
  const [initData, setInitData] = useState<ConfigFormData>(getInitFormDataByFormId(formId));
  const [store, setStore] = useStore<ConfigFormsStore>('ConfigFormsStore', {
    formData: getInitFormDataByFormId(formId),
    formStatus: 'create',
  });
  const FORM_MAP: Record<string, ReactElement> = {
    email: <Email formData={store.formData} />,
    feishu: <FeiShu formData={store.formData} />,
    dingtalk: <DingTalk formData={store.formData} />,
    wechat: <WeCom formData={store.formData} />,
    slack: <Slack formData={store.formData} />,
    webhook: <Webhook formData={store.formData} />,
  };

  function fetchData(): void {
    setFormLoading(true);
    fetchDataByFormId(formId).then(({ data, status: formStatus }) => {
      setInitData(cloneDeep(data));
      setStore({ formData: data, formStatus });
      setFormLoading(false);
      form.resetFields();
    });
  }

  function onValuesChange(data: Record<string, unknown>): void {
    const patchData = { formData: data };
    const mergedData: ConfigFormsStore = mergeWith(cloneDeep(store), patchData, customMerge);

    setStore(mergedData);
  }

  function handleVerify(): void {
    form.validateFields().then(() => {
      const data = store.formData;
      const template = getNotificationVerifyTemplate({ user });
      const { config, receiver } = verifyTemplatesMap[formId](data);

      if (['feishu', 'dingtalk'].includes(formId) && !specialVerifyMap[formId](data)) {
        return;
      }

      set(template, 'config.spec', get(config, 'spec', {}));
      set(template, 'receiver.spec', get(receiver, 'spec', {}));

      if (isEmpty(config)) {
        unset(template, 'config');
      }

      setIsVerifying(true);

      checkInfo(template, { user }).then((resp: any) => {
        setIsVerifying(false);

        if (resp.Status !== 200) {
          notifyError(resp.Message || '', true);
          return;
        }

        notify.success(t('SEND_TEST_MESSAGE_SUCCESS_DESC'));
      });
    });
  }

  function handleSubmit(): Promise<void> {
    setIsSubmitLoading(true);

    const { formData, formStatus = 'create' } = store;

    if (isNotValid(formId, formData)) {
      return Promise.reject();
    }

    return submitForm(formId, formData, formStatus);
  }

  function onCancel(): void {
    const patchData = { formData: initData };
    const mergedData: ConfigFormsStore = mergeWith(cloneDeep(store), patchData, customMerge);

    form.resetFields();
    setStore(mergedData);
  }

  function onSubmit(): void {
    form
      .validateFields()
      .then(handleSubmit)
      .then(fetchData)
      .catch(() => null)
      .finally(() => setIsSubmitLoading(false));
  }

  function conditionValidator(
    rule: RuleObject,
    value: AlertSelectorValue | undefined,
    callback: (error?: string) => void,
  ): Promise<any> | void {
    if (value?.matchExpressions?.some((item: Condition) => !checkConditionValid(item))) {
      return callback(t('INVALID_NOTIFICATION_CONDITION'));
    }

    return callback();
  }

  useEffect(fetchData, [formId]);

  if (isFormLoading) {
    return <Loading className="loading" />;
  }

  return (
    <>
      <Form form={form} autoComplete="off" initialValues={initData} onValuesChange={onValuesChange}>
        <FormItem name={['receiver', 'spec', formId, 'enabled']}>
          <EnableService
            className="mb12"
            label={t(`${formId.toUpperCase()}_DESC`)}
            title={t(tabs.find(item => item.name === currentTab)?.title ?? 'Mail')}
            iconName={formId === 'wechat' ? 'wecom' : formId}
          />
        </FormItem>
        <Block className="mb12">
          {FORM_MAP[formId]}
          <FormItem
            name={['receiver', 'spec', formId, 'alertSelector']}
            rules={[{ validator: conditionValidator }]}
          >
            <ControlSetting />
          </FormItem>
        </Block>
        <HorizonBlock>
          <p>{t('SEND_TEST_MESSAGE_DESC')}</p>
          <Button onClick={handleVerify} loading={isVerifying}>
            {t('SEND_TEST_MESSAGE')}
          </Button>
        </HorizonBlock>
        <FooterBtn isLoading={isSubmitLoading} onCancel={onCancel} handleSubmit={onSubmit} />
      </Form>
    </>
  );
}

export default ConfigForm;
