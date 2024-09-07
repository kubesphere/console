/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import React from 'react';
import type { ChangeEventHandler } from 'react';
import { Magnifier } from '@kubed/icons';

import { StyledInput, Clear } from './SearchInput.styles';

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  onClear: () => void;
}

export function SearchInput({ value, onChange, onClear }: SearchInputProps) {
  const handleChange: ChangeEventHandler<HTMLInputElement> = event => {
    const v = event.target.value.trim();
    onChange(v);
  };

  return (
    <StyledInput
      prefix={<Magnifier size={20} />}
      suffix={value ? <Clear onClick={onClear} /> : null}
      placeholder={t('EXTENSION_FILES_SEARCH_PLACEHOLDER')}
      value={value}
      onChange={handleChange}
    />
  );
}
