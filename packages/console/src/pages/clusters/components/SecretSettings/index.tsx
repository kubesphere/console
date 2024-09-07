/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import React, { useEffect, useState, useRef, forwardRef, Ref, useImperativeHandle } from 'react';
import { OriginalSecret, secretStore, hasChinese } from '@ks-console/shared';
import { RuleObject } from 'rc-field-form/lib/interface';

import { FormItem, Select, FormInstance, Textarea, Input, InputPassword } from '@kubed/components';
import DataForm from '../DataForm';
import DataList from '../DataList';
import { useCacheStore as useStore } from '@ks-console/shared';
import { StyledForm } from './styles';
import { cloneDeep, get, isUndefined, set } from 'lodash';
import { Constants } from '@ks-console/shared';

import { SecretSettingRef } from '../SecretEditModal';

const { MODULE_KIND_MAP } = Constants;
const { module } = secretStore;

import Base64Wrapper from './Base64Wrapper';
import ImagerRegistry from './ImagerRegistry';

interface Props {
  formTemplate: OriginalSecret;
  isFederated?: boolean;
  cluster?: string;
  mode: string;
  disableSelect?: boolean;
  form: FormInstance;
  onOk: Function;
}

export interface FormItemRef {
  validateFun: Function;
}

export interface DataFormRef {
  handleSubmit: Function;
}

const SECRET_TYPES = [
  'Opaque',
  'kubernetes.io/tls',
  'kubernetes.io/dockerconfigjson',
  'kubernetes.io/basic-auth',
];

function SecretSettings(
  { form, formTemplate, isFederated, cluster, disableSelect }: Props,
  ref: Ref<SecretSettingRef>,
) {
  const [secretChanged, setSecretChanged] = useStore<boolean>('secretChanged');
  const [formData] = useState<OriginalSecret>(
    get(formTemplate, MODULE_KIND_MAP[module], formTemplate),
  );
  const [fedFormTemplate, setFedFormTemplate] = useState({});
  const [type, setType] = useState<string>();
  const [state, setState] = useState<string>();
  const [selectDataKey, setSelectDataKey] = useState<string>();

  const imageRegistryRef = useRef<FormItemRef>(null);
  const dataFormRef = useRef<DataFormRef>(null);

  useEffect(() => {
    const newFedFormTemplate = isFederated ? get(formData, 'spec.template') : formData;
    setFedFormTemplate(newFedFormTemplate);
    setType(get(newFedFormTemplate, 'type', ''));
  }, []);

  useEffect(() => {
    form.resetFields();
  }, [secretChanged]);

  const TypeOptions = [
    { label: t('DEFAULT'), value: 'Opaque' },
    { label: t('TLS_INFORMATION'), value: 'kubernetes.io/tls' },
    {
      label: t('IMAGE_REGISTRY_INFORMATION'),
      value: 'kubernetes.io/dockerconfigjson',
    },
    {
      label: t('USERNAME_PASSWORD'),
      value: 'kubernetes.io/basic-auth',
    },
  ];

  const onChange = (v: any) => {
    if (v.length > 0 && v[0] && v[0].name.includes('.dockerconfigjson')) {
      const newFedFormTemplate = cloneDeep(fedFormTemplate);
      set(newFedFormTemplate, v[0].name, v[0].value);

      setFedFormTemplate(newFedFormTemplate);
    }
  };

  const handleTypeChange = (value: string) => {
    if (!type || SECRET_TYPES.includes(type)) {
      set(fedFormTemplate, 'data', {});
    }
    setSecretChanged(true);
    setType(value);
  };

  const dataValidator = (rule: RuleObject, value: string, callback: (error?: any) => void) => {
    if (isUndefined(value)) {
      return callback();
    }

    if (Object.entries(value).some(([key, _value]) => hasChinese(key) || hasChinese(_value))) {
      return callback({ message: t('SECRET_NO_CHINESE_CODE_DESC') });
    }

    callback();
  };

  const imageValidator = (rule: any, value: string, callback: (error?: any) => void) => {
    if (imageRegistryRef?.current?.validateFun()) {
      return callback();
    }
  };

  const showDataForm = () => {
    setState('data');
    setSelectDataKey('');
  };

  const hideDataForm = () => {
    setState('');
    setSelectDataKey('');
    setSecretChanged(false);
  };

  useImperativeHandle(ref, () => {
    return {
      hideDataForm,
      dataFormRef,
    };
  });

  const handleData = (data: object) => {
    const originData = get(fedFormTemplate, 'data', {});
    if (selectDataKey) {
      delete originData[selectDataKey];
    }

    set(fedFormTemplate, 'data', { ...originData, ...data });

    hideDataForm();
  };

  const handleDataItemEdit = (key: string) => {
    setState('data');
    setSelectDataKey(key);
  };

  const renderDataForm = () => {
    const originData = get(fedFormTemplate, 'data', {});

    return (
      <DataForm
        ref={dataFormRef}
        detail={originData}
        // @ts-ignore
        selectKey={selectDataKey}
        onOk={handleData}
        onCancel={hideDataForm}
      />
    );
  };

  const renderDefault = () => {
    return (
      <FormItem
        label={t('DATA')}
        name="data"
        rules={[{ required: true, message: t('ENTER_DATA_DESC') }, { validator: dataValidator }]}
      >
        <DataList onEdit={handleDataItemEdit} onAdd={showDataForm} />
      </FormItem>
    );
  };

  const renderTLS = () => {
    return (
      <div key="tls" className="margin-t8">
        <FormItem
          name={['data', 'tls.crt']}
          label={t('CERTIFICATE')}
          rules={[
            { required: true, message: t('CREDENTIAL_NAME_EMPTY_DESC') },
            { validator: dataValidator },
          ]}
        >
          <Base64Wrapper>
            <Textarea rows={6} resize />
          </Base64Wrapper>
        </FormItem>
        <FormItem
          name={['data', 'tls.key']}
          label={t('PRIVATE_KEY_TCAP')}
          rules={[
            { required: true, message: t('ENTER_PRIVATE_KEY_DESC') },
            { validator: dataValidator },
          ]}
        >
          <Base64Wrapper>
            <Textarea rows={6} resize />
          </Base64Wrapper>
        </FormItem>
      </div>
    );
  };

  const renderImage = () => {
    const { name, namespace } = get(formTemplate, 'metadata');

    return (
      <div key="image" className="margin-t8">
        <FormItem rules={[{ validator: imageValidator }]} name={['data', '.dockerconfigjson']}>
          <Base64Wrapper>
            <ImagerRegistry
              fedFormTemplate={fedFormTemplate}
              cluster={cluster}
              namespace={namespace}
              isFederated={isFederated}
              screatName={name}
              ref={imageRegistryRef}
            />
          </Base64Wrapper>
        </FormItem>
      </div>
    );
  };

  const renderBasicAuth = () => {
    return (
      <div key="basic" className="margin-t8">
        <FormItem
          name={['data', 'username']}
          label={t('USERNAME')}
          rules={[
            { required: true, message: t('USERNAME_EMPTY_DESC') },
            { validator: dataValidator },
          ]}
        >
          <Base64Wrapper>
            <Input autoComplete="nope" />
          </Base64Wrapper>
        </FormItem>
        <FormItem
          name={['data', 'password']}
          label={t('PASSWORD')}
          rules={[
            { required: true, message: t('PASSWORD_EMPTY_DESC') },
            { validator: dataValidator },
          ]}
        >
          <Base64Wrapper>
            <InputPassword type="password" autoComplete="new-password" />
          </Base64Wrapper>
        </FormItem>
      </div>
    );
  };

  const renderContent = () => {
    let content = null;

    switch (type) {
      case 'Opaque':
        content = renderDefault();
        break;
      case 'kubernetes.io/tls':
        content = renderTLS();
        break;
      case 'kubernetes.io/dockerconfigjson':
        content = renderImage();
        break;
      case 'kubernetes.io/basic-auth':
        content = renderBasicAuth();
        break;
      default:
        content = renderDefault();
        break;
    }

    return content;
  };

  return state === 'data' ? (
    renderDataForm()
  ) : (
    <StyledForm form={form} initialValues={formData} onFieldsChange={onChange}>
      <FormItem name={['type']} label={t('TYPE')} help={disableSelect ? '' : t('SECRET_TYPE_DESC')}>
        <Select
          className="type-select"
          options={TypeOptions}
          onChange={handleTypeChange}
          placeholder=" "
          disabled={disableSelect}
          showSearch
        />
      </FormItem>
      {renderContent()}
    </StyledForm>
  );
}

export default forwardRef(SecretSettings);
