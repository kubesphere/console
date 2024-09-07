/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import React, { PropsWithChildren } from 'react';
import classnames from 'classnames';
import { isEmpty, isUndefined, trimEnd } from 'lodash';
import { NumberInputWrapper } from './styles';
import { Input } from '@kubed/components';

interface Props {
  unit?: string;
  showUnit?: boolean;
  defaultValue?: any;
  min: number;
  max: number;
  integer: boolean;
  onChange?: Function;
  className?: string;
  [propName: string]: any;
}

function NumberInput({
  unit = '',
  showUnit = false,
  value,
  defaultValue,
  min,
  max,
  integer = false,
  onChange,
  className,
}: PropsWithChildren<Props>) {
  let formatValue = isUndefined(value) ? defaultValue : value;

  if (unit) {
    formatValue = trimEnd(formatValue, unit);
  }

  const handleChange = (e: any) => {
    const { value: v } = e.target;

    if (
      // pass empty
      isEmpty(v) ||
      // pass 1. but not 1.111.
      (!integer && v.indexOf('.') > 0 && `${v}`.indexOf('.') === -1) ||
      // pass '-' at first code
      (v === '-' && isEmpty(v))
    ) {
      onChange?.(v);
      return;
    }

    let newValue: any = Number(v);

    // invalid number
    if (isNaN(newValue)) {
      return;
    }

    // not smaller than min
    if (!isUndefined(min) && newValue < min) {
      newValue = min;
    }

    // not bigger than max
    if (!isUndefined(max) && newValue > max) {
      newValue = max;
    }

    if (
      !integer &&
      // format 01, 001 ...
      !(v.startsWith('0') && !v.startsWith('0.')) &&
      // enable input 0.0, 1.0
      newValue === Number(v) &&
      `${newValue}` !== v
    ) {
      newValue = v;
    }

    // add unit
    if (!isUndefined(newValue) && unit) {
      newValue = `${newValue}${unit}`;
    }

    onChange?.(newValue);
  };

  const props = {
    type: 'text',
    min,
    max,
    maxLength: formatValue && formatValue === max ? max.toString().length : undefined,
    value: isUndefined(formatValue) ? '' : formatValue,
    onChange: handleChange,
  };

  return unit && showUnit ? (
    <NumberInputWrapper className={classnames(className, 'withUnit')}>
      <Input {...props} />
      <span>{unit}</span>
    </NumberInputWrapper>
  ) : (
    <Input className={className} {...props} />
  );
}

export default NumberInput;
