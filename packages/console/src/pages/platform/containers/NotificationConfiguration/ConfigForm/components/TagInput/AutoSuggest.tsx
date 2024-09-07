/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import React, { useState, ChangeEvent, CSSProperties, KeyboardEvent, forwardRef } from 'react';
import AutoSizeInput from 'react-input-autosize';
import { notify } from '@kubed/components';

import { PATTERN_TAG } from '../constants';

type Props = {
  placeholder?: string;
  style?: CSSProperties;
  className?: string;
  onAdd?: (val: string) => void;
  onDelete?: () => void;
  onChange?: (val: string) => void;
};

function AutoSuggest(
  { placeholder, onChange, onAdd, onDelete, style, className }: Props,
  ref: any,
) {
  const [value, setValue] = useState<string>('');

  function handleChange({ target }: ChangeEvent<HTMLInputElement>): void {
    setValue(target.value);
    onChange?.(value);
  }

  function validateTag(tag?: string) {
    if (!tag) {
      return;
    }

    if (PATTERN_TAG.test(tag) && tag.length <= 63) {
      return true;
    }

    notify.error(t('PATTERN_TAG_VALUE_INVALID_TIP'));
  }

  function handlePressEnter(e: KeyboardEvent): void {
    if (e.key === 'Enter' && validateTag(value?.trim())) {
      e.stopPropagation();
      e.preventDefault();

      onAdd?.(value);
      setValue('');
    }

    if (e.key === 'Backspace' && value?.trim() === '') {
      return onDelete?.();
    }
  }

  return (
    <AutoSizeInput
      ref={ref}
      type="text"
      value={value}
      style={style}
      className={className}
      onChange={handleChange}
      placeholder={placeholder}
      onKeyDown={handlePressEnter}
    />
  );
}

export default forwardRef(AutoSuggest);
