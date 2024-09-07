/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import {
  Alert,
  Checkbox,
  Field,
  Form,
  FormItem,
  Modal,
  Slider,
  Switch,
  SwitchProps,
  useForm,
  useWatch,
} from '@kubed/components';
import * as React from 'react';

import { endsWith, get, isBoolean, range, set, trim } from 'lodash';
import InputNumberWithUnit from '../InputNumberWithUnit';
import {
  AuthRoleRow,
  Card,
  CardTitle,
  CardWithBorder,
  CheckboxField,
  FormGroup,
  ModalContent,
  SliderWrapper,
} from './styles';

interface EditAutoExpansionModalProps {
  visible: boolean;
  onCancel: () => void;
  confirmLoading: boolean;
  onOk: (d: Record<string, any>) => void;
  formData: Record<string, any>;
}

const values = (
  formData: Record<string, any>,
  type: string,
  key: string,
  defaultValue: unknown,
): any => {
  return get(formData, `metadata.annotations['${type}.kubesphere.io/${key}']`, defaultValue);
};

const mapperIn = (propsData: Record<string, any>) => {
  const state = {
    resize: {
      enabled: JSON.parse(values(propsData, 'resize', 'enabled', 'false')),
      increase: values(propsData, 'resize', 'increase', '10Gi'),
      'storage-limit': values(propsData, 'resize', 'storage-limit', '10000Gi'),
      threshold: values(propsData, 'resize', 'threshold', '10%'),
    },
    restart: {
      enabled: JSON.parse(values(propsData, 'restart', 'enabled', false)),
      'max-time': values(propsData, 'restart', 'max-time', '300'),
    },
    fakeIncrease: values(propsData, 'resize', 'increase', '10Gi'),
    fakeThreshold: values(propsData, 'resize', 'threshold', '10%'),
    fakeLimit: values(propsData, 'resize', 'storage-limit', '10000Gi'),
    fakeMaxTime: values(propsData, 'restart', 'max-time', '300'),
  };
  const { resize, restart, fakeLimit: limit, fakeThreshold, fakeIncrease, fakeMaxTime } = state;
  const limitStr = /[0-9]+/g.exec(limit)?.[0];
  const storageLimit = limitStr ? parseInt(limitStr, 10) : '';
  const formValues = {
    fakeLimit: storageLimit,
    enabled: resize.enabled,
    threshold: fakeIncrease !== '' ? fakeThreshold.slice(0, -1) : fakeIncrease,
    increase: /[0-9]+/g.test(fakeIncrease)
      ? fakeIncrease.endsWith('%')
        ? fakeIncrease.slice(0, -1)
        : fakeIncrease.slice(0, -2)
      : '',
    fakeMaxTime,
    restartEnable: restart.enabled,
  };
  return {
    state,
    formValues,
  };
};

const EnableSwitch = (
  props: SwitchProps & { value?: boolean; onChange?: (checked: boolean) => void },
) => {
  const { value: valueProp, onChange, ...rest } = props;
  const [value, setValue] = React.useState(valueProp);
  React.useEffect(() => {
    if (valueProp !== undefined) {
      setValue(valueProp);
    }
  }, [valueProp]);

  const handleChange = (checked: boolean) => {
    setValue(checked);
    onChange?.(checked);
  };
  return (
    <Switch
      {...rest}
      onChange={handleChange}
      checked={value}
      label={t(value ? 'ENABLED' : 'DISABLED')}
    />
  );
};

const CheckBoxInput = (props: {
  value?: boolean;
  onChange?: (checked: boolean) => void;
  [key: string]: any;
}) => {
  const { value, onChange, ...rest } = props;
  return <Checkbox {...rest} checked={value} onChange={e => onChange?.(e.target.checked)} />;
};

const sliderSettings = {
  max: 10000,
  min: 0,
  unit: 'Gi',
};

const getMarks = () => {
  const max = sliderSettings.max;
  const unit = sliderSettings.unit;
  const count = 6;
  return range(count).map((marks, index) => {
    const value = (max * index) / (count - 1);
    const mark = value === 0 ? '0' : `${Math.floor(value)}${unit}`;
    return { value, label: mark };
  });
};

const EditAutoExpansionModal = (props: EditAutoExpansionModalProps) => {
  const { visible, onCancel, confirmLoading, onOk, formData } = props;
  const [form] = useForm();

  const [state, setState] = React.useState(() => mapperIn(formData));

  React.useEffect(() => {
    const v = mapperIn(formData);
    setState(v);
    form.setFieldsValue(v.formValues);
  }, [formData]);

  const NumberEndDot = (num: string) => {
    const getNumber = /^[0-9]+(\.[0-9]{0,})?/g.exec(num) ?? [];
    return endsWith(getNumber[0], '.') ? num.split('.').join('') : num;
  };

  const restartEnable = useWatch('restartEnable', form);
  const handleOk = () => {
    form.validateFields().then(values1 => {
      const {
        enabled,
        threshold,
        increase,
        fakeLimit,
        fakeMaxTime,
        restartEnable: restartEnable1,
      } = values1;
      const storageLimit = /^[0-9]+(\.[0-9]{0,})?/g.test(fakeLimit)
        ? `${trim(fakeLimit)}${sliderSettings.unit}`
        : '10000Gi';
      const newState = {
        resize: {
          ...state.state.resize,
          enabled,
          'storage-limit': storageLimit,
          threshold: threshold === '%' ? '10%' : `${trim(threshold)}%`,
          increase: increase === 'Gi' ? '10G' : `${trim(increase)}Gi`,
        },
        restart: {
          ...state.state.restart,
          enabled: restartEnable1,
          'max-time': fakeMaxTime === '' ? '300' : fakeMaxTime?.toString(),
        },
      };

      const { resize, restart } = newState;
      const object = { resize, restart };
      const labels = Object.entries(object).map(([k, v]) => {
        const newItem = { annotations: {} };
        Object.entries(v).forEach(([type, value]) => {
          const data = isBoolean(value) ? JSON.stringify(value) : NumberEndDot(value);
          set(newItem, `annotations['${k}.kubesphere.io/${type}']`, data);
        });
        return newItem.annotations;
      });

      onOk({
        ...labels[0],
        ...labels[1],
        'restart.kubesphere.io/online-expansion-support': `${!restart.enabled}`,
      });
    });
  };

  // const [, forceUpdate] = React.useReducer(x => x + 1, 0);

  // console.log('resTartEnable', resTartEnable)
  return (
    <Modal
      title={t('SET_AUTO_EXPANSION')}
      width={960}
      visible={visible}
      onCancel={onCancel}
      confirmLoading={confirmLoading}
      onOk={handleOk}
    >
      <ModalContent>
        <Form
          form={form}
          initialValues={state.formValues}
          // onFieldsChange={changedFields => {
          //   if (changedFields.find(i => (i.name as string[]).includes('restartEnable'))) {
          //     forceUpdate();
          //   }
          // }}
        >
          <AuthRoleRow>
            <Field
              label={t('AUTO_EXPANSION')}
              value={t('AUTO_EXPANSION_DESC')}
              avatar={<img src="/assets/autoscaling.svg" width="40" height="40" alt="" />}
            />
            <FormItem label={null} name={'enabled'}>
              <EnableSwitch variant="button" />
            </FormItem>
          </AuthRoleRow>
          <Card>
            <CardTitle>{t('AUTO_EXPANSION_SETTINGS')}</CardTitle>
            <CardWithBorder>
              <SliderWrapper>
                <FormItem label={t('MAXIMUM_SIZE')} name="fakeLimit">
                  <Slider size="lg" styles={{ padding: 12, marginBottom: 12 }} marks={getMarks()} />
                </FormItem>
                <FormItem label={null} name="fakeLimit">
                  <InputNumberWithUnit unit="Gi" />
                </FormItem>
              </SliderWrapper>
              <FormGroup>
                <FormItem label={t('THRESHOLD')} name="threshold">
                  <InputNumberWithUnit unit="%" />
                </FormItem>
                <FormItem label={t('INCREMENT')} name="increase" help={t('INCREMENT_DESC')}>
                  <InputNumberWithUnit unit="Gi" />
                </FormItem>
              </FormGroup>
            </CardWithBorder>

            <CardWithBorder>
              <CheckboxField>
                <FormItem name="restartEnable" label={null}>
                  <CheckBoxInput />
                </FormItem>
                <Field
                  label={t('RESTART_WORKLOAD_AUTOMATICALLY_DESC')}
                  value={t('RESTART_WORKLOAD_AUTOMATICALLY')}
                />
              </CheckboxField>
              {restartEnable && (
                <>
                  <Alert
                    showIcon={false}
                    type="warning"
                    children={t('RESTART_WORKLOAD_AUTOMATICALLY_TIP')}
                  />
                  <Card $hasTop>
                    <FormItem label={t('TIMEOUT_PERIOD_S')} name="fakeMaxTime">
                      <InputNumberWithUnit />
                    </FormItem>
                  </Card>
                </>
              )}
            </CardWithBorder>
          </Card>
        </Form>
      </ModalContent>
    </Modal>
  );
};

export default EditAutoExpansionModal;
