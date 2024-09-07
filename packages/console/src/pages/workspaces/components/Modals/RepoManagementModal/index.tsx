/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import React, { useMemo, useState } from 'react';
import { get } from 'lodash';
import { Firewall } from '@kubed/icons';
import { useParams } from 'react-router-dom';
import { openpitrixStore } from '@ks-console/shared';
import { RuleObject } from 'rc-field-form/lib/interface';
import { FormItem, Input, Modal, useForm, Textarea } from '@kubed/components';

import UrlInput from '../../UrlInput';
import TimeInput from '../../TimeInput';

import { StyledForm } from './styles';

const { useRepoMutation } = openpitrixStore;

type Props = {
  visible: boolean;
  detail?: any;
  onOk?: () => void;
  onCancel?: () => void;
};

function RepoManagementModal({ visible, detail, onCancel, onOk }: Props): JSX.Element {
  const [form] = useForm();
  const { workspace = '' } = useParams();
  const initFormData = useMemo(() => {
    let type = 'https';

    if (detail && detail.url) {
      const matches = detail.url.match(/^(.*):\/\//);
      if (matches[1]) {
        type = matches[1];
      }
    }

    return {
      type,
      name: '',
      sync_period: get(detail, 'sync_period', '0s'),
      repoType: 'Helm',
      visibility: 'public',
      credential: '{}',
      providers: ['kubernetes'],
      ...detail,
    };
  }, [detail]);
  const [currentFormData, setCurrentFormData] = useState<Record<string, string>>(initFormData);
  const { mutate, isLoading } = useRepoMutation(workspace, {
    onSuccess: () => onOk?.(),
  });

  function getSeconds(timeStr: string): number {
    const unit = timeStr.slice(-1);
    const number = timeStr.slice(0, -1);
    const value = parseFloat(timeStr);

    if (value.toString() !== number) {
      return 179;
    }
    switch (unit) {
      default:
      case 's':
        return value;
      case 'm':
        return value * 60;
      case 'h':
        return value * 60 * 60;
    }
  }

  function timeValidator(rule: RuleObject, value: string, callback: (error?: string) => void) {
    const data = getSeconds(value);
    const time = /^[0-9]*$/;

    if (!data) {
      return callback();
    }

    if (!time.test(data.toString())) {
      return callback(t('SYNC_INTERVAL_INVALID'));
    }

    if (data !== 0 && (data > 86400 || data < 180)) {
      return callback(t('SYNC_INTERVAL_TIP'));
    }

    callback();
  }

  function handleUrlChange(patchData: Record<string, string>): void {
    setCurrentFormData(prevFormData => ({ ...prevFormData, ...patchData }));
  }

  function handleValuesChange(values: Record<string, string>): void {
    setCurrentFormData(prevFormData => ({ ...prevFormData, ...values }));
  }

  function handleOk(): void {
    form.validateFields().then(() => {
      if (detail?.repo_id) {
        // @ts-ignore TODO
        return mutate({ params: { ...detail, ...currentFormData }, repo_id: detail.repo_id });
      }

      return mutate({ params: { ...currentFormData, app_default_status: 'active' } });
    });
  }

  return (
    <Modal
      width={691}
      visible={visible}
      onOk={handleOk}
      onCancel={onCancel}
      titleIcon={<Firewall size={20} />}
      title={detail ? 'EDIT_APP_REPO' : 'ADD_APP_REPO'}
      confirmLoading={isLoading}
    >
      <StyledForm form={form} initialValues={initFormData} onValuesChange={handleValuesChange}>
        <FormItem
          name={['name']}
          label={t('NAME')}
          rules={[{ required: true, message: t('NAME_EMPTY_DESC') }]}
        >
          <Input autoFocus={true} />
        </FormItem>
        <UrlInput formData={currentFormData} onChange={handleUrlChange} isSubmitting={isLoading} />
        <FormItem
          name={['sync_period']}
          label={t('SYNC_INTERVAL')}
          help={t('SYNC_INTERVAL_DESC')}
          rules={[
            { required: true, message: t('SYNC_PERIOD_EMPTY_DESC') },
            { validator: timeValidator },
          ]}
        >
          <TimeInput />
        </FormItem>
        <FormItem name={['description']} label={t('DESCRIPTION')} help={t('DESCRIPTION_DESC')}>
          <Textarea maxLength={256} />
        </FormItem>
      </StyledForm>
    </Modal>
  );
}

export default RepoManagementModal;
