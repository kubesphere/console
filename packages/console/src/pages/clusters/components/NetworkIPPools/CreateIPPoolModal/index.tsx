/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import { cloneDeep, set } from 'lodash';
import {
  generateId,
  NumberInput,
  FormDataCreateNetworkIPPool,
  Pattern,
  CridObject,
} from '@ks-console/shared';
import React, { useState, useEffect } from 'react';
import { Form, FormItem, Input, Modal, useForm } from '@kubed/components';
import { Netmask } from 'netmask';
import { ObjectInputWrapper } from './styles';

interface Props {
  visible: boolean;
  onOk: Function;
  confirmLoading?: boolean;
  onCancel?: () => void;
  cluster?: string;
}

function CreateIPPoolModal({ onOk, onCancel, visible, confirmLoading }: Props) {
  const [form] = useForm();
  const [formData, setFormData] = useState<FormDataCreateNetworkIPPool>({
    cidrs: [{}],
    mask: 24,
    count: 1,
    ip: '',
  });

  const [count, setCount] = useState(1);
  const [ip, setIp] = useState('');
  const [mask, setMask] = useState(24);
  const [cidrs, setCidrs] = useState<CridObject[]>([]);

  const random = generateId(4);

  const handleCIDRsChange = () => {
    const newCidrs: { cidr: string; desc?: string; name?: string }[] = [];
    if (Pattern.PATTERN_IP.test(ip) && mask && count > 0) {
      let index = 0;
      let block = new Netmask(`${ip}/${mask}`);
      while (index < count) {
        const cidr = block.toString();
        if (newCidrs.every(item => item.cidr !== cidr)) {
          newCidrs.push({ cidr });
        }
        index += 1;
        block = block.next();
      }
    }

    setCidrs(newCidrs);

    setFormData(prev => {
      prev.cidrs = newCidrs;
      return prev;
    });
  };

  useEffect(() => {
    handleCIDRsChange();
  }, [ip, mask, count]);

  const handleIPChange = (value: any) => {
    setIp(value);
    setFormData(prev => {
      prev.ip = value;
      return prev;
    });
  };

  const handleMaskChange = (value: any) => {
    setMask(value);
    setFormData(prev => {
      prev.mask = value;
      return prev;
    });
  };

  const handleCountChange = (value: any) => {
    setCount(value);
    setFormData(prev => {
      prev.count = value;
      return prev;
    });
  };

  const validator = (rule: any, value: CridObject, callback: (error?: any) => void) => {
    if (!value) {
      return callback({
        message: t('ENTER_NETWORK_SEGMENT_TIP'),
        field: rule.field,
      });
    }

    if (!value.cidr) {
      return callback({
        message: t('ENTER_NETWORK_SEGMENT_TIP'),
        field: rule.field,
      });
    }

    if (!value.name) {
      return callback({
        message: t('NAME_EMPTY_DESC'),
        field: rule.field,
      });
    }

    callback();
  };

  const handleSubmit = () => {
    form.validateFields().then(() => {
      onOk?.(formData);
    });
  };

  const handleFieldsChange = (v: any) => {
    if (v.length > 0 && v[0]) {
      const value = v[0].value;
      if (v[0].name.includes('ip')) {
        handleIPChange(value);
      } else if (v[0].name.includes('mask')) {
        handleMaskChange(value);
      } else if (v[0].name.includes('count')) {
        handleCountChange(value);
      }
    }
  };
  const handleChangeCidrs = (name: string, item: object) => {
    const newFormData = cloneDeep(formData);
    set(newFormData, name, item);
    setFormData(newFormData);
    form.setFieldsValue(newFormData);
  };

  const renderForm = () => {
    return (
      <Form form={form} initialValues={formData} onFieldsChange={handleFieldsChange}>
        <FormItem
          name="ip"
          label={t('IP_ADDRESS')}
          rules={[
            { required: true, message: t('IP_ADDRESS_EMPTY_DESC') },
            {
              pattern: Pattern.PATTERN_IP,
              message: t('INVALID_IP_DESC'),
            },
          ]}
        >
          <Input />
        </FormItem>
        <FormItem
          name="mask"
          label={t('MASK')}
          rules={[{ required: true, message: t('MASK_TIP') }]}
        >
          <NumberInput defaultValue={24} integer min={0} max={31} />
        </FormItem>
        <FormItem
          name={'count'}
          label={t('QUANTITY')}
          help={t('IP_POOL_CREATE_COUNT_DESC')}
          rules={[
            {
              required: true,
              message: t('IP_POOL_NUM_TIP'),
            },
          ]}
        >
          <NumberInput defaultValue={count} integer min={1} max={10} />
        </FormItem>
        {cidrs.map((item, index) => (
          <FormItem
            name={[`cidrs`, index]}
            label={index === 0 ? t('IP_POOL_CREATE_DESC') : ''}
            key={index}
            rules={[{ validator: validator }]}
          >
            <ObjectInputWrapper
              defaultValue={cidrs[index]}
              onChangeNew={(newVal: any) => {
                handleChangeCidrs(`cidrs[${index}]`, newVal);
              }}
            >
              <Input name="cidr" placeholder={t('NETWORK_SEGMENT_SCAP')} defaultValue={item.cidr} />
              <Input
                name="name"
                defaultValue={`ippool-${random}-${index}`}
                placeholder={t('NAME')}
              />
              <Input name="desc" placeholder={t('DESCRIPTION')} />
            </ObjectInputWrapper>
          </FormItem>
        ))}
      </Form>
    );
  };
  return (
    <Modal
      title={t('CREATE_POD_IP_POOL')}
      width={960}
      visible={visible}
      onCancel={onCancel}
      confirmLoading={confirmLoading}
      onOk={handleSubmit}
      bodyStyle={{ padding: '20px' }}
    >
      {renderForm()}
    </Modal>
  );
}

export default CreateIPPoolModal;
