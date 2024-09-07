/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import React, { useEffect, useMemo, useState } from 'react';
import { get } from 'lodash';
import { Form, FormItem, Input, Select, useForm } from '@kubed/components';
import { Pattern, ArrayInput } from '@ks-console/shared';
import RulePath from '../../../../../components/Inputs/RulePath';
import { Wrapper, FormWrapper, FromGroup } from './styles';

interface Props {
  data?: Record<string, any>;
  namespace?: string;
  secrets?: Record<string, any>[];
  services?: Record<string, any>[];
  isFederated?: boolean;
  resetSubRoute?: any;
  registerSubRoute?: any;
  projectDetail?: Record<string, any>;
  onSave?: any;
  onCancel?: any;
}

const { PATTERN_HOST } = Pattern;

const RuleForm = ({
  data,
  secrets,
  services,
  registerSubRoute,
  resetSubRoute,
  onSave,
  onCancel,
}: Props) => {
  const [formRef] = useForm();
  const [state, setState] = useState(() => {
    return {
      serviceType: '',
      protocol: get(data, 'protocol', 'http'),
    };
  });

  const protocolsOptions = [
    { label: 'HTTP', value: 'http' },
    { label: 'HTTPS', value: 'https' },
  ];

  const secretOptions = useMemo(() => {
    return secrets?.map(item => ({
      label: item?.name,
      value: item?.name,
    }));
  }, [secrets]);

  const handleValidator = async () => {
    try {
      await formRef?.validateFields();
      return true;
    } catch {
      return false;
    }
  };

  const handleGoBack = async () => {
    const validForm = await handleValidator();

    if (validForm) {
      onCancel();
    }

    if (resetSubRoute) {
      resetSubRoute();
    }
  };

  const handleSubmit = (callback: any) => {
    formRef?.validateFields().then((allData: any) => {
      onSave?.(allData);
      callback?.();
    });
  };

  useEffect(() => {
    if (registerSubRoute) {
      registerSubRoute(handleSubmit, handleGoBack);
    }
  }, []);

  const handleProtocolChange = (protocol: string) => {
    setState({
      ...state,
      protocol,
    });
  };

  const checkItemValid = (item: Record<string, any>) =>
    item.path &&
    item.backend &&
    item.backend.service &&
    item.backend.service.name &&
    item.backend.service.port;

  const handlePathExistValidator = (value: Record<string, any>[]) => {
    const pathList = value.map(item => item.path);
    let isExist = false;

    pathList.forEach(item => {
      const length = pathList.length;
      let i = 0;
      let count = 0;

      while (i <= length) {
        if (item === pathList[i]) {
          count++;
        }

        if (count > 1) {
          isExist = true;
          break;
        }

        i++;
      }
    });
    return isExist;
  };

  const pathValidator = (rule: any, value: any, callback: any) => {
    if (!value) {
      return callback();
    }

    if (value.some((item: any) => !checkItemValid(item))) {
      return callback({ message: t('INVALID_PATH_DESC'), field: rule.field });
    }

    const isExist = handlePathExistValidator(value);

    if (isExist) {
      return callback({ message: t('PATH_EXIST'), field: rule.field });
    }

    return callback();
  };

  const renderForm = () => {
    return (
      <>
        <FormItem
          label={t('DOMAIN_NAME_TCAP')}
          name={['host']}
          rules={[
            {
              required: true,
              message: t('DOMAIN_NAME_EMPTY_DESC'),
            },
            {
              pattern: PATTERN_HOST,
              message: t('INVALID_DOMAIN_DESC'),
            },
          ]}
        >
          <Input autoFocus={true} />
        </FormItem>
        <FormItem label={t('PROTOCOL')} name={['protocol']}>
          {({ value, onChange }) => (
            <Select
              value={value}
              defaultValue="http"
              options={protocolsOptions}
              onChange={(newValue: string) => {
                onChange(newValue);
                handleProtocolChange(newValue);
              }}
            />
          )}
        </FormItem>
        {state.protocol === 'https' && (
          <FormItem label={t('SECRET')} name={['secretName']}>
            <Select options={secretOptions} placeholder=" " />
          </FormItem>
        )}
        <FormItem
          label={t('PATH_PL')}
          name={['http', 'paths']}
          rules={[{ required: true, message: t('PATH_EMPTY_DESC') }, { validator: pathValidator }]}
        >
          <ArrayInput itemType="object" addText={t('ADD')} checkItemValid={checkItemValid}>
            <RulePath services={services} />
          </ArrayInput>
        </FormItem>
      </>
    );
  };

  const render = () => {
    return (
      <Wrapper>
        <div className="h4">
          <a className="custom-icon" onClick={handleGoBack}>
            <img src="/assets/back.svg" />
          </a>
          {t('SET_ROUTING_RULES')}
        </div>
        <FormWrapper>
          <Form form={formRef} initialValues={data}>
            <FromGroup>{renderForm()}</FromGroup>
          </Form>
        </FormWrapper>
      </Wrapper>
    );
  };

  return render();
};

export default RuleForm;
