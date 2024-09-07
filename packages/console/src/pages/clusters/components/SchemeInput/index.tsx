/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import React, { ChangeEvent, ChangeEventHandler, useEffect, useState } from 'react';
import { Select, Input } from '@kubed/components';

import { Container, SelectStyle } from './styles';

const SCHEME_REG = /^(http(s)?:\/\/)?(.*)/;

const SCHEME_OPTIONS = [
  {
    label: 'http://',
    value: 'http://',
  },
  {
    label: 'https://',
    value: 'https://',
  },
];

interface Props {
  value: string;
  onChange: Function;
}
function SchemeInput({ value, onChange }: Props) {
  const [inputValue, setInputValue] = useState('');
  const [schemeValue, setSchemeValue] = useState('');

  const getInputValue = () => {
    const [, , , newInputValue = ''] = value.match(SCHEME_REG) || [];
    return newInputValue;
  };

  const getSchemeValue = () => {
    const [, newSchemeValue = 'https://'] = value.match(SCHEME_REG) || [];
    return newSchemeValue;
  };

  useEffect(() => {
    setInputValue(getInputValue());
    setSchemeValue(getSchemeValue());
  }, [value]);

  const handleInputChange = ({ target }: ChangeEvent<HTMLInputElement>): void => {
    const newValue = target.value.toLowerCase();
    onChange(`${schemeValue}${newValue}`);
  };

  const handleSchemeChange = (v: string) => {
    onChange(`${v}${inputValue}`);
  };

  return (
    <Container>
      <SelectStyle
        value={schemeValue}
        className={'select'}
        options={SCHEME_OPTIONS}
        onChange={handleSchemeChange}
      />
      <Input
        className={'input'}
        onChange={handleInputChange}
        value={inputValue}
        autoComplete="off"
      />
    </Container>
  );
}

export default SchemeInput;
