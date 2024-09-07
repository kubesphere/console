/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import { Input, InputProps } from '@kubed/components';
import { isFinite } from 'lodash';
import * as React from 'react';
import styled from 'styled-components';

const InputWrapper = styled(Input)`
  ${props =>
    props.$error &&
    `&.input-wrapper {
     border-color: #ca2621!important;
     box-shadow: none!important;
     }   
    `};
  background-color: #fff;
`;

interface Props {
  unit?: string;
  value?: number;
  defaultValue?: number;
  min?: number;
  max?: number;
  integer?: boolean;
  onChange?: Function;
  onBlur?: Function;
  error?: boolean;
  placeholder?: string;
  name?: string;
}

const InputNumberWithUnit = ({
  unit,
  value: valueProp,
  defaultValue,
  onChange,
  min = Number.NEGATIVE_INFINITY,
  max = Number.POSITIVE_INFINITY,
  integer = false,
  error: errProp = false,
  onBlur,
  ...rest
}: InputProps & Props) => {
  const propValue = valueProp ?? defaultValue;
  const [value, setValue] = React.useState(propValue === Infinity ? undefined : propValue);
  const [isNotNumber, setIsNotNumber] = React.useState(errProp);
  const [key, forceUpdate] = React.useReducer(x => x + 1, 0);

  React.useEffect(() => {
    if (valueProp !== value) {
      setValue(valueProp === Infinity ? undefined : valueProp);
    }
  }, [valueProp]);

  const parseValue = (vv: string | number, showError = false) => {
    let v = typeof vv === 'string' ? (integer ? parseInt(vv) : parseFloat(vv)) : vv;
    if (vv === undefined || vv === '' || isNaN(v)) {
      setValue(undefined);
      onChange?.(undefined);
      if (showError && vv !== undefined && vv !== '') {
        setIsNotNumber(true);
      }
      return;
    }

    v = Math.max(min, Math.min(v, max));
    setValue(v);
    onChange?.(v);
    setIsNotNumber(false);
  };
  const handleChange = (e: any) => {
    let { value: v } = e.target;

    const isNegative = v.includes('-');
    const hasPoint = v.includes('.');

    const vv = Number(v);
    if (!Number.isNaN(vv) && !isFinite(vv)) {
      return;
    }
    if (hasPoint || isNegative) {
      setIsNotNumber(false);
      setValue(e.target.value);
    } else {
      parseValue(v, true);
    }
  };

  const handleBlur = () => {
    parseValue(value as number, false);
    setIsNotNumber(false);
    forceUpdate();
    onBlur?.();
  };

  return (
    <InputWrapper
      {...rest}
      $error={isNotNumber || errProp}
      key={key}
      value={value}
      onChange={handleChange}
      suffix={unit}
      onBlur={handleBlur}
    />
  );
};

export default InputNumberWithUnit;
