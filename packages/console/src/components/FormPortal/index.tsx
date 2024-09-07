/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import { Form, useForm } from '@kubed/components';
import { Check, Close } from '@kubed/icons';
import * as React from 'react';
import { PropsWithChildren } from 'react';
import styled from 'styled-components';
import { PortalWrapper } from '../PortalWrapper';
import { ActionButton, Footer, wrapperCss } from './styles';

type ChangeType = 'auto' | 'manual' | 'ref';

interface FormPortalProps<T> {
  onCancel?: () => void;
  onChange?: (T: any) => void;
  onSubmit?: (T: any) => void;
  value?: T;
  className?: string;
  type?: ChangeType;
  validator?: (T: any) => boolean;
}

interface FormPortalRef<T> {
  onSubmit: () => Promise<T>;
}
const FormPortal = <T extends Record<string, any>>(
  {
    children,
    onCancel,
    onChange,
    onSubmit: onSubmitProps,
    value,
    className,
    type = 'auto',
    validator,
  }: PropsWithChildren<FormPortalProps<T>>,
  ref: React.Ref<FormPortalRef<T>>,
) => {
  const [form] = useForm();

  React.useEffect(() => {
    if (!form.isFieldsTouched()) form.setFieldsValue(value);
  }, [value]);

  const handleSubmit = () => {
    form.validateFields().then(values => {
      onSubmitProps?.(values);
    });
  };

  const onSubmit = (): Promise<T> => {
    return new Promise((resolve, reject) => {
      form
        .validateFields()
        .then(values => {
          resolve(values);
        })
        .catch(err => {
          reject(err);
        });
    });
  };

  React.useImperativeHandle(ref, () => {
    return {
      onSubmit,
    };
  });

  const [validatorStatus, setValidatorStatus] = React.useState(!validator ? true : false);
  const handleChange = (v: T) => {
    if (type === 'auto' && onChange) {
      onChange(v);
    }
    if (validator) {
      setValidatorStatus(validator(form.getFieldsValue()));
    }
  };

  return (
    <PortalWrapper className={className}>
      <Form form={form} initialValues={value} onValuesChange={handleChange}>
        {children}
      </Form>
      {type === 'manual' && (
        <Footer>
          <ActionButton onClick={onCancel}>
            <Close color="#fff" />
          </ActionButton>
          <ActionButton disabled={!validatorStatus} onClick={handleSubmit}>
            <Check color="#fff" />
          </ActionButton>
        </Footer>
      )}
    </PortalWrapper>
  );
};

export default styled(React.forwardRef(FormPortal))<{ absoluteWrapper?: boolean }>`
  ${({ absoluteWrapper = false }) => (!absoluteWrapper ? '' : wrapperCss)};
`;
